const {zokou} =require("../framework/zokou");
const axios =require("axios");


zokou({ nomCom: "lyrics",
        reaction: "✨",
        categorie: "Search" }, async (dest, zk, commandeOptions) => {
    
    },
    onStart: async function ({ bot, chatId, args }) {
        const query = args.join(" ");

        if (!query) {
            return bot.sendMessage(chatId, `Please provide a song name. Usage: /lyrics [song_name]`);
        }

        const searchMessage = await bot.sendMessage(chatId, `🔍 Searching for lyrics: ${query}`);

        try {
            const response = await axios.get(`https://samirxpikachuio.onrender.com/lyrics?query=${encodeURIComponent(query)}`);
            const { title, artist, lyrics, image } = response.data;

            await bot.sendMessage(chatId, `Lyrics: ${lyrics}\n\nSong Name: ${title}\n\nWriter: ${artist}`);
            await bot.sendPhoto(chatId, image);
        } catch (error) {
            console.error('[ERROR]', error);
            bot.sendMessage(chatId, 'An error occurred while fetching the lyrics.');
        }

        await bot.deleteMessage(chatId, searchMessage.message_id);
    }
};
