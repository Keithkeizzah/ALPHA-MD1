const { zokou } = require("../framework/zokou");
const axios = require('axios');

zokou({
  'nomCom': "technews",
  'reaction': '🗼',
  'categorie': 'News'
}, async (command, message, context) => {
  const {
    reply: replyToUser,
    messageQuote: quotedMessage
  } = context;

  try {
    // Fetching tech news from the API
    const response = await axios.get("https://fantox001-scrappy-api.vercel.app/technews/random");
    const data = response.data;
    const { thumbnail, news } = data;

    // Preparing the message content
    const messageContent = `*ALPHA-MD*\n\n${news}\n\n> *Powered by keithkeizzah*`;

    // Sending the message with an image and caption
    await message.sendMessage(command, {
      'image': {
        'url': thumbnail
      },
      'caption': messageContent
    }, {
      'quoted': quotedMessage
    });

  } catch (error) {
    console.error("Error fetching tech news:", error);
    await replyToUser("Sorry, there was an error retrieving the news. Please try again later.\n" + error);
  }
});
