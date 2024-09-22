const { zokou } = require('../framework/zokou');

zokou({ nomCom: "blocklist", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { m } = commandeOptions;

  try {
    const data = await zk.updateBlocklist();
    let responseMessage = `*≡ Blocklist *\n\n*Total:* ${data.length}\n\n┌─⊷\n`;

    data.forEach(i => {
      responseMessage += `▢ @${i.split('@')[0]}\n`;
    });

    responseMessage += '└───────────';

    return zk.repondre(m.chat, responseMessage, m, { mentions: await zk.parseMention(responseMessage) });
  } catch (err) {
    console.error(err);
    return zk.repondre(m.chat, 'No numbers blocked or an error occurred.', m);
  }
});
