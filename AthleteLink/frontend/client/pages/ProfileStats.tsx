import { useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { getTimeGreeting } from "@/components/TimeParse";
import HeaderMenu from "@/components/HeaderMenu";
import SidebarNav from "@/components/SidebarMenu";
import { getCurrentDateFormatted } from "@/lib/dateFormatter";
import { getCookie } from "@/lib/csrf";

const useStats = (userUsername) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const csrfToken = getCookie('csrftoken');

  if(!csrfToken) {
    console.error("CSRF token is missing! Check Django configuration.");
    alert("Ошибка безопасности: Отсутствует CSRF-токен.");
    return;
  }

  useEffect(() => {
    if (!userUsername) {
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try{
        const response = await fetch(`${apiUrl}/my-stats/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
          },
          credentials: 'include'
        });
        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Ошибка HTTP-запроса: ${response.status}. Тело ответа: ${errorText.substring(0, 100)}...`);
        }
        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError('Ошибка загрузки статистики. Обновите страницу');
        setLoading(false);
      }
    };

    fetchStats();
  }, [userUsername]);

  return {stats, loading, error};
};

export default function ProfileStats() {
  const navigate = useNavigate();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { stats, loading: isStatsLoading, error: statsError } = useStats(user?.username);
  const [bounceCount, setBounceCount] = useState(0);

  const isLoading = isAuthLoading || isStatsLoading;

  const getResultColor = (result) => {
    switch (result) {
        case 'Win':
            return 'bg-[#4CAF50]'; // Зеленый
        case 'Loss':
            return 'bg-[#F44336]'; // Красный
        case 'Draw':
            return 'bg-[#FFEB3B] text-black'; // Желтый
        default:
            return 'bg-gray-500';
    }
  };

  const getRomanNumeral = (rankName) => {
      const parts = rankName.split(' ');
      if (parts.length < 2) return '';
      const numeral = parts[1];
      switch(numeral) {
          case 'I': return 'I';
          case 'II': return 'II';
          case 'III': return 'III';
          default: return '';
      }
  }

  if(isLoading) {
    return <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] text-white p-10">Загрузка данных...</div>;
  }

  if (statsError) {
      return <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] text-red-500 p-10">Ошибка: {statsError}</div>;
  }

  if (!stats) {
        return <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] text-white p-10">Данные статистики не найдены.</div>;
  }

  const {
      prestige_info, 
      best_sport_card, 
      recent_games, 
      global_rank_position,
      best_sport_icon_url,
  } = stats; // по идее это не обязательно, но так будет удобнее

  const prestigeProgress = prestige_info.progress_percent || 0;
  const bestSportRankName = best_sport_card?.rank_info?.rank_name || 'Искра I';
  const bestSportRating = best_sport_card?.rating || 0;
  const bestSportPosition = best_sport_card?.position_in_sport || '-';
  const rankImage = best_sport_card?.rank_info?.rank_image || null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="flex min-h-screen">
        <SidebarNav activePage="stats" />

        {/* Main Content */}
        <div className="flex-1 p-7 overflow-y-auto">
          <HeaderMenu
            greeting={`${getTimeGreeting()}, ${user.full_name}`}
            date={getCurrentDateFormatted()}
          />



                    {/* Main Content Area */}
                    <div className="rounded-[10px] bg-white/50 p-8 relative min-h-[850px]">
                      {/* Title */}
                      <h2 className="text-black text-[46px] font-medium mb-4">
                          Спортивный престиж
                      </h2>

                      {/* Description */}
                      <p className="text-black/80 text-base mb-6 max-w-[710px]">
                          Зарабатывайте опыт в товарищеских/рейтинговых встречах, чтобы
                          повышать уровень!
                          <br />
                          До следующего уровня престижа: 
                          <span className="font-bold"> {prestige_info.points_needed_next_level} очков опыта </span>
                      </p>

                      {/* Progress Bar Section */}
                      <div className="relative mb-12">
                          <div
                              className="h-[46px] rounded-[50px] border-[3px] border-black 
                              bg-gradient-to-r from-[#4986F9] via-[#2A387B] to-black 
                              shadow-[0_6px_4px_4px_rgba(0,0,0,0.33)] relative overflow-hidden 
                              max-w-[90%] mx-auto"
                          >
                              <div
                                  className="h-full bg-gradient-to-r from-[#4986F9] to-[#2A387B] 
                                  rounded-[5000px]"
                                  style={{
                                      width: `${prestigeProgress}%`,
                                  }}
                              ></div>
                          </div>

                          {/* Level indicator triangle and badge */}
                          <div
                              className="absolute top-[50px] left-1/2 -translate-x-1/2 
                              flex flex-col items-center"
                          >
                              <svg
                                  className="w-[27px] h-[32px] drop-shadow-[0_5px_4px_rgba(0,0,0,0.75)]"
                                  viewBox="0 0 32 33"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                              >
                                  <path
                                      d="M15.6914 0L27.3827 24H4.00006L15.6914 0Z"
                                      fill="url(#paint0_linear)"
                                      stroke="black"
                                      strokeWidth="1.5"
                                  />
                                  <defs>
                                      <linearGradient
                                          id="paint0_linear"
                                          x1="15.6914"
                                          y1="0"
                                          x2="15.6914"
                                          y2="32"
                                          gradientUnits="userSpaceOnUse"
                                      >
                                          <stop stopColor="#D3D3D3" />
                                          <stop offset="1" stopColor="#EBEBEB" />
                                      </linearGradient>
                                  </defs>
                              </svg>

                              <div className="bg-[#3462AB] rounded-lg px-3 py-1 text-white text-sm text-center drop-shadow-[0_5px_4px_rgba(0,0,0,0.75)] mt-1">
                                  {prestige_info.rating}/{prestige_info.rating + prestige_info.points_needed_next_level}
                              </div>
                          </div>

                          {/* Level number */}
                          <div
                              className="absolute top-[-19px] right-[170px] text-white text-[50px] font-bold stroke-black stroke-[4px]"
                              style={{ WebkitTextStroke: "4px black" }}
                          >
                              {prestige_info.level}
                          </div>
                      </div>

                      {/* Three Column Layout */}
                      <div className="grid grid-cols-3 gap-6 mt-20">
                          {/* Left Card - Best Sport */}
                          <div className="rounded-[55px] border-[1.5px] border-black bg-gradient-to-r from-[#4F0A0A] to-[#780000] shadow-[0_14px_4px_0_rgba(0,0,0,0.50)] p-6 flex flex-col items-center relative overflow-visible ">
                              {/* Badge Image positioned above the card */}
                              <div className="-top-10 left-1/2 transform -translate-x-1/2 rotate-10 transform-origin-center scale-125 ml-[254px]">
                                  <img
                                      src={rankImage}
                                      alt="Badge"
                                      className="w-[299px] h-[298px] object-contain"
                                  />
                              </div>

                              {/* Roman Numeral (Based on rank name) */}
                              <div
                                  className="absolute text-[#760000] text-[100px] font-bold text-center mt-48"
                                  style={{
                                      WebkitTextStroke: "3px black",
                                      textShadow: "0 10px 4px rgba(0, 0, 0, 0.50)",
                                      fontFamily: "Piazzolla, serif",
                                  }}
                              >
                                  {getRomanNumeral(bestSportRankName)}
                              </div>

                              <h3 className="text-[#D9D9D9] text-[32px] font-light text-center mt-8">
                                  Ваш лучший спорт: {best_sport_card?.sport_name || 'Не определен'}
                              </h3>

                              <p className="text-[#D9D9D9] text-xl text-center mt-4">
                                  Ранг: {bestSportRankName} ({bestSportRating} очков)
                                  <br />
                                  Позиция в рейтинге: {bestSportPosition}
                              </p>

                              <p className="text-[#D9D9D9] text-xl text-center mt-4">
                                  Всего побед: {best_sport_card?.wins || 0}
                                  <br />
                                  Win Rate: {best_sport_card?.win_rate || 0}%
                              </p>
                          </div>

                          {/* Middle Card - Recent Games */}
                          <div className="rounded-[55px] border-[3px] border-black bg-[#4986F9]/40 shadow-[0_14px_4px_0_rgba(0,0,0,0.50)] p-6">
                              <h3 className="text-black text-[30px] text-center mb-6">
                                  Последние игры ({recent_games.length})
                              </h3>

                              <div className="space-y-4">
                                  {recent_games.map((game) => (
                                      <div
                                          key={game.id}
                                          // Включаем навигацию по клику
                                          onClick={() => navigate(`/requests/${game.id}`)}
                                          className="border-[3px] border-black rounded-[55px] p-4 cursor-pointer hover:bg-white/20 transition-colors"
                                      >
                                          <div className="border-[3px] border-black rounded-[50px] px-4 py-3 mb-2">
                                              <p className="text-black text-sm font-semibold">
                                                  {game.title}
                                              </p>
                                              <p className="text-black text-xs">
                                                  {game.date} в {game.time} - {game.sport_name}
                                              </p>
                                          </div>
                                          <div 
                                              className={`border-[3px] border-black rounded-[50px] px-4 py-3 text-center transition-all ${getResultColor(game.personal_result)}`}
                                          >
                                              <p className="text-white text-sm font-bold">
                                                  {game.personal_result === 'Win' ? 'ПОБЕДА' : 
                                                    game.personal_result === 'Loss' ? 'ПОРАЖЕНИЕ' : 
                                                    game.personal_result === 'Draw' ? 'НИЧЬЯ' : 'АКТИВНА'}
                                              </p>
                                          </div>
                                      </div>
                                  ))}
                              </div>

                              <button
                                  onClick={() => navigate("/public-profile")}
                                  className="w-full mt-6 bg-[#4182F9] text-white text-sm rounded-lg px-6 py-2 drop-shadow-[0_8px_4px_rgba(0,0,0,0.50)] hover:bg-[#3671E8] transition-colors"
                              >
                                  Как мой профиль видят другие люди?
                              </button>
                          </div>

                          {/* Right Card - Current Ranking */}
                          <div className="flex flex-col gap-6">
                              <p className="text-black text-2xl font-medium opacity-80">
                                  Сейчас в рейтинге Вы выглядите так:
                              </p>

                              <div className="rounded-[55px] border-[1.5px] border-black bg-gradient-to-r from-[#4F0A0A] to-[#780000] p-6">
                                  <div className="rounded-[50px] border-[3px] border-black p-4 flex items-center gap-4">
                                      <img
                                          src={"https://placehold.co/58x58/780000/FFF?text=P"}
                                          alt="Profile"
                                          className="w-[58px] h-[58px] rounded-full object-cover"
                                      />

                                      <div className="flex-1">
                                          <h4
                                              className="text-white text-base font-bold flex items-center gap-2"
                                              style={{ WebkitTextStroke: "1px black" }}
                                          >
                                              {user?.full_name || 'Неизвестный'}
                                              {/* Иконка лучшего спорта рядом с ником */}
                                              {best_sport_icon_url && (
                                                  <img
                                                      src={best_sport_icon_url}
                                                      alt="Best Sport Icon"
                                                      className="w-5 h-5 object-contain"
                                                  />
                                              )}
                                          </h4>
                                          <p
                                              className="text-xs font-bold bg-gradient-to-b from-[#A2E1B1] via-[#AE349C] to-white bg-clip-text text-transparent"
                                              style={{ WebkitTextStroke: "1px black" }}
                                          >
                                              Уровень престижа: {prestige_info.level}
                                              <br />
                                              <span className="text-white">
                                                  Рейтинг: {stats.global_rating}
                                              </span>
                                          </p>
                                      </div>

                                      <div
                                          className="text-white text-2xl font-bold"
                                          style={{ WebkitTextStroke: "1px black" }}
                                      >
                                          #{global_rank_position}
                                      </div>
                                  </div>
                              </div>

                              {/* Cat Image with Bounce Animation - Оставлен без изменений */}
                              <div className="flex justify-center">
                                  <motion.div
                                      key={bounceCount}
                                      className="cursor-pointer"
                                      onClick={() => setBounceCount((prev) => prev + 1)}
                                      initial={{ scale: 1 }}
                                      animate={{
                                          scale: [1, 0.6, 1.4, 0.9, 1.1, 0.95, 1.05, 1],
                                          rotate: [0, -5, 5, -3, 3, 0],
                                          y: [0, -15, -30, -20, -10, -3, 0],
                                      }}
                                      transition={{
                                          duration: 0.8,
                                          times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
                                          ease: "easeInOut",
                                      }}
                                      whileHover={{ scale: 1.05 }}
                                  >
                                      <motion.img
                                          src="/wawa_cat.webp"
                                          alt="Chubby cat"
                                          className="w-[360px] h-[360px] object-contain drop-shadow-2xl select-none"
                                          animate={{
                                              scaleX: [1, 0.8, 1.3, 0.9, 1.1, 1],
                                              scaleY: [1, 1.3, 0.7, 1.1, 0.95, 1],
                                          }}
                                          transition={{
                                              duration: 0.8,
                                              times: [0, 0.15, 0.3, 0.5, 0.7, 1],
                                              ease: [0.34, 1.56, 0.64, 1],
                                          }}
                                      />
                                  </motion.div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
      </div>
    </div>
  );
}
