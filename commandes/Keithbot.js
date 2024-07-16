"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "keithbot", reaction: "📷", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '𝘧𝘰𝘭𝘭𝘰𝘸 𝘮𝘺 𝘤𝘩𝘢𝘯𝘯𝘦𝘭\n\n ' + "*https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47*";
    let d = ' #𝐊𝐢𝐧𝐝𝐥𝐲 𝐟𝐨𝐥𝐥𝐨𝐰 𝐠𝐞𝐞😭';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/ac64eb9543937fe3baaf3.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *FLASH-MD* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *France King*'
      let varmess=z+d
      var img='https://telegra.ph/file/13d63c21c1a665bfd8324.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
