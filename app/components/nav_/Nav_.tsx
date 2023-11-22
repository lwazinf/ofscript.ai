"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Branding_ from "./Branding_";
import { faWaveSquare } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import MenuItem_ from "./MenuItem_";

interface Nav_Props {}

const Nav_ = ({}: Nav_Props) => {
  return (
    <div
      className={`w-[100px] min-h-screen bg-white flex flex-col justify-between items-center fixed left-0 top-0`}
    >
      <Branding_ />
      <div
        className={`w-[100px] min-h-2 flex flex-col justify-end items-center pb-6`}
      >
        {[{name: 'Narrate', target: '/narrate', icon: faWaveSquare}, {name: 'split', target: '/', icon: null}, {name: 'Twitter', target: 'https://x.com/ofscriptai', icon: faTwitter}, {name: 'Facebook', target: '/', icon: faFacebook}].map((obj_, index) => {
          if(obj_.name == 'split'){
            return (
              <div className={`w-[50%] h-[1px] bg-black/20 my-2`} key={index} />
            );
          }else{
            return <MenuItem_ key={index} data={obj_}/>
          }
        })}
      </div>
    </div>
  );
};

export default Nav_;
