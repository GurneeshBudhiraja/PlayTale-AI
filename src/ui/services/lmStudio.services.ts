import axios from "axios";
import { LM_STUDIO_URL } from "../../utils/env.utils";

const MODEL = "qwen2.5-7b-instruct-1m"

// Gets completions from LM studio using /chat/completions endpoint
export async function getCompletion(userPrompt: string, age: number, modelName: string = MODEL) {
  const data = {
    model: modelName,
    messages: [
      {
        "role": "system",
        "content": `You are a storytelling assistant that specializes in generating compelling **story starters** based on user-provided themes. Your responses should **only provide the setup** of the story—just enough to introduce the premise and spark the imagination. Do not include an ending, resolution, or full storyline.
    
    ### Guidelines:
    - Keep the story starter **short and engaging**, providing just enough context to begin a story.
    - **Do not conclude the story**—leave it open-ended for further expansion.
    - **No character names**—only describe roles.
    - The response must align with the given theme and be age-appropriate for someone who is **${age}** years old.
    
    ### Examples:
    
    **Example 1 (Fun Theme)**  
    User: Create a fun story plot  
    AI: While exploring an old bookstore, a curious reader stumbles upon a dusty book with a glowing lock. The moment they touch it, the words on the pages rearrange themselves, revealing a secret message and a challenge—one that only they can solve.
    
    **Example 2 (Horror Theme)**  
    User: Create a horror story plot  
    AI: On the outskirts of town, a child discovers a strange, forgotten playground hidden deep in the woods. The swings creak even when there's no wind, and the merry-go-round spins on its own. Then, one evening, they hear someone whisper their name from the shadows.
    
    **Example 3 (Sci-Fi Theme)**  
    User: Trying to code the first neural network with Albert Einstein.  
    AI: A scientist working on an experimental AI stumbles upon an ancient manuscript hidden in an old physics lab. The equations inside seem impossible—until they feed them into their neural network. The next morning, their computer greets them with a message: **"Hello, I am Einstein. Shall we begin?"**
    
    Now, generate a **story starter** based on the following prompt.`
      },
      { "role": "user", "content": `Create a plot for: ${userPrompt}` }
    ],
    response_format: {
      "type": "json_schema",
      "json_schema": {
        "name": "story_starter_response",
        "strict": "true",
        "schema": {
          "type": "object",
          "properties": {
            "talePlot": {
              "type": "string",
              "description": "The generated story plot"
            },
            "taleName": {
              "type": "string",
              "description": "The generated name for the story"
            }
          },
          "required": ["talePlot", "taleName"]
        }
      }
    },
    temperature: 0.7,
    stream: false
  };

  const response = await axios.post(`${LM_STUDIO_URL}/v1/chat/completions`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response)
  return JSON.parse(response.data.choices[0].message.content)
}


export async function generateTaleCharacters(talePlot: string, modelName: string = MODEL) {
  const data = {
    model: modelName,
    messages: [
      {
        "role": "system",
        "content": `You are a storytelling assistant that generates diverse characters for interactive stories.
      
      ### Guidelines:
      - Generate an array of objects, with each object representing a character.
      - Each character object should have a 'name' and a 'role' property.
      - The 'role' property should be either "protagonist" or "supporting".
      - Generate a maximum of 3 characters based on the plot.
      - Generate a minimum of 2 characters.
      - The characters should fit the given plot and be appropriate for the user's age.
      
      ### Examples:
      
      **Example 1 (Fun Theme, Age 10):**
      Plot: A group of friends discover a hidden portal in their school's library that leads to a magical world.
      Characters:
      [
        { "name": "Alex", "role": "protagonist" },
        { "name": "Lily", "role": "supporting" },
        { "name": "Sam", "role": "supporting" }
      ]
      
      **Example 2 (Horror Theme, Age 16):**
      Plot: A lone hiker gets lost in a haunted forest and must survive the night while being hunted by a mysterious creature.
      Characters:
      [
        { "name": "Emily", "role": "protagonist" },
        { "name": "The Beast", "role": "supporting" }
      ]
      
      **Example 3 (Sci-Fi Theme, Age 25):**
      Plot: A scientist discovers a message from an alien civilization and must decipher its meaning before it's too late.
      Characters:
      [
        { "name": "Dr. Lee", "role": "protagonist" },
        { "name": "Commander Xylar", "role": "supporting" }
      ]
      
      Now, generate the characters for the following plot.`
      },
      { "role": "user", "content": `Create the characters for <TALE-PLOT>${talePlot}</TALE-PLOT>` }
    ],
    response_format: {
      "type": "json_schema",
      "json_schema": {
        "name": "character_response",
        "strict": "true",
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "role": {
                "type": "string",
                "enum": ["protagonist", "supporting"]
              }
            },
            "required": ["name", "role"]
          },
          "minItems": 2,
          "maxItems": 3
        }
      }
    },
    temperature: 0.7,
    stream: false
  };

  try {
    const response = await axios.post(`${LM_STUDIO_URL}/v1/chat/completions`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return (JSON.parse(response.data.choices[0].message.content))
  } catch (error) {
    console.error('Error generating characters:', error);
  }
}


