const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require('os');
const moment = require('moment-timezone');
const s = require(__dirname + "/../set");
const more = String.fromCharCode(0x200e);
const readmore = more.repeat(0xfa1);

zokou({ 'nomCom': "commands", 'categorie': "General" }, async (_0x559c4c, _0x19862f, _0x2ba745) => {
  const { ms, repondre, prefixe, nomAuteurMessage } = _0x2ba745;
  const { cm } = require(__dirname + '/../framework/zokou');
  const categories = {};
  const mode = s.MODE.toLowerCase() !== "public" ? 'Private' : 'Public';

  cm.forEach(item => {
    const categoryName = item.categorie.toUpperCase();
    if (!categories[categoryName]) {
      categories[categoryName] = [];
    }
    categories[categoryName].push(item.nomCom);
  });

  moment.tz.setDefault(`${s.TZ}`);
  const currentTime = moment();
  const formattedTime = currentTime.format("HH:mm:ss");
  const formattedDate = currentTime.format("DD/MM/YYYY");
  const currentHour = currentTime.hour();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  let responseMessage = `
╭────《《  ${s.BOT} 》》─────★
│✰╭─────────────★
│✰│▸ *BOT-OWNER* : ${s.OWNER_NAME}
│✰│▸ *COMMANDER* : ${nomAuteurMessage} 
│✰╰──────────────★
│✰│▸ *TODAY* : ${date}
│✰│▸ *PREFIX* : ${s.PREFIXE}
│✰│▸ *WORKTYPE* : ${mode} mode
│✰│▸ *PLUGINS* : ${cm.length} 
│✰│▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│✰│▸ *RUNNING ON* : ${os.platform()}
│✰│▸ *THEME* : *𝐊𝐄𝐈𝐓𝐇*
│✰╰──────────────★
╰──────────────────★
𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐊𝐄𝐈𝐓𝐇
`;

  let commandList = readmore + `

𝗔𝗩𝗔𝗜𝗟𝗔𝗕𝗟𝗘 𝗔𝗟𝗣𝗛𝗔 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦

`;

  for (const category in categories) {
    commandList += `*╭──────★* *${category}* *★─────✰*`;
    categories[category].forEach(command => {
      commandList += `\n*│★│* ${command}`;
    });
    commandList += `\n*╰────────────···▸▸* \n`;
  }

  commandList += `
𝐈𝐧 𝐡𝐨𝐧𝐨𝐫 𝐨𝐟 𝐀𝐥𝐩𝐡𝐚 𝐆𝐨𝐝
`;

  try {
    await _0x19862f.sendMessage(_0x559c4c, {
      text: responseMessage + commandList,
      contextInfo: {
        mentionedJid: [nomAuteurMessage],
        externalAdReply: {
          title: '',
          body: "keithkeizzah",
          thumbnailUrl: "https://files.catbox.moe/6yj2cj.jpg",
          sourceUrl: 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47',
          mediaType: 1,
          rendersmallThumbnail: true,
        },
      },
    });
  } catch (error) {
    console.log("🥵🥵 Menu error: " + error);
    repondre("🥵🥵 Menu error: " + error);
  }
});
