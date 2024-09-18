const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "repo3",
  aliases: ['sc', 'script'],
  reaction: '🖕',
  nomFichier: __filename
}, async (messageId, sendMessage, context) => {
  const { repondre: respond, auteurMessage: authorMessage } = context;

  try {
    const response = await fetch("https://api.github.com/repos/Keithkeizzah/ALPHA-MD1");
    const repoData = await response.json();

    if (response.ok && repoData) {
      const repoInfo = {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        update: repoData.updated_at,
        owner: repoData.owner.login
      };

      const releaseDate = new Date(repoData.created_at).toLocaleDateString('en-GB');
      const messageText = `*Hello ${authorMessage},* 👋 This is 𝐀𝐋𝐏𝐇𝐀-𝐌𝐃, the best bot in the universe developed by Kᴇɪᴛʜ Kᴇɪᴢᴢᴀʜ. Please fork and give a star 🌟 to my repo.\n\n` +
        `_________________________________\n\n` +
        `[✨] *STARS:* - ${repoInfo.stars}\n` +
        `[🧧] *FORKS:* - ${repoInfo.forks}\n` +
        `[📅] *RELEASE DATE:* - ${releaseDate}\n` +
        `[🗼] *REPO:* - ${repoData.html_url}\n` +
        `[👨‍💻] *OWNER:* - *${repoInfo.owner}*\n` +
        `[👨‍💻] *Session:* - *https://keith-sessions-pi5z.onrender.com*\n` +
        `__________________________________\n` +
        `> *Regards, keithkeizzah*`;

      await sendMessage(messageId, {
        text: messageText,
        contextInfo: {
          mentionedJid: [authorMessage],
          externalAdReply: {
            title: "ALPHA MD",
            body: "Powered by keithkeizzah",
            thumbnailUrl: "https://telegra.ph/file/967c663a5978c545f78d6.jpg",
            sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      });
    } else {
      console.log("Could not fetch data");
      respond("An error occurred while fetching the repository data.");
    }
  } catch (error) {
    console.error("Error fetching repository data:", error);
    respond("An error occurred while fetching the repository data.");
  }
});
