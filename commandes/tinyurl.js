'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

const { zokou } = require("../framework/zokou");

zokou(
  {
    nomCom: "viral",
    reaction: '😌'
  }, 
  async (message, sendMessage, reaction) => {
    try {
      const response = await fetch("https://api.github.com/repos/keithkeizzah/ALPHA-MD1");
      const data = await response.json();

    if (data) {
      const { stargazers_count: stars, forks_count: forks } = data;
      const totalUsers = (forks * 2) + (stars * 2); 
        const messageText = `
          *According to Alpha updates it has been found out that ${totalUsers} People are using ALPHA-MD.*
          
          *${stars} People have starred it as a sign of Loving it.*
          
          *Go and fork alpha bot today and deploy to be one of ${totalUsers} users.*
          
          *Alpha bot to the world💥✌*
       *Regards keithkeizzah*
        `;

        await sendMessage(message, {
          video: {
            url: 'https://telegra.ph/file/08f740224ed39233f92cb.mp4'
          },
          caption: messageText
        });
      } else {
        console.log("Could not fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
);
