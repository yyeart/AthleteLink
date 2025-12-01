import { useNavigate } from "react-router-dom";

interface HeaderMenuProps {
  greeting: string;
  date: string;
  onProfileClick?: () => void;
}

export default function HeaderMenu({
  greeting,
  date,
  onProfileClick,
}: HeaderMenuProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-12">
      <div>
        <h1 className="text-[#C9D2FF] text-2xl font-medium mb-1">
          {greeting}
        </h1>
        <p className="text-white text-base font-light">{date}</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <button
          onClick={() => navigate("/requests")}
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
        <button onClick={onProfileClick || (() => navigate("/profile"))}>
          <img
            src="/placeholder_avatar.jpg"
            alt="Profile"
            className="w-[47px] h-[44px] rounded-[10px]"
          />
        </button>
      </div>
    </div>
  );
}
