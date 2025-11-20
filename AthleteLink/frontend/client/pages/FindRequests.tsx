import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SPORTS, DATE_FILTERS } from "@/constants/filterConstants";

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
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-[#C9D2FF] text-2xl font-medium mb-1">
                Добрый день, Захар
              </h1>
              <p className="text-white text-base font-light">
                Сб, 11 октября 2025
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
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
                  src="/placeholder_avatar.jpd"
                  alt="Profile"
                  className="w-[47px] h-[44px] rounded-[10px]"
                />
              </button>
            </div>
          </div>

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
