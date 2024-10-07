'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const { zokou } = require('../framework/zokou');

zokou({
  nomCom: 'users',
  reaction: '😌'
}, async (message, client, sendMessage) => {
  try {
    const response = await fetch("https://api.github.com/repos/Keithkeizzah/ALPHA-MD1");
    const data = await response.json();

    if (data) {
      const { stargazers_count: stars, forks_count: forks } = data;
      const totalUsers = (forks * 2) + (stars * 2);

      const messageCaption = `
        *A total of ${totalUsers} people are using ALPHA-MD.*

        *${stars} people have starred it as a sign of loving it.*

        *KEEP USING ALPHA BOT*

        *regards keithkeizzah*
      `;

      await sendMessage(message, {
        video: {
          url: "https://telegra.ph/file/08f740224ed39233f92cb.mp4"
        },
        caption: messageCaption
      }, {
        contextInfo: {
          mentionedJid: [],
          externalAdReply: {
            title: "THE FLASH MULTI DEVICE",
            body: "POWERED BY ALPHA",
            thumbnailUrl: "https://telegra.ph/file/967c663a5978c545f78d6.jpg",
            sourceUrl: 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      });

      await sendMessage(message, "*You can play that video and enjoy *");
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
