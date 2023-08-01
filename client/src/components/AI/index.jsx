import { useState } from "react"
// const { Configuration, OpenAIApi } = require("openai");
import { Configuration, OpenAIApi } from "openai";

const AiInterviewer = () => {
  const configuration = new Configuration({
    apiKey: process.env.CHATGPT_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });
      //console.log("response", result.data.choices[0].text);
      setApiResponse(result.data.choices[0].text);
    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  return (
//figure out chakra to return
<>
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '100vh',
  }}
>
  <form onSubmit={handleSubmit}>
    <textarea
      type="text"
      value={prompt}
      placeholder="Please ask to openai"
      onChange={(e) => setPrompt(e.target.value)}
    ></textarea>
    <button
      disabled={loading || prompt.length === 0}
      type="submit"
    >
      {loading ? "Generating..." : "Generate"}
    </button>
  </form>
</div>
{apiResponse && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <pre>
      <strong>API response:</strong>
      {apiResponse}
    </pre>
  </div>
)}
</>
);
};


export default AiInterviewer;