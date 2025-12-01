import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { getTimeGreeting } from '@/components/TimeParse';
import { useQuery } from "@tanstack/react-query";
import HeaderMenu from "@/components/HeaderMenu";
import SidebarNav from "@/components/SidebarMenu";
import { getCurrentDateFormatted } from "@/lib/dateFormatter";

// Тип данных, приходящих с бэкенда (соответствует сериализатору)
interface Request {
  id: number;
  eventName: string;
  date: string;
  sport: string;
  applicationStatus: string;
  gameResult: string;
  resultColor: "gray" | "black" | "green" | "red";
}

export default function Requests() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // 1. Запрос к API за списком заявок
  const { data: requests = [], isLoading: isRequestsLoading, error } = useQuery<Request[]>({
    queryKey: ['requests'],
    queryFn: async () => {
      const response = await fetch(`${apiUrl}/requests/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Важно для авторизации
      });

      if (!response.ok) {
        throw new Error('Ошибка загрузки заявок');
      }
      return response.json();
    }
  });

  const getResultCircleColor = (color: string) => {
    switch (color) {
      case "gray": return "bg-[#848484]";
      case "black": return "bg-black";
      case "green": return "bg-[#48FF55]/38";
      case "red": return "bg-[#FF7B7B]/57";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#493D02] overflow-y-auto">
      <div className="flex min-h-screen">
        <SidebarNav activePage="requests" />

        {/* Main Content */}
        <div className="flex-1 p-7 overflow-y-auto">
          <HeaderMenu
            greeting={`${getTimeGreeting()}, ${user.full_name}`}
            date={getCurrentDateFormatted()}
          />

          {/* Requests Section */}
          <div className="rounded-[10px] bg-[#DDD]/50 p-8 min-h-[800px] relative">
            
            <h2 className="text-black text-[50px] font-light text-center mb-8">
              Текущие заявки
            </h2>

            {/* Loading / Error / Empty States */}
            {isRequestsLoading && <p className="text-center text-xl">Загрузка...</p>}
            {error && <p className="text-center text-red-600 text-xl">Ошибка загрузки данных</p>}
            {!isRequestsLoading && requests.length === 0 && (
                <p className="text-center text-xl text-gray-700">У вас пока нет активных заявок.</p>
            )}

            {/* Requests List */}
            <div className="space-y-5 mb-8">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="border-[3px] border-black rounded-[50px] p-6 flex items-center justify-between backdrop-blur-sm relative overflow-hidden"
                  style={{
                    background: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                    mixBlendMode: "plus-darker",
                  }}
                >
                  <div
                    className="absolute inset-0 -z-10 rounded-[50px]"
                    style={{
                      backgroundImage: "url('/silver.png')", // Поправил путь на локальный для надежности
                      backgroundSize: "250px 250px",
                      opacity: 0.05,
                    }}
                  ></div>
                  
                  {/* Left Side - Event Info */}
                  <div className="flex-1 relative z-10">
                    <h3 className="text-black text-4xl font-light mb-3">
                      {request.eventName}
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="border-[3px] border-black rounded-[50px] px-5 py-2">
                        <span className="text-black text-base font-light">
                          {request.date}
                        </span>
                      </div>
                      <div className="border-[3px] border-black rounded-[50px] px-5 py-1.5">
                        <span className="text-black text-base font-light">
                          {request.sport}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Status Info */}
                  <div className="border-[3px] border-black rounded-[50px] px-8 py-4 min-w-[466px] relative z-10 bg-white/20 backdrop-blur-md">
                    <div className="space-y-3">
                      {/* Application Status */}
                      <div className="flex items-center justify-between">
                        <span className="text-black text-2xl font-light">
                          Статус заявки
                        </span>
                        <span className="text-black text-2xl font-light">
                          {request.applicationStatus}
                        </span>
                      </div>
                      {/* Game Result */}
                      <div className="flex items-center justify-between">
                        <span className="text-black text-2xl font-light">
                          Результат игры
                        </span>
                        <div className="flex items-center gap-3">
                          <div className={`w-[23px] h-[23px] rounded-full border border-black ${getResultCircleColor(request.resultColor)}`}></div>
                          <span className="text-black text-2xl font-light">
                            {request.gameResult}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- КНОПКА "СОЗДАТЬ СВОЮ" --- */}
            <div className="flex justify-center mt-12">
                <button
                    onClick={() => navigate("/requests/create")}
                    className="w-full max-w-[404px] h-[68px] bg-[#4182F9] rounded-[25px] text-white text-[24px] font-normal shadow-[0_8px_4px_rgba(0,0,0,0.5)] hover:bg-[#3571e8] transition-all active:scale-95"
                >
                    Создать свою заявку
                </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}