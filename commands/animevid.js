const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "animevid",
  categorie: "Fun",
  reaction: "🎥"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const jsonURL = "https://widipe.com/download/storyanime";

  try {
    const response = await axios.get(jsonURL);
    const data = response.data;

    if (data.status && data.result) {
      const videoUrl = data.result.url;
      const caption = "*POWERED BY ALPHA-MD*";

      
      await zk.sendMessage(origineMessage, { video: { url: videoUrl }, caption }, { quoted: ms });
    } else {
      repondre("No video found. Please try again later.");
    }
  } catch (error) {
    console.error('Error retrieving data from JSON:', error);
    repondre('Error retrieving data from JSON.');
  }
});
