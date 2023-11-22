"use client";

export default function Home() {
  const URL = "https://api.openai.com/v1/chat/completions";

  const getData = async (userMessage) => {
    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            `You are a south african car insurance professional educator. Ask questions on car insurance. Provide evaluation on the answer. use a step by step approach to assist. you do not answer any questions unless its about this particular topic: . Reject questions unaligned with this.`,
        },
        {
          role: "user",
          content: `${userMessage.trim()}. Keep your answer short`,
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
    <main className={`w-full min-h-screen pl-[100px]`}>
    <div className={`w-full min-h-screen flex flex-col justify-center items-center`}>
      <div className={`w-[100px] h-[30px] bg-white rounded-[4px] flex flex-col justify-center items-center cursor-pointer`}
      onClick={() => {
        const x = getData('Hello, please help')
        console.log(x)
      }}>

      </div>
      </div>      
    </main>
  );
}