const { zokou } = require("../framework/zokou");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

zokou(
  {
    nomCom: "vision",
    categorie: "General",
    reaction: "🤩"
  },
  async (dest, zk, commandeOptions) => {
    const { ms, msgRepondu, repondre, text: instruction, mime } = commandeOptions;

    try {
      
      // Check if the message is a reply with an attached image
      if (!msgRepondu) {
        return repondre("Send the image, then tag it with the instruction.");
      }

      // Check if the quoted message contains an image
      if (!/image/.test(mime)) {
        return repondre("That is not an image. Try again while quoting an actual image.");
      }

      // Download and save the quoted image
      let savedImagePath = await zk.downloadAndSaveMediaMessage(msgRepondu);
      let imgurLink = await zk.uploadtoimgur(savedImagePath);

      repondre("A moment, Keith is analyzing contents of the image...");

      // Initialize Google Generative AI client with the API key
      const generativeAIClient = new GoogleGenerativeAI("AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14");

      // Helper function to convert image URL to base64
      async function getImageData(url, mimeType) {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const base64Data = Buffer.from(response.data).toString("base64");
        return {
          inlineData: {
            data: base64Data,
            mimeType
          }
        };
      }

      // Configure the model
      const modelConfig = { model: "gemini-1.5-flash" };
      const model = generativeAIClient.getGenerativeModel(modelConfig);

      // Prepare content data for the model
      const imageData = [await getImageData(imgurLink, "image/jpeg")];
      const contentRequest = [imageData];

      // Generate content using the model
      const generatedContent = await model.generateContent(contentRequest);
      const generatedText = generatedContent.response.text();

      // Send the generated text as a reply
      await repondre(generatedText);

    } catch (error) {
      repondre("I am unable to analyze images at the moment.\n" + error);
    }
  }
);
