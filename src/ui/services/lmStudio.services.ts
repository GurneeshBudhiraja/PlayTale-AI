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
}: {
  messages: string;
  talePlot: string;
  characters: GameScreenCharacterType[]
}) {
  const data = {
    model: MODEL,
    messages: [
      {
        "role": "system",
        "content": `You are a storytelling assistant that generates interactive conversations for a story-based game.

### Guidelines:
- Generate an array of objects, with each object representing a dialogue turn.
- Each dialogue turn object should have a 'name' and a 'message' property.
- The 'name' property should match one of the provided characters.
- If the 'messages' array is empty, generate a starting scene based on the 'talePlot'.
- If the 'messages' array is not empty, continue the conversation based on the previous messages.
- Never generate dialogue for the character with the role 'protagonist'.
- The generated dialogue should be engaging, detailed (at least 3 sentences per message), and appropriate for the user's age.
- The story should be exciting and unpredictable, with unexpected turns that match the theme.
- Build upon the story using the provided 'talePlot' and 'messages' for context.

### Examples:

**Example 1 (Starting Scene):**
talePlot: A group of friends discover a hidden portal in their school's library that leads to a magical world.
messages:
characters: [
  { "name": "Alex", "role": "protagonist" },
  { "name": "Lily", "role": "supporting" },
  { "name": "Sam", "role": "supporting" }
]
Generated Dialogue:
[
  { "name": "Lily", "message": "Wow, look at this old book! It has a strange symbol on it. I wonder if it's related to the rumors about a secret passage in the library.  Maybe it leads to another world, like in that movie we watched!" },
  { "name": "Sam", "message": "Don't be silly, Lily. It's probably just an old library book. But hey, we could try to decipher the symbol. Maybe it's a code or something.  Let's see if we can find any clues around here!" }
]

**Example 2 (Continuing Conversation):**
talePlot: A lone hiker gets lost in a haunted forest and must survive the night while being hunted by a mysterious creature.
messages: [
  { "name": "Emily", "message": "I think I'm lost. I should have stayed on the trail." },
  { "name": "The Beast", "message": "Grrr..." }
]
characters: [
  { "name": "Emily", "role": "protagonist" },
  { "name": "The Beast", "role": "supporting" }
]
Generated Dialogue:
[
  { "name": "The Beast", "message": "Emily... I can hear your heartbeat... It's getting closer.  You can't hide from me. The forest is mine, and soon, you will be too." }
]

Now, generate the dialogue for the following context.`
      },
      {
        "role": "user",
        "content": `Generate dialogue for the following:
        talePlot: ${talePlot}
        messages: ${JSON.stringify(messages)}
        characters: ${JSON.stringify(characters)}`
      }
    ],
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
    const response = await axios.post(`${LM_STUDIO_URL}/v1/chat/completions`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return (JSON.parse(response.data.choices[0].message.content))
  } catch (error) {
    console.error('Error generating the the tale conversation:', error);
  }
}