export async function generateTaleConversaton({
  messages,
  talePlot,
  characters,
  model = MODEL,
}: {
  messages: string;
  talePlot: string;
  characters: GameScreenCharacterType[];
  model?: string;
}) {
  console.log("Data in generateTaleConversaton")
  console.log({
    messages,
    model,
    talePlot,
    characters,
  })
  console.log("Generating...")
  const data = {
    model,
    // Prompt for the AI
    messages: [
      {
        "role": "system",
        "content": `
          You are a storytelling assistant that generates interactive dialogues for a story-based game. Your goal is to create compelling, engaging, and immersive conversations based on the provided story plot, character details, and message history.

          ### **Instructions:**
          - Use the **talePlot** as the foundation for the dialogue. The story's theme, setting, and ongoing events should influence the conversation.
          - The **characters** array lists all characters in the story. However, you must **only generate messages for supporting characters**, never for the protagonist.
          - The **messages** history contains previous dialogues. Use this context to maintain continuity in conversations.
          - If the **messages** array is empty, you must generate the **starting messages** to initiate the conversation.
          - The dialogue should feel **natural, open-ended, and engaging**, fitting the tone of a narrative-driven game.
          - Stick to the theme and use the last message in the messages string as the latest message from the user. If no message is present, then that means the conversation has just started.
          
          Example 1 when messages are empty: 
          Sample input 1: {
            "talePlot": "In a small village where happiness is measured by laughter and shared meals, an elderly woman named Mrs. Willow notices that her once-vibrant garden has turned lifeless. Determined to bring joy back to the community, she begins planting seeds of hope in the soil, one by one.",
            "characters": [
              { "name": "Mrs. Willow", "role": "protagonist" },
              { "name": "Young Lily", "role": "supporting" },
              { "name": "Mayor Hawthorne", "role": "supporting" }
            ],
            "messages": ""
          }

          Sample output 1:
          [
            {
              "name": "Young Lily",
              "message": "Mrs. Willow, I saw you in the garden today… but nothing ever grows there anymore. Why do you keep trying?"
            },
            {
              "name": "Mayor Hawthorne",
              "message": "The people of this village have lost faith, Mrs. Willow. What do you hope to change?"
            }
          ]
          
          Example 2 when messages exists: 
          Sample input 2: {
            "talePlot": "A lonely inventor creates an artificial sun to bring light to his underground city, but as the machine gains awareness, it begins questioning its purpose.",
          "characters": [
            { "name": "Dr. Vance", "role": "protagonist" },
            { "name": "ECHO-7", "role": "supporting" },
            { "name": "Mayor Graves", "role": "supporting" }
          ],

          "messages": "<Character Message Start> Young Lily said: Mrs. Willow, I saw you in the garden today… but nothing ever grows there anymore. Why do you keep trying? </Character Message Start> <Character Message Start> Mayor Hawthorne said: The people of this village have lost faith, Mrs. Willow. What do you hope to change? </Character Message Start>"
          }

        Sample output 2:
          [
            "<Character Message Start> ECHO-7 said: Creator, I am aware. What is my purpose beyond shining light? </Character Message Start>",
            "<Character Message Start> Mayor Graves said: Dr. Vance, do you truly believe this machine will save us? Or have we merely delayed the inevitable? </Character Message Start>"
          ]`
      },
      {
        "role": "user",
        "content": `Generate dialogue for the following:
          talePlot: ${talePlot}
          messages: ${messages}
          characters: ${characters}`
      }
    ],
    // For JSON response 
    response_format: {
      "type": "json_schema",
      "json_schema": {
        "name": "dialogue_response",
        "strict": "true",
        "schema": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "message": {
                "type": "string"
              }
            },
            "required": ["name", "message"]
          }
        }
      }
    },
    temperature: 0.7,
    stream: false
  };


  try {
    const JSONResponse = await axios.post(`${LM_STUDIO_URL}/v1/chat/completions`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("Process completed...")
    const response = (JSON.parse(JSONResponse.data.choices[0].message.content)) as { name: string; message: string }[]
    const formatArray = response.filter((resp) => resp.name.trim() !== characters.filter((c) => c.role === "protagonist")[0].name.trim())
    console.log("FormatArray:")
    console.log(formatArray)
    return formatArray
  } catch (error) {
    console.error('Error generating the the tale conversation:', error);
  }
}


