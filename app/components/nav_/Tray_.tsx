import { useRecoilState } from "recoil";
import { TextDBState, TrayContentState } from "../atoms/atoms";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faChevronRight,
  faPaperPlane,
  faPlay,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";
import { useEffect, useState } from "react";

interface Tray_Props {}

const Tray_ = ({}: Tray_Props) => {
  const [trayContent_, setTrayContent_] = useRecoilState(TrayContentState);
  const [textDB_, setTextDB_] = useRecoilState(TextDBState);
  const [finalObj_, setFinalObj_] = useState({
    brand: "",
    episode: "",
    topic: "",
    blacklist: "",
    tone: "",
    chars: 0,
    misc: null,
  });
  const pathname = usePathname();
  const pathname_ =
    pathname.replace("/", "").charAt(0).toUpperCase() +
    pathname.replace("/", "").slice(1);
  const [textValue, setTextValue] = useState("");
  const [placeholderCount_, setPlaceholderCount_] = useState(-1);
  const dataPH_ = [
    { question: "What is your brand's name?", name: "brand" },
    { question: "What's this podcast episode's name?", name: "episode" },
    {
      question: "What topic do you want your monologue to explore?",
      name: "topic",
    },
    { question: "What shouldn't be discussed on here?", name: "blacklist" },
    {
      question:
        "Describe the tone you'd like.. eg: creepy mood, medieval mood, etc",
      name: "tone",
    },
    {
      question: "How many characters do you want your monologue to be?",
      name: "chars",
    },
    { question: "Anything we missed?", name: "misc" },
  ];
  const handleClear = () => {
    setTextValue("");
  };
  const [placeholder_, setPlaceholder_] = useState("");
  const [placeholderTrigger_, setPlaceholderTrigger_] = useState(false);
  const ChangePH = () => {
    if (placeholderCount_ <= dataPH_.length - 1) {
      setPlaceholderCount_(placeholderCount_ + 1);
      setPlaceholder_(dataPH_[placeholderCount_].question);
      handleClear();
    } else {
      console.log("Other stuff..");
    }
  };

  const updateFinalObjAsync = () => {
    return new Promise((resolve) => {
      if(finalObj_.misc == ""){const updatedFinalObj = { ...finalObj_ };
      const { name } = dataPH_[placeholderCount_ - 1];
  
      // Use name as the key, set the value to 'd' for 'chars', otherwise use textValue
      // @ts-ignore
      updatedFinalObj[name] = name === "chars" ? parseInt(textValue) : textValue;
  
      setFinalObj_(updatedFinalObj);
      setPlaceholderTrigger_(!placeholderTrigger_);}
  
      // @ts-ignore
      resolve(); // Resolve the promise when the asynchronous operations are complete
    });
  };

  useEffect(() => {
    if (placeholderCount_ > -1) {
      if (dataPH_.length > placeholderCount_) {
        ChangePH();
      }
    } else {
      setPlaceholderCount_(0);
      setPlaceholderTrigger_(!placeholderTrigger_);
    }
  }, [placeholderTrigger_]);

  const URL = "https://api.openai.com/v1/chat/completions";

  const getData = async () => {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are n expert podcaster. You are versitile and witty. You help write monologue scripts. Very smart and entertaining. You write amazing monologues.`,
        },
        {
          role: "user",
          content: `write me a monologue about ${finalObj_.topic}, this is episode ${finalObj_.episode} under the podcast name "${finalObj_.brand}", make it consist of no more than ${finalObj_.chars} characters. Do not talk about ${finalObj_.blacklist}, the mood or tone should be ${finalObj_.tone}. Do not use any notation or direction.`,
        },
      ],
      temperature: 0.9,
      //   stream: true,
    };

    try {
      const response = await fetch(URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const robotMessage = {
          data: data.choices[0].message.content,
          origin: "robot",
        };
        
        return robotMessage;
      } else {
        console.error("Failed to fetch data from the API");
        return { data: "An error occurred.", origin: "robot" };
      }
    } catch (error) {
      console.error("Error in fetching data:", error);
      return { data: "An error occurred.", origin: "robot" };
    }
  };
  return (
    <div
      className={`w-[300px] min-h-screen bg-white/20 backdrop-blur-md absolute flex flex-col justify-end items-center top-0 pb-6 ${
        trayContent_.length > 0
          ? "left-[100px] duration-500 opacity-100"
          : "left-[-300px] duration-200 opacity-0"
      } transition-all shadow-md z-[-1]`}
    >
      {trayContent_ == "Visual" && (
        <div className={`mx-auto grid grid-cols-2 gap-0`}>
          {[1, 2].map((obj_, index) => {
            return (
              <div
                className={`w-[145px] h-[145px] backdrop-blur-sm rounded-[3px] m-[1px] cursor-pointer bg-black/10 hover:bg-black/20 transition-all duration-200 hover:duration-500 flex flex-col justify-center items-center`}
                key={index}
              />
            );
          })}
        </div>
      )}

      {trayContent_ == "Text" && (
        <div
          className={`mx-auto flex flex-col justify-center items-center w-full px-[4px]`}
        >
          {textDB_.map((obj_, index) => {
            return (
              <div
                className={`w-full h-[60px] backdrop-blur-sm rounded-[3px] m-[1px] cursor-pointer bg-black/10 hover:bg-black/20 transition-all duration-200 hover:duration-500 flex flex-col justify-center items-center`}
                key={index}
              >
                {obj_}
              </div>
            );
          })}
        </div>
      )}
      {trayContent_ == "Text" && (
        <div
          className={`w-full h-auto flex flex-col justify-center items-center my-2 px-2`}
        >
          <TextareaAutosize
            className={`text-black/80 text-[14px] font-normal w-full bg-transparent`}
            minRows={3}
            maxRows={3}
            placeholder={`${placeholder_}`}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <div
            className={`w-full h-[10px] flex flex-row justify-center items-center`}
          >
            <div
              className={`w-[120px] min-h-2 py-2 flex flex-row justify-center items-center absolute right-0 cursor-pointer text-black/60 animate-pulse hover:text-black`}
              onClick={async () => {
                updateFinalObjAsync().then(() => {
                    if(finalObj_.misc != ""){
                      console.log(finalObj_);
                      getData().then((d) => {
                        // @ts-ignore
                        setTextDB_([d.data.replace(/\n/g, ' '), ...textDB_])
                      }).finally(() => {
                        console.log('Done..')
                      })
                    }
                    handleClear();
                });
              }}
            >
              <p className={`mr-2 mb-[2px] text-[14px]`}>Proceed</p>
              <FontAwesomeIcon
                icon={faAnglesRight}
                className={`text-[13px] transition-all duration-200 `}
              />
            </div>
          </div>
        </div>
      )}

      {trayContent_ == "Audio" && (
        <div
          className={`mx-auto flex flex-col justify-center items-center w-full px-[4px]`}
        >
          {[1].map((obj_, index) => {
            return (
              <div
                className={`w-full h-[60px] backdrop-blur-sm rounded-[3px] m-[1px] cursor-pointer bg-black/10 hover:bg-black/20 transition-all duration-200 hover:duration-500 flex flex-col justify-center items-center relative`}
                key={index}
              >
                <div
                  className={`w-[60px] h-full flex flex-col justify-center items-center absolute right-0`}
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={`text-white/60 hover:animate-pulse hover:text-white transition-all duration-200 cursor-pointer`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Tray_;
