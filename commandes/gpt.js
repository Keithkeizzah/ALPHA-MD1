

// javascript
const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction");
const { default: axios } = require('axios');

const apiUrl = 'https://gist.githubusercontent.com/Keithkeizzah/9e63af0695e6885f9ddcc03f361f4de9/raw/a3f5d6c358c5966c5c2c6d2fd547d03e994577fd/gpt.js';
const apiKey = 'https://gist.githubusercontent.com/Keithkeizzah/86900f62defb2dd67734f14dd8943947/raw/1c987d0656d77e0e72ccec1ad4cdd136ae1437cf/apikey';

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
