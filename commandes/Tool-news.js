const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const { default: axios } = require('axios');
//const conf = require('../set');
const pkg = require("@whiskeysockets/baileys");
const { generateWAMessageFromContent, proto } = pkg;



  zokou({ nomCom: "news", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre(`Please ask a question Keith will answer it.`);
      }
  
      // Regrouper les arguments en une seule chaîne séparée par "-"
      const question = arg.join(' ');
      const response = await axios.get(`https://www.samirxpikachu.run.place/ppx?query=`);
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
                'text': resultText
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
    
      const data = response.data;
      if (data) {
        repondre(data.data);
      } else {
        repondre("Error during response generation.");
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oops, an error occurred while processing your request.");
    }
  });


  


