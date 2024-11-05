const { zokou } = require("../framework/zokou");
const { default: axios } = require("axios");
const pkg = require("@whiskeysockets/baileys");
const { generateWAMessageFromContent, proto } = pkg;

zokou({
  'nomCom': "bk9",
  'reaction': '🚀',
  'categorie': 'User'
}, async (sender, _replyFunction, context) => {
  const { repondre, arg, ms } = context;

  try {
    // Check if an argument was provided
    if (!arg || arg.length === 0) {
      return repondre("Please provide a query to generate.");
    }

    await repondre("`Wait a moment, Alpha is generating your query!`");

    // Prepare the API request
    const query = encodeURIComponent(arg.join(" "));
    const apiUrl = `https://bk9.fun/ai/gemini?q=${query}`;
    
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data && data.code) {
      const generatedCode = data.code;
      const message = `*Powered By Keith*`;

      // Define buttons for interactive message
      const buttons = [
        {
          'name': "cta_copy",
          'buttonParamsJson': JSON.stringify({
            'display_text': "↪ Copy the generated item",
            'id': 'copy_code',
            'copy_code': generatedCode
          })
        },
        {
          'name': "cta_url",
          'buttonParamsJson': JSON.stringify({
            'display_text': "FOLLOW OUR SUPPORT CHANNEL",
            'url': 'https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47'
          })
        }
      ];

      // Create the interactive message
      const interactiveMessage = proto.Message.InteractiveMessage.create({
        'body': proto.Message.InteractiveMessage.Body.create({
          'text': message
        }),
        'footer': proto.Message.InteractiveMessage.Footer.create({
          'text': "> *Regards keithkeizzah*"
        }),
        'header': proto.Message.InteractiveMessage.Header.create({
          'title': '',
          'subtitle': '',
          'hasMediaAttachment': false
        }),
        'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.create({
          'buttons': buttons
        })
      });

      // Generate and send the message content
      const messageContent = generateWAMessageFromContent(sender, {
        'viewOnceMessage': {
          'message': {
            'interactiveMessage': interactiveMessage
          }
        }
      }, {});

      // Relay the message
      await _replyFunction.relayMessage(sender, messageContent.message, {
        'messageId': messageContent.key.id
      });
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (error) {
    console.error("Error getting API response:", error.message);
    repondre("Error getting response from API.");
  }
});
