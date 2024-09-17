const { zokou } = require("../framework/zokou");
const fs = require('fs');


let antiDeleteActive = false; // Variable pour stocker l'état de la commande anti-delete

zokou({
  nomCom: "anti-delete",
  categorie: "General",
  reaction: "❦"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, arg } = commandeOptions;

  // Vérifier si un argument est fourni pour activer ou désactiver la commande
  if (arg[0]) {
    const action = arg[0].toLowerCase();
    if (action === "on") {
      antiDeleteActive = true;
      await zk.sendMessage(origineMessage, "La commande anti-delete est activée.");
      return;
    } else if (action === "off") {
      antiDeleteActive = false;
      await zk.sendMessage(origineMessage, "La commande anti-delete est désactivée.");
      return;
    }
  }

  // Vérifier si la commande anti-delete est activée
  if (!antiDeleteActive) {
    await zk.sendMessage(origineMessage, "La commande anti-delete est actuellement désactivée.");
    return;
  }

  if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0 && (conf.ADM).toLowerCase() === 'yes') {
    if (ms.key.fromMe || ms.message.protocolMessage.key.fromMe) {
      console.log('Message supprimé me concernant');
      return;
    }

    console.log('Message supprimé');
    const key = ms.message.protocolMessage.key;

    try {
      const st = './store.json';
      const data = fs.readFileSync(st, 'utf8');
      const jsonData = JSON.parse(data);
      const message = jsonData.messages[key.remoteJid];

      let msg;

      for (let i = 0; i < message.length; i++) {
        if (message[i].key.id === key.id) {
          msg = message[i];
          break;
        }
      }

      if (!msg) {
        console.log('Message introuvable');
        return;
      }

      const senderId = msg.key.participant.split('@')[0];
      const caption = ` Anti-delete-message by joel tech\nMessage de @${senderId}`;
      const imageCaption = { image: { url: './media/deleted-message.jpg' }, caption, mentions: [msg.key.participant] };

      await zk.sendMessage(idBot, imageCaption);
      await zk.sendMessage(idBot, { forward: msg }, { quoted: msg });
    } catch (error) {
      console.error(error);
    }
  }
});
