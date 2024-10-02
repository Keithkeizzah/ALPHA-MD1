const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: 'blackpink2',
  categorie: "Wallpapers",
  reaction: '😋'
}, async (messageId, replyFunction, { repondre, ms }) => {
  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get("https://api.lolhuman.xyz/api/random/blackpink?apikey=beta");
      const imageUrl = response.data.url;

      await replyFunction.sendMessage(messageId, {
        image: { url: imageUrl }
      }, { quoted: ms });
    }
  } catch (error) {
    repondre(`Error occurred while retrieving data: ${error}`);
  }
});
