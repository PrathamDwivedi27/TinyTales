/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "create kids story on description for 5-8 Years kids , Educational story ,and all images in paper cut style: story of boy and Magic School ,give me 5 chapter , with detailed image text prompt for each of chapter and image prompt for story cover book with story name , all in JSON field format   "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "## The Boy and the Magic School\n\nHere's a 5-chapter story with image prompts for each chapter and the book cover, all in JSON format:\n\n```json\n{\n  \"story_name\": \"The Boy and the Magic School\",\n  \"cover_image\": {\n    \"description\": \"A bright, whimsical paper-cut scene. A young boy with wide, curious eyes stands before a grand, colorful castle made of paper. The castle has spires topped with twinkling stars, windows with swirling, rainbow-colored glass, and a sign that reads 'Magic School' in swirling letters. The boy holds a book in his hand, and a tiny, giggling unicorn peeks out from behind him.\",\n    \"style\": \"Paper cut\"\n  },\n  \"chapters\": [\n    {\n      \"chapter_title\": \"A Curious Boy\",\n      \"description\": \"A young boy named Oliver loves to read. He spends hours poring over books about dragons, fairies, and magic. He dreams of a world beyond his ordinary life. One day, while exploring the woods near his home, he stumbles upon a clearing. In the middle of the clearing stands a magnificent, shimmering castle.\",\n      \"image\": {\n        \"description\": \"A paper-cut scene showing Oliver, a boy with brown hair and bright eyes, sitting under a large, leafy tree. He wears a blue shirt and brown shorts, and his hand holds a book open to a page with illustrations of a magical castle. Behind him, a path winds through lush green paper-cut trees, leading towards a faint, shimmering glow in the distance.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Secret Entrance\",\n      \"description\": \"Oliver cautiously approaches the castle. He notices a small, hidden door carved into the side of the building. It’s a door made of swirling, rainbow-colored glass. He presses his hand against it, and the door magically swings open, revealing a hallway filled with shimmering light.\",\n      \"image\": {\n        \"description\": \"A close-up paper-cut scene of the rainbow-colored glass door. The door is partially open, revealing a hallway bathed in shimmering, golden light. Oliver's hand is outstretched, touching the glass. Behind him, the magical castle towers above in a vibrant paper-cut design.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Magic School\",\n      \"description\": \"Inside the castle, Oliver discovers a world of wonder. He meets talking animals, learns how to fly on a broom, and studies spells with other magical students. The school is filled with magic and excitement.\",\n      \"image\": {\n        \"description\": \"A bustling paper-cut scene inside the Magic School. Oliver, dressed in a colorful robe, stands among other students who are all different shapes and sizes. A wise-looking owl wearing a hat sits on a desk, teaching a group of students about potions. In the background, a friendly dragon breathes fire, creating a spectacular light show.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Magical Challenge\",\n      \"description\": \"Oliver's first challenge is to learn how to control his own magic. He struggles at first, but with the help of his friends and teachers, he eventually learns to use his powers for good. He discovers that he can make flowers bloom, heal injured animals, and even control the weather.\",\n      \"image\": {\n        \"description\": \"A paper-cut scene depicting Oliver attempting a spell. He's standing in a magical garden, surrounded by swirling, colorful energy. He's holding his hands out, trying to make a single sunflower bloom. A small, friendly dragon is by his side, offering words of encouragement. In the background, a whimsical paper-cut castle with a colorful sign that reads 'Magic School' stands proudly.\",\n        \"style\": \"Paper cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"A Magical Friend\",\n      \"description\": \"Oliver quickly makes friends with a playful unicorn named Sparkles. They share adventures together, learning about the magic of friendship and the importance of helping others. They learn that magic isn't just about spells and tricks, but about using your powers to make the world a better place.\",\n      \"image\": {\n        \"description\": \"A paper-cut scene showing Oliver and Sparkles, the unicorn, playing in a magical meadow. Oliver is laughing as he rides on Sparkles's back, and Sparkles is happily prancing through the field, leaving a trail of shimmering sparkles. They are surrounded by paper-cut flowers, butterflies, and happy, smiling clouds.\",\n        \"style\": \"Paper cut\"\n      }\n    }\n  ]\n}\n```\n\nThis JSON format contains the story name, cover image description, and five chapter descriptions with image prompts, all in a format ready for use in a paper-cut illustration project. \n"},
          ],
        },
      ],
    });
  
 