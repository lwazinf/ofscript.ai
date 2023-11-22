import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface MenuItem_Props {
  data: any;
}

const MenuItem_ = ({ data }: MenuItem_Props) => {
    const [hoverActive_, setHoverActive_] = useState(false)
    const router = useRouter()
    const handleLinkClick = () => {
      // Open the link in a new tab
      window.open(data.target, '_blank');
    };
  return (
    <div
      className={`w-full min-h-2 flex flex-row justify-center items-center text-black/60 hover:text-black text-[18px] transition-all duration-200 hover:pl-2`}
      onMouseEnter={() => {
          setHoverActive_(true)
      }}
      onMouseLeave={() => {
        setHoverActive_(false)
      }}
      onClick={() => {
        const httpsUrlPattern = /^https:\/\//;
        if(!httpsUrlPattern.test(data.target)){
          router.push(data.target);
        }else{
          handleLinkClick()
        }
      }}
    >
      <FontAwesomeIcon icon={data.icon} className={`m-2 cursor-pointer`} />
      <div className={`w-[80px] min-h-2 flex flex-col justify-center items-start absolute ${hoverActive_ ? 'right-[-85px] duration-500 opacity-80' : 'right-[-60px] duration-200 opacity-0'} transition-all pointer-events-none`}>
        <div
          className={`text-[13px] text-white min-w-2 min-h-2 bg-[#333333] rounded-[3px] px-1`}
        >
          {data.name}
        </div>
      </div>
    </div>
  );
};

export default MenuItem_;
