import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { TrayContentState, UserState } from "../atoms/atoms";
import { auth, signIn_, signOut_ } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

interface MenuItem_Props {
  data: any;
}

const MenuItem_ = ({ data }: MenuItem_Props) => {
  const [hoverActive_, setHoverActive_] = useState(false);
  const [trayContent_, setTrayContent_] = useRecoilState(TrayContentState);
  const [user_, setUser_] = useRecoilState(UserState);
  const router = useRouter();
  const handleLinkClick = () => {
    // Open the link in a new tab
    window.open(data.target, "_blank");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log("User is logged in:", user.uid);

        // Create a new object with the user information
        const newUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          dp: user.photoURL /* and other properties */,
        };

        // Set the new user object in your application state
        setUser_(newUser);

        // Additional logic, if needed
      } else {
        // User is signed out
        console.log("User is logged out");

        // Clear user information or perform other actions when the user logs out
        setUser_(null);

        // Additional logic, if needed
      }
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []); // Empty dependency array ensures the effect runs only once on mount
  return (
    <div
      className={`w-full min-h-2 flex flex-row justify-center items-center text-black/60 hover:text-black text-[18px] transition-all duration-200 hover:pl-2`}
      onMouseEnter={() => {
        setHoverActive_(true);
      }}
      onMouseLeave={() => {
        setHoverActive_(false);
      }}
      onClick={async () => {
        const httpsUrlPattern = /^https:\/\//;
        if (!httpsUrlPattern.test(data.target)) {
          router.push(data.target);
        } else {
          handleLinkClick();
        }
        if (data.name == "Auth") {
          if (data.icon == faPowerOff) {
            try {
              signOut_();
            } catch {
              console.log("Error signing out!!");
            }
          } else {
            try {
              signIn_().then((e) => {
                if (e?.user) {
                  setUser_(e?.user);
                }
              });
            } catch {
              console.log("Error logging in!!");
            }
          }
        }
        // if(trayContent_ == ''){
        //   setTrayContent_(data.name)
        // }else{
        //   setTrayContent_('')
        // }
      }}
    >
      <FontAwesomeIcon icon={data.icon} className={`m-2 cursor-pointer`} />
      <div
        className={`w-[80px] min-h-2 flex flex-col justify-center items-start absolute ${
          hoverActive_
            ? "right-[-85px] duration-500 opacity-80"
            : "right-[-60px] duration-200 opacity-0"
        } transition-all pointer-events-none`}
      >
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
