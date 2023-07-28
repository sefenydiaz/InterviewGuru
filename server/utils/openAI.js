const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  organization: process.env.CHATGPT_ORG_ID,
  apiKey: process.env.CHATGPT_KEY,
});

const openAI = new OpenAIApi(configuration);

module.exports = openAI;
