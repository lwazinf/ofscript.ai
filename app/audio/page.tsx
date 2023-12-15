'use client'

import { useRecoilState } from "recoil";
import { TrayContentState } from "../components/atoms/atoms";
import { useEffect } from "react";

interface Audio_Props {
    
}
 
const Audio_ = ({}:Audio_Props) => {
    const [trayContent_, setTrayContent_] = useRecoilState(TrayContentState);
    const initTray = () => {
        setTrayContent_('Audio')
    }
    useEffect(() => {
        initTray()
    }, [])
    return ( 
        <div className={``}></div>
     );
}
 
export default Audio_;