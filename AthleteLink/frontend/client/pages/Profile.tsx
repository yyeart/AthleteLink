import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02]">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-[76px] border-r-2 border-[#5F5C5C] relative flex flex-col items-center pt-8 gap-12">
          {/* Navigation Icons */}
          <div className="space-y-8 flex flex-col items-center mt-96">
            {/* Dashboard Icon - Active */}
            <div className="relative">
              <div className="absolute left-0 top-0 w-[76px] h-[50px] bg-gradient-to-r from-[#4182F9]/50 to-[#4182F9]/0 -ml-10 mt-6 "></div>
              <svg
                className="w-[21px] h-[22px] relative z-10 mt-10"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.25 9.99168V3.75834C19.25 2.38334 18.69 1.83334 17.2988 1.83334H13.7637C12.3725 1.83334 11.8125 2.38334 11.8125 3.75834V9.99168C11.8125 11.3667 12.3725 11.9167 13.7637 11.9167H17.2988C18.69 11.9167 19.25 11.3667 19.25 9.99168Z"
                  fill="white"
                />
                <path
                  d="M19.25 18.2417V16.5917C19.25 15.2167 18.69 14.6667 17.2988 14.6667H13.7637C12.3725 14.6667 11.8125 15.2167 11.8125 16.5917V18.2417C11.8125 19.6167 12.3725 20.1667 13.7637 20.1667H17.2988C18.69 20.1667 19.25 19.6167 19.25 18.2417Z"
                  fill="white"
                />
                <path
                  d="M9.1875 12.0083V18.2417C9.1875 19.6167 8.6275 20.1667 7.23625 20.1667H3.70125C2.31 20.1667 1.75 19.6167 1.75 18.2417V12.0083C1.75 10.6333 2.31 10.0833 3.70125 10.0833H7.23625C8.6275 10.0833 9.1875 10.6333 9.1875 12.0083Z"
                  fill="white"
                />
                <path
                  d="M9.1875 3.75834V5.40834C9.1875 6.78334 8.6275 7.33334 7.23625 7.33334H3.70125C2.31 7.33334 1.75 6.78334 1.75 5.40834V3.75834C1.75 2.38334 2.31 1.83334 3.70125 1.83334H7.23625C8.6275 1.83334 9.1875 2.38334 9.1875 3.75834Z"
                  fill="white"
                />
              </svg>
            </div>

            {/* Analytics Icon */}
            <button onClick={() => navigate("/stats")}>
              <svg
                className="w-[21px] h-[20px] opacity-50 hover:opacity-100 transition-opacity"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.03 10C18.305 10 19.25 9.16667 18.41 6.43334C17.8413 4.59167 16.1788 3.00834 14.245 2.46667C11.375 1.66667 10.5 2.56667 10.5 4.73334V7.13334C10.5 9.16667 11.375 10 13.125 10H16.03Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.5002 12.25C16.6865 16.1083 12.8015 18.9083 8.38274 18.225C5.06649 17.7167 2.39774 15.175 1.85524 12.0167C1.14649 7.82501 4.06899 4.12501 8.10274 3.34167"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Medal Icon */}
            <svg
              className="w-[21px] h-[21px] opacity-50"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.625 7.875C16.625 9.14375 16.2487 10.3075 15.6012 11.2788C14.6562 12.6788 13.16 13.6675 11.4188 13.9213C11.1213 13.9738 10.815 14 10.5 14C10.185 14 9.87875 13.9738 9.58125 13.9213C7.84 13.6675 6.34375 12.6788 5.39875 11.2788C4.75125 10.3075 4.375 9.14375 4.375 7.875C4.375 4.48875 7.11375 1.75 10.5 1.75C13.8862 1.75 16.625 4.48875 16.625 7.875Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5937 16.1613L17.1499 16.5025C16.8262 16.5812 16.5724 16.8263 16.5024 17.15L16.1962 18.4363C16.0299 19.1363 15.1374 19.3463 14.6737 18.795L10.4999 14L6.3262 18.8038C5.86245 19.355 4.96995 19.145 4.8037 18.445L4.49745 17.1587C4.4187 16.835 4.16495 16.5813 3.84995 16.5113L2.4062 16.17C1.7412 16.0125 1.50495 15.1813 1.9862 14.7L5.3987 11.2875C6.3437 12.6875 7.83995 13.6763 9.5812 13.93C9.8787 13.9825 10.1849 14.0088 10.4999 14.0088C10.8149 14.0088 11.1212 13.9825 11.4187 13.93C13.1599 13.6763 14.6562 12.6875 15.6012 11.2875L19.0137 14.7C19.4949 15.1725 19.2587 16.0038 18.5937 16.1613Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.0077 5.2325L11.524 6.26499C11.594 6.40499 11.7777 6.545 11.944 6.57125L12.8802 6.72874C13.4752 6.82499 13.6152 7.2625 13.1865 7.69125L12.4602 8.41749C12.3377 8.53999 12.2677 8.77625 12.3115 8.95125L12.5215 9.8525C12.6877 10.5612 12.3115 10.8412 11.6815 10.465L10.8065 9.94874C10.649 9.85249 10.3865 9.85249 10.229 9.94874L9.35397 10.465C8.72397 10.8325 8.34772 10.5612 8.51397 9.8525L8.72397 8.95125C8.75897 8.785 8.69772 8.53999 8.57522 8.41749L7.84897 7.69125C7.42022 7.2625 7.56022 6.83374 8.15522 6.72874L9.09147 6.57125C9.24897 6.545 9.43272 6.40499 9.50272 6.26499L10.019 5.2325C10.2727 4.6725 10.7277 4.6725 11.0077 5.2325Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Messages Icon */}
            <button onClick={() => navigate("/requests")}>
              <svg
                className="w-[21px] h-[21px] opacity-50 hover:opacity-100 transition-opacity"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7325 9.44126V12.9413C15.7325 13.1688 15.7238 13.3875 15.6975 13.5975C15.4963 15.96 14.105 17.1325 11.5413 17.1325H11.1913C10.9725 17.1325 10.7625 17.2375 10.6312 17.4125L9.58126 18.8125C9.11751 19.4337 8.365 19.4337 7.90125 18.8125L6.85124 17.4125C6.73749 17.2637 6.48375 17.1325 6.29125 17.1325H5.94126C3.15001 17.1325 1.75 16.4413 1.75 12.9413V9.44126C1.75 6.87751 2.93126 5.48626 5.28501 5.28501C5.49501 5.25876 5.71376 5.25 5.94126 5.25H11.5413C14.3325 5.25 15.7325 6.65001 15.7325 9.44126Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.2327 5.94126V9.44126C19.2327 12.0138 18.0514 13.3963 15.6977 13.5975C15.7239 13.3875 15.7327 13.1688 15.7327 12.9413V9.44126C15.7327 6.65001 14.3327 5.25 11.5414 5.25H5.94141C5.71391 5.25 5.49516 5.25876 5.28516 5.28501C5.48641 2.93126 6.87766 1.75 9.44141 1.75H15.0414C17.8327 1.75 19.2327 3.15001 19.2327 5.94126Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.8086 11.5938H11.8164"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.74606 11.5938H8.75394"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.68356 11.5938H5.69144"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Settings Icon */}
            <button onClick={() => navigate("/settings")}>
              <svg
                className="w-[21px] h-[22px] opacity-50 hover:opacity-100 transition-opacity"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 13.75C11.9497 13.75 13.125 12.5188 13.125 11C13.125 9.48122 11.9497 8.25 10.5 8.25C9.05025 8.25 7.875 9.48122 7.875 11C7.875 12.5188 9.05025 13.75 10.5 13.75Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.75 11.8066V10.1933C1.75 9.23998 2.49375 8.45165 3.4125 8.45165C4.99625 8.45165 5.64375 7.27832 4.8475 5.83915C4.3925 5.01415 4.66375 3.94165 5.46 3.46498L6.97375 2.55748C7.665 2.12665 8.5575 2.38332 8.96875 3.10748L9.065 3.28165C9.8525 4.72082 11.1475 4.72082 11.9438 3.28165L12.04 3.10748C12.4513 2.38332 13.3438 2.12665 14.035 2.55748L15.5488 3.46498C16.345 3.94165 16.6163 5.01415 16.1613 5.83915C15.365 7.27832 16.0125 8.45165 17.5963 8.45165C18.5063 8.45165 19.2588 9.23082 19.2588 10.1933V11.8066C19.2588 12.76 18.515 13.5483 17.5963 13.5483C16.0125 13.5483 15.365 14.7216 16.1613 16.1608C16.6163 16.995 16.345 18.0583 15.5488 18.535L14.035 19.4425C13.3438 19.8733 12.4513 19.6166 12.04 18.8925L11.9438 18.7183C11.1563 17.2791 9.86125 17.2791 9.065 18.7183L8.96875 18.8925C8.5575 19.6166 7.665 19.8733 6.97375 19.4425L5.46 18.535C4.66375 18.0583 4.3925 16.9858 4.8475 16.1608C5.64375 14.7216 4.99625 13.5483 3.4125 13.5483C2.49375 13.5483 1.75 12.76 1.75 11.8066Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

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
              <img
                src="/placeholder_avatar.jpg"
                alt="Profile"
                className="w-[47px] h-[44px] rounded-[10px]"
              />
            </div>
          </div>

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
