const { zokou } = require("../framework/zokou");
const axios = require("axios");

const config = {
  nomCom: "breaking",
  reaction: '🤔',
  categorie: 'IA'
};

zokou(config, async (responseHandler, args, context) => {
  const { repondre, arg } = context;

  try {
    if (!arg || arg.length < 2) {
      return repondre("Please provide both artist and title.");
    }

    const [artist, title] = arg; // Assuming the input is in the format: artist title
    const apiResponse = await axios.get(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    const result = apiResponse.data;

    if (result && result.lyrics) {
      repondre(result.lyrics);
    } else {
      repondre("No lyrics found for the specified song.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request.");
  }
});
