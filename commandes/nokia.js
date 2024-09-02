const { zokou } = require("../framework/zokou");
const mumaker = require("mumaker");

zokou({ nomCom: "nokia", categorie: "Logo", reaction: "⚡" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre(`Exemple of using command:\n ${prefixe}Thunder My text`);
    return;
  }

  const text = arg.join(" ");
  mumaker.textpro("https://api.popcat.xyz/nokia?image=", text)
    .then((data) => {
      zk.sendMessage(dest, { image: { url: data.image }, caption: 'Logo by *KEITH-TECH-LOG*' }, { quoted: ms });
    })
    .catch((err) => {
      console.error("An error occurred:", err);
    });
});
