const { zokou } = require("../framework/zokou");
const Genius = require("genius-lyrics");
const Client = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

zokou({
  nomCom: "lyric",
  reaction: '✨',
  categorie: "Search"
}, async (command, reply, message) => {
  const { repondre, arg, ms } = message;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide the song name.");
    }

    const songName = arg.join(" ");
    const searchResults = await Client.songs.search(songName);
    const song = searchResults[0];

    if (!song) {
      return repondre("No results found for the given song name.");
    }

    const lyrics = await song.lyrics();
    const artistName = song.artist.name;
    const title = song.title;

    const responseMessage = `*ALPHA-MD LYRICS FINDER*\n\n*TITLE* - ${title}\n\n*ARTIST* - ${artistName}\n\n${lyrics}`;

    await reply.sendMessage(command, {
      image: {
        url: "./media/lyrics.jpg"
      },
      caption: responseMessage
    }, {
      quoted: ms
    });
  } catch (error) {
    repondre("An error occurred: " + error.message);
    console.error(error);
  }
});
