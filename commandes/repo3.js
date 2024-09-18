"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "repo3", catégorie:"Général", reaction: "🖕", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/keithkeizzah/ALPHA-MD1';
  const img = 'https://i.imgur.com/hRP6xPl.jpeg';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `*Hello,,,👋This is 𝐀𝐋𝐏𝐇𝐀-𝐌𝐃*\n the best bot in the universe developed by Kᴇɪᴛʜ Kᴇɪᴢᴢᴀʜ,,fork and give a star 🌟 to my repo

✞ *REPOSITORY:* ${data.html_url}
 ✞ *UPDATE ON:* ${repoInfo.lastUpdate}

   ✞*Visitors:* ${repoInfo.visitors}
  ✞ *Stars:* ${repoInfo.stars}
  ✞ *Forks:* ${repoInfo.forks}
  ✞ *Release date:* ${releaseDate}
  ✞ *Owner:* *keithkeizzah*
  ✞ *session:* *https://keith-sessions-pi5z.onrender.com* 
 >Regards keithkeizzah `;

      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
