const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
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

    moment.tz.setDefault('EAT');

// Créer une date et une heure en EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');
	
	let infoMsg = `╭━━━〔 ${BOT_INFO.split(";")[0]} ⁩〕━━━┈⊷
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
		menuMsg += `╭─────────────┈⊷
`
		menuMsg += `│ 「 *${await Fancy(command.toUpperCase(), 32)}* 」 `
		menuMsg += `╰┬────────────┈⊷\n┌┤\n`
		for (const plugin of commandslist[command])
			msg += `││◦➛ ${await Fancy(plugin.toLowerCase(), 32)}\n`
		menuMsg += `│╰────────────┈⊷
`
		menuMsg += `╰─────────────┈⊷
`
	}
	await message.send(msg);
	/* var img = await parsedUrl(BOT_INFO)
	if (img.length == 0) {
		img = ['https://i.imgur.com/qJUBCYm.jpeg']
	}
	const image = img[Math.floor(Math.random() * img.length)]
	const type = image.endsWith('mp4') ? 'video' : 'image'
	const buttonMessage = {
		[type]: { url: image },
		caption: `${msg}`,
		footer: `${BOT_INFO.split(";")[0] || ' '}`,
		buttons: [{buttonId: prefix + 'ping', buttonText: { displayText: 'Speed Test' }, type: 1},{ buttonId: prefix + 'list', buttonText: { displayText: 'List Commands' }, type: 1}]
	}
	await message.client.sendMessage(message.chat, buttonMessage)
	*/
	
});

const runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " d " : " d ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " m " : " m ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.runtime = runtime;
