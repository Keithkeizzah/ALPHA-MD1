const { keith } = require('../keizzah/keith');
const traduire = require("../keizzah/traduction");
const axios = require('axios'); // Use axios directly for HTTP requests

// Set up the command with the name 'gpt3' and the emoji reaction '🪅'
keith({ nomCom: "gpt3", reaction: "🪅", categorie: "AI" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  // Check if arguments are provided
  if (!arg || arg.length === 0) {
    return repondre('Hello 🖐️.\n\n What help can I offer you today?');
  }

  try {
    // Combine the arguments into a single string for the prompt
    const prompt = arg.join(' ');

    // Call the external API to get the response
    const response = await axios.get(`https://api.gurusensei.workers.dev/llama`, {
      params: { prompt: prompt }
    });

    // Ensure the API returns a valid response
    if (response.data && response.data.response && response.data.response.response) {
      const answer = response.data.response.response;

      // Send the response to the destination (zk.sendMessage)
      await zk.sendMessage(dest, answer, {
        messageId: ms.key.id
      });

    } else {
      throw new Error('Invalid response from the API.');
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error:', error);
    repondre('Sorry, I encountered an error while processing your request. Please try again later.');
  }
});
