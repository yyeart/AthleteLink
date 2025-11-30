import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "@/components/HeaderMenu";
import SidebarNav from "@/components/SidebarMenu";
import { getCurrentDateFormatted } from "@/lib/dateFormatter";

export default function Profile() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("Захар Смирнов");
  const [username, setUsername] = useState("pauchuck");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [telegram, setTelegram] = useState("@Lovely_Specty");
  const [email] = useState("alexarawles@gmail.com");

  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showBirthdateDropdown, setShowBirthdateDropdown] = useState(false);
  const [showTelegramDropdown, setShowTelegramDropdown] = useState(false);

  const handleSaveSettings = () => {
    console.log("Saving settings:", {
      fullName,
      username,
      gender,
      city,
      birthdate,
      telegram,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="flex min-h-screen">
        <SidebarNav activePage="profile" />

        {/* Main Content */}
        <div className="flex-1 p-7 overflow-y-auto">
          <HeaderMenu
            greeting={`Добрый день, Захар`}
            date={getCurrentDateFormatted()}
          />

          {/* Profile Card */}
          <div className="rounded-[10px] overflow-hidden ">
            {/* Header Section */}
            <div className="h-[88px] bg-gradient-to-r from-[#878DB3] to-[#001AFF]/30 relative ">
              <div className="flex items-center px-7 py-8 gap-6">
                <img
                  src="/placeholder_avatar.jpg"
                  alt={fullName}
                  className="w-[89px] h-[86px] rounded-full absolute left-7 top-[100px] mt-6"
                />
                <div className="ml-[120px] mt-28">
                  <h2 className="text-black text-xl font-medium">{fullName}</h2>
                  <p className="text-black/50 text-base">{email}</p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="ml-auto bg-[#4182F9] text-white px-5 py-2 rounded-lg text-base mt-32"
                >
                  Сохранить настройки
                </button>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white/50 p-8 min-h-[600px]">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-black/80 text-base mb-2 mt-40 ml-2">
                    Фамилия и имя
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Захар Смирнов"
                    className="w-full bg-[#F9F9F9]/50 rounded-lg px-4 py-3 text-black/40 text-base outline-none"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-black/80 text-base mb-2 mt-40 ml-2">
                    Имя пользователя
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="pauchuck"
                    className="w-full bg-[#F9F9F9]/50 rounded-lg px-4 py-3 text-black/40 text-base outline-none"
                  />
                </div>

                {/* Gender */}
                <div className="relative">
                  <label className="block text-black/80 text-base mb-2">
                    Пол
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      placeholder="Выберите пол"
                      className="w-full bg-[#F9F9F9]/50 rounded-lg px-4 py-3 text-black/40 text-base outline-none pr-10"
                    />
                    <button
                      onClick={() => setShowGenderDropdown(!showGenderDropdown)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <svg
                        className="w-[22px] h-[21px] opacity-50"
                        viewBox="0 0 22 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.2602 7.83124L12.2836 13.5362C11.5777 14.21 10.4227 14.21 9.7169 13.5362L3.74023 7.83124"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* City */}
                <div className="relative">
                  <label className="block text-black/80 text-base mb-2">
                    Город
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Введите или начните поиск через выпадающее меню"
                      className="w-full bg-[#F9F9F9]/50 rounded-lg px-4 py-3 text-black/40 text-base outline-none pr-10"
                    />
                    <button
                      onClick={() => setShowCityDropdown(!showCityDropdown)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <svg
                        className="w-[20px] h-[21px] opacity-50"
                        viewBox="0 0 20 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5999 7.83124L11.1666 13.5362C10.5249 14.21 9.4749 14.21 8.83324 13.5362L3.3999 7.83124"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Birthdate */}
                <div className="relative">
                  <label className="block text-black/80 text-base mb-2">
                    Дата рождения
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      placeholder="Введите в формате ДД.ММ.ГГГГ"
                      className="w-full bg-[#F9F9F9]/50 rounded-lg px-4 py-3 text-black/40 text-base outline-none pr-10"
                    />
                    <button
                      onClick={() =>
                        setShowBirthdateDropdown(!showBirthdateDropdown)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <svg
                        className="w-[22px] h-[20px] opacity-50"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.2602 7.45831L12.2836 12.8916C11.5777 13.5333 10.4227 13.5333 9.7169 12.8916L3.74023 7.45831"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Telegram */}
                <div className="relative">
                  <label className="block text-black/80 text-base mb-2">
                    Идентификатор пользователя в Telegram
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="@Lovely_Specty"
                      className="w-full bg-[#F9F9F9]/50 rounded-lg px-4 py-3 text-black/40 text-base outline-none pr-10"
                    />
                    <button
                      onClick={() =>
                        setShowTelegramDropdown(!showTelegramDropdown)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      <svg
                        className="w-[20px] h-[20px] opacity-50"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.5999 7.45831L11.1666 12.8916C10.5249 13.5333 9.4749 13.5333 8.83324 12.8916L3.3999 7.45831"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div className="mt-12">
                <h3 className="text-black text-lg font-medium mb-4">
                  Адрес электронной почты
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#4182F9]/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-[23px] h-[20px]"
                      viewBox="0 0 23 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.2915 2.91669H6.70817C3.83317 2.91669 1.9165 4.16669 1.9165 7.08335V12.9167C1.9165 15.8334 3.83317 17.0834 6.70817 17.0834H16.2915C19.1665 17.0834 21.0832 15.8334 21.0832 12.9167V7.08335C21.0832 4.16669 19.1665 2.91669 16.2915 2.91669ZM16.7419 7.99169L13.7423 10.075C13.1098 10.5167 12.3048 10.7334 11.4998 10.7334C10.6948 10.7334 9.88025 10.5167 9.25734 10.075L6.25775 7.99169C5.95109 7.77502 5.90317 7.37502 6.14275 7.10835C6.39192 6.84169 6.84234 6.79169 7.149 7.00835L10.1486 9.09169C10.8769 9.60002 12.1132 9.60002 12.8415 9.09169L15.8411 7.00835C16.1478 6.79169 16.6078 6.83335 16.8473 7.10835C17.0965 7.37502 17.0486 7.77502 16.7419 7.99169Z"
                        fill="#4182F9"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-black text-base">{email}</p>
                    <p className="text-black/50 text-base">
                      Изменен 10 дней назад
                    </p>
                  </div>
                  <button className="ml-auto bg-[#4182F9] text-white px-5 py-2 rounded-lg text-base">
                    Изменить адрес эл. почты
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
