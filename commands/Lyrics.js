const { keith } = require('../keizzah/keith');
const lyricsFinder = require('lyrics-finder');
const yts = require("yt-search");

keith({
    nomCom: "lyrics",
    aliases: ["lyric", "mistari"],
    reaction: "📑"
}, async (zk, dest, context) => {
    const { repondre, arg } = context;

    try {
        if (!arg || arg.length === 0) {
            return repondre("Please provide a song name and artist.");
        }

      
        const searchQuery = arg.join(' ');
        
      
        const info = await yts(searchQuery);
        const results = info.videos;

        if (!results || results.length === 0) {
            return repondre("No results found for the given song or artist.");
        }

      
        const songDetails = searchQuery.split(' ').reverse();
        const title = songDetails.slice(0, songDetails.length - 1).join(' '); 
        const artist = songDetails[songDetails.length - 1]; 

       
        const lyrics = await lyricsFinder(artist, title);

        if (!lyrics) {
            return repondre(`Sorry, I couldn't find any lyrics for "${searchQuery}". Please try another song.`);
        }

      
        const formattedMessage = `
*ALPHA-MD LYRICS FINDER*
*Title:* ${title}
*Artist:* ${artist}

${lyrics}
        `;

        
        await zk.sendMessage(dest, {
            image: { url: results[0].thumbnail },
            caption: formattedMessage
        }, { quoted: zk });

    } catch (error) {
        repondre(`Error: I was unable to fetch the lyrics. Please try again later.\n\n${error.message}`);
        console.log(error);
    }
});
