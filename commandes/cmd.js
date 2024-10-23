const axios = require("axios");
const { zokou } = require(__dirname + "/../framework/zokou");
const os = require('os');
const moment = require("moment-timezone");
const settings = require(__dirname + "/../set");

const readMore = String.fromCharCode(8206).repeat(4001);

const formatUptime = (seconds) => {
    seconds = Number(seconds);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return [
        days > 0 ? `${days} ${days === 1 ? "day" : "days"}` : '',
        hours > 0 ? `${hours} ${hours === 1 ? "hour" : "hours"}` : '',
        minutes > 0 ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}` : '',
        remainingSeconds > 0 ? `${remainingSeconds} ${remainingSeconds === 1 ? "second" : "seconds"}` : ''
    ].filter(Boolean).join(', ');
};

const fetchGitHubStats = async () => {
    try {
        const response = await axios.get("https://api.github.com/repos/Keithkeizzah/ALPHA-MD1");
        const { forks_count: forksCount, stargazers_count: starsCount } = response.data;
        const totalUsers = forksCount * 2 + starsCount * 2;
        return { forks: forksCount, stars: starsCount, totalUsers };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};

const toFancyFont = (text, fontMap) => {
    return text.split('').map(char => fontMap[char] || char).join('');
};

zokou({ nomCom: "sing", categorie: "General" }, async (message, reply, config) => {
    const { respond, senderName } = config;
    const commands = require(__dirname + "/../framework/zokou").cm;
    const categorizedCommands = {};
    const mode = settings.MODE.toLowerCase() !== "public" ? "Private" : "Public";

    commands.forEach(command => {
        const category = command.categorie.toUpperCase();
        if (!categorizedCommands[category]) {
            categorizedCommands[category] = [];
        }
        categorizedCommands[category].push(command.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const currentTime = moment();
    const formattedTime = currentTime.format("HH:mm:ss");
    const formattedDate = currentTime.format("DD/MM/YYYY");
    const currentHour = currentTime.hour();
    
    const greetings = ["Good Morning 🌄", "Good Afternoon 🌃", "Good Evening ⛅", "Good Night 😴"];
    const greeting = currentHour < 12 ? greetings[0] : currentHour < 17 ? greetings[1] : currentHour < 21 ? greetings[2] : greetings[3];

    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

    let responseMessage = `
${greeting}, *${senderName}*

╭─────═[ 𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 ]═─────⊷
┴╭───────────────···
⬡│▸ *Owner:* ${settings.OWNER_NAME}
⬡│▸ *Prefix:* *[ ${settings.PREFIXE} ]*
⬡│▸ *Time:* ${formattedTime}
⬡│▸ *Date:* ${formattedDate}
⬡│▸ *Mode:* ${mode}
⬡│▸ *Time Zone:* Africa/Nairobi
⬡│▸ *Total Users:* ${formattedTotalUsers}
⬡│▸ *RAM:* ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
⬡│▸ *Uptime:* ${formatUptime(process.uptime())}
┬╰────────────────···
╘✦•·············•••••••••···············•••••••••··················•✦
`;

    let commandsList = "*◇SCENE-MD COMMANDS◇*\n";
    const sortedCategories = Object.keys(categorizedCommands).sort();
    let commandIndex = 1;

    for (const category of sortedCategories) {
        const fancyCategory = toFancyFont(category, {
            'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
            'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
        });

        commandsList += `\n*╭──❒⁠⁠⁠⁠  ${fancyCategory}  ❒⁠⁠⁠⁠━━─⊷*\n│╭────────────`;
        
        for (const command of categorizedCommands[category]) {
            const fancyCommandName = toFancyFont(command, {
                'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖',
                'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
            });
            commandsList += `\n│ ${commandIndex++}. ${fancyCommandName}`;
        }
        commandsList += "\n│╰───────────\n╰══════════════⊷\n";
    }

    commandsList += readMore + "\nin honor of Alpha\n";

    try {
        await reply.sendMessage(message, {
            text: responseMessage + commandsList,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: "KEITH TECH BOTS😡",
                    body: "POWERED BY ALPHA",
                    thumbnailUrl: "https://files.catbox.moe/09c9r1.jpg",
                    sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        respond("🥵🥵 Menu error: " + error);
    }
});
