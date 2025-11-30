import { useNavigate } from "react-router-dom";
import HeaderMenu from "@/components/HeaderMenu";
import { getCurrentDateFormatted } from "@/lib/dateFormatter";
import {
  PUBLIC_PROFILE_DATA,
  CAT_PLACEHOLDER,
} from "@/constants/publicProfileConstants";

export default function PublicProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      {/* Header */}
      <div className="p-7 pb-0">
        <HeaderMenu
          greeting={`Добрый день, Захар`}
          date={getCurrentDateFormatted()}
          onProfileClick={() => navigate("/profile")}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-[1280px] mx-auto px-9 py-6">
        {/* Profile Card */}
        <div className="rounded-[10px] bg-[#797777]/50 p-8 relative min-h-[932px]">
          {/* Header Gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-[88px] rounded-t-[10px]"
            style={{
              background:
                "linear-gradient(90deg, #878DB3 0%, rgba(0, 26, 255, 0.31) 100%)",
              opacity: 0.5,
            }}
          />

          {/* Profile Info Section */}
          <div className="relative z-10 flex items-start gap-6 mb-8">
            {/* Avatar */}
            <img
              src={`${PUBLIC_PROFILE_DATA.avatar}?width=330`}
              alt="Profile Avatar"
              className="w-[140px] h-[140px] rounded-full object-cover mt-20 flex-shrink-0"
            />

            {/* Info */}
            <div className="flex-1 mt-16">
              <h1 className="text-white text-[36px] font-light mb-6">
                {PUBLIC_PROFILE_DATA.playerName}
              </h1>

              <p className="text-white text-[18px] font-medium mb-6">
                Зарегистрировался в AthleteLink:{" "}
                {PUBLIC_PROFILE_DATA.registrationDate}
              </p>

              <div className="flex gap-4 flex-wrap">
                <div className="border border-white rounded-[20px] px-6 py-3">
                  <p className="text-white text-xl opacity-80">
                    Пол: {PUBLIC_PROFILE_DATA.gender}
                  </p>
                </div>
                <div className="border border-white rounded-[20px] px-6 py-3">
                  <p className="text-white text-xl opacity-80">
                    Возраст: {PUBLIC_PROFILE_DATA.age}
                  </p>
                </div>
                <div className="border border-white rounded-[20px] px-6 py-3">
                  <p className="text-white text-xl opacity-80">
                    Местоположение: {PUBLIC_PROFILE_DATA.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Cat Video */}
            <div className="flex flex-col items-center mt-16">
              <div className="w-[260px] h-[260px] rounded-lg overflow-hidden bg-gray-800">
                <video
                  src="/cat_stick.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6 mt-8">
            {/* Left Column - Best Sport */}
            <div className="col-span-3">
              <div
                className="rounded-[55px] border-[1.5px] border-black shadow-[0_14px_4px_0_rgba(0,0,0,0.50)] p-6 flex flex-col items-center relative overflow-visible min-h-[445px] mt-10"
                style={{
                  background: `linear-gradient(90deg, ${PUBLIC_PROFILE_DATA.bestSport.gradientFrom} 0%, ${PUBLIC_PROFILE_DATA.bestSport.gradientTo} 100%)`,
                }}
              >
                {/* Badge Image positioned above */}
                <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 scale-[1.8]">
                  <img
                    src={`${PUBLIC_PROFILE_DATA.bestSport.badgeImage}?width=546`}
                    alt="Badge"
                    className="w-[273px] h-[270px] object-contain"
                  />
                </div>

                {/* Roman Numeral */}
                <div
                  className="text-[100px] font-bold text-center mt-24"
                  style={{
                    color: PUBLIC_PROFILE_DATA.bestSport.badgeColor,
                    WebkitTextStroke: "3px black",
                    textShadow: "0 10px 4px rgba(0, 0, 0, 0.50)",
                    fontFamily: "Piazzolla, serif",
                  }}
                >
                  {PUBLIC_PROFILE_DATA.bestSport.romanNumeral}
                </div>

                <h3 className="text-[#D9D9D9] text-2xl font-light text-center mt-4">
                  Лучший спорт
                  <br />
                  Spectrum: {PUBLIC_PROFILE_DATA.bestSport.name}
                </h3>

                <p className="text-[#D9D9D9] text-lg text-center mt-4">
                  Ранг: {PUBLIC_PROFILE_DATA.bestSport.rank} (
                  {PUBLIC_PROFILE_DATA.bestSport.rankProgress})
                  <br />
                  Глобальный рейтинг:{" "}
                  {PUBLIC_PROFILE_DATA.bestSport.globalRanking}
                </p>

                <p className="text-[#D9D9D9] text-lg text-center mt-4">
                  Всего побед: {PUBLIC_PROFILE_DATA.bestSport.totalWins}
                  <br />
                  Win Rate: {PUBLIC_PROFILE_DATA.bestSport.winRate}
                </p>
              </div>
            </div>

            {/* Middle Column - Other Sports */}
            <div className="col-span-5 space-y-6">
              <h3 className="text-white text-xl font-light">
                Spectrum также играет в:
              </h3>

              {/* First Sport */}
              <div className="flex items-center relative">
                <div className="relative z-10">
                  <img
                    src={`${PUBLIC_PROFILE_DATA.otherSports[0].badgeImage}?width=2304`}
                    alt={PUBLIC_PROFILE_DATA.otherSports[0].name}
                    className="w-[117px] h-[116px] object-contain -rotate-[15deg] scale-125"
                  />
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[48px] font-medium -rotate-[25deg] text-center mt-7 ml-4"
                    style={{
                      color: PUBLIC_PROFILE_DATA.otherSports[0].badgeColor,
                      WebkitTextStroke: "1px black",
                      textShadow: "0 10px 4px rgba(0, 0, 0, 0.50)",
                      fontFamily: "Piazzolla, serif",
                    }}
                  >
                    {PUBLIC_PROFILE_DATA.otherSports[0].rank}
                  </div>
                </div>
                <div
                  className="flex-1 rounded-[55px] border-[1.5px] border-black shadow-[0_14px_4px_0_rgba(0,0,0,0.50)] px-6 py-4 -ml-[87px] pl-[130px]"
                  style={{
                    background: `linear-gradient(90deg, ${PUBLIC_PROFILE_DATA.otherSports[0].gradientFrom} 0%, ${PUBLIC_PROFILE_DATA.otherSports[0].gradientTo} 100%)`,
                  }}
                >
                  <p className="text-white text-[22px] font-medium">
                    {PUBLIC_PROFILE_DATA.otherSports[0].name} (
                    {PUBLIC_PROFILE_DATA.otherSports[0].score})
                  </p>
                </div>
              </div>

              {/* Second Sport */}
              <div className="flex items-center relative">
                <div className="relative z-10">
                  <img
                    src={`${PUBLIC_PROFILE_DATA.otherSports[1].badgeImage}?width=234`}
                    alt={PUBLIC_PROFILE_DATA.otherSports[1].name}
                    className="w-[117px] h-[116px] object-contain -rotate-[15deg] scale-125"
                  />
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[48px] font-bold -rotate-[25deg] text-center mt-7 ml-4"
                    style={{
                      color: PUBLIC_PROFILE_DATA.otherSports[1].badgeColor,
                      WebkitTextStroke: "1px black",
                      textShadow: "0 10px 4px rgba(0, 0, 0, 0.50)",
                      fontFamily: "Piazzolla, serif",
                    }}
                  >
                    {PUBLIC_PROFILE_DATA.otherSports[1].rank}
                  </div>
                </div>
                <div
                  className="flex-1 rounded-[55px] border-[1.5px] border-black shadow-[0_14px_4px_0_rgba(0,0,0,0.50)] px-6 py-4 -ml-[87px] pl-[130px]"
                  style={{
                    background: `linear-gradient(90deg, ${PUBLIC_PROFILE_DATA.otherSports[1].gradientFrom} 0%, ${PUBLIC_PROFILE_DATA.otherSports[1].gradientTo} 100%)`,
                  }}
                >
                  <p className="text-white text-[22px] font-medium">
                    {PUBLIC_PROFILE_DATA.otherSports[1].name} (
                    {PUBLIC_PROFILE_DATA.otherSports[1].score})
                  </p>
                </div>
              </div>

              {/* Third Sport */}
              <div className="flex items-center relative">
                <div className="relative z-10">
                  <img
                    src={`${PUBLIC_PROFILE_DATA.otherSports[2].badgeImage}?width=234`}
                    alt={PUBLIC_PROFILE_DATA.otherSports[2].name}
                    className="w-[117px] h-[116px] object-contain -rotate-[15deg] scale-125"
                  />
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[48px] font-medium -rotate-[25deg] text-center mt-7 ml-4"
                    style={{
                      color: PUBLIC_PROFILE_DATA.otherSports[2].badgeColor,
                      WebkitTextStroke: "1px black",
                      textShadow: "0 10px 4px rgba(0, 0, 0, 0.50)",
                      fontFamily: "Piazzolla, serif",
                    }}
                  >
                    {PUBLIC_PROFILE_DATA.otherSports[2].rank}
                  </div>
                </div>
                <div
                  className="flex-1 rounded-[55px] border-[1.5px] border-black shadow-[0_14px_4px_0_rgba(0,0,0,0.50)] px-6 py-4 -ml-[87px] pl-[130px]"
                  style={{
                    background: `linear-gradient(90deg, ${PUBLIC_PROFILE_DATA.otherSports[2].gradientFrom} 0%, ${PUBLIC_PROFILE_DATA.otherSports[2].gradientTo} 100%)`,
                  }}
                >
                  <p className="text-white text-[22px] font-medium">
                    {PUBLIC_PROFILE_DATA.otherSports[2].name} (
                    {PUBLIC_PROFILE_DATA.otherSports[2].score})
                  </p>
                </div>
              </div>

              {/* Fourth Sport */}
              <div className="flex items-center relative">
                <div className="relative z-10">
                  <img
                    src={`${PUBLIC_PROFILE_DATA.otherSports[3].badgeImage}?width=234`}
                    alt={PUBLIC_PROFILE_DATA.otherSports[3].name}
                    className="w-[117px] h-[116px] object-contain -rotate-[15deg] scale-125"
                  />
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[48px] font-medium -rotate-[25deg] text-center mt-7 ml-4"
                    style={{
                      color: PUBLIC_PROFILE_DATA.otherSports[3].badgeColor,
                      WebkitTextStroke: "1px black",
                      textShadow: "0 10px 4px rgba(0, 0, 0, 0.50)",
                      fontFamily: "Piazzolla, serif",
                    }}
                  >
                    {PUBLIC_PROFILE_DATA.otherSports[3].rank}
                  </div>
                </div>
                <div
                  className="flex-1 rounded-[55px] border-[1.5px] border-black shadow-[0_14px_4px_0_rgba(0,0,0,0.50)] px-6 py-4 -ml-[87px] pl-[130px]"
                  style={{
                    background: `linear-gradient(90deg, ${PUBLIC_PROFILE_DATA.otherSports[3].gradientFrom} 0%, ${PUBLIC_PROFILE_DATA.otherSports[3].gradientTo} 100%)`,
                  }}
                >
                  <p className="text-white text-xl font-medium">
                    {PUBLIC_PROFILE_DATA.otherSports[3].name} (
                    {PUBLIC_PROFILE_DATA.otherSports[3].score})
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-span-4 space-y-6">
              {/* Last Game */}
              <div>
                <h3 className="text-white text-xl font-light mb-4">
                  Последняя игра:
                </h3>

                <div className="border-[0.3px] border-white rounded-[50px] p-6 space-y-4">
                  <h4 className="text-white text-[30px] font-light">
                    {PUBLIC_PROFILE_DATA.lastGame.name}
                  </h4>

                  <div className="flex gap-2">
                    <div className="border-[0.3px] border-white rounded-[50px] px-4 py-2 flex-1">
                      <p className="text-white text-right text-base font-light">
                        {PUBLIC_PROFILE_DATA.lastGame.date},{" "}
                        {PUBLIC_PROFILE_DATA.lastGame.time}
                      </p>
                    </div>
                    <div className="border-[0.3px] border-white rounded-[50px] px-4 py-2">
                      <p className="text-white text-right text-base font-light">
                        {PUBLIC_PROFILE_DATA.lastGame.sport}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-white text-2xl font-light">
                      Результат игры:
                    </p>
                    {PUBLIC_PROFILE_DATA.lastGame.isWin && (
                      <div className="w-6 h-6 rounded-full bg-[#48FF55]/60 border border-black" />
                    )}
                  </div>

                  <p className="text-white text-2xl font-light">
                    {PUBLIC_PROFILE_DATA.lastGame.result}
                  </p>
                </div>
              </div>

              {/* Recent Opponents */}
              <div>
                <h3 className="text-white text-xl font-light mb-4">
                  Последние соперники:
                </h3>

                <div className="flex gap-4">
                  {PUBLIC_PROFILE_DATA.recentOpponents.map((opponent) => (
                    <div
                      key={opponent.id}
                      className="rounded-[25px] border-[1.5px] border-black bg-gradient-to-r from-[#4F0A0A] to-[#780000] p-4 flex items-center gap-3 flex-1"
                    >
                      <img
                        src={`${opponent.avatar}?width=76`}
                        alt={opponent.name}
                        className="w-[38px] h-[36px] rounded-full object-cover"
                      />
                      <p
                        className="text-white text-2x1 font-light"
                        style={{ WebkitTextStroke: "1px white" }}
                      >
                        {opponent.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Overall Ranking */}
              <div>
                <h3 className="text-white text-xl font-light mb-4">
                  Положение в общем рейтинге:
                </h3>

                <div className="flex items-center gap-4">
                  <div className="w-[76px] h-[76px] rounded-[20px] border-[2.6px] border-black bg-[#D9D9D9]/20 flex items-center justify-center">
                    <p className="text-[#D9D9D9]/50 text-2xl font-bold">
                      {PUBLIC_PROFILE_DATA.overallRanking.position}
                    </p>
                  </div>

                  <div className="flex-1 rounded-[20px] border-[1.5px] border-black bg-gradient-to-r from-[#4F0A0A] to-[#780000] p-4 flex items-center gap-3">
                    <img
                      src={`${PUBLIC_PROFILE_DATA.overallRanking.avatar}?width=76`}
                      alt={PUBLIC_PROFILE_DATA.overallRanking.name}
                      className="w-[38px] h-[36px] rounded-full object-cover"
                    />
                    <p
                      className="text-white text-[10px]  leading-tight flex-1"
                      style={{ WebkitTextStroke: "1px white" }}
                    >
                      {PUBLIC_PROFILE_DATA.overallRanking.name}
                    </p>
                    <img
                      src={`${PUBLIC_PROFILE_DATA.overallRanking.badge}?width=80`}
                      alt="Rank Badge"
                      className="w-[40px] h-[40px] object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
