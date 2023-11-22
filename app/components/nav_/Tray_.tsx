import { useRecoilState } from "recoil";
import { TrayContentState } from "../atoms/atoms";

interface Tray_Props {
    
}
 
const Tray_ = ({}:Tray_Props) => {
    const [trayContent_, setTrayContent_] = useRecoilState(TrayContentState)
    return ( 
        <div className={`w-[300px] min-h-screen bg-white/20 backdrop-blur-md absolute top-0 ${trayContent_.length > 0 ? 'left-[100px] duration-500 opacity-100' : 'left-[-300px] duration-200 opacity-0'} transition-all shadow-md z-[-1]`}>

      </div>
     );
}
 
export default Tray_;