const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);
const pkg = require("@whiskeysockets/baileys");
const { generateWAMessageFromContent, proto } = pkg;

zokou({ nomCom: "allmenu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    const { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};
    let mode = s.MODE.toLowerCase() === "yes" ? "public" : "private";

    cm.forEach(com => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    const infoMsg = `
*${s.BOT} AVAILABLE MENUS* 
╭─────────────────☆
│❍╭─────────────☆
│❍│▸ *MENU1* 
│❍│▸ *MENU2* 
│❍│▸ *MENU3*
│❍╰──────────────☆
│❍│▸ *PLUGINS* : ${cm.length} 
│❍│▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│❍│▸ *SAVER* : ${os.platform()}
│❍│▸ *THEME* : *KEITH*
│❍╰──────────────☆
╰──────────────────☆
> 𝐀𝐋𝐏𝐇𝐀-𝐌𝐃
> 𝐑𝐞𝐠𝐚𝐫𝐝𝐬 𝐊𝐞𝐢𝐭𝐡\n${readmore}`;

    const menuMsg = `
> Hello ${nomAuteurMessage},,, Type menu1, menu2 or menu3 to access a list of Alpha commands.
  
╰───────────────────☆`;

    const buttons = [
        {
            buttonId: '.owner',
            buttonText: { displayText: "Owner 🎗️" },
            type: 1
        },
        {
            buttonId: '.menu2',
            buttonText: { displayText: "📓 Menu2" },
            type: 1
        },
        {
            buttonId: '.menu3',
            buttonText: { displayText: "📧 Owner Menu" },
            type: 1
        },
        {
            buttonId: '.groupmenu',
            buttonText: { displayText: "🧬 Group Menu" },
            type: 1
        },
        {
            buttonId: '.stickermenu',
            buttonText: { displayText: "🎨 Sticker Menu" },
            type: 1
        }
    ];

    const buttonMessage = {
        text: infoMsg + menuMsg,
        footer: "Je suis *keithkeizzah*, développeur Keith Tech",
        buttons: buttons,
        headerType: 1
    };

    const lien = mybotpic();

    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: lien },
                caption: infoMsg + menuMsg,
                footer: "Je suis *keithkeizzah*, développeur Keith Tech",
                gifPlayback: true
            }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, {
                image: { url: lien },
                caption: infoMsg + menuMsg,
                footer: "Je suis *keithkeizzah*, développeur Keith Tech"
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, buttonMessage, { quoted: ms });
        }
    } catch (e) {
        console.error("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
