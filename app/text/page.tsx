'use client'

import { useRecoilState } from "recoil";
import { TrayContentState } from "../components/atoms/atoms";
import { useEffect } from "react";

interface Text_Props {
    
}
 
const Text_ = ({}:Text_Props) => {
    const [trayContent_, setTrayContent_] = useRecoilState(TrayContentState);
    const initTray = () => {
        setTrayContent_('Text')
    }
    useEffect(() => {
        initTray()
    }, [])
    return ( 
        <div className={``}></div>
     );
}
 
export default Text_;