import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

export default function Index() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    const element = document.getElementById("features");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#312900] to-[#524502]">
      {/* Header */}
      <header className="w-full px-8 md:px-16 py-6 flex justify-between items-center">
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-[110%] letter-spacing-[-1.68px]">
          AthleteLink
        </h1>
        <nav className="flex items-center gap-6 md:gap-10">
          <button
            onClick={() => navigate("/register")}
            className="text-white text-sm md:text-base font-medium hover:opacity-80 transition-opacity capitalize"
          >
            Зарегистрироваться
          </button>
          <button
            onClick={() => navigate("/user/login")}
            className="text-white text-sm md:text-base font-medium hover:opacity-80 transition-opacity capitalize"
          >
            Войти
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-8 md:px-16 py-20 md:py-32 flex flex-col items-center gap-12 overflow-hidden">
        {/* Animated Emojis */}
        <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/ed420d055f83f356d1d4405b160694007d20f42b?width=359"
            alt=""
            className="absolute left-[5%] top-[10%] w-[135px] h-[135px] md:w-[173px] md:h-[173px] lg:w-[215px] lg:h-[215px] opacity-50 animate-levitate-slow"
            style={{ transform: "rotate(15deg)" }}
          />
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/2f61dedd682c4d06168644072d1b811c3293c85f?width=440"
            alt=""
            className="absolute right-[5%] top-[15%] w-[154px] h-[154px] md:w-[211px] md:h-[211px] lg:w-[264px] lg:h-[264px] opacity-50 animate-levitate"
            style={{ transform: "rotate(15deg)" }}
          />
        </div>

        <div className="flex flex-col items-center gap-8 max-w-4xl z-10">
          <h2 className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white text-center leading-[110%] tracking-tight">
            Инновационное приложение для спорта
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/55 text-center font-medium leading-[145%] max-w-3xl">
            Первая на рынке социальная сеть для тех, кто хочет заниматься
            спортом и играть одновременно
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 z-10">
          <button
            onClick={scrollToFeatures}
            className="px-4 md:px-6 py-3 bg-[#493D02] text-[#F1F1F1] rounded-xl border border-black text-base md:text-lg font-medium hover:bg-[#5a4a02] transition-colors"
          >
            Подробнее о проекте
          </button>
          <button
            onClick={() => navigate("/login")}
            className="px-4 md:px-6 py-3 bg-[#493D02] text-white rounded-xl border border-black text-base md:text-lg font-medium hover:bg-[#5a4a02] transition-colors"
          >
            Найди мероприятие по душе прямо сейчас!
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 md:px-16 py-20 md:py-32">
        {/* Feature 1 - Rating System */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20 md:mb-32">
          <div className="flex-1 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-[120%] tracking-tight">
                Уникальная система рейтинга
              </h3>
              <p className="text-base md:text-lg text-white/55 font-medium leading-[145%]">
                Сражайся за место лидера в своём городе! Рейтинговые таблицы и
                ранговая система уровней не дадут тебе заскучать, а реферальная
                программа поможет сделать быстрый старт в мире спорта! Стань
                первым среди лучших и покажи всем свой потенциал!
              </p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/64314cf74d3f56affe006eb956bcdc4c4ba21636?width=1176"
              alt="Rating system badges"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* Feature 2 - Sports Matches */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16 mb-20 md:mb-32">
          <div className="flex-1 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-[120%] tracking-tight">
                Проводи матчи в любых видах спорта - от футбола до шахмат
              </h3>
              <p className="text-base md:text-lg text-white/55 font-medium leading-[145%]">
                Тебя ждёт захватывающее спортивное приключение! Будь то жим
                лёжа, лёгкая атлетика или хобби хорсинг - ты отыщешь себе спорт
                по душе! С нашим приложением легко найти партнёров для
                тренировок, команду для соревнований или просто друзей, с
                которыми хочется побегать в парке, сыграть в волейбол или
                попробовать что-то новое.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a32bf03ccb6f863c80283e13e2781ad7720e97d5?width=1088"
              alt="Various sports equipment"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* Feature 3 - Find Friends */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white leading-[120%] tracking-tight">
                Находи новых друзей по интересам в твоем городе!
              </h3>
              <p className="text-base md:text-lg text-white/55 font-medium leading-[145%]">
                С помощью нашего сервиса ты обязательно найдёшь себе новых
                друзей и мейтов по хобби или спорту! Объединяйтесь в группы,
                организовывайте митапы и соревнования, все в ваших руках!
              </p>
            </div>
          </div>
          <div className="flex-1 w-full">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/7dc366bed193d36065f792a834dce61542446d60?width=1152"
              alt="Group of friends playing sports"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative px-8 md:px-16 py-20 md:py-32 flex flex-col items-center gap-12 overflow-hidden">
        <div className="absolute left-0 bottom-0 w-full h-full pointer-events-none">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0f230993c9972b2c1cef3d0c6ba8f3373d0bfd3e?width=408"
            alt=""
            className="absolute left-[2%] bottom-[10%] w-[154px] h-[154px] md:w-[230px] md:h-[230px] lg:w-[245px] lg:h-[245px] opacity-50"
          />
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/1b43863a383341ee852ae23b137c92a173c40398?width=410"
            alt=""
            className="absolute right-[2%] bottom-[10%] w-[154px] h-[154px] md:w-[230px] md:h-[230px] lg:w-[246px] lg:h-[246px] opacity-50"
          />
        </div>

        <div className="max-w-6xl text-center z-10">
          <h2 className="text-2xl md:text-4xl lg:text-[48px] font-bold text-white leading-[130%] tracking-tight mb-8">
            Ты все еще здесь? Чего же ты ждешь? Регистрируйся и преврати спорт в
            игру!
          </h2>
          <p className="text-2xl md:text-4xl lg:text-[48px] font-bold text-white leading-[130%] tracking-tight">
            "Спорт - это дар жизни. Соцсеть для спорта - способ подарить жизнь
            как можно большему количеству людей"
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 md:px-16 py-20 md:py-32 flex flex-col items-center gap-12">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto min-w-[280px] md:min-w-[325px] h-20 px-6 bg-[#313030] text-white rounded-xl border-[1.5px] border-black shadow-[0_8px_4px_0_rgba(0,0,0,0.5)] text-xl md:text-2xl font-medium hover:bg-[#3f3f3f] transition-colors"
          >
            Я новенький
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto min-w-[280px] md:min-w-[325px] h-20 px-6 bg-[#313030] text-white rounded-xl border-[1.5px] border-black shadow-[0_8px_4px_0_rgba(0,0,0,0.5)] text-xl md:text-2xl font-medium hover:bg-[#3f3f3f] transition-colors"
          >
            Я уже смешарик
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 md:px-16 py-12 flex justify-center items-center">
        <p className="text-xl md:text-2xl font-bold text-white text-center leading-[120%] tracking-tight">
          Copyright Team Layar, 2025.
        </p>
      </footer>

      {/* Modal/Alert for button clicks (optional) */}
      {activeSection && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveSection(null)}
        >
          <div className="bg-[#312900] border-2 border-[#493D02] rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4">
              {activeSection === "register" && "Регистрация"}
              {activeSection === "login" && "Вход"}
              {activeSection === "find-event" && "Поиск мероприятий"}
              {activeSection === "new-user" && "Добро пожаловать!"}
              {activeSection === "existing-user" && "С возвращением!"}
            </h3>
            <p className="text-white/80 mb-6">
              Эта функция в разработке. Скоро здесь появится полноценный
              функционал!
            </p>
            <button
              onClick={() => setActiveSection(null)}
              className="w-full px-6 py-3 bg-[#493D02] text-white rounded-xl border border-black font-medium hover:bg-[#5a4a02] transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
