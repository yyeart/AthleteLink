import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "@/components/HeaderMenu";
import { SPORTS, DATE_FILTERS } from "@/constants/filterConstants";
import { getCurrentDateFormatted } from "@/lib/dateFormatter";

interface RequestItem {
  id: number;
  title: string;
  sport: {id: number; name: string};
  event_date: string;
  location: string;
  players_info: string;
  status_display: string;
  avgRating?: number;
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AllRequests() {
  const navigate = useNavigate();

  const [sportFilter, setSportFilter] = useState("Все виды спорта");
  const [dateFilter, setDateFilter] = useState("По дате");

  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const sportDropdownRef = useRef<HTMLDivElement>(null);
  const dateDropdownRef = useRef<HTMLDivElement>(null);

  const availableSportOptions = useMemo(() => {
    const uniqueSports = new Set(
      requests.map(request => request.sport.name)
    );

    const options = ["Все виды спорта", ...Array.from(uniqueSports)];
    if (!options.includes(sportFilter)) {
      setSportFilter("Все виды спорта");
    }
    return options;
  }, [requests, sportFilter]);

  const fetchPlannedRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/all-requests/`);

      if(!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data: RequestItem[] = await response.json();
      setRequests(data);
    } catch (err) {
      console.error("Ошибка при загрузке заявок:", err);
      setError("Не удалось загрузить запланированные заявки. Проверьте API_URL и статус бэкенда.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlannedRequests();
  }, [fetchPlannedRequests]);

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

  const filteredRequests = useMemo(() => {
    let currentRequests = requests;
    if(sportFilter !== 'Все виды спорта') {
      currentRequests = currentRequests.filter(
        (request) => request.sport.name === sportFilter
      );
    }

    // =========================================================================
    // СОРТИРОВКА ПО ДАТЕ
    // =========================================================================


    return currentRequests;
  }, [requests, sportFilter, dateFilter]);

  const formatDateTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}.${month}.${year}, ${hours}:${minutes}`;
    } catch {
      return isoString;
    }
  };

  const formatRating = (rating?: number) => {
      // Используем toFixed(0) для целого числа рейтинга
      return rating !== undefined && rating !== null ? `Ср. рейтинг: ~${rating.toFixed(0)}` : 'Ср. рейтинг: N/A';
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex-1 p-7 overflow-y-auto">
          <HeaderMenu
            greeting="Добрый день, Захар"
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
                      {availableSportOptions.map((sport) => (
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
                  
            {isLoading && (
              <div className="text-white text-center text-3xl py-10">
                Загрузка...
              </div>
            )}
            {error && (
              <div className="text-red-400 text-center text-3xl py-10">
                Ошибка загрузки: {error}
                <div className="mt-4 text-xl text-yellow-300">
                    Сервер недоступен
                </div>
              </div>
            )}
            
            {!isLoading && filteredRequests.length === 0 && !error && (
              <div className="text-white text-center text-3xl py-10">
                Нет запланированных заявок, соответствующих текущим фильтрам.
              </div>
            )}

            {/* Requests List */}
            <div className="space-y-0 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent hover:scrollbar-thumb-white/50">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="border-[0.5px] border-white rounded-[30px] px-6 py-4 flex flex-col lg:flex-row items-start lg:items-center justify-between transition-colors hover:bg-white/10"
                >
                  {/* Left Side - Event Info */}
                  <div className="flex-1">
                    <button
                      onClick={() => navigate(`/requests/${request.id}`)}
                      className="text-left w-full"
                    >
                      <h3 className="text-white text-[20px] font-light mb-1">
                        {request.title}
                      </h3>
                    </button>
                    <p className="text-white text-[15px] font-light">
                      {request.status_display}
                    </p>
                  </div>

                  {/* Right Side - Details */}
                  <div className="flex items-center gap-3">
                    {/* Venue */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[226px] text-center">
                      <span className="text-white text-[15px] font-light text-right">
                        {request.location}
                      </span>
                    </div>

                    {/* Date/Time */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[165px] text-center">
                      <span className="text-white text-base font-light text-right">
                        {formatDateTime(request.event_date)}
                      </span>
                    </div>

                    {/* Players */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[165px] text-center">
                      <span className="text-white text-[15px] font-light text-right">
                        Игроков: {request.players_info}
                      </span>
                    </div>

                    {/* Average Rating */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[167px] text-center">
                      <span className="text-white text-[15px] font-light text-right">
                        {formatRating(request.avgRating)}
                      </span>
                    </div>

                    {/* Sport Type */}
                    <div className="border border-white rounded-[50px] px-4 py-1.5 min-w-[106px] text-center">
                      <span className="text-white text-[15px] font-light">
                        {request.sport.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Create Request Button */}
            <div className="flex justify-center mt-14">
              <button
                onClick={() => navigate("/requests/create")}
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
