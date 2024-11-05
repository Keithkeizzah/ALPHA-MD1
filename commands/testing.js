const {
  zokou
} = require("../framework/zokou");
const {
  default: axios
} = require("axios");
const pkg = require("@whiskeysockets/baileys");
const {
  generateWAMessageFromContent,
  proto
} = pkg;

zokou({
  nomCom: "testing",
  categorie: "AI"
}, async (sender, replyFunction, context) => {
  const {
    ms: messageContext,
    repondre: respond,
    arg: args
  } = context;

  // Check if an argument was provided
  if (!args[0]) {
    respond("Please provide a query for Bard. Example: `bard What is the capital of France?`");
    return;
  }

  try {
    // Send initial response message
    await replyFunction.sendMessage(sender, {
      text: "Interacting with Bard... Please wait a moment."
    }, { quoted: messageContext });

    // Prepare the API request
    const username = context.nomAuteurMessage || "defaultUser";
    const query = args.join(" ");
    const apiUrl = `https://api.guruapi.tech/ai/gpt3?username=${username}&query=${encodeURIComponent(query)}`;

    // Fetch the response from the API
    const response = await fetch(apiUrl);
    const responseData = await response.json();

    if (!responseData.msg) {
      respond("No response received from Bard. Please try again later.");
      return;
    }

    const botResponse = responseData.msg;

    // Define interactive button for support channel link
    const buttons = [{
      name: "cta_url",
      buttonParamsJson: JSON.stringify({
        display_text: "FOLLOW OUR SUPPORT CHANNEL",
        url: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47"
      })
    }];

    // Create an interactive message structure
    const interactiveMessage = proto.Message.InteractiveMessage.create({
      body: proto.Message.InteractiveMessage.Body.create({
        text: botResponse
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
    });

    // Generate and send the message content
    const messageContent = generateWAMessageFromContent(sender, {
      viewOnceMessage: {
        message: {
          interactiveMessage: interactiveMessage
        }
      }
    }, {});

    // Relay the message
    await replyFunction.relayMessage(sender, messageContent.message, {
      messageId: messageContent.key.id
    });

  } catch (error) {
    respond("A fatal error has occurred...\n " + error.message);
  }
});
