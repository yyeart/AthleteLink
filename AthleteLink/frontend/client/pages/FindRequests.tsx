import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "@/components/HeaderMenu";
import { useAuth } from "@/hooks/useAuth";
import { SPORTS, DATE_FILTERS } from "@/constants/filterConstants";
import { getCurrentDateFormatted } from "@/lib/dateFormatter";

interface RequestItem {
  id: number;
  title: string;
  description: string;
  venue: string;
  dateTime: string;
  players: string;
  avgRating: string;
  sport: string;
}

export default function FindRequests() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [sportFilter, setSportFilter] = useState("Литрбол");
  const [dateFilter, setDateFilter] = useState("По дате");
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const sportDropdownRef = useRef<HTMLDivElement>(null);
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sportDropdownRef.current && !sportDropdownRef.current.contains(event.target as Node)) {
        setShowSportDropdown(false);
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
        setShowDateDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const requests: RequestItem[] = [
    {
      id: 1,
      title: "Бухич на заборах МАИ №1",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 2,
      title: "Бухич на заборах МАИ №2",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 3,
      title: "Бухич на заборах МАИ №3",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 4,
      title: "Бухич на заборах МАИ №4",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 5,
      title: "Бухич на заборах МАИ №5",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 6,
      title: "Бухич на заборах МАИ №6",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 7,
      title: "Бухич на заборах МАИ №7",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 8,
      title: "Бухич на заборах МАИ №8",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 9,
      title: "Бухич на заборах МАИ №9",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 10,
      title: "Бухич на заборах МАИ №10",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 11,
      title: "Бухич на заборах МАИ №11",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 12,
      title: "Бухич на заборах МАИ №12",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 13,
      title: "Бухич на заборах МАИ №13",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
    {
      id: 14,
      title: "Бухич на заборах МАИ №14",
      description: "Вы будете играть в Литрбол!",
      venue: "Московский авиационный...",
      dateTime: "18.10.2025, 23:33",
      players: "Игроков: 256/256",
      avgRating: "Ср. рейтинг: ~50000",
      sport: "Литрбол",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex-1 p-7 overflow-y-auto">
          <HeaderMenu
            greeting={`Добрый день, ${user.full_name}`}
            date={getCurrentDateFormatted()}
          />

          {/* Main Content Area */}
          <div className="rounded-[10px] bg-[#797777]/50 p-8 min-h-[918px]">
            {/* Title and Filters */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-white text-[50px] font-light">Заявки</h1>

              <div className="flex gap-4">
                {/* Sport Filter */}
                <div className="relative" ref={sportDropdownRef}>
                  <button
                    onClick={() => setShowSportDropdown(!showSportDropdown)}
                    className="w-[380px] h-[76px] rounded-[20px] border-[2.6px] border-black bg-[#D9D9D9]/40 flex items-center justify-center px-6 relative"
                  >
                    <svg
                      className="absolute left-6"
                      width="29"
                      height="2"
                      viewBox="0 0 29 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        y1="1"
                        x2="29"
                        y2="1"
                        stroke="#9D9D9D"
                        strokeWidth="2"
                      />
                    </svg>
                    <svg
                      className="absolute left-[62px]"
                      width="29"
                      height="2"
                      viewBox="0 0 29 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        y1="1"
                        x2="29"
                        y2="1"
                        stroke="#9D9D9D"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="text-white text-[32px] font-light">
                      {sportFilter}
                    </span>
                  </button>

                  {/* Sport Dropdown Menu */}
                  {showSportDropdown && (
                    <div className="absolute top-[88px] left-0 w-[380px] bg-[#2a2a2a] border-[2.6px] border-black rounded-[20px] shadow-lg z-50">
                      {SPORTS.map((sport) => (
                        <button
                          key={sport}
                          onClick={() => {
                            setSportFilter(sport);
                            setShowSportDropdown(false);
                          }}
                          className="w-full px-6 py-4 text-left text-white text-[20px] font-light hover:bg-[#3a3a3a] transition-colors first:rounded-t-[16px] last:rounded-b-[16px] border-b border-white/20 last:border-b-0"
                        >
                          {sport}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date Filter */}
                <div className="relative" ref={dateDropdownRef}>
                  <button
                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                    className="w-[380px] h-[76px] rounded-[20px] border-[2.6px] border-black bg-[#D9D9D9]/40 flex items-center justify-center px-6 relative"
                  >
                    <svg
                      className="absolute left-6"
                      width="29"
                      height="2"
                      viewBox="0 0 29 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        y1="1"
                        x2="29"
                        y2="1"
                        stroke="#9D9D9D"
                        strokeWidth="2"
                      />
                    </svg>
                    <svg
                      className="absolute left-[62px]"
                      width="29"
                      height="2"
                      viewBox="0 0 29 2"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        y1="1"
                        x2="29"
                        y2="1"
                        stroke="#9D9D9D"
                        strokeWidth="2"
                      />
                    </svg>
                    <span className="text-white text-[32px] font-light">
                      {dateFilter}
                    </span>
                  </button>

                  {/* Date Dropdown Menu */}
                  {showDateDropdown && (
                    <div className="absolute top-[88px] left-0 w-[380px] bg-[#2a2a2a] border-[2.6px] border-black rounded-[20px] shadow-lg z-50">
                      {DATE_FILTERS.map((date) => (
                        <button
                          key={date}
                          onClick={() => {
                            setDateFilter(date);
                            setShowDateDropdown(false);
                          }}
                          className="w-full px-6 py-4 text-left text-white text-[20px] font-light hover:bg-[#3a3a3a] transition-colors first:rounded-t-[16px] last:rounded-b-[16px] border-b border-white/20 last:border-b-0"
                        >
                          {date}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Requests List */}
            <div className="space-y-0 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border-[0.5px] border-white rounded-[30px] px-6 py-4 flex items-center justify-between"
                >
                  {/* Left Side - Event Info */}
                  <div className="flex-1">
                    <button
                      onClick={() => navigate("/request-data")}
                    >
                      <h3 className="text-white text-[20px] font-light mb-1">
                        {request.title}
                      </h3>
                    </button>
                    <p className="text-white text-[15px] font-light">
                      {request.description}
                    </p>
                  </div>

                  {/* Right Side - Details */}
                  <div className="flex items-center gap-3">
                    {/* Venue */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[226px] text-center">
                      <span className="text-white text-[15px] font-light text-right">
                        {request.venue}
                      </span>
                    </div>

                    {/* Date/Time */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[165px] text-center">
                      <span className="text-white text-base font-light text-right">
                        {request.dateTime}
                      </span>
                    </div>

                    {/* Players */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[165px] text-center">
                      <span className="text-white text-[15px] font-light text-right">
                        {request.players}
                      </span>
                    </div>

                    {/* Average Rating */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[167px] text-center">
                      <span className="text-white text-[15px] font-light text-right">
                        {request.avgRating}
                      </span>
                    </div>

                    {/* Sport Type */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[106px] text-center">
                      <span className="text-white text-[15px] font-light">
                        {request.sport}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Request Button */}
            <div className="flex justify-center mt-14">
              <button
                onClick={() => navigate("/create-request")}
                className="px-8 py-3 bg-[#4182F9] rounded-[25px] text-white text-[22px] font-normal hover:bg-[#3571e8] transition-colors shadow-[0_8px_4px_rgba(0,0,0,0.5)]"
              >
                Создать заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
