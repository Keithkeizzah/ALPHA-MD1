const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "wachannel",
  reaction: '🌞',
  categorie: "General"
}, async (context, zk, message, params) => {
  const { respond, arg } = params;
  const reference = arg.join(" ");
  
  if (!reference) {
    return respond("Please provide a channel link to stalk.");
  }
  
  if (!reference.includes('whatsapp.com/channel')) {
    return respond("Doesn't look like a WhatsApp channel link, huh?");
  }
  
  try {
    const response = await axios.get(`https://itzpire.com/stalk/whatsapp-channel?url=${encodeURIComponent(reference)}`);
    
    if (!response.data || !response.data.data) {
      return respond("Unable to retrieve data. Please check the channel link.");
    }
    
    const { img, title, followers, description } = response.data.data;
    
    await zk.sendMessage(
      message.chat, 
      {
        image: { url: img },
        caption: `Channel Name: ${title}\n\nFollowers: ${followers}\n\nDescription: ${description}`
      },
      { quoted: message }
    );

  } catch (error) {
    console.error(error);
    await respond("An error occurred: " + error.message);
  }
});
