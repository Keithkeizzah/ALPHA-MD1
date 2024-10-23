const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "sing",
  reaction: '🖕',
  nomFichier: __filename
}, async (command, reply, context) => {
  const { repondre, auteurMessage } = context;

  try {
    const response = await fetch("https://api.github.com/repos/Keithkeizzah/ALPHA-MD1");
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
       *Hello ,,,👋This is 𝐀𝐋𝐏𝐇𝐀-𝐌𝐃*
 the best bot in the universe developed by Kᴇɪᴛʜ Kᴇɪᴢᴢᴀʜ,,fork and give a star 🌟 to my repo
  ╭────────────────
  │✞  *Stars:* - ${repoInfo.stars}
  │✞  *Forks:* - ${repoInfo.forks}
  │✞  *Release date:* - ${releaseDate}
  │✞  *Repo:* - ${repoData.html_url}
  │✞  *Owner:*   *keithkeizzah* 
  ╰─────────────────── 
                    
      `;

      await reply.sendMessage(command, {
        text: message,
        contextInfo: {
          mentionedJid: [auteurMessage],
          externalAdReply: {
            title: "✨𝗔𝗟𝗣𝗛𝗔-𝗠𝗗🌟",
            body: "POWERED BY KEITH",
            thumbnailUrl: "https://i.imgur.com/q7nH7wI.jpeg",
            sourceUrl: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
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

