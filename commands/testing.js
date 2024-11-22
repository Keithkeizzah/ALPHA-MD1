const { keith } = require('../keizzah/keith');
const traduire = require("../keizzah/traduction");
const { default: axios } = require('axios');
const pkg = require('@whiskeysockets/baileys');
const { generateWAMessageFromContent, proto } = pkg;

keith({ nomCom: "gpt3", reaction: "🪅", categorie: "abu" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  try {
    if (!arg || arg.length === 0) {
      return repondre('Hello 🖐️.\n\nWhat help can I offer you today?');
    }

    // Combine arguments into a single string
    const prompt = arg.join(' ');
    const response = await fetch(`https://api.gurusensei.workers.dev/llama?prompt=${prompt}`);
    const data = await response.json();

    if (data && data.response && data.response.response) {
      const answer = data.response.response;

      // Check if the answer contains code
      const codeMatch = answer.match(/```([\s\S]*?)```/);

      if (codeMatch) {
        const code = codeMatch[1];

        // Send message with code
        const msg = generateWAMessageFromContent(dest, {
          conversation: `Response:\n\n${answer}\n\nCode:\n${code}`
        }, {});

        await zk.relayMessage(dest, msg.message, {
          messageId: msg.key.id
        });
      } else {
        // Response without code
        const msg = generateWAMessageFromContent(dest, {
          conversation: `Response:\n\n${answer}`
        }, {});

        await zk.relayMessage(dest, msg.message, {
          messageId: msg.key.id
        });
      }
    } else {
      throw new Error('Invalid response from the API.');
    }
  } catch (error) {
    console.error('Error getting response:', error.message);
    repondre('Error getting response.');
  }
});
