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
            'name': "cta_url",
            'buttonParamsJson': JSON.stringify({
                'display_text': "FOLLOW OUR SUPPORT CHANNEL",
                'url': "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47"
            })
        },
        {
            'name': "cta_url",
            'buttonParamsJson': JSON.stringify({
                'display_text': "FOLLOW OUR SUPPORT GROUP",
                'url': "https://chat.whatsapp.com/BXVmus83Yfq8SjNv63SAhJ"
            })
        },
        {
            'name': "quick_reply",
            'buttonParamsJson': JSON.stringify({
                'display_text': "Owner 🎗️",
                'id': ".owner"
            })
        },
        {
            'name': "single_select",
            'buttonParamsJson': JSON.stringify({
                'title': "Select Alpha menu",
                'sections': [{
                    'title': "📓 Here are the options 🏩",
                    'highlight_label': "ALPHA-MD",
                    'rows': [
                        { title: ".Menu2", id: ".menu2" },
                        { title: "📧 Owner Menu", id: ".menu3" },
                        { title: "📚 AI-Study Menu", id: ".menu" },
                        { title: "💌 Bot Menu", id: ".owner" },
                        { title: "🧬 Group Menu", id: ".groupmenu" },
                        { title: "📥 DL Menu", id: ".dlmenu" },
                        { title: "🧰 Tools Menu", id: ".toolmenu" },
                        { title: "🎨 Sticker Menu", id: ".stickermenu" },
                        { title: "🎩 Logo Menu", id: ".logomenu" },
                        { title: "🎮 Game Menu", id: ".gamemenu" },
                        { title: ".Owner", id: ".owner" }
                    ]
                }]
            })
        }
    ];

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
            repondre(infoMsg + menuMsg);
        }
    } catch (e) {
        console.error("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
