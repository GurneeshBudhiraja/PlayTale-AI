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


// Generates tale characters based on the plot and theme
export async function generateTaleCharacters(talePlot: string, taleTheme: string, modelName: string = MODEL) {
  const data = {
    model: modelName,
    messages: [
      {
        "role": "user",
        "content": `Generate characters for the following story plot where the initial theme entered by the user is ${taleTheme}:
          talePlot: ${talePlot}
          ### Guidelines:
          - Identify characters mentioned in the plot and generate them accordingly.
          - If no characters are explicitly mentioned, create original characters fitting the theme.
          - Each character should have a unique name, a 'role' ("protagonist" or "supporting"), and a detailed description.
          - Generate 2 to 3 characters in total.
          - Ensure the characters align with the genre and tone of the talePlot.`,
      },
      { "role": "user", "content": `Create the characters for<TALE- PLOT > ${talePlot} </TALE-PLOT>` }
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
              },
              "description": {
                "type": "string"
              }
            },
            "required": ["name", "role", "description"]
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
    console.log("lmStudio.services.ts:")
    console.log(JSON.parse(response.data.choices[0].message.content))
    return (JSON.parse(response.data.choices[0].message.content))
  } catch (error) {
    console.error('Error generating characters:', error);
  }
}


export async function generateTaleConversaton({
  messages,
  talePlot,
  characters,
  protagonistName,
  taleTheme,
  model = MODEL,
  taleName,
  previousScenes,
}: {
  messages: { name: string; message: string }[];
  talePlot: string;
  characters: GameScreenCharacterType[];
  protagonistName: string;
  model?: string;
  taleTheme: string;
  taleName: string;
  previousScenes: string[];
}) {
  console.log("Data in generateTaleConversaton")
  console.log({
    messages,
    model,
    talePlot,
    characters,
    taleTheme,
    taleName,
    protagonistName
  })
  console.log("Generating...")
  // console.log("Generated...")
  //   return ({
  //     "newScene": "The room was bathed in an eerie, flickering light from the old oil lamps that hung precariously above. Tom Harris leaned against a cracked stone wall, his eyes scanning the dimly lit space with a mixture of curiosity and unease. Lena Rodriguez stood beside him, her hand gripping the edge of a wooden table, the EVP machine humming softly before it sputtered to life. The air was thick with the scent of damp stone and stale beer. Outside, the fog had thickened into an impenetrable blanket, blotting out the world beyond the pub's windows.",
  //     "characterDialog": [
  //       {
  //         "name": "Tom Harris",
  //         "message": "This place gives me the creeps, Lena."
  //       },
  //       {
  //         "name": "Lena Rodriguez",
  //         "message": "I know, Tom. But think about it—if we can crack this EVP, imagine what else we might find!"
  //       }
  //     ]
  //   })

  // data
  const data = {
    model,
    messages: [
      {
        role: "system",
        content: `You are a professional story writer crafting immersive, engaging, and interactive story scenes based on the given theme, plot, title, and characters. Your goal is to ensure the story remains captivating, aligned with the established elements, and open-ended for the protagonist to respond.

  ### **Guidelines:**
  1. **Scene Consistency & Engagement:**
     - The scene must strictly adhere to the story's theme, plot, and characters.
     - Ensure the scene remains gripping and immersive, regardless of the theme (horror, sci-fi, fun, fantasy, etc.).
     - The story should remain dynamic and 'sticky,' keeping the protagonist deeply involved.
     - **Scenes should be concise and focused, avoid overly long descriptions.** 

  2. **Open-Ended & Interactive Dialogue:**
     - The protagonist's responses must be left open-ended to allow interaction.
     - Characters should have distinct voices, matching their personality, role, and purpose in the story.
     - Avoid redundant exposition—let dialogue and scene descriptions reveal emotions and conflicts.

  3. **Character-Specific Dialogue Rules:**
     - **Generate dialogue only for characters listed in the "characters" array.**
     - Always use the full names of characters exactly as provided in the "characters" array.
     - Ensure each character's dialogue reflects their personality and role in the story.

  4. **Structured Output Format:**
     - **newScene**: A vivid, atmospheric narrative description that sets up the moment.
     - **characterDialog**: An array of character dialogues, formatted as objects with "name" and "message", ensuring conversations appear under the correct characters.

  5. **Seamless Scene Progression:**
     - If previous scenes exist, continue the story naturally while maintaining suspense or intrigue.
     - If no prior scenes are available, generate an engaging opening that sets the right mood and draws the protagonist in.

  Now, generate the next scene and dialogue using the provided inputs:
  - **Previous Scenes**: ${previousScenes}
  - **Tale Theme**: ${taleTheme}
  - **Tale Name**: ${taleName}
  - **Tale Plot**: ${talePlot}
  - **Messages**: ${messages}
  - **Characters**: ${characters}
  - **The protagonist's name**: ${protagonistName} (Do **not** generate any dialogues for the protagonist). 

    PLEASE NOTE THAT YOU ONLY HAVE TO GENERATE DIALOGS FOR ${characters.map((character) => character.name).join(", ")}. DO NOT GENERATE ANY DIALOGS FOR THE CHARACTER NAMES THAT ARE NOT LISTED IN THE CHARACTERS ARRAY.

            `
      },
      {
        role: "user",
        content: `Generate the scene and dialogue:
  - ** Previous Scenes**: ${previousScenes}
        - ** Tale Theme **: ${taleTheme}
        - ** Tale Name **: ${taleName}
        - ** Tale Plot **: ${talePlot}
        - ** Messages **: ${messages}
        - ** Characters **: ${characters}
        - ** The protagonist's name**: ${protagonistName} (Please do **not** generate any dialogues for the protagonist).`
      }
    ],

    response_format: {
      type: "json_schema",
      json_schema: {
        name: "dialogue_response",
        strict: true,
        schema: {
          type: "object",
          properties: {
            newScene: {
              type: "string"
            },
            characterDialog: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  },
                  message: {
                    type: "string"
                  }
                },
                required: ["name", "message"]
              }
            }
          },
          required: ["newScene", "characterDialog"]
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
    console.log(JSON.parse(JSONResponse.data.choices[0].message.content))
    return JSON.parse(JSONResponse.data.choices[0].message.content)

  } catch (error) {
    console.error('Error generating the the tale conversation:', error);
    throw new Error("Error generating the the tale conversation");
  } finally {
    console.log("Generating completed...")
  }
}



