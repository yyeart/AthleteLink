import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SPORTS } from "@/constants/filterConstants";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

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
                backgroundImage:
                  "url('https://cdn.builder.io/api/v1/image/assets%2F9b4b6868ed8d4ab0841339e996a44e0f%2F29814a62ea5a4dbaab3e007976816fb6?format=webp&width=800')",
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
                    Введите описание (необязательно, не более 512 символов)
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
                <div className="w-full h-[327px] rounded-[40px] overflow-hidden">
                  <img
                    src="https://api.builder.io/api/v1/image/assets/TEMP/dc4c9bfcde261847aacd27512fcbd319bc6457ec?width=1134"
                    alt="Map"
                    className="w-full h-full object-cover"
                  />
                </div>

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
