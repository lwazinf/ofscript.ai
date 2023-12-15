'use client'

import { useRecoilState } from "recoil";
import { TrayContentState } from "../components/atoms/atoms";
import { useEffect } from "react";

interface Visual_Props {
    
}
 
const Visual_ = ({}:Visual_Props) => {
    const [trayContent_, setTrayContent_] = useRecoilState(TrayContentState);
    const initTray = () => {
        setTrayContent_('Visual')
    }
    useEffect(() => {
        initTray()
    }, [])
    return ( 
        <div className={``}></div>
     );
}
 
export default Visual_;