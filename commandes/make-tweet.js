const { zokou } = require("../framework/zokou");
const axios = require("axios"); // Ensure axios is properly required

zokou({
  'nomCom': "tweet",
  'reaction': '📡',
  'categorie': 'AI'
}, async (context, messageSender, messageData) => {
  const {
    repondre: reply,
    arg: argumentsList,
    ms: message
  } = messageData;

  try {
    if (!argumentsList || argumentsList.length === 0) {
      return reply("Please enter the necessary information to generate the image.");
    }

    const promptText = argumentsList.join(" ");
    
    // Replace `conn` with actual object or import if not defined
    const avatar = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
    const displayName = conn.getName(m.sender);
    const username = m.sender.split('@')[0];
    
    // Define these values or replace with dynamic content as needed
    const replies = '69';
    const retweets = '69';
    const theme = 'dark';

    // Ensure URL is properly encoded
    const imageUrl = `https://some-random-api.com/canvas/misc/tweet?displayname=${encodeURIComponent(displayName)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(promptText)}&replies=${encodeURIComponent(replies)}&retweets=${encodeURIComponent(retweets)}&theme=${encodeURIComponent(theme)}`;
    
    // Ensure context and message are valid
    messageSender.sendMessage(context, {
      'image': {
        'url': imageUrl
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': message
    });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    reply("Oops, an error occurred while processing your request");
  }
});
