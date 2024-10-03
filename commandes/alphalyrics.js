const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({ nomCom: "lyrics", reaction: "✨", categorie: "Search" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;

    try {
        if (!arg || arg.length === 0) return repondre("Please provide the song name.");

        const question = arg.join(' ');
        const response = await axios.get(`https://www.samirxpikachu.run.place/lyrics?query=${encodeURIComponent(question)}`);

        const data = response.data;

        if (!data || !data.title) return repondre("No songs found for the provided name.");

        const { title, artist, lyrics, image } = data;
        const msg = `*ALPHA MD LYRICS FINDER*\n\n*TITLE* - ${title}\n\n*ARTIST* - ${artist}\n\n${lyrics}`;

        await zk.sendMessage(dest, { image: { url: image }, caption: msg }, { quoted: ms });
    } catch (error) {
        repondre(`An error occurred: ${error.message}`);
        console.log(error);
    }
});
