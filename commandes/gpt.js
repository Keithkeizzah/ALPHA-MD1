const { zokou } = require('../framework/zokou');
const axios = require('axios');

const apiUrl = 'https://gist.githubusercontent.com/Keithkeizzah/9e63af0695e6885f9ddcc03f361f4de9/raw/a3f5d6c358c5966c5c2c6d2fd547d03e994577fd/gpt.js';
const apiKeyUrl = 'https://gist.githubusercontent.com/Keithkeizzah/86900f62defb2dd67734f14dd8943947/raw/1c987d0656d77e0e72ccec1ad4cdd136ae1437cf/apikey';

const fetchApiKey = async () => {
    const response = await axios.get(apiKeyUrl);
    return response.data; // Adjust based on how the API key is returned
};

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg } = commandeOptions;

    if (!arg || arg.length === 0) {
        return repondre("Please ask a question Keith will answer it.");
    }

    const question = arg.join(' ');

    try {
        const apiKey = await fetchApiKey();
        const response = await axios.get(`${apiUrl}?q=${encodeURIComponent(question)}&apikey=${apiKey}`);

        if (response.data && response.data.result) {
            repondre(response.data.result);
        } else {
            repondre("Error during response generation.");
        }
    } catch (error) {
        console.error('Error:', error.message || 'An error occurred');
        repondre("Oops, an error occurred while processing your request.");
    }
});
