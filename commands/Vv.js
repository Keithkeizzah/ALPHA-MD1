const { keith } = require("../keizzah/keith");

const messageDetails = {
  nomCom: 'vv',
  categorie: 'General',
  reaction: '🤲🏿',
  desc: 'show view once message'
};

keith(messageDetails, async (sender, handler, context) => {
  const { ms, msgRepondu, repondre } = context;

  // Check if message has been responded
  if (!msgRepondu) {
    return repondre("*Please mention a message sent in single view*.");
  }

  const viewOnceMessage = msgRepondu.viewOnceMessage || msgRepondu.viewOnceMessageV2 || msgRepondu.viewOnceMessageV2Extension;

  if (viewOnceMessage) {
    let messageContent = viewOnceMessage.message;
    let mediaUrl, mediaType, caption;

    // Process image message
    if (messageContent.imageMessage) {
      mediaUrl = await handler.downloadAndSaveMediaMessage(messageContent.imageMessage);
      caption = messageContent.imageMessage.caption;
      mediaType = { image: { url: mediaUrl }, caption };
    }
    // Process video message
    else if (messageContent.videoMessage) {
      mediaUrl = await handler.downloadAndSaveMediaMessage(messageContent.videoMessage);
      caption = messageContent.videoMessage.caption;
      mediaType = { video: { url: mediaUrl }, caption };
    }
    // Process audio message
    else if (messageContent.audioMessage) {
      mediaUrl = await handler.downloadAndSaveMediaMessage(messageContent.audioMessage);
      mediaType = { audio: { url: mediaUrl }, mymetype: "audio/mp4" };
    }

    if (mediaType) {
      const options = { quoted: ms };
      await handler.sendMessage(sender, mediaType, options);
    }
  } else {
    return repondre("The message you mentioned is not a single view message.");
  }
});
