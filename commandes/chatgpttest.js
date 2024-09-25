const { zokou } = require("../framework/zokou");
const { default: axios } = require("axios");

zokou({
  nomCom: "chatgpt",
  reaction: '📡',
  categorie: 'AI'
}, async (messageId, sendMessage, context) => {
  const { repondre: reply, arg: args } = context;

  try {
    if (!args || args.length === 0) {
      return reply("Please ask a question.");
    }

    const query = args.join(" ");
    const apiUrl = `https://api.cafirexos.com/api/chatgpt?text=${encodeURI(query)}&name=Kaizoku&prompt=${encodeURI("You are a WhatsApp bot AI called ALPHA-MD")}`;
    
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data && data.resultado) {
      const output = data.resultado;

      // Prepare buttons
      const buttons = [{
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "FOLLOW OUR SUPPORT CHANNEL",
          url: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47"
        })
      }];

      const codeMatch = output.match(/```([\s\S]*?)```/);
      if (codeMatch) {
        const code = codeMatch[1];
        buttons.unshift({
          name: "cta_copy",
          buttonParamsJson: JSON.stringify({
            display_text: "📋 COPY YOUR CODE",
            id: "copy_code",
            copy_code: code
          })
        });
      }

      // Construct the message content
      const messageContent = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: proto.Message.InteractiveMessage.create({
              body: proto.Message.InteractiveMessage.Body.create({
                text: output
              }),
              footer: proto.Message.InteractiveMessage.Footer.create({
                text: "> *POWERED BY ALPHA-MD*"
              }),
              header: proto.Message.InteractiveMessage.Header.create({
                title: '',
                subtitle: '',
                hasMediaAttachment: false
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: buttons
              })
            })
          }
        }
      };

      // Send the message
      await sendMessage.relayMessage(messageId, messageContent, {
        messageId: messageId // Ensure the message ID is set correctly
      });

    } else {
      reply("Error during response generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred.");
    reply("Oops, an error occurred while processing your request.");
  }
});
