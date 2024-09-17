const util = require('util');
const fs = require('fs-extra');
const { keith } = require(__dirname + "/../keizzah/keith");
const { format } = require(__dirname + "/../keizzah/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

keith({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    const { cm } = require(__dirname + "/../keizzah/keith");

    const coms = {};
    const mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

    cm.forEach(com => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    const infoMsg = `
╭━━━ 〔 ${s.BOT} 〕━━━━┈⊷
┃✵╭──────────────
┃✵│▸ *BOT-OWNER* : ${s.OWNER_NAME}
┃✵│▸ *COMMANDER* : ${nomAuteurMessage}
│✰╰──────────────★
┃✵│▸ *TODAY* : ${date}
┃✵│▸ *PREFIX* : ${s.PREFIXE}
┃✵│▸ *WORKTYPE* : ${mode} mode
┃✵│▸ *PLUGINS* : ${cm.length}
┃✵│▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃✵│▸ *RUNNING ON* : ${os.platform()}
┃✵│▸ *THEME* : *𝐊𝐄𝐈𝐓𝐇*
┃✵╰──────────────
╰━━━━━━━━━━━━━━━━━┈⊷
> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐊𝐄𝐈𝐓𝐇\n`;

    let menuMsg = `
*𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*
`;

    for (const cat in coms) {
        menuMsg += ` ╭──────「 *${cat}* 」─────┈⊷`;
        coms[cat].forEach(cmd => {
            menuMsg += `
││◦➛ ${cmd}`;
        });
        menuMsg += `
╰───────────────┈⊷ \n`;
    }

    menuMsg += `╰───────────────┈⊷
    *IN HONOR OF ALPHA*
`;

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
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
