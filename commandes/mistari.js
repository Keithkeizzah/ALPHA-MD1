const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({ nomCom: "mistari", reaction: "👽", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please ask a question.");
    }

    // Combine arguments into a single string
    const question = arg.join(' ');
    const response = await axios.get(`https://api.cafirexos.com/api/chatgpt`, {
      params: {
        text: question,
        name: "Kaizoku",
        prompt: "" // Add an appropriate value for prompt if needed
      }
    });

    const data = response.data;
    if (data && data.result) {
      repondre(data.result);
    } else {
      repondre("Error during response generation.");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    repondre("Oops, an error occurred while processing your request.");
  }
});
