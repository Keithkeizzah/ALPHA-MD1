const { zokou } = require("../framework/zokou");
const fs = require("fs-extra");
const axios = require('axios');
const FormData = require('form-data');

async function uploadToImgur(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error("File does not exist");
    }

    try {
        const form = new FormData();
        form.append("image", fs.createReadStream(filePath));

        const { data } = await axios.post("https://api.imgur.com/3/image", form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `legacy-api-78f9c8f745-r9ch6/V3h7fASRpa-21537853`, // Replace with your actual Client ID
            },
        });

        if (data && data.data && data.data.link) {
            return data.data.link;
        } else {
            throw new Error("Error retrieving the image link");
        }
    } catch (err) {
        throw new Error(String(err));
    }
}

zokou({ nomCom: "imgur", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu) {
        repondre('Please mention an image or video.');
        return;
    }

    let mediaPath;

    if (msgRepondu.videoMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
    } else if (msgRepondu.imageMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
    } else {
        repondre('Please mention an image or video.');
        return;
    }

    try {
        const imgurLink = await uploadToImgur(mediaPath);
        fs.unlinkSync(mediaPath); // Remove the file after use

        repondre(imgurLink);
    } catch (error) {
        console.error('Error while creating the Imgur link:', error);
        repondre('Oops, an error occurred.');
    }
});
