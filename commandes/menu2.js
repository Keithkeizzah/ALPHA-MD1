const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "menu2", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────《《  ${s.BOT} 》》─────✦
│✰╭─────────────✦
│✰│▸ *𝐁𝐎𝐓-𝐎𝐖𝐍𝐄𝐑* : ${s.OWNER_NAME}
│✰│▸ *𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐄𝐑* : ${nomAuteurMessage} 
│✰╰──────────────☢
│✰│▸ *𝐓𝐎𝐃𝐀𝐘* : ${date}
│✰│▸ *𝐏𝐑𝐄𝐅𝐈𝐗* : ${s.PREFIXE}
│✰│▸ *𝐖𝐎𝐑𝐊𝐓𝐘𝐏𝐄* : ${mode} mode
│✰│▸ *𝐏𝐋𝐔𝐆𝐈𝐍𝐒* : ${cm.length} 
│✰│▸ *𝐑𝐀𝐌* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│✰│▸ *𝐏𝐋𝐀𝐓𝐅𝐎𝐑𝐌* : ${os.platform()}
│✰│▸ *𝐓𝐇𝐄𝐌𝐄 * : *Kᴇɪᴛʜ*
│✰╰──────────────☢
╰──────────────────☢
> 𝐑𝐄𝐆𝐀𝐑𝐃𝐒 `𝐊𝐞𝐢𝐭𝐡`\n${readmore}`;
    
let menuMsg = `

 *𝐀𝐕𝐀𝐈𝐋𝐀𝐁𝐋𝐄 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*${readmore}
`;

    for (const cat in coms) {
        menuMsg += ` ╭──────✦ *${cat}* ✦─────✰`;
        for (const cmd of coms[cat]) {
            menuMsg += `
│✇│ ${cmd}`;
        }
        menuMsg += `
╰────────────···▸▸ \n`
    }

    menuMsg += `> 𝐀𝐋𝐏𝐇𝐀-𝐌𝐃
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *keithkeizzah*, déveloper Keith Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *keithkeizzah*, déveloper Keith Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
