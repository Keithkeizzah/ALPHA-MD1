const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: 'blackpink2',
  categorie: "Wallpapers",
  reaction: '😋'
}, async (messageId, replyFunction, { repondre, ms }) => {
  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get("https://api.lolhuman.xyz/api/random/blackpink?apikey=");
      const imageUrl = response.data.url;

      await replyFunction.sendMessage(messageId, {
        image: { url: imageUrl }
      }, { quoted: ms });
    }
  } catch (error) {
    repondre(`Error occurred while retrieving data: ${error}`);
  }
});

zokou({ nomCom: "habari", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre(`Please ask a question Keith will answer it.`);
      }
  
      // Regrouper les arguments en une seule chaîne séparée par "-"
      const question = arg.join(' ');
      const response = await axios.get(`https://api.lolhuman.xyz/api/newsinfo?apikey=`);
      
      const data = response.data;
      if (data) {
        repondre(data.data);
      } else {
        repondre("Error during response generation.");
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oops, an error occurred while processing your request.");
    }
  });

