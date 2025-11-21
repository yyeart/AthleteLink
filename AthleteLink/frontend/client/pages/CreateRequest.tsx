import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import YandexMap from "@/components/YandexMap";

// --- Правила для видов спорта ---
interface SportRule {
  min: number;
  max: number;
  isFixed?: boolean;
  default?: number;
  hint: string;
}

const SPORT_RULES: Record<string, SportRule> = {
  "Футбол": { min: 10, max: 22, hint: "Обычно 10-22 игрока (5x5 - 11x11)" },
  "Баскетбол": { min: 6, max: 10, hint: "6-10 игроков (3x3 - 5x5)" },
  "Волейбол": { min: 4, max: 12, hint: "4-12 игроков" },
  "Теннис": { min: 2, max: 4, isFixed: true, default: 2, hint: "Фиксировано: 2 игрока (парный вид)" },
  "Настольный теннис": { min: 2, max: 4, isFixed: true, default: 2, hint: "Фиксировано: 2 игрока" },
  "default": { min: 2, max: 100, hint: "От 2 игроков" }
};

export default function CreateRequest() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
  // --- State ---
  const [title, setTitle] = useState("");
  const [sport, setSport] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateInput, setDateInput] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Dropdowns State ---
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [showDatePopover, setShowDatePopover] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const sportDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  // --- Helpers ---
  const getSportRule = (sportName: string): SportRule => {
    return SPORT_RULES[sportName] || SPORT_RULES["default"];
  };

  const locationSuggestions = [
    "г. Москва, ул. 1-я Лагерная, д. 1",
    "г. Москва, Московский авиационный институт",
    "г. Москва, ул. Ленина, д. 10",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sportDropdownRef.current && !sportDropdownRef.current.contains(event.target as Node)) {
        setShowSportDropdown(false);
      }
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Handlers ---
  const handleSportSelect = (selectedSport: string) => {
    setSport(selectedSport);
    setShowSportDropdown(false);
    const rule = getSportRule(selectedSport);
    if (rule.isFixed && rule.default) {
      setNumberOfPlayers(rule.default.toString());
    } else {
      setNumberOfPlayers("");
    }
  };

  const handlePlayerCountChange = (val: string) => {
    if (val === "" || /^\d+$/.test(val)) {
       setNumberOfPlayers(val);
    }
  };

  const formatDateToDisplay = (date: Date | undefined): string => {
    if (!date) return "";
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}.${m}.${y}`;
  };

  const parseDateFromInput = (input: string): Date | null => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = input.match(regex);
    if (match) {
      const d = parseInt(match[1], 10);
      const m = parseInt(match[2], 10) - 1;
      const y = parseInt(match[3], 10);
      const parsedDate = new Date(y, m, d);
      if (parsedDate.getDate() === d && parsedDate.getMonth() === m && parsedDate.getFullYear() === y) {
        return parsedDate;
      }
    }
    return null;
  };

  const handleDateInputChange = (input: string) => {
    setDateInput(input);
    const parsed = parseDateFromInput(input);
    if (parsed) setDate(parsed);
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setDateInput(formatDateToDisplay(selectedDate));
      setShowDatePopover(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !sport || !numberOfPlayers || !dateInput || !time || !location) {
      alert("Пожалуйста, заполните все обязательные поля.");
      return;
    }

    const players = parseInt(numberOfPlayers, 10);
    const rule = getSportRule(sport);
    if (players < rule.min || players > rule.max) {
      alert(`Для спорта "${sport}" количество игроков должно быть от ${rule.min} до ${rule.max}.`);
      return;
    }

    setIsLoading(true);

    const payload = {
      title,
      sport,
      numberOfPlayers: players,
      date: dateInput,
      time,
      location,
      description,
    };

    try {
      const response = await fetch(`${apiUrl}/requests/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        navigate('/requests');
      } else {
        const err = await response.json();
        console.error(err);
        alert("Ошибка создания заявки. Проверьте данные.");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка сети.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentSportRule = getSportRule(sport);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="flex min-h-screen">
        {/* Main Content */}
        <div className="flex-1 p-7">
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
                <svg className="w-[22px] h-[22px]" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.4399 18.1558L15.3026 12.0068C15.9579 10.8276 16.3026 9.50113 16.3041 8.15207C16.3041 6.53974 15.826 4.96362 14.9303 3.62302C14.0345 2.28242 12.7613 1.23755 11.2717 0.620543C9.78213 0.00353215 8.14303 -0.157906 6.56168 0.156643C4.98033 0.471193 3.52777 1.2476 2.38769 2.38769C1.2476 3.52777 0.471193 4.98033 0.156643 6.56168C-0.157906 8.14303 0.00353215 9.78213 0.620543 11.2717C1.23755 12.7613 2.28242 14.0345 3.62302 14.9303C4.96362 15.826 6.53974 16.3041 8.15207 16.3041C9.50113 16.3026 10.8276 15.9579 12.0068 15.3026L18.1558 21.4399C18.6014 21.8215 19.1745 22.0209 19.7607 21.9983C20.3469 21.9756 20.903 21.7326 21.3178 21.3178C21.7326 20.903 21.9756 20.3469 21.9983 19.7607C22.0209 19.1745 21.8215 18.6014 21.4399 18.1558ZM2.32916 8.15207C2.32916 7.00041 2.67067 5.87461 3.3105 4.91704C3.95033 3.95946 4.85974 3.21313 5.92374 2.77241C6.98774 2.33169 8.15853 2.21637 9.28806 2.44105C10.4176 2.66573 11.4551 3.22031 12.2695 4.03465C13.0838 4.849 13.6384 5.88654 13.8631 7.01608C14.0878 8.14561 13.9725 9.3164 13.5317 10.3804C13.091 11.4444 12.3447 12.3538 11.3871 12.9936C10.4295 13.6335 9.30373 13.975 8.15207 13.975C6.60774 13.975 5.12666 13.3615 4.03465 12.2695C2.94265 11.1775 2.32916 9.6964 2.32916 8.15207Z" fill="black" fillOpacity="0.6"/>
                </svg>
              </button>

              {/* Stats */}
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

              {/* Notifications */}
              <div className="w-[46px] h-[45px] rounded-[10px] bg-white/50 flex items-center justify-center">
                <svg className="w-[21px] h-[21px]" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6279 5.62871V8.53921" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                  <path d="M10.6457 1.74805C7.38654 1.74805 4.74729 4.35264 4.74729 7.56904V9.40449C4.74729 9.99883 4.4993 10.8903 4.18932 11.3973L3.06454 13.2502C2.37373 14.3952 2.85199 15.6712 4.12733 16.0908C8.36076 17.4805 12.9396 17.4805 17.173 16.0908C18.3687 15.6975 18.8823 14.3165 18.2358 13.2502L17.111 11.3973C16.801 10.8903 16.5531 9.99009 16.5531 9.40449V7.56904C16.5442 4.37012 13.8872 1.74805 10.6457 1.74805Z" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                  <path d="M13.5772 16.4491C13.5772 18.0486 12.2487 19.3596 10.6279 19.3596C9.822 19.3596 9.07805 19.0275 8.54665 18.5031C8.01526 17.9787 7.67871 17.2445 7.67871 16.4491" stroke="black" strokeWidth="1.5" strokeMiterlimit="10" />
                </svg>
              </div>

              {/* Profile Picture */}
              <button onClick={() => navigate("/profile")}>
                <img
                  src="/placeholder_avatar.jpg"
                  alt="Profile"
                  className="w-[47px] h-[44px] rounded-[10px]"
                />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="rounded-[10px] bg-[#797777]/50 p-8 min-h-[918px]">
            <div
              className="absolute inset-0 -z-10 rounded-[50px]"
              style={{
                backgroundImage: "url('/silver.png')",
                backgroundSize: "250px 250px",
                backgroundPosition: "0 0",
                backgroundRepeat: "repeat",
                opacity: 0.05,
              }}
            ></div>
            
            <h1 className="text-white text-[64px] font-light text-center mb-8 stroke-black">
              Создание новой заявки
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                
                {/* --- 1. TITLE (Название игры) --- */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-2 opacity-80">
                    Название игры
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Например: Дворовой матч 5x5"
                    maxLength={100}
                    className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 text-[28px] text-black placeholder:text-black/40 outline-none"
                  />
                  <p className="text-white/60 text-sm mt-1 ml-2">
                    Придумайте короткое и емкое название (до 100 символов).
                  </p>
                </div>

                {/* --- 2. SPORT (Вид спорта) --- */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-2 opacity-80">
                    Выберите вид спорта
                  </label>
                  <div className="relative" ref={sportDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowSportDropdown(!showSportDropdown)}
                      className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 flex items-center justify-between"
                    >
                      <span className={`text-[26px] ${sport ? "text-black" : "text-black/40"}`}>
                        {sport || "Выберите из списка"}
                      </span>
                      <span className="text-black/50 text-xl">▼</span>
                    </button>
                    {showSportDropdown && (
                      <div className="absolute top-[76px] left-0 w-full bg-[#2a2a2a] border-2 border-black rounded-[15px] shadow-lg z-50 max-h-[300px] overflow-y-auto">
                        {Object.keys(SPORT_RULES).filter(k => k !== 'default').map((sportOption) => (
                          <button
                            key={sportOption}
                            type="button"
                            onClick={() => handleSportSelect(sportOption)}
                            className="w-full px-5 py-3 text-left text-white text-[20px] font-light hover:bg-[#3a3a3a] border-b border-white/20"
                          >
                            {sportOption}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* --- 3. NUMBER OF PLAYERS (Кол-во игроков) --- */}
                <div>
                  <label className={`block text-white text-[32px] font-normal mb-2 transition-opacity ${!sport ? 'opacity-40' : 'opacity-80'}`}>
                    Количество игроков
                  </label>
                  <input
                    type="text"
                    value={numberOfPlayers}
                    onChange={(e) => handlePlayerCountChange(e.target.value)}
                    placeholder={!sport ? "Сначала выберите спорт" : "Число"}
                    disabled={!sport || !!currentSportRule.isFixed}
                    className={`w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 text-[28px] text-black placeholder:text-black/40 outline-none transition-all 
                        ${(!sport || currentSportRule.isFixed) ? 'cursor-not-allowed opacity-70' : ''}`}
                  />
                  <p className="text-white/60 text-sm mt-1 ml-2 min-h-[20px]">
                    {sport 
                      ? currentSportRule.hint 
                      : "Поле станет доступно после выбора вида спорта"}
                  </p>
                </div>

                {/* --- 4. DATE --- */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-2 opacity-80">
                    Выберите дату
                  </label>
                  <Popover open={showDatePopover} onOpenChange={setShowDatePopover}>
                    <PopoverTrigger asChild>
                      <button type="button" className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 flex items-center justify-between">
                        <span className={`text-[24px] ${dateInput ? "text-black" : "text-black/40"}`}>
                          {dateInput || "ДД.ММ.ГГГГ"}
                        </span>
                        <span className="text-black/50 text-xl">📅</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                       <div className="p-4">
                          <input 
                            type="text" 
                            value={dateInput} 
                            onChange={e => handleDateInputChange(e.target.value)} 
                            placeholder="ДД.ММ.ГГГГ"
                            className="w-full h-[40px] border border-black rounded mb-2 px-2 text-black"
                          />
                          {/* @ts-ignore */}
                          <Calendar selected={date} onSelect={handleCalendarSelect} mode="single" />
                       </div>
                    </PopoverContent>
                  </Popover>
                </div>

                 {/* --- 5. TIME --- */}
                 <div>
                  <label className="block text-white text-[32px] font-normal mb-2 opacity-80">
                    Время
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="ЧЧ:ММ"
                    className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 text-[28px] text-black placeholder:text-black/40 outline-none"
                  />
                </div>

              </div>

              {/* Right Column */}
              <div className="space-y-8">
                
                 {/* --- 6. DESCRIPTION (Описание) --- */}
                 <div>
                  <label className="block text-white text-[32px] font-normal mb-2 opacity-80">
                    Описание (опционально)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Правила, требования к экипировке и т.д."
                    maxLength={512}
                    className="w-full h-[260px] rounded-[40px] bg-[#F9F9F9]/50 p-6 text-[24px] text-black placeholder:text-black/40 outline-none resize-none"
                  />
                  <p className="text-white/60 text-sm mt-1 ml-2 text-right">
                    {description.length} / 512 символов
                  </p>
                </div>

                {/* --- 7. LOCATION (Место) --- */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-2 opacity-80">
                    Место проведения
                  </label>
                  <div className="relative" ref={locationDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                      className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 flex items-center justify-between mb-4"
                    >
                      <span className={`text-[22px] truncate ${location ? "text-black" : "text-black/40"}`}>
                        {location || "Адрес или точка на карте"}
                      </span>
                      <span className="text-black/50 text-xl">📍</span>
                    </button>
                    {showLocationDropdown && (
                      <div className="absolute top-[76px] left-0 w-full bg-[#2a2a2a] border-2 border-black rounded-[15px] shadow-lg z-50">
                        {locationSuggestions.map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => { setLocation(loc); setShowLocationDropdown(false); }}
                            className="w-full px-5 py-3 text-left text-white text-[18px] hover:bg-[#3a3a3a] border-b border-white/20"
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <YandexMap onAddressSelect={(addr) => setLocation(addr)} height="250px" />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-[68px] bg-[#4182F9] rounded-[25px] text-white text-[24px] font-normal shadow-lg hover:bg-[#3571e8] transition-all active:scale-95 disabled:opacity-70"
                    >
                    {isLoading ? "Создание..." : "Создать игру"}
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}