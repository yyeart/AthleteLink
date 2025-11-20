import { useNavigate } from "react-router-dom";
import {
  PUBLIC_PROFILE_DATA,
  CAT_PLACEHOLDER,
} from "@/constants/publicProfileConstants";

export default function PublicProfile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between p-7 pb-0">
        <div>
          <h1 className="text-[#C9D2FF] text-xl font-medium">
            {PUBLIC_PROFILE_DATA.welcomeMessage}
          </h1>
          <p className="text-white text-sm font-light">
            {PUBLIC_PROFILE_DATA.currentDate}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <button onClick={() => navigate("/profile")} className="w-[46px] h-[47px] rounded-[10px] bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors">
            <svg
              className="w-[22px] h-[22px]"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.4399 18.1558L15.3026 12.0068C15.9579 10.8276 16.3026 9.50113 16.3041 8.15207C16.3041 6.53974 15.826 4.96362 14.9303 3.62302C14.0345 2.28242 12.7613 1.23755 11.2717 0.620543C9.78213 0.00353215 8.14303 -0.157906 6.56168 0.156643C4.98033 0.471193 3.52777 1.2476 2.38769 2.38769C1.2476 3.52777 0.471193 4.98033 0.156643 6.56168C-0.157906 8.14303 0.00353215 9.78213 0.620543 11.2717C1.23755 12.7613 2.28242 14.0345 3.62302 14.9303C4.96362 15.826 6.53974 16.3041 8.15207 16.3041C9.50113 16.3026 10.8276 15.9579 12.0068 15.3026L18.1558 21.4399C18.6014 21.8215 19.1745 22.0209 19.7607 21.9983C20.3469 21.9756 20.903 21.7326 21.3178 21.3178C21.7326 20.903 21.9756 20.3469 21.9983 19.7607C22.0209 19.1745 21.8215 18.6014 21.4399 18.1558ZM2.32916 8.15207C2.32916 7.00041 2.67067 5.87461 3.3105 4.91704C3.95033 3.95946 4.85974 3.21313 5.92374 2.77241C6.98774 2.33169 8.15853 2.21637 9.28806 2.44105C10.4176 2.66573 11.4551 3.22031 12.2695 4.03465C13.0838 4.849 13.6384 5.88654 13.8631 7.01608C14.0878 8.14561 13.9725 9.3164 13.5317 10.3804C13.091 11.4444 12.3447 12.3538 11.3871 12.9936C10.4295 13.6335 9.30373 13.975 8.15207 13.975C6.60774 13.975 5.12666 13.3615 4.03465 12.2695C2.94265 11.1775 2.32916 9.6964 2.32916 8.15207Z"
                fill="black"
                fillOpacity="0.6"
              />
            </svg>
          </button>

          {/* Stats */}
          <div className="w-[46px] h-[47px] rounded-[10px] bg-white/50 flex items-center justify-center relative">
            <div className="w-[7px] h-[20px] border-[0.3px] border-black bg-[#D9D9D9] absolute left-3 top-[13px]"></div>
            <div className="w-[7px] h-[11px] border-[0.3px] border-black bg-[#D9D9D9] absolute left-[19px] top-[22px]"></div>
            <div className="w-[7px] h-[16px] border-[0.3px] border-black bg-[#D9D9D9] absolute left-[26px] top-[17px]"></div>
          </div>

          {/* Notifications */}
          <div className="w-[46px] h-[45px] rounded-[10px] bg-white/50 flex items-center justify-center">
            <svg
              className="w-[21px] h-[21px]"
              viewBox="0 0 22 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6279 5.62871V8.53921"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M10.6457 1.74805C7.38654 1.74805 4.74729 4.35264 4.74729 7.56904V9.40449C4.74729 9.99883 4.4993 10.8903 4.18932 11.3973L3.06454 13.2502C2.37373 14.3952 2.85199 15.6712 4.12733 16.0908C8.36076 17.4805 12.9396 17.4805 17.173 16.0908C18.3687 15.6975 18.8823 14.3165 18.2358 13.2502L17.111 11.3973C16.801 10.8903 16.5531 9.99009 16.5531 9.40449V7.56904C16.5442 4.37012 13.8872 1.74805 10.6457 1.74805Z"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
              />
              <path
                d="M13.5772 16.4491C13.5772 18.0486 12.2487 19.3596 10.6279 19.3596C9.822 19.3596 9.07805 19.0275 8.54665 18.5031C8.01526 17.9787 7.67871 17.2445 7.67871 16.4491"
                stroke="black"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
            </svg>
          </div>

          {/* Profile Picture */}
          <button
            onClick={() => navigate("/profile")}
          >
            <img
              src="/placeholder_avatar.jpg"
              alt="Profile"
              className="w-[47px] h-[44px] rounded-[10px]"
            />
          </button>
        </div>
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
