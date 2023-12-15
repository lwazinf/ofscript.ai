"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Branding_ from "./Branding_";
import {
  faBoxesPacking,
  faBrush,
  faEye,
  faMarker,
  faMicrophone,
  faPowerOff,
  faScroll,
  faScrollTorah,
  faUser,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import MenuItem_ from "./MenuItem_";
import Tray_ from "./Tray_";
import { useRecoilState } from "recoil";
import { UserState } from "../atoms/atoms";

interface Nav_Props {}

const Nav_ = ({}: Nav_Props) => {
  const [user_, setUser_] = useRecoilState(UserState);
  const menu_ = [
    { name: "Audio", target: "/audio", icon: faMicrophone },
    // { name: "Visual", target: "/visual", icon: faBrush },
    { name: "Text", target: "/text", icon: faMarker },
    { name: "Script", target: "/script", icon: faScroll },
    { name: "split", target: "/", icon: null },
    { name: "Deliver", target: "/deliver", icon: faBoxesPacking },
    { name: "Auth", target: "/", icon: user_ ? faPowerOff : faUser },
    { name: "split", target: "/", icon: null },
    { name: "Twitter", target: "https://x.com/ofscriptai", icon: faTwitter },
    { name: "Facebook", target: "/", icon: faFacebook },
  ];
  return (
    <div
      className={`w-[100px] min-h-screen flex flex-col justify-center items-center fixed left-0 top-0`}
    >
      <Tray_ />
      <div
        className={`w-[100px] min-h-screen bg-white flex flex-col justify-between items-center`}
      >
        <Branding_ />
        <div
          className={`w-[100px] min-h-2 flex flex-col justify-end items-center pb-6`}
        >
          {menu_.map((obj_, index) => {
            if (obj_.name == "split") {
              return (
                <div
                  className={`w-[50%] h-[1px] bg-black/20 my-2`}
                  key={index}
                />
              );
            } else {
              return <MenuItem_ key={index} data={obj_} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Nav_;
