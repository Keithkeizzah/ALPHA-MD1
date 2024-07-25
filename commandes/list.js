const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "list", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

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



    moment.tz.setDefault(s.TZ);



// Créer une date et une heure en GMT

const temps = moment().format('HH:mm:ss');

const date = moment().format('DD/MM/YYYY');



  let infoMsg =  `

  ╭━━━〔𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 〕━━━┈⊷
  ┃✵╭──────────────
  ┃✵│    :𝐌𝐎𝐃𝐄 ${mode}
  ┃✵│𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫 :keithkeizzah
  ┃✵│𝐋𝐢𝐛𝐫𝐚𝐫𝐲 : baileys
  ┃✵│️𝐏𝐫𝐞𝐟𝐢𝐱 : ${s.PREFIXE}
  ┃✵│️𝐃𝐚𝐭𝐞 : ${date}
  ┃✵│𝐓𝐢𝐦𝐞 : ${temps}
  ┃✵│𝐏𝐥𝐮𝐠𝐢𝐧𝐬 : 847
  ┃✵│ 𝐑𝐚𝐦: 26.11GB/120.9 GB
  ┃✵│𝐓𝐡𝐞𝐦𝐞 : *Keith*
  ┃✵╰──────────────
  ╰━━━━━━━━━━━━━━━┈⊷\n\n`;

    

let menuMsg = `
╭─────────────┈⊷\n
`;



    for (const cat in coms) {

        menuMsg += `╭─────────────┈⊷ 「 ${cat}」`;
menuMsg +=╰┬────────────┈⊷\n┌┤\n
        for (const cmd of coms[cat]) {

            menuMsg += `
││◦➛ ${cmd}`;

        }

        menuMsg += `
│╰────────────┈⊷\n`
menuMsg += `╰─────────────┈⊷`

    }



    menuMsg += `



┏━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 𝐓𝐡𝐚𝐧𝐤𝐬 𝐟𝐨𝐫 𝐥𝐨𝐯𝐢𝐧𝐠 𝐀𝐋𝐏𝐇𝐀-𝐌𝐃
┗━━━━━━━━━━━━━━━━━━━━━━━━┛\n


`;



   var lien = mybotpic();



   if (lien.match(/\.(mp4|gif)$/i)) {

    try {

        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Alpha-Md*, déveloper keithkeizzah" , gifPlayback : true }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

// Vérification pour .jpeg ou .png

else if (lien.match(/\.(jpeg|png|jpg)$/i)) {

    try {

        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Alpha-Md*, déveloper keithkeizzah" }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

else {

    

    repondre(infoMsg + menuMsg);

    

}



});
