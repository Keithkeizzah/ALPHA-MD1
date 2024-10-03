
const { zokou } = require("../framework/zokou");
const { default: axios } = require('axios');

zokou({
    nomCom: "lyric",
    reaction: "✨",
    categorie: "Search"
}, async (dest, zk, commandeOptions) => {

    const { repondre, arg, ms } = commandeOptions;

    try {
        if (!arg || arg.length === 0) return repondre("Where is the name of song");

        const apikey = '_0x5aff35,_0x187643';
        const apiurl = 'https://giftedapis.us.kg/api/search/lyrics';

        const response = await fetch(`${apiurl}?query=${arg.join(' ')}&apikey=${apikey}`);
        const result = await response.json();

        if (result.status !== 200 || !result.success) {
            return repondre("No lyrics found");
        }

        const lyrics = result.result;

        const msg = `---------ALPHA-lyrics-finder--------
* *Artist :* ${lyrics.Artist}
* *Title :* ${lyrics.Title}
${lyrics.Lyrics}`;

        zk.sendMessage(dest, { image: { url: './media/lyrics-img.jpg' }, caption: msg }, { quoted: ms });

    } catch (err) {
        repondre('Error');
    }
});
