import axios from "axios";
import { LM_STUDIO_URL } from "../../utils/env.utils";


// Gets completions from LM studio using /chat/completions endpoint
export async function getCompletion(userPrompt: string, modelName: string = "qwen2.5-7b-instruct-1m") {
  const data = {
    model: modelName,
    messages: [
      { role: "system", "content": "Always answer in rhymes." },
      { role: "user", "content": userPrompt }
    ],
    temperature: 0.7,
    max_tokens: -1,
    stream: false
  };

  return await axios.post(`${LM_STUDIO_URL}/v1/chat/completions`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

