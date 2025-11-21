import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LEADERBOARD_DATA, HEADER_DATA } from "@/constants/leaderboardConstants";
import { RATING_SPORTS } from "@/constants/filterConstants";

export default function Leaderboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overall");
  const [sportFilter, setSportFilter] = useState("Литрбол");
  const [showSportDropdown, setShowSportDropdown] = useState(false);


  const sportDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sportDropdownRef.current && !sportDropdownRef.current.contains(event.target)) {
        setShowSportDropdown(false);
      }
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target)) {
        setShowDateDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="flex min-h-screen">
        <div className="flex-1 p-7">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-[#D3D4A9] text-2xl font-medium mb-1 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {HEADER_DATA.welcomeMessage}
              </h1>
              <p className="text-white text-base font-light">{HEADER_DATA.currentDate}</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/find-requests")}
                className="w-[46px] h-[47px] rounded-[10px] bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors"
              >
                <svg className="w-[22px] h-[22px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.4399 18.1558L15.3026 12.0068C15.9579 10.8276 16.3026 9.50113 16.3041 8.15207..." fill="black" fillOpacity="0.6" />
                </svg>
              </button>

              <button
                onClick={() => navigate("/leaderboard")}
                className="w-[46px] h-[47px] rounded-[10px] bg-white/50 flex items-center justify-center hover:bg-white/70 transition-colors"
              >
                <div className="w-[46px] h-[47px] rounded-[10px] bg-white/50 flex items-center justify-center relative">
                  <div className="w-[7px] h-[20px] border-[0.3px] border-black bg-[#D9D9D9] absolute left-3 top-[13px]"></div>
                  <div className="w-[7px] h-[11px] border-[0.3px] border-black bg-[#D9D9D9] absolute left-[19px] top-[22px]"></div>
                  <div className="w-[7px] h-[16px] border-[0.3px] border-black bg-[#D9D9D9] absolute left-[26px] top-[17px]"></div>
                </div>
              </button>

              <div className="w-[46px] h-[45px] rounded-[10px] bg-white/50 flex items-center justify-center">
                <svg className="w-[21px] h-[21px]" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6279 5.62871V8.53921" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M10.6457 1.74805C7.38654 1.74805 4.74729 4.35264 4.74729 7.56904V9.40449C4.74729 9.99883 4.4993 10.8903..." stroke="black" strokeWidth="1.5" />
                </svg>
              </div>

              <button onClick={() => navigate("/profile")}>
                <img src="/placeholder_avatar.jpg" alt="Profile" className="w-[47px] h-[44px] rounded-[10px]" />
              </button>
            </div>
          </div>

          <div className="rounded-[10px] bg-[#797777]/50 p-8 min-h-[918px] relative">
            <div className="flex gap-4 mb-12">
              

              <button
                onClick={() => setActiveTab("me")}
                className={`h-[76px] px-8 rounded-[20px] border-[2.6px] border-black transition-all ${activeTab === "me" ? "bg-[#D9D9D9]/40" : "bg-[#D9D9D9]/20"}`}
              >
                <span className="text-white text-[24px] font-light">Показать меня</span>
              </button>
              <div className="flex gap-4">
                <div className="relative" ref={sportDropdownRef}>
                  <button
                    onClick={() => setShowSportDropdown(!showSportDropdown)}
                    className="w-[380px] h-[76px] rounded-[20px] border-[2.6px] border-black bg-[#D9D9D9]/40 flex items-center justify-center px-6 relative"
                  >
                    <span className="text-white text-[32px] font-light">{sportFilter}</span>
                  </button>

                  {showSportDropdown && (
                    <div className="absolute top-[88px] left-0 w-[380px] bg-[#2a2a2a] border-[2.6px] border-black rounded-[20px] shadow-lg z-50">
                      {RATING_SPORTS.map((sport) => (
                        <button
                          key={sport}
                          onClick={() => {
                            setSportFilter(sport);
                            setShowSportDropdown(false);
                          }}
                          className="w-full px-6 py-4 text-left text-white text-[20px] font-light hover:bg-[#3a3a3a] transition-colors border-b border-white/20 last:border-b-0"
                        >
                          {sport}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            

            <div className="space-y-3 pr-2 max-h-[700px] overflow-y-auto custom-scrollbar">
              {LEADERBOARD_DATA.map((player) => (
                <div key={player.id} className="flex items-center gap-3 h-[78px]">
                  <div className="w-[81px] h-[76px] flex items-center justify-center rounded-[20px] border-[2.6px] border-black bg-[#D9D9D9]/20 flex-shrink-0">
                    <span className="text-[#D9D9D9]/50 text-2xl font-bold">{player.rank}</span>
                  </div>

                  <div className="flex-1 flex items-center gap-4 h-[78px] rounded-[20px] border-[1.5px] border-black bg-gradient-to-r from-[#4F0A0A] to-[#780000] px-4">
                    <div className="w-[40px] h-[36px] rounded-full flex-shrink-0 bg-cover bg-center" style={{ backgroundImage: `url(${player.avatar})` }} />

                    <div className="min-w-[141px]">
                      <p className="text-white text-[10px] font-bold leading-tight [text-shadow:_1px_1px_0_rgb(0_0_0)]">{player.name}</p>
                    </div>

                    <div className="flex-1 min-w-[229px]">
                      <p
                        className="text-[12px] font-bold leading-tight [text-shadow:_1px_1px_0_rgb(0_0_0)]"
                        style={{
                          background: `linear-gradient(180deg, ${player.badgeGradientFrom} 10.58%, ${player.badgeGradientTo} 50%, #FFF 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {player.badge}
                      </p>
                      <p className="text-white text-[12px] font-bold leading-tight [text-shadow:_1px_1px_0_rgb(0_0_0)]">
                        Уровень опыта: {player.level} ({player.currentXP}/{player.maxXP})
                      </p>
                    </div>

                    <img src={player.medalImage} alt="Medal" className="w-[66px] h-[66px] flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #5D5D5D; border-radius: 40px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #7D7D7D; }
      `}</style>
    </div>
  );
}
