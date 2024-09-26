const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "mistari",
  reaction: '✨',
  categorie: "Search"
}, async (messageId, chatId, { repondre, arg, ms }) => {
  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide me the song name.");
    }

    const songName = arg.join(" ");
    const searchResults = await Client.songs.search(songName);
    const firstResult = searchResults[0];

    if (!firstResult) {
      return repondre(`I did not find any lyrics for "${songName}". Try searching a different song.`);
    }

    const query = firstResult.title; // Use the title of the first search result
    const response = await axios.get(`https://samirxpikachuio.onrender.com/lyrics?query=${encodeURIComponent(query)}`);
    
    if (response.data && response.data.lyrics) {
      const lyrics = response.data.lyrics;
      await chatId.sendMessage(messageId, {
        text: lyrics
      }, {
        quoted: ms
      });
    } else {
      repondre("Sorry, I couldn't find the lyrics for that song.");
    }
  } catch (error) {
    console.error(error);
    repondre("An error occurred while fetching the lyrics.");
  }
});
