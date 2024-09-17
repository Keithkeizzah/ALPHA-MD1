const { keith } = require(__dirname + "/../keizzah/keith");
const { format } = require(__dirname + "/../keizzah/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

keith({ nomCom: "repo", categorie: "General", aliases: ['sc', "script"] }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    const { cm } = require(__dirname + "/../keizzah/keith");

    // Determine mode
    const mode = s.MODE.toLowerCase() === "yes" ? "public" : "private";

    // Categorize commands (if necessary elsewhere)
    const coms = {};
    cm.forEach(com => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

    // Generate date and time
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Prepare messages
    const infoMsg = `
Hello ${nomAuteurMessage},👋 This is 𝐀𝐋𝐏𝐇𝐀-𝐌𝐃, the best bot in the universe developed by Kᴇɪᴛʜ Kᴇɪᴢᴇᴢᴀʜ. Fork and give a star 🌟 to my repo
╭─────────────────☆
│❍ *Developer* : Keithkeizzah
│❍ *Repo* : https://github.com/keithkeizzah/ALPHA-MD1
│
│❍ *Session* : https://keith-sessions-pi5z.onrender.com
│
│❍▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│❍ *Youtube* : https://youtube.com/@keithkeizzah
│❍ *Channel* : https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47
│
│❍ *Telegram* : https://t.me/keithmd
│
> Regards, Keithkeizzah
╰──────────────────☆`;

    const menuMsg = `
     𝐑𝐞𝐠𝐚𝐫𝐝𝐬 𝐊𝐄𝐈𝐓𝐇 𝐊𝐄𝐈𝐙𝐙𝐀𝐇`;

    const lien = mybotpic();

    try {
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, { video: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *keithkeizzah*, développeur Keith Tech", gifPlayback: true }, { quoted: ms });
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(dest, { image: { url: lien }, caption: infoMsg + menuMsg, footer: "Je suis *keithkeizzah*, développeur Keith Tech" }, { quoted: ms });
        } else {
            repondre(infoMsg + menuMsg);
        }
    } catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
