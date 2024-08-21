"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "deploy", reaction: "🖥", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '```*${s.BOT} DEPLOYMENT STEPS* 
╭───────────────────☆
★When you want to deploy any whatsapp bot check on its repo and check on its deployment procedure and make sure you have the deployment site e.g;  heroku.com , render.com , Koyeb.com and many more:
✔First type the `sc` ,`repo` or `script` command and you will get alpha md repository 
✔From there you are required to get your *Session id* but how,??..\n${readmore}
         𝐇𝐎𝐖 𝐓𝐎 𝐆𝐄𝐓 𝐒𝐄𝐒𝐒𝐈𝐎𝐍 𝐈𝐃
✞ Open this link 👉 https://keith-sessions-pi5z.onrender.com then tap on pair code.
✞ Enter your whatsapp number with the country code e.g;  254711122233 then tap submit 
✞Alpha Md owner , *keithkeizzah* ,will send you the code immediately.Copy the code and whatsapp will bring a notification \n${readmore}
✞Tap on the notification and paste the code that Alpha md owner sent you.
✞ After a successful login Alpha Md owner 😂 keithkeizzah will send you a *session id* .some will wonder where the hell is that session ,,,...It is just right at your inbox /dm {your own number for whatsappp} 😂\n${readmore}
✞Copy the Session id {the one with unreadable codes and long copy it and send it to your deployer or deploy
     𝐇𝐎𝐖 𝐓𝐎 𝐃𝐄𝐏𝐋𝐎𝐘 𝐀𝐋𝐏𝐇𝐀 𝐌𝐃
✔ Now check on Alpha repository in github fork and give a star to this repository before doing anything 🌟or else Alpha Md owner won't allow you to deploy his bot💀.\n${readmore}
✔Tap on heroku deploy tab  given there. First thing you should do is getting your *Heroku Api Key* insert it to the required space .\n${readmore}
✔Enter the valid *heroku app name* and again repeat it to the blank space asking for app name accordingly.Fill everything and press on the below tab `Deploy`
✔In some heroku apps the buld logs might not show but it will eventually deploy \n${readmore}
✔Now click on this devs number and give alpha md owner credits +254748387615 or +254796299159
╰────────────────────☆
> Regards keithkeizzah ```\n\n ' + "https://github.com/keithkeizzah/ALPHA-MD1";
    let d = ' Have a nice time pal';
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
