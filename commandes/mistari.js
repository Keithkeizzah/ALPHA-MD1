const { zokou } = require("../framework/zokou");
const axios = require("axios");
const pkg = require("@whiskeysockets/baileys");
const { generateWAMessageFromContent, proto } = pkg;

const config = {
  nomCom: "breaking",
  reaction: '🤔',
  categorie: 'IA'
};

zokou(config, async (responseHandler, args, context) => {
  const { repondre, arg } = context;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Ask for any news update and Alpha bot will respond.");
    }

    const query = arg.join(" ");
    const apiResponse = await axios.get(`https://www.samirxpikachu.run.place/ppx?query=${query}`);
    const result = apiResponse.data;

    if (result) {
      const codeMatch = resultText.match(/```([\s\S]*?)```/);
      
      const buttons = [
        {
          'name': "cta_url",
          'buttonParamsJson': JSON.stringify({
            'display_text': "FOLLOW OUR SUPPORT CHANNEL",
            'url': "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47"
          })
        },
        {
          'name': "cta_url",
          'buttonParamsJson': JSON.stringify({
            'display_text': "FOLLOW OUR SUPPORT GROUP",
            'url': "https://chat.whatsapp.com/BXVmus83Yfq8SjNv63SAhJ"
          })
        },
        {
          'name': "quick_reply",
          'buttonParamsJson': JSON.stringify({
            'display_text': "💫Owner💫",
            'id': ".owner"
          })
        },
        {
          'name': "single_select",
          'buttonParamsJson': JSON.stringify({
            'title': "Select Alpha menu",
            'sections': [{
              'title': "📓 Here are alpha functions 🏩",
              'highlight_label': "🚀ALPHA-MD🌟",
              'rows': [
                { title: "ᴇᴅᴜᴄᴀᴛɪᴏɴ ᴍᴇɴᴜ", id: ".menu2" },
                { title: "👽 ᴏᴡɴᴇʀ ᴍᴇɴᴜ", id: ".menu3" },
                { title: "✨ ᴀɪ ᴍᴇɴᴜ", id: ".menu" },
                { title: "💯 ʙᴏᴛ ᴍᴇɴᴜ", id: ".owner" },
                { title: "🧬 ɢʀᴏᴜᴘ ᴍᴇɴᴜ", id: ".groupmenu" },
                { title: "📥 ᴅʟ ᴍᴇɴᴜ", id: ".dlmenu" },
                { title: "🧰 ᴛᴏᴏʟs ᴍᴇɴᴜ", id: ".toolmenu" },
                { title: "🎨 sᴛɪᴄᴋᴇʀ ᴍᴇɴᴜ", id: ".stickermenu" },
                { title: "💥 ʟᴏɢᴏ ᴍᴇɴᴜ", id: ".logomenu" },
                { title: "🎮 ɢᴀᴍᴇ ᴍᴇɴᴜ", id: ".gamemenu" },
                { title: "ᴄᴏᴅɪɴɢ ᴍᴇɴᴜ", id: ".owner" }
              ]
            }]
          })
        }
      ];

      // If there's a code match (assuming it's defined in your context)
      const codeMatch = /code:\s*(\S+)/.exec(result); // Example regex for capturing code
      if (codeMatch) {
        const codeSnippet = codeMatch[1];
        buttons.unshift({
          'name': "cta_copy",
          'buttonParamsJson': JSON.stringify({
            'display_text': "📋 COPY YOUR CODE",
            'id': "copy_code",
            'copy_code': codeSnippet
          })
        });
      }

      const messageContent = {
        'viewOnceMessage': {
          'message': {
            'messageContextInfo': {
              'deviceListMetadata': {},
              'deviceListMetadataVersion': 2
            },
            'interactiveMessage': proto.Message.InteractiveMessage.create({
              'body': proto.Message.InteractiveMessage.Body.create({
                'text': result.result || "No result text available."
              }),
              'footer': proto.Message.InteractiveMessage.Footer.create({
                'text': "> _*POWERED BY ALPHA-MD_*"
              }),
              'header': proto.Message.InteractiveMessage.Header.create({
                'title': '',
                'subtitle': '',
                'hasMediaAttachment': false
              }),
              'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.create({
                'buttons': buttons
              })
            })
          }
        }
      };

      repondre(messageContent);
    } else {
      repondre("Error during response generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request.");
  }
});
