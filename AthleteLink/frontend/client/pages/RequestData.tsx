import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getTimeGreeting } from '@/components/TimeParse';
import HeaderMenu from "@/components/HeaderMenu";
import { getCurrentDateFormatted } from "@/lib/dateFormatter";
import {
  REQUEST_DATA_MOCK,
  HEADER_DATA,
} from "@/constants/requestDataConstants";

export default function RequestData() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const requestData = REQUEST_DATA_MOCK;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="px-7 py-9">
        <HeaderMenu
          greeting={`${getTimeGreeting()}, ${user.full_name}`}
          date={getCurrentDateFormatted()}
        />

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
