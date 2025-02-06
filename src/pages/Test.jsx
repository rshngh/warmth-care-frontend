import React, { useEffect, useState } from "react";
import openai from "../lib/openai";

const Test = () => {
  const [data, setData] = useState("");
  const checkOpenAIRes = async () => {
    const completion = await openai.chat.completions.create({
      model: "sophosympatheia/rogue-rose-103b-v0.2:free",
      messages: [
        {
          role: "user",
          content: "I am feeling low.",
        },
      ],
    });

    const reply = completion?.choices[0].message.content;
    setData(reply);
  };

  console.log(data);

  useEffect(() => {
    checkOpenAIRes();
  }, []);
  return <div>{data}</div>;
};

export default Test;
