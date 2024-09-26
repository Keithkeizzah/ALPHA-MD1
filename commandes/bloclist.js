const {
  zokou
} = require("../framework/zokou");
const axios = require('axios');
zokou({
  nomCom: "openai",
  reaction: '📡',
  categorie: 'AI'
}, async (responseHandler, args, meta) => {
  const { repondre, arg, ms } = meta;

  try {
    // Check if there are any arguments provided
    if (!arg || arg.length === 0) {
      return repondre("Please ask a question.");
    }

    // Join the arguments into a query string
    const query = arg.join(" ");
    
    // Fetch response from the external API
    const apiResponse = await axios.get(`https://www.samirxpikachu.run.place/stoicgpt?query=${prompt}`);
    const responseData = apiResponse.data;

    // Check if the response contains data
    if (responseData) {
      repondre(responseData.data);
    } else {
      repondre("Error during response generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request.");
  }
});
