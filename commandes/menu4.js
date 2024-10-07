const axios = require("axios");
const { zokou } = require('../framework/zokou');
const { format } = require('../framework/mesfonctions');
const os = require('os');
const moment = require("moment-timezone");
const s = require("../set");

// Style mapping
const styles = {
 '0xa': {
    '0': '0', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
    'a': 'ᴀ', 'b': 'ʙ', 'c': 'ᴄ', 'd': 'ᴅ', 'e': 'ᴇ', 'f': 'ғ', 'g': 'ɢ', 'h': 'ʜ', 'i': 'ɪ', 'j': 'ᴊ',
    'k': 'ᴋ', 'l': 'ʟ', 'm': 'ᴍ', 'n': 'ɴ', 'o': 'ᴏ', 'p': 'ᴘ', 'q': 'ϙ', 'r': 'ʀ', 's': 's', 't': 'ᴛ',
    'u': 'ᴜ', 'v': 'v', 'w': 'ᴡ', 'x': 'x', 'y': 'ʏ', 'z': 'ᴢ', 'A': 'ᴀ', 'B': 'ʙ', 'C': 'ᴄ', 'D': 'ᴅ',
    'E': 'ᴇ', 'F': 'ғ', 'G': 'ɢ', 'H': 'ʜ', 'I': 'ɪ', 'J': 'ᴊ', 'K': 'ᴋ', 'L': 'ʟ', 'M': 'ᴍ', 'N': 'ɴ',
    'O': 'ᴏ', 'P': 'ᴘ', 'Q': 'ϙ', 'R': 'ʀ', 'S': 's', 'T': 'ᴛ', 'U': 'ᴜ', 'V': 'v', 'W': 'ᴡ', 'X': 'x',
    'Y': 'ʏ', 'Z': 'ᴢ'
  }
};

// Apply style to text
const applyStyle = (text, styleId) => {
  const style = styles[styleId];
  return text.split('').map(char => style[char] || char).join('');
};

// Get runtime in a readable format
const runtime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days ? `${days} ${days === 1 ? "day" : "days"}, ` : ''}${hours ? `${hours} ${hours === 1 ? "hour" : "hours"}, ` : ''}${minutes ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}, ` : ''}${secs ? `${secs} ${secs === 1 ? "second" : "seconds"}` : ''}`;
};

// Fetch GitHub stats
const fetchGitHubStats = async () => {
  try {
    const response = await axios.get("https://api.github.com/repos/Keithkeizzah/ALPHA-MD1");
    const { forks_count, stargazers_count } = response.data;
    const totalUsers = (forks_count + stargazers_count) * 2; // Adjusted for clarity
    return { forks: forks_count, stars: stargazers_count, totalUsers };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return { forks: 0, stars: 0, totalUsers: 0 };
  }
};

// Main function for the "menu" command
zokou({
  nomCom: "list",
  categorie: "General"
}, async (message, respond, config) => {
  const { ms, repondre, prefixe, nomAuteurMessage } = config;
  const { cm } = require('../framework/zokou');

  // Prepare command categories
  const commandCategories = {};
  const mode = s.MODE.toLowerCase() === "public" ? 'Public' : 'Private';

  cm.forEach(command => {
    const category = command.categorie.toUpperCase();
    commandCategories[category] = commandCategories[category] || [];
    commandCategories[category].push(command.nomCom.toUpperCase());
  });

  // Get current time and date
  moment.tz.setDefault(s.TZ);
  const time = moment().format('HH:mm:ss');
  const date = moment().format("DD/MM/YYYY");
  const hour = moment().hour();
  
  const greetings = ["Good Night", "Good Morning", "Good Afternoon", "Good Evening"];
  const greeting = greetings[Math.min(3, Math.floor(hour / 6))];

  // Fetch GitHub stats
  const { totalUsers } = await fetchGitHubStats();
  const totalUsersFormatted = totalUsers.toLocaleString();

  // Create the message header
  let messageText = `
*${greeting} ${nomAuteurMessage}*

╭━━━ 〔 𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 〕━━━━┈⊷
┃✵╭──────────────
┃✵│▸ *BOT-OWNER* : ${s.OWNER_NAME}
┃✵│▸ *COMMANDER* : ${nomAuteurMessage}
│✰╰──────────────★
┃✵│▸ *TODAY* : ${date}
┃✵│▸ *TIME* : ${time}
┃✵│▸ *PREFIX* : ${s.PREFIXE}
┃✵│▸ *TOTAL USERS* : ${totalUsersFormatted}
┃✵│▸ *WORKTYPE* : ${mode} mode
┃✵│▸ *PLUGINS* : ${cm.length}
┃✵│▸ *RAM* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃✵│▸ *RUNNING ON* : ${os.platform()}
┃✵│▸ *UPTIME* : ${runtime(process.uptime())}
┃✵│▸ *THEME* : *𝐊𝐄𝐈𝐓𝐇*
┃✵╰──────────────
╰━━━━━━━━━━━━━━━━━┈⊷
> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐊𝐄𝐈𝐓𝐇
${String.fromCharCode(0x200e).repeat(0xfa1)}

*IN HONOR OF ALPHA GOD*
  `;

  // Append commands
  const sortedCategories = Object.keys(commandCategories).sort();
  let commandList = "";
  let commandNumber = 1;

  for (const category of sortedCategories) {
    commandList += `\n*╭──────「 ${applyStyle(category, 0xa)} 」─────┈⊷*\n│╭─────────────┈⊷`;
    commandCategories[category].forEach(command => {
      commandList += ` \n││◦➛  ${commandNumber++}. ${applyStyle(command, 0xa)}`;
    });
    commandList += "\n│╰────────────┈⊷\n╰────────────┈⊷\n";
  }

  messageText += commandList;

  // Send message
  try {
    await respond.sendMessage(message, {
      text: messageText,
      contextInfo: {
        mentionedJid: [nomAuteurMessage],
        externalAdReply: {
          title: "ALPHA MD",
          body: "POWERED BY KEITHKEIZZAH",
          thumbnailUrl: "https://telegra.ph/file/967c663a5978c545f78d6.jpg",
          sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  } catch (error) {
    console.error("Error sending message:", error);
    respond("Error sending message: " + error);
  }
});
