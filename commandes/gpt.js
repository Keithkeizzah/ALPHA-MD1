const { zokou } = require('../framework/zokou');
const { default: axios } = require('axios');
const pkg = require("@whiskeysockets/baileys");
const { generateWAMessageFromContent } = pkg;

const apiUrl = 'https://temp.giftedapis.us.kg/api/ai/gpt4';
const apiKey = '_0x5aff35,_0x187643';

zokou({ nomCom: "gpt", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;

    try {
        if (!arg || arg.length === 0) {
            return repondre("Please ask a question, and Keith will answer it.");
        }

        // Regrouper les arguments en une seule chaîne
        const question = arg.join(' ');
        const response = await axios.get(`${apiUrl}?q=${encodeURIComponent(question)}&apikey=${apiKey}`);
        const data = response.data;

        if (!data) {
            throw new Error("Invalid response from the GPT API.");
        }

        const codeMatch = data.match(/```([\s\S]*?)```/);
        const buttons = [{
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: "FOLLOW OUR SUPPORT CHANNEL",
                url: "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47"
            })
        }];

        let messageText = data; // Assuming the main response is in `data`
        if (codeMatch) {
            const codeSnippet = codeMatch[1];
            buttons.unshift({
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                    display_text: "📋 COPY YOUR CODE",
                    id: "copy_code",
                    copy_code: codeSnippet
                })
            });
        }

        const messageContent = {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: {
                        body: {
                            text: messageText
                        },
                        footer: {
                            text: "> *POWERED BY ALPHA-MD*"
                        },
                        header: {
                            title: '',
                            subtitle: '',
                            hasMediaAttachment: false
                        },
                        nativeFlowMessage: {
                            buttons: buttons
                        }
                    }
                }
            }
        };

        const message = generateWAMessageFromContent(dest, messageContent, {});
        await zk.relayMessage(dest, message.message, {
            messageId: message.key.id
        });
    } catch (error) {
        console.error("Error getting GPT response:", error.message);
        repondre("Error getting response from GPT.");
    }
});
