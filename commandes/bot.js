const axios = require('axios');
// Ensure the actual sticker library is required correctly
const { Sticker, StickerTypes } = require('actual-sticker-library');
const { zokou } = require('zokou');

// Replace with your actual bot token
const BOT_TOKEN = 'your_actual_bot_token_here';

zokou({
  nomCom: 'telesticker',
  categorie: 'Search',
  reaction: '🍁'
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg, nomAuteurMessage } = commandeOptions;

  if (!arg[0]) {
    repondre('Where is the request?!');
    return;
  }

  const url = arg[0];
  const packName = url.replace('https://t.me/addstickers/', '');

  try {
    const response = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getStickerSet?name=${encodeURIComponent(packName)}`, {
      headers: { 'User-Agent': 'GoogleBot' }
    });
    const stickers = response.data.result.stickers;
    const hasil = [];

    for (const sticker of stickers) {
      const fileId = sticker.thumb.file_id;
      const fileResponse = await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
      const filePath = fileResponse.data.result.file_path;

      hasil.push({
        status: 200,
        author: 'Xfarr05',
        url: `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`,
      });
    }

    const packname = nomAuteurMessage;
    const gifUrl = hasil[0].url;

    const stickerMess = new Sticker(gifUrl, {
      pack: packname,
      author: 'ALPHA-MD',
      type: StickerTypes.FULL,
      categories: ['🤩', '🎉'],
      id: '12345',
      quality: 60,
      background: 'transparent',
    });
    const stickerBuffer2 = await stickerMess.toBuffer();
    zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms });

  } catch (error) {
    console.error('Error fetching stickers:', error);
    repondre('Error fetching stickers.');
  }
});
