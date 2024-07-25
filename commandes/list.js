const util = require('util'); const fs = require('fs-extra'); const { zokou } = require(__dirname + "/../framework/zokou"); const { format } = require(__dirname + "/../framework/mesfonctions"); const os = require("os"); const moment = require("moment-timezone"); const s = require(__dirname + "/../set"); zokou({ nomCom: "list", categorie: "General" }, async (dest, zk, commandeOptions) => { let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions; let { cm } = require(__dirname + "/../framework//zokou"); var coms = {}; var mode = "public"; if ((s.MODE).toLocaleLowerCase() != "yes") { mode = "private"; } cm.map(async (com, index) => { if (!coms[com.categorie]) coms[com.categorie] = []; coms[com.categorie].push(com.nomCom); }); moment.tz.setDefault('EAT'); // Créer une date et une heure en EAT const temps = moment().format('HH:mm:ss'); const date = moment().format('DD/MM/YYYY'); let infoMsg = ` ╭━━━〔 ${BOT_INFO.split(";")[0]} U+2069〕━━━┈⊷
┃✵╭──────────────
┃✵│ Owner : ${BOT_INFO.split(";")[1]}
┃✵│ User : ${m.pushName.replace( /[\r\n]+/gm, "" )}
┃✵│ Plugins : ${commands.length}
┃✵│ Runtime : ${runtime(process.uptime())}
┃✵│ Mode : ${MODE}
┃✵│ Platform : ${os.platform()}
┃✵│ Ram : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
┃✵│ Version : ${VERSION}
┃✵╰──────────────
╰━━━━━━━━━━━━━━━┈⊷
`
	for (const command in commandslist) {
		msg += `╭─────────────┈⊷
`
		msg += `│ 「 *${await Fancy(command.toUpperCase(), 32)}* 」 `
		msg += `╰┬────────────┈⊷\n┌┤\n`
		for (const plugin of commandslist[command])
			msg += `││◦➛ ${await Fancy(plugin.toLowerCase(), 32)}\n`
		msg += `│╰────────────┈⊷
`
		msg += `╰─────────────┈⊷
` `; var lien = mybotpic(); if (lien.match(/\.(mp4|gif)$/i)) { try { zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms }); } catch (e) { console.log("🥵🥵 Menu erreur " + e); repondre("🥵🥵 Menu erreur " + e); } } // Vérification pour .jpeg ou .png else if (lien.match(/\.(jpeg|png|jpg)$/i)) { try { zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*Ibrahim-tech*" }, { quoted: ms }); } catch (e) { console.log("🥵🥵 Menu erreur " + e); repondre("🥵🥵 Menu erreur " + e); } } else { repondre(infoMsg + menuMsg); } });
