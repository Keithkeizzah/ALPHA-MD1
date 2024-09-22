const { zokou } = require('../framework/zokou');

zokou({ nomCom: "blocklist", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { m } = commandeOptions;

  try {
    const data = await zk.fetchBlocklist();

    // Ensure data is an array and has elements
    if (!Array.isArray(data) || data.length === 0) {
      return zk.repondre(m.chat, 'No numbers blocked.', m);
    }

    let responseMessage = `*≡ Blocklist *\n\n*Total:* ${data.length}\n\n┌─⊷\n`;

    data.forEach(contact => {
      const username = contact.split('@')[0];
      responseMessage += `▢ @${username}\n`;
    });

    responseMessage += '└───────────';

    return zk.repondre(m.chat, responseMessage, m, { mentions: await zk.parseMention(responseMessage) });
  } catch (err) {
    console.error("Error fetching blocklist:", err);
    return zk.repondre(m.chat, 'An error occurred while fetching the blocklist.', m);
  }
});
