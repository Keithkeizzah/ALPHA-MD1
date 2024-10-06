const { zokou } = require("../framework/zokou");
const axios = require('axios');

zokou({ nomCom: "tinyurl", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    // Check if a URL is provided in the message
    const urlToShorten = msgRepondu?.urlToshorten;

    if (!urlToShorten) {
        repondre('Please mention a URL to shorten.');
        return;
    }

    try {
        const response = await axios.get(`https://api.maskser.me/api/linkshort/cuttly?link=${encodeURIComponent(urlToShorten)}`);
        repondre(response.data);
    } catch (error) {
        console.error('Error while creating the short link:', error);
        repondre('Oops, an error occurred while shortening the link.');
    }
});
