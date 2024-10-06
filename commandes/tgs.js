const { zokou } = require("../framework/zokou");
const axios = require("axios");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

zokou({
  nomCom: "tgs",
  categorie: "Mods",
  desc: "Download Telegram sticker"
}, async (_0x57173b, _0x368836, _0x502677) => {
  const { repondre: respond, arg, nomAuteurMessage: author, superUser } = _0x502677;

  if (!superUser) {
    respond("Only Mods can use this command");
    return;
  }

  if (!arg[0]) {
    respond("Please provide a Telegram sticker link.");
    return;
  }

  const stickerSetName = arg.join(" ").split('/addstickers/')[1];
  const apiUrl = `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(stickerSetName)}`;

  try {
    const response = await axios.get(apiUrl);
    const stickerSet = response.data.result;

    if (!stickerSet) {
      respond("Sticker set not found.");
      return;
    }

    const stickerType = stickerSet.is_animated ? "animated sticker" : "not animated sticker";
    const message = `Alpha-md-stickers-dl\n\n*Name:* ${stickerSet.name}\n*Type:* ${stickerType}\n*Length:* ${stickerSet.stickers.length}\n\nDownloading...`;
    await respond(message);

    for (const sticker of stickerSet.stickers) {
      const fileResponse = await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${sticker.file_id}`);
      const filePath = fileResponse.data.result.file_path;

      const stickerData = await axios({
        method: "get",
        url: `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${filePath}`,
        responseType: "arraybuffer"
      });

      const stickerObject = new Sticker(stickerData.data, {
        pack: author,
        author: '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
        type: StickerTypes.FULL,
        categories: ['🤩', '🎉'],
        id: "12345",
        quality: 50,
        background: '#000000'
      });

      const stickerBuffer = await stickerObject.toBuffer();
      await _0x368836.sendMessage(_0x57173b, { sticker: stickerBuffer }, { quoted: _0x502677.ms });
    }
  } catch (error) {
    respond("We encountered an error:\n" + error.message);
  }
});
