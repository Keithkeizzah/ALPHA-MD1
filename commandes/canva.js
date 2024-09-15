const { zokou } = require("../framework/zokou");
const mumaker = require("mumaker");
const canvacord = require("canvacord");
const { uploadImageToImgur } = require("../framework/imgur");

const clientId = 'b40a1820d63cd4e';

zokou({ nomCom: "manu", categorie: "Modern-Logo", reaction: "🥵" }, async (dest, origineMessage, zk, commandeOptions) => {
  let { ms, arg, prefixe, repondre, auteurMsgRepondu, msgRepondu } = commandeOptions;

  try {
    let imgUrl;
    if (msgRepondu) {
      if (msgRepondu.imageMessage) {
        const image = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        imgUrl = await uploadImageToImgur(image, clientId);
      } else {
        imgUrl = await zk.profilePictureUrl(auteurMsgRepondu, 'image');
      }
    } else {
      imgUrl = "https://i.pinimg.com/564x/84/09/12/840912dd744e6662ab211b8070b5d84c.jpg";
    }

    // Apply a Canvacord effect (you need to choose an actual method from Canvacord library)
    // Example: Using a placeholder for the effect method
    const image = await canvacord.Canvas.wasted(imgUrl); // Replace `wasted` with the desired effect

    await zk.sendMessage(origineMessage, { image: image }, { quoted: ms });

    if (!arg || arg === "") {
      repondre(prefixe + "man-united Alpha Md");
      return;
    }

    const lien = "https://en.ephoto360.com/create-avatar-of-club-football-261.html";
    const imgResult = await mumaker.ephoto(lien, arg.join(' '));
    repondre("Processing ...");
    await zk.sendMessage(dest, { image: { url: imgResult.image }, caption: " *Powered by Alpha Md*" }, { quoted: ms });

  } catch (e) {
    repondre(`An error occurred: ${e.message}`);
  }
});
