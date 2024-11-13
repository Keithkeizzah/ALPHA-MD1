const { keith } = require("../keizzah/keith");
const axios = require("axios");

keith(
  {
    nomCom: "animevid",
    categorie: "Fun",
    reaction: "🎥"
  },
  async (origineMessage, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;
    const jsonURL = "https://widipe.com/download/storyanime";

    try {
      // Fetch data from the API
      const response = await axios.get(jsonURL);
      const data = response.data;

      // Check if the expected fields are in the response
      if (data?.status && data?.result?.url) {
        const videoUrl = data.result.url;
        const caption = "*POWERED BY ALPHA-MD*";

        // Send video message with caption
        await zk.sendMessage(origineMessage, 
          { 
            video: { url: videoUrl }, 
            caption 
          }, 
          { quoted: ms }
        );
      } else {
        // Respond if no video is found in the data
        await repondre("No video found. Please try again later.");
      }
    } catch (error) {
      console.error('Error retrieving data from JSON:', error);
      await repondre('There was an error retrieving the video.');
    }
  }
);
