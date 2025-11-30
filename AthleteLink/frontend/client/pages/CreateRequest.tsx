import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderMenu from "@/components/HeaderMenu";
import { SPORTS } from "@/constants/filterConstants";
import { Calendar } from "@/components/ui/calendar";
import { getCurrentDateFormatted } from "@/lib/dateFormatter";
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
          <HeaderMenu
            greeting="Добрый день, Захар"
            date={getCurrentDateFormatted()}
          />

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
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-4 opacity-80">
                    Введите описани�� (необязательно, не более 512 символов)
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Начинайте вводить здесь..."
                    maxLength={512}
                    className="w-full h-[337px] rounded-[40px] bg-[#F9F9F9]/50 p-6 text-[24px] text-black placeholder:text-black/40 outline-none resize-none"
                  />
                </div>

                {/* Map */}
                <YandexMap
                  onAddressSelect={(address) => setLocation(address)}
                  height="327px"
                />

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