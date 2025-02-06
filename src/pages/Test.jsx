import React, { useEffect } from "react";

const Test = () => {
  const checkOpenAIRes = async () => {
    const completion = await openai.chat.completions.create({
      model: "sophosympatheia/rogue-rose-103b-v0.2:free",
      messages: [
        {
          role: "user",
          content: "Tell me a joke.",
        },
      ],
    });

    const reply = completion?.choices[0].message.content;
  };

  useEffect(() => {
    checkOpenAIRes();
  }, []);
  return <div>{reply}</div>;
};

export default Test;
