const { zokou } = require("../framework/zokou");
const axios = require("axios");

const config = {
  nomCom: "html",
  reaction: '🤔',
  categorie: 'IA'
};

zokou(config, async (responseHandler, args, context) => {
  const { repondre, arg } = context;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Ask any news update and Alpha bot will send you.");
    }

    const prompt = arg.join(" ");
    const apiResponse = await axios.get(`https://itzpire.com/tools/generate-pageHtml?prompt=${encodeURIComponent(prompt)}`);
    
    // Ensure to check the structure of the response
    const result = apiResponse.data;

    if (result && result.result) {
      // Check if the result is valid HTML
      if (typeof result.result === 'string') {
        repondre(result.result);
      } else {
        repondre("Received response is not in expected format.");
      }
    } else {
      repondre("Error during response generation: No result found.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request.");
  }
});
