const { zokou } = require("../framework/zokou");
var mumaker = require("mumaker");

zokou({nomCom:"christmasvibe",categorie:"Modern-Logo",reaction:"🥵"}, async(dest, zk, commandeOptions) => {

  let {ms, arg, prefixe, repondre} = commandeOptions;
  try {
    if (!arg || arg == "") {
      repondre(prefixe + "christmas Alpha Md"); return;
    }

    var lien = "https://en.ephoto360.com/create-a-funny-christmas-video-card-with-santa-claus-815.html";

    var video = await mumaker.ephoto(lien, arg.join(' '));
    repondre("processing ...");
    await zk.sendMessage(dest, {video: {url: video.video}, caption: " *Powered by Alpha Md*"},{quoted: ms});
  } catch (e) {
    repondre(e);
  }
});
