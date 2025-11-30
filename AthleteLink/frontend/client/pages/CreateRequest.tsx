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

export default function CreateRequest() {
  const navigate = useNavigate();
  const [sport, setSport] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateInput, setDateInput] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [showDatePopover, setShowDatePopover] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const sportDropdownRef = useRef<HTMLDivElement>(null);
  const locationDropdownRef = useRef<HTMLDivElement>(null);

  const locationSuggestions = [
    "г. Москва, ул. 1-я Лагерная, д. 1",
    "г. Москва, Московский авиационный институт",
    "г. Москва, ул. Ленина, д. 10",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sportDropdownRef.current &&
        !sportDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSportDropdown(false);
      }
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDateToDisplay = (date: Date | undefined): string => {
    if (!date) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const parseDateFromInput = (input: string): Date | null => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = input.match(regex);
    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const year = parseInt(match[3], 10);
      const parsedDate = new Date(year, month, day);
      if (
        parsedDate.getDate() === day &&
        parsedDate.getMonth() === month &&
        parsedDate.getFullYear() === year
      ) {
        return parsedDate;
      }
    }
    return null;
  };

  const handleDateInputChange = (input: string) => {
    setDateInput(input);
    const parsed = parseDateFromInput(input);
    if (parsed) {
      setDate(parsed);
    }
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setDateInput(formatDateToDisplay(selectedDate));
      setShowDatePopover(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting request:", {
      sport,
      numberOfPlayers,
      date: dateInput,
      time,
      location,
      description,
    });
  };

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
            {/* Title */}
            <h1 className="text-white text-[64px] font-light text-center mb-8 stroke-black">
              Создание новой заявки
            </h1>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Left Column */}
              <div className="space-y-6">
                {/* Sport Selection */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-4 opacity-80">
                    Выберите вид спорта
                  </label>
                  <div className="relative" ref={sportDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowSportDropdown(!showSportDropdown)}
                      className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 flex items-center justify-between"
                    >
                      <span
                        className={`text-[26px] ${sport ? "text-black" : "text-black/40"}`}
                      >
                        {sport || "Баскетбол"}
                      </span>
                      <svg
                        className="w-[35px] h-[35px] opacity-50"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29.0502 13.0518L19.5419 22.5601C18.4189 23.683 16.5814 23.683 15.4585 22.5601L5.9502 13.0518"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {showSportDropdown && (
                      <div className="absolute top-[76px] left-0 w-full bg-[#2a2a2a] border-2 border-black rounded-[15px] shadow-lg z-50 max-h-[300px] overflow-y-auto">
                        {SPORTS.map((sportOption) => (
                          <button
                            key={sportOption}
                            type="button"
                            onClick={() => {
                              setSport(sportOption);
                              setShowSportDropdown(false);
                            }}
                            className="w-full px-5 py-3 text-left text-white text-[20px] font-light hover:bg-[#3a3a3a] transition-colors border-b border-white/20 last:border-b-0"
                          >
                            {sportOption}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Number of Players */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-4 opacity-80">
                    Введите кол-во игроков
                  </label>
                  <input
                    type="text"
                    value={numberOfPlayers}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (input === "") {
                        setNumberOfPlayers("");
                      } else if (/^\d+$/.test(input)) {
                        const num = parseInt(input, 10);
                        if (num > 256) {
                          setNumberOfPlayers("256");
                        } else {
                          setNumberOfPlayers(input);
                        }
                      }
                    }}
                    placeholder="Число от 2 до 256"
                    className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 text-[28px] text-black placeholder:text-black/40 outline-none"
                  />
                </div>

                {/* Date Selection */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-4 opacity-80">
                    Выберите дату проведения
                  </label>
                  <Popover
                    open={showDatePopover}
                    onOpenChange={setShowDatePopover}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 flex items-center justify-between"
                      >
                        <span
                          className={`text-[24px] ${dateInput ? "text-black" : "text-black/40"}`}
                        >
                          {dateInput ||
                            "Выберите из календаря или введите в формате ДД.ММ.ГГГГ"}
                        </span>
                        <svg
                          className="w-[35px] h-[35px] opacity-50"
                          viewBox="0 0 35 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M29.0502 13.0518L19.5419 22.5601C18.4189 23.683 16.5814 23.683 15.4585 22.5601L5.9502 13.0518"
                            stroke="#292D32"
                            strokeWidth="1.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white">
                      <div className="flex flex-col gap-4 p-4">
                        <input
                          type="text"
                          value={dateInput}
                          onChange={(e) =>
                            handleDateInputChange(e.target.value)
                          }
                          placeholder="ДД.ММ.ГГГГ"
                          className="w-full h-[44px] rounded-[10px] border border-black px-3 text-[16px] text-black placeholder:text-black/40 outline-none focus:border-blue-500"
                        />
                        <Calendar
                          selected={date}
                          onSelect={handleCalendarSelect}
                          mode="single"
                          defaultMonth={date}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Input */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-4 opacity-80">
                    Введите время проведения
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="В формате ЧЧ:ММ"
                    className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 text-[28px] text-black placeholder:text-black/40 outline-none"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-white text-[32px] font-normal mb-4 opacity-80">
                    Место проведения (начинайте вводить или выберите точку на
                    карте)
                  </label>
                  <div className="relative" ref={locationDropdownRef}>
                    <button
                      type="button"
                      onClick={() =>
                        setShowLocationDropdown(!showLocationDropdown)
                      }
                      className="w-full h-[68px] rounded-[15px] bg-[#F9F9F9]/50 px-5 flex items-center justify-between"
                    >
                      <span
                        className={`text-[26px] ${location ? "text-black" : "text-black/40"}`}
                      >
                        {location || "г. Москва, ул. 1-я Лагерная..."}
                      </span>
                      <svg
                        className="w-[35px] h-[35px] opacity-50"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29.0502 13.0518L19.5419 22.5601C18.4189 23.683 16.5814 23.683 15.4585 22.5601L5.9502 13.0518"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {showLocationDropdown && (
                      <div className="absolute top-[76px] left-0 w-full bg-[#2a2a2a] border-2 border-black rounded-[15px] shadow-lg z-50">
                        {locationSuggestions.map((loc) => (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => {
                              setLocation(loc);
                              setShowLocationDropdown(false);
                            }}
                            className="w-full px-5 py-3 text-left text-white text-[20px] font-light hover:bg-[#3a3a3a] transition-colors border-b border-white/20 last:border-b-0"
                          >
                            {loc}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
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
                <button
                  type="submit"
                  className="w-full max-w-[404px] h-[52px] bg-[#4182F9] rounded-[25px] text-white text-[22px] font-normal shadow-[0_8px_4px_rgba(0,0,0,0.5)] hover:bg-[#3571e8] transition-colors ml-auto block"
                >
                  Сохранить и опубликовать заявку
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
