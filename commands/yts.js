const { keith } = require("../keizzah/keith");
const { getytlink, ytdwn } = require("../framework/ytdl-core");
const yts = require("yt-search");
const ytdl = require('ytdl-core');
const fs = require('fs');

keith({ nomCom: "yts", categorie: "Search", reaction: "✋" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("what do you want");
    return;
  }

  try {
    const info = await yts(query);
    const resultat = info.videos;

    let captions = "";
    for (let i = 0; i < 10; i++) {
      captions += `----------------\nTitle: ${resultat[i].title}\nTime : ${resultat[i].timestamp}\nUrl: ${resultat[i].url}\n`;
    }
    captions += "\n======\n*powered by ALPHA-MD*";

    // repondre(captions)
    zk.sendMessage(dest, { image: { url: resultat[0].thumbnail }, caption: captions }, { quoted: ms });
  } catch (error) {
    repondre("Erreur lors de la procédure : " + error);
  }
});
