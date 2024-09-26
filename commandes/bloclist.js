const { zokou } = require("../framework/zokou");
const axios = require('axios');

zokou({
  nomCom: "openai",
  reaction: '📡',
  categorie: 'AI'
}, async (responseHandler, args, meta) => {
  const { repondre, arg } = meta;

  // Check if there are any arguments provided
  if (!arg || arg.length === 0) {
    return repondre("Please ask a question.");
  }

  // Join the arguments into a query string
  const query = arg.join(" ");

  try {
    // Fetch response from the external API
    const { data } = await axios.get(`https://api.cafirexos.com/api/chatgpt`, {
      params: { text: query }
    });

    // Check if the response contains data
    if (data && data.data) {
      repondre(data.data);
    } else {
      repondre("Error during response generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request.");
  }
});
