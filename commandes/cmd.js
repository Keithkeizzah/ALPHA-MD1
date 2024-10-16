const { zokou } = require('../framework/zokou');
const { default: axios } = require('axios');

zokou({ nomCom: "matrix", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg } = commandeOptions;

    try {
        if (!arg || arg.length === 0) {
            return repondre("Please ask a question, and Keith will answer it.");
        }

        // Join arguments into a single string
        const question = arg.join(' ');

        // Make the API call
        const response = await axios.get('https://matrixcoder.tech/api/ai', {
            params: { question } // Pass the question as a query parameter
        });

        const data = response.data;
        if (data && data.result) {
            repondre(data.result);
        } else {
            repondre("Error during response generation.");
        }
    } catch (error) {
        console.error('Error:', error.message || 'An error occurred');
        repondre("Oops, an error occurred while processing your request.");
    }
});
