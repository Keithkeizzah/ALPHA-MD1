const { zokou } = require('../framework/zokou');
const PastebinAPI = require('pastebin-js');

// Initialize Pastebin API with your API key
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');

zokou({
    nomCom: "pastebin",
    category: "extra",
    reaction: "💻",
}, async (Void, citel) => {
    if (!citel.quoted) {
        return citel.reply('Please quote any text to get a link.');
    }

    try {
        // Create a new paste
        let data = await pastebin.createPaste(citel.quoted.text, 'Alpha-Pastebin');
        citel.reply('_Here is your link:_\n' + data);
    } catch (error) {
        citel.reply('There was an error creating the paste. Please try again.');
        console.error(error);
    }
});
