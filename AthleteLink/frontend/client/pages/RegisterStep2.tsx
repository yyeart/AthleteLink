import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterStep2() {
  const [fullName, setFullName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic would go here
    console.log("Registration complete:", {
      fullName,
      telegram,
      birthdate,
      city,
    });
    // Navigate to login or home
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Dart Emojis */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <img
          src="/lev_dartz.webp"
          alt=""
          className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-[350px] lg:h-[350px] opacity-90 animate-levitate-active"
        />
        <img
          src="/lev_dartz.webp"
          alt=""
          className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 lg:w-[350px] lg:h-[350px] opacity-90 animate-levitate-active-slow"
        />
      </div>

      {/* Registration Form Container */}
      <div className="relative z-10 w-full max-w-[572px]">
        <div className="bg-black/50 border border-[#E0E0E0] shadow-[0_82px_40px_rgba(100,100,100,0.08)] p-8 md:p-12 lg:p-16">
          <h1 className="text-2xl md:text-3xl lg:text-[31px] font-bold text-white text-center mb-4 leading-[120%] tracking-tight">
            Регистрация в AthleteLink
          </h1>

          <p className="text-white text-[13px] text-center mb-8 md:mb-12">
            Осталось всего пару шагов - и ты с нами!
          </p>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Full Name Field */}
            <div className="relative">
              <div className="border border-[#212121] bg-black p-4">
                <label className="block text-white text-[10px] font-medium mb-2">
                  Ваше реальное имя (для коммуникации)
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Захар Смирнов"
                  className="w-full bg-transparent text-[#616161] text-base outline-none placeholder:text-[#616161]"
                  required
                />
              </div>
            </div>

            {/* Telegram Field */}
            <div className="relative">
              <div className="border border-[#212121] bg-black p-4">
                <label className="block text-white text-[10px] font-medium mb-2">
                  Идентификатор пользователя в Telegram
                </label>
                <input
                  type="text"
                  value={telegram}
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="@Lovely_Specty"
                  className="w-full bg-transparent text-[#757575] text-base outline-none placeholder:text-[#757575]"
                  required
                />
              </div>
            </div>

            {/* Birthdate Field */}
            <div className="relative">
              <div className="border border-[#212121] bg-black p-4">
                <label className="block text-white text-[10px] font-medium mb-2">
                  Дата рождения
                </label>
                <input
                  type="text"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  placeholder="Вводите в формате ДД.ММ.ГГГГ"
                  className="w-full bg-transparent text-[#757575] text-base outline-none placeholder:text-[#757575]"
                  required
                />
              </div>
            </div>

            {/* City Field */}
            <div className="relative">
              <div className="border border-[#212121] bg-black p-4">
                <label className="block text-white text-[10px] font-medium mb-2">
                  Город
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Введите или выберите из выпадающего списка"
                  className="w-full bg-transparent text-[#757575] text-[15px] outline-none placeholder:text-[#757575]"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-16 bg-[#212121] text-white text-base font-medium shadow-[0_8px_4px_rgba(0,0,0,0.5)] hover:bg-[#2a2a2a] transition-colors"
            >
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-white/25 text-[13px] mt-6">
            Уже зарегистрированы?{" "}
            <Link to="/login" className="hover:text-white/40 transition-colors">
              Войти
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-white text-lg md:text-xl font-bold mt-8 leading-[120%] tracking-tight">
          Copyright Team Layar, 2025.
        </p>
      </div>
    </div>
  );
}
