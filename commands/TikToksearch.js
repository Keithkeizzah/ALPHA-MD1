const { keith } = require('../keizzah/keith');
const axios = require("axios");

keith({
  nomCom: "tiktoksearch",
  aliases: ["tiksearch", "tiktoklist"],
  categorie: "search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  // Check if there is a query in the arguments
  if (!arg || !arg[0]) {
    return repondre('Please provide a query!');
  }

  try {
    // URL for the TikTok search API
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(arg.join(' '))}`;
    const response = await axios.get(searchApiUrl);

    // Check if response data is valid and contains search results
    const searchData = response.data.data;
    if (!searchData || searchData.length === 0) {
      return repondre("No TikTok search results found.");
    }

    // Construct TikTok search message
    let searchMessage = `𝐀𝐋𝐏𝐇𝐀 𝐌𝐃 𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇\n\n`;

    // Loop through search results and construct track info with numbers
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*┃${trackNumber}.* ${track.title}\n`;
      searchMessage += `*┃Region*: ${track.region || "Unknown"}\n`;
      searchMessage += `*┃ID*: ${track.id}\n`;  // `id` is the video ID
      searchMessage += `*┃Video URL*: ${track.url}\n`;
      searchMessage += `*┃Cover Image*: ${track.cover}\n`;
      searchMessage += `*┃Views*: ${track.views || 0}\n`;
      searchMessage += `*┃Likes*: ${track.likes || 0}\n`;
      searchMessage += `*┃Comments*: ${track.comments || 0}\n`;
      searchMessage += `*┃Shares*: ${track.share || 0}\n`;
      searchMessage += `*┃Download Count*: ${track.download || 0}\n`;
      searchMessage += `───────────────────◆\n\n`;
    });

    // Send the playlist message
    await zk.sendMessage(
      dest,
      {
        text: searchMessage,
        contextInfo: {
          mentionedJid: [dest],
          externalAdReply: {
            showAdAttribution: true,
            title: "ALPHA MD TIKTOK SEARCH",
            body: "Powered by KeithKeizzah",
            sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      },
    );
  } catch (error) {
    // Log and respond with error message
    console.error(error);  // Log the error to the console
    repondre(`Error: ${error.message || 'Something went wrong.'}`);
  }
});
