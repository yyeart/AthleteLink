import { useNavigate } from "react-router-dom";
import {
  REQUEST_DATA_MOCK,
  HEADER_DATA,
} from "@/constants/requestDataConstants";

export default function RequestData() {
  const navigate = useNavigate();
  const requestData = REQUEST_DATA_MOCK;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="px-7 py-9">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-[#C9D2FF] text-xl font-medium mb-1">
              Добрый день, {HEADER_DATA.userName}
            </h1>
            <p className="text-white text-sm font-light">
              {HEADER_DATA.currentDate}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/find-requests")}
              className="w-[46px] h-[47px] rounded-[10px] bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors"
            >
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

            <div className="w-[46px] h-[47px] rounded-[10px] bg-white/50 flex items-center justify-center relative">
              <div className="w-[7px] h-[20px] border-[0.3px] border-black bg-[#D9D9D9] absolute left-3 top-[13px]"></div>
              <div className="w-[7px] h-[11px] border-[0.3px] border-black bg-[#D9D9D9] absolute left-[19px] top-[22px]"></div>
              <div className="w-[7px] h-[16px] border-[0.3px] border-black bg-[#D9D9D9] absolute left-[26px] top-[17px]"></div>
            </div>

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

        <div className="relative">
          <div className="rounded-[10px] bg-[#797777]/50 px-9 py-12 min-h-[1064px]">
            <div className="flex gap-8">
              <div className="flex-1">
                <div className="border-[0.5px] border-white rounded-[50px] p-8 mb-8 relative">
                  <h1 className="text-white text-[50px] font-light text-center mb-8">
                    Заявка №{requestData.requestNumber}
                  </h1>

                  <div className="mb-6">
                    <h2 className="text-white text-[30px] font-light mb-2">
                      {requestData.title}
                    </h2>
                    <p className="text-white text-[25px] font-light">
                      {requestData.subtitle}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-white text-[17px] font-light leading-relaxed">
                      Описание игры:
                      <br />
                      {requestData.gameDescription}
                    </p>
                  </div>

                  <div className="flex gap-3 justify-end mb-6">
                    <div className="border border-white rounded-[50px] px-5 py-2">
                      <span className="text-white text-[17px] font-light">
                        Ср. рейтинг: {requestData.avgRating}
                      </span>
                    </div>
                    <div className="border border-white rounded-[50px] px-4 py-2">
                      <span className="text-white text-base font-light">
                        {requestData.dateTime}
                      </span>
                    </div>
                    <div className="border border-white rounded-[50px] px-4 py-2">
                      <span className="text-white text-[15px] font-light">
                        Игроков: {requestData.playerCount}/
                        {requestData.maxPlayers}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-[10px] h-[71px] rounded-[40px] bg-[#5D5D5D] absolute right-2 top-[255px]"></div>

                    <div className="grid grid-cols-4 gap-x-[18px] gap-y-3 mb-8 max-h-[217px] overflow-y-auto pr-4">
                      {requestData.players.map((player) => (
                        <div
                          key={player.id}
                          className="rounded-[25px] border-[1.5px] border-black p-3 flex items-center gap-3"
                          style={{
                            background: `linear-gradient(90deg, ${player.gradientFrom} 0%, ${player.gradientTo} 100%)`,
                          }}
                        >
                          <img
                            src={player.avatar}
                            alt={player.name}
                            className="w-[38px] h-[36px] rounded-full flex-shrink-0"
                          />
                          <div className="flex items-center justify-center flex-1 min-w-0">
                            <p
                              className="text-white text-[10px] font-bold text-center leading-tight"
                              style={{
                                WebkitTextStroke: "0px black",
                              }}
                            >
                              {player.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative border-[3px] border-black rounded-[50px] overflow-hidden h-[491px]">
                  <div className="absolute inset-0 rounded-[50px] bg-[#D9D9D9]">
                    <img
                      src={requestData.venueMapImage}
                      alt="Map"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-5 left-6">
                    <div className="rounded-[30px] bg-[#1D2C4D] border-[3px] border-black px-8 py-5">
                      <p className="text-white text-center text-[22px] font-light">
                        {requestData.venueLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-[412px] flex flex-col">
                <div className="rounded-[25px] shadow-[0_8px_4px_0_rgba(0,0,0,0.50)] overflow-hidden mb-6 aspect-[289/414]">
                  <video
                    src={requestData.stickerImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mb-6">
                  <p className="text-white text-[34px] font-light leading-tight">
                    {requestData.notAppliedMessage}
                  </p>
                </div>

                <button className="rounded-[25px] bg-[#304A7D] shadow-[0_8px_4px_0_rgba(0,0,0,0.50)] px-4 py-6 mb-6 hover:bg-[#3d5a94] transition-colors">
                  <span className="text-white text-[25px] font-normal">
                    Подать запрос на вступление
                  </span>
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="rounded-[25px] bg-[#1D2C4D] shadow-[0_8px_4px_0_rgba(0,0,0,0.50)] px-4 py-7 hover:bg-[#2a3d5e] transition-colors"
                >
                  <span className="text-white text-[25px] font-normal">
                    Вернуться в профиль
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
