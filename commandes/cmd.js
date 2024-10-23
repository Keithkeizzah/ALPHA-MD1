const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "repo",
  aliases: ['sc', 'script'],
  reaction: '🤍',
  nomFichier: __filename
}, async (command, reply, context) => {
  const { repondre, auteurMessage } = context;

  try {
    const response = await fetch("https://api.github.com/repos/franceking1/Flash-Md");
    const repoData = await response.json();

    if (repoData) {
      const repoInfo = {
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        updated: repoData.updated_at,
        owner: repoData.owner.login
      };

      const releaseDate = new Date(repoData.created_at).toLocaleDateString('en-GB');
      const message = `
        *HEY 👋 THIS IS FLASH-MD.*

        I'm A WhatsApp bot created by *©France King*.

        [✨] *STARS:* - ${repoInfo.stars}
        [🧧] *FORKS:* - ${repoInfo.forks}
        [📅] *RELEASE DATE:* - ${releaseDate}
        [🗼] *REPO:* - ${repoData.html_url}
        [👨‍💻] *OWNER:* - *France King* 
        __________________________________
                     *Made With* 🤍
      `;

      await reply.sendMessage(command, {
        text: message,
        contextInfo: {
          mentionedJid: [auteurMessage],
          externalAdReply: {
            title: "THE FLASH MULTI DEVICE",
            body: "POWERED BY FRANCE KING",
            thumbnailUrl: "https://telegra.ph/file/4143dfac775bff078cc5a.jpg",
            sourceUrl: "https://whatsapp.com/channel/0029VaTbb3p84Om9LRX1jg0P",
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      });
    } else {
      console.log("Could not fetch data");
      repondre("An error occurred while fetching the repository data.");
    }
  } catch (error) {
    console.error("Error fetching repository data:", error);
    repondre("An error occurred while fetching the repository data.");
  }
});
