import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "@/components/HeaderMenu";
import SidebarNav from "@/components/SidebarMenu";

export default function Settings() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [secretQuestionAnswer, setSecretQuestionAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedSecretQuestion, setSelectedSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [showQuestionDropdown, setShowQuestionDropdown] = useState(false);

  const secretQuestions = [
    "Имя вашего первого питомца?",
    "Название вашей первой школы?",
    "Девичья фамилия матери?",
    "Ваш любимый город?",
  ];

  const handleChangePassword = () => {
    console.log("Changing password...");
  };

  const handleSaveSecretQuestion = () => {
    console.log("Saving secret question...");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Вы уверены, что хотите удалить учетную запись? Это действие необратимо.",
    );
    if (confirmed) {
      console.log("Deleting account...");
      navigate("/");
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Вы действительно хотите выйти?");
    if (confirmed) {
      console.log("Logging out...");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="flex min-h-screen">
        <SidebarNav activePage="settings" />

        {/* Main Content */}
        <div className="flex-1 p-7 overflow-y-auto">
          <HeaderMenu
            greeting={`Добрый день, Захар`}
            date={`Сб, 31 ноября 2026`}
          />

          {/* Settings Card */}
          <div className="rounded-[10px] bg-white/50 p-8 relative min-h-[748px]">
            {/* Password Change Section */}
            <h2 className="text-black text-4xl font-bold mb-6">Смена пароля</h2>

            <div className="flex flex-col gap-4 mb-6">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Ваш текущий пароль"
                className="w-full max-w-[526px] h-[46px] rounded-lg bg-[#F9F9F9]/50 px-4 text-black/40 text-base outline-none placeholder:text-black/40"
              />

              <input
                type="text"
                value={secretQuestionAnswer}
                onChange={(e) => setSecretQuestionAnswer(e.target.value)}
                placeholder="Ответ на секретный вопрос:"
                className="w-full max-w-[526px] h-[45px] rounded-lg bg-[#F9F9F9]/50 px-4 text-black/40 text-[15px] outline-none placeholder:text-black/40"
              />

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Ваш новый пароль"
                className="w-full max-w-[526px] h-[45px] rounded-lg bg-[#F9F9F9]/50 px-4 text-black/40 text-base outline-none placeholder:text-black/40"
              />
            </div>

            <p className="text-black text-base opacity-80 mb-6 max-w-[526px]">
              Требования: не менее 8 символов, не менее 1 заглавной буквы, не
              менее 1 строчной буквы, не менее 1 цифры
            </p>

            <button
              onClick={handleChangePassword}
              className="w-[217px] h-[38px] rounded-lg bg-[#4182F9] text-white text-base text-center mb-20"
            >
              Изменить пароль
            </button>

            {/* Secret Question Section */}
            <h2 className="text-black text-4xl font-bold mb-2">
              Секретный вопрос
            </h2>

            <p className="text-black text-base opacity-80 mb-6">
              Текущий секретный вопрос: не установлен.
            </p>

            <div className="space-y-4 mb-6 relative">
              <div className="relative w-full max-w-[526px]">
                <input
                  type="text"
                  value={selectedSecretQuestion}
                  onChange={(e) => setSelectedSecretQuestion(e.target.value)}
                  onClick={() => setShowQuestionDropdown(!showQuestionDropdown)}
                  placeholder="Выберите вопрос из списка"
                  className="w-full h-[46px] rounded-lg bg-[#F9F9F9]/50 px-4 text-black/40 text-base outline-none placeholder:text-black/40 pr-12"
                  readOnly
                />
                <button
                  onClick={() => setShowQuestionDropdown(!showQuestionDropdown)}
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
                {showQuestionDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-black/10 rounded-lg shadow-xl overflow-hidden">
                    {secretQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedSecretQuestion(question);
                          setShowQuestionDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 text-black hover:bg-[#F9F9F9] transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="text"
                value={secretAnswer}
                onChange={(e) => setSecretAnswer(e.target.value)}
                placeholder="Введите ответ"
                className="w-full max-w-[526px] h-[46px] rounded-lg bg-[#F9F9F9]/50 px-4 text-black/40 text-base outline-none placeholder:text-black/40"
              />
            </div>

            <div className="flex gap-4 items-center  mb-6">
              <button
                onClick={handleSaveSecretQuestion}
                className="w-[217px] h-[38px] rounded-lg bg-[#4182F9] text-white text-base text-center"
              >
                Сохранить
              </button>
            </div>

            <div className="flex gap-4 items-center justify-end mb-6">
              <button
                onClick={handleLogout}
                className="w-[257px] h-[38px] rounded-lg bg-[#B52626] text-white text-base text-center"
              >
                Выйти
              </button>
            </div>

            <div className="flex gap-4 items-center justify-end ">
              <button
                onClick={handleDeleteAccount}
                className="w-[257px] h-[38px] rounded-lg bg-[#B52626] text-white text-base text-center"
              >
                Удалить учетную запись
              </button>
            </div>

            <div className="flex justify-between items-end">
              <p className="text-black text-base opacity-80">
                App Version: 0.1 Alphadev 13.10.25
              </p>
            </div>

            {/* Levitating MAI Logo */}
            <img
              src="/MAI_logo.png"
              alt="MAI Logo"
              className="absolute right-8 top-[280px] w-[367px] h-[354px] object-contain animate-levitate-active"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
