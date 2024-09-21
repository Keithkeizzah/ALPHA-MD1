const { mediafireDl } = require("../framework/dl/Function");
const { zokou } = require("../framework/zokou");
const getFBInfo = require("@xaviabot/fb-downloader")

zokou({ nomCom: 'insta', categorie: "Download" }, async (chatId, bot, { ms, repondre, arg }) => {
  const videoUrl = arg.join(" ");
  if (!videoUrl) {
    repondre("Please insert a *instagram Video Link* for *ALPHA-MD* to download");
    return;
  }

  try {
    const response = await fetch(`https://instadl.giftedtech.workers.dev/?url=${videoUrl}`);
    const data = await response.json();

    if (data?.data?.HD) {
      const videoLink = data.data.HD;
      bot.sendMessage(chatId, {
        video: { url: videoLink },
        caption: "Here is your  Video.\n _Downloaded by_ *ALPHA-MD*"
      }, { quoted: ms });
    }
  } catch (error) {
    repondre("I am unable to download your media. \n " + error);
  }
});
