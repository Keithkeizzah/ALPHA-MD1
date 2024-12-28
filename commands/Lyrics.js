const { keith } = require('../keizzah/keith');
const lyricsFinder = require('lyrics-finder');
const yts = require('yt-search');

keith({
    nomCom: 'lyrics',
    aliases: ['lyric', 'mistari'],
    reaction: '📑'
}, async (zk, dest, ms, context) => {
    const { repondre, arg } = context;

    try {
        // Check if the argument is provided
        if (!arg || arg.length === 0) {
            return repondre('Please provide a song name and artist.');
        }

        const searchQuery = arg.join(' ');

        // Search for the video on YouTube
        const info = await yts(searchQuery);
        const results = info.videos;

        // Check if no results are found
        if (!results || results.length === 0) {
            return repondre('No results found for the given song or artist.');
        }

        // Extract the song title and artist
        const songDetails = searchQuery.split(' ').reverse();
        const title = songDetails.slice(0, songDetails.length - 1).join(' ');
        const artist = songDetails[songDetails.length - 1];

        // Find lyrics using lyrics-finder
        const lyrics = await lyricsFinder(artist, title);

        // Check if lyrics are found
        if (!lyrics) {
            return repondre(`Sorry, I couldn't find any lyrics for "${searchQuery}". Please try another song.`);
        }

        // Format the message with lyrics and song details
        const formattedMessage = `
*ALPHA-MD LYRICS FINDER*
*Title:* ${title}
*Artist:* ${artist}

${lyrics}
        `;

        // Send the message with video thumbnail and lyrics
        await zk.sendMessage(dest, {
            image: { url: results[0].thumbnail },
            caption: formattedMessage
        }, { quoted: ms });

    } catch (error) {
        repondre(`Error: I was unable to fetch the lyrics. Please try again later.\n\n${error.message}`);
        console.log(error);
    }
});
