// javascript
const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction");
const { default: axios } = require('axios');

const apiUrl = 'https://temp.giftedapis.us.kg/api/ai/gpt4';
const apiKey = '_0x5aff35,_0x187643';

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;

    try {
        if (!arg || arg.length === 0) {
            return repondre(`Please ask a question Keith will answer it.`);
        }

        // Regrouper les arguments en une seule chaîne séparée par "-"
        const question = arg.join(' ');
        const response = await axios.get(`${apiUrl}?q=${question}&apikey=${apiKey}`);

        const data = response.data;
        if (data) {
            repondre(data.result);
        } else {
            repondre("Error during response generation.");
        }
    } catch (error) {
        console.error('Erreur:', error.message || 'Une erreur s\'est produite');
        repondre("Oops, an error occurred while processing your request.");
    }
});
