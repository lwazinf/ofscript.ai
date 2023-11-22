import { useRecoilState } from "recoil";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Branding_Props {}

const Branding_ = ({}: Branding_Props) => {
    const [hoverActive_, setHoverActive_] = useState(false)
    const router = useRouter()
  return (
    <div
      className={`flex flex-col justify-start items-center h-[320px] w-full transition-all duration-[1000ms] hover:duration-200  relative opacity-60 hover:opacity-100`}
      onMouseEnter={() => {
        setHoverActive_(true)
    }}
    onMouseLeave={() => {
          setHoverActive_(false)
      }}
    >
      <div
        className={`flex flex-col w-full h-[100px] justify-center items-center absolute top-6 p-4`}
      >
        <div
          className={`flex flex-col w-full h-full justify-center items-center opacity-[0.65] rounded-[4px] cursor-pointer`}
          onClick={() => {
            router.push('/');
          }}
        >
          <img
            src={`/assets/images/LwaziNF.png`}
            className={`w-full object-cover`}
          />
        </div>
      </div>
      <div
        className={`flex flex-col justify-center items-start min-w-2 h-[52px] -rotate-90 absolute transition-all ${hoverActive_ ? 'duration-200 bottom-[75px]' : 'duration-[1000ms] bottom-[80px]'}`}
      >
        <div
          className={`flex flex-row justify-end items-start min-w-2 min-h-2`}
        >
          <p
            className={`_inter min-h-0 font-medium text-[32px] p-0 m-0 relative cursor-default text-black/20 transition-all duration-500`}
          >
            OF
          </p>
          <div
            className={`h-full flex flex-col justify-center items-center mx-[5px]`}
          >
            <p
              className={`min-h-0 font-medium text-[12px] px-1 m-0 relative cursor-default text-white transition-all duration-500 rounded-[2px] bg-red-500 rotate-90 animate-pulse`}
            >
              AI
            </p>
          </div>
          <p
            className={`min-h-0 font-black text-[32px] p-0 m-0 relative cursor-default text-black/50 transition-all duration-500`}
          >
            SCRIPT
          </p>
        </div>
      </div>
    </div>
  );
};

export default Branding_;
