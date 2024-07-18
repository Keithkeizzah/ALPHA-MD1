"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "series", reaction: "🖥", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '```𝐇𝐞𝐲 𝐭𝐡𝐢𝐬 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐟𝐢𝐫𝐬𝐭 𝐬𝐭𝐞𝐩 𝐧𝐨𝐰 𝐜𝐥𝐢𝐜𝐤 𝐭𝐡𝐞 𝐥𝐢𝐧𝐤 𝐛𝐞𝐥𝐨𝐰 𝐭𝐨 𝐠𝐞𝐭 𝐲𝐨𝐮𝐫 𝐛𝐞𝐬𝐭 𝐬𝐞𝐫𝐢𝐞𝐬 𝐚𝐧𝐝 𝐦𝐨𝐯𝐢𝐞👇👇```\n\n ' + "*https://t.me/keithseriehub*";
    let d = ' 𝐇𝐨𝐩𝐞 𝐲𝐨𝐮 𝐚𝐫𝐞 𝐧𝐨𝐭 𝐛𝐨𝐫𝐞𝐝😴';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/3a39dc1af75b57409bb43.jpg';
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
