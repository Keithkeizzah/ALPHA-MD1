const { keith } = require("../keizzah/keith");
const { Sticker, StickerTypes, createSticker } = require('wa-sticker-formatter');
const {
  ajouterOuMettreAJourJid,
  mettreAJourAction,
  verifierEtatJid
} = require("../bdd/antilien");
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");
const { attribuerUnevaleur } = require('../bdd/welcome');
const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("../bdd/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("../bdd/banGroup");
const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("../bdd/onlyAdmin");
const {removeSudoNumber,addSudoNumber,issudo, getAllSudoNumbers, isSudoTableNotEmpty} = require("../bdd/sudo");
const {
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid
} = require("../bdd/antibot");
const {
  addOrUpdateDataInAlive,
  getDataFromAlive
} = require('../bdd/alive');
const { exec } = require('child_process');
const {
  addstickcmd,
  deleteCmd,
  getCmdById,
  inStickCmd,
  getAllStickCmds
} = require('../bdd/stickcmd');

const {
  ajouterUtilisateurAvecWarnCount,
  getWarnCountByJID,
  resetWarnCountByJID
} = require('../bdd/warn');
const s = require(__dirname + "/../set");
const traduire = require("../keizzah/traduction");
const { search, download } = require('aptoide-scraper');
const fs = require('fs-extra');
const conf = require('../set');
const gis = require('g-i-s');
const moment = require("moment-timezone");
const JavaScriptObfuscator = require("javascript-obfuscator");
const { c, cpp, node, python, java } = require('compile-run');
const { dBinary, eBinary } = require("../keizzah/binary");
const fancy = require("../keizzah/style");

const { writeFile } = require("fs/promises");
const { default: axios } = require("axios");
const ffmpeg = require("fluent-ffmpeg");

// Command for fetching tech news
keith({
  nomCom: "technews",
  reaction: '📰',
  categorie: 'News'
}, async (command, message, context) => {
  const { reply: replyToUser, messageQuote: quotedMessage } = context;

  try {
    // Fetching tech news from the API
    const response = await axios.get("https://fantox001-scrappy-api.vercel.app/technews/random");
    const data = response.data;
    const { thumbnail, news } = data;

    // Preparing the message content
    const messageContent = `*ALPHA-MD*\n\n${news}\n\n> *Powered by keithkeizzah*`;

    // Sending the message with an image and caption
    await message.sendMessage(command, {
      image: { url: thumbnail },
      caption: messageContent
    }, { quoted: quotedMessage });
  } catch (error) {
    console.error("Error fetching tech news:", error);
    await replyToUser("Sorry, there was an error retrieving the news. Please try again later.\n" + error);
  }
});

// Command for generating temporary email
keith({
  nomCom: "tempmail",
  aliases: ['mail', 'temp'],
  reaction: '📧',
  categorie: "General"
}, async (command, message, context) => {
  const { reply: replyToUser, prefix: prefix, ms: messageQuote } = context;
  try {
    const tempEmail = Math.random().toString(36).substring(2, 14) + "@1secmail.com";
    
    await message.sendMessage(command, {
      text: `Your temporary email is: ${tempEmail}\n\nYou can use this email for temporary purposes. I will notify you if you receive any emails.`
    }, { quoted: messageQuote });

    // Check for new emails at intervals
    const checkEmails = async () => {
      try {
        const response = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${tempEmail}&domain=1secmail.com`);
        const emails = await response.json();

        if (emails.length > 0) {
          for (const email of emails) {
            const emailDetails = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${tempEmail}&domain=1secmail.com&id=${email.id}`);
            const emailData = await emailDetails.json();
            const links = emailData.textBody.match(/(https?:\/\/[^\s]+)/g);
            const linksText = links ? links.join("\n") : "No links found in the email content.";

            await message.sendMessage(command, {
              text: `You have received a new email!\n\nFrom: ${emailData.from}\nSubject: ${emailData.subject}\n\n${emailData.textBody}\n\nLinks found:\n${linksText}`
            }, { quoted: messageQuote });
          }
        }
      } catch (error) {
        console.error("Error checking temporary email:", error.message);
      }
    };

    const emailCheckInterval = setInterval(checkEmails, 30000); // Check every 30 seconds
    setTimeout(() => {
      clearInterval(emailCheckInterval);
      message.sendMessage(command, {
        text: "Your temporary email session has ended. Please create a new temporary email if needed."
      }, { quoted: messageQuote });
    }, 600000); // End the session after 10 minutes

  } catch (error) {
    console.error("Error generating temporary email:", error.message);
    await message.sendMessage(command, {
      text: "Error generating temporary email. Please try again later."
    }, { quoted: messageQuote });
  }
});

// Command for generating AI images using DALL-E

// Command for providing random advice
keith({
  nomCom: "advice",
  aliases: ["wisdom", "wise"],
  reaction: "🗨️",
  categorie: "Fun"
}, async (command, message, context) => {
  const { reply: replyToUser, ms: messageQuote } = context;
  try {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    const advice = data.slip.advice;
    await replyToUser(`*Here is an advice for you:* \n${advice}`);
  } catch (error) {
    console.error("Error fetching advice:", error.message || "An error occurred");
    await replyToUser("Oops, an error occurred while processing your request");
  }
});

// Command for generating a trivia question
keith({
  nomCom: "trivia",
  reaction: '🤔',
  categorie: 'Fun'
}, async (command, message, context) => {
  const { reply: replyToUser, prefix: prefix, ms: messageQuote } = context;
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    if (response.status !== 200) {
      return replyToUser("Invalid response from the trivia API. Status code: " + response.status);
    }

    const data = await response.json();
    if (data && data.results && data.results[0]) {
      const trivia = data.results[0];
      const question = trivia.question;
      const correctAnswer = trivia.correct_answer;
      const answers = [...trivia.incorrect_answers, correctAnswer].sort();

      const answerChoices = answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n");

      await message.sendMessage(command, {
        text: `Here's a trivia question for you: \n\n${question}\n\n${answerChoices}\n\nI will send the correct answer in 10 seconds...`
      }, { quoted: messageQuote });

      setTimeout(async () => {
        await message.sendMessage(command, {
          text: `The correct answer is: ${correctAnswer}`
        }, { quoted: messageQuote });
      }, 10000); // Delay for 10 seconds
    } else {
      throw new Error("Invalid response format from the trivia API.");
    }
  } catch (error) {
    console.error("Error getting trivia:", error.message);
    await message.sendMessage(command, {
      text: "Error getting trivia. Please try again later."
    }, { quoted: messageQuote });
  }
});
keith({
  'nomCom': "code",
  'aliases': ["session", "pair", "paircode", "qrcode"],
  'reaction': '🚀',
  'categorie': 'system'
}, async (sender, _replyFunction, context) => {
  const { repondre, arg } = context;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Example Usage: .code 2541111xxxxx.");
    }

    // Notify user that pairing is in progress
    await repondre("*Wait Alpha Md is getting your pair code 💧✅...*");

    // Prepare the API request
    const encodedNumber = encodeURIComponent(arg.join(" "));
    const apiUrl = `https://keith-sessions-pi5z.onrender.com/code?number=${encodedNumber}`;

    // Fetch the pairing code from the API
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data && data.code) {
      const pairingCode = data.code;
      await repondre(`${pairingCode}`);
      await repondre("Here is your pair code, copy and paste it to the notification above or link devices.");
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (error) {
    console.error("Error getting API response:", error.message);
    repondre("Error getting response from API.");
  }
});


keith({
  'nomCom': 'messi',
  'categorie': 'Modern-Logo',
  'reaction': '😋'
}, async (user, message, context) => {
  const { repondre: sendMessage, ms } = context;
  try {
    const response = await axios.get("https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/Messi.json");
    const images = response.data;

    if (!Array.isArray(images) || images.length === 0) {
      throw new Error("No images found in the response.");
    }

    for (let i = 0; i < 5; i++) {
      const randomImage = Math.floor(Math.random() * images.length);
      const image = images[randomImage];
      await message.sendMessage(user, {
        'image': { 'url': image }
      }, { 'quoted': ms });
    }
  } catch (error) {
    console.error("Error occurred while retrieving data:", error);
    sendMessage("Error occurred while retrieving data: " + error.message);
  }
});

// Lulcat Meme Command
keith({
  'nomCom': "lulcat",
  'reaction': '📡',
  'categorie': 'AI'
}, async (user, message, context) => {
  const { repondre: sendMessage, arg, ms } = context;
  try {
    if (!arg || arg.length === 0) {
      return sendMessage("Provide some text.");
    }
    const text = arg.join(" ");
    const imageUrl = `https://api.popcat.xyz/lulcat?text=${text}`;
    message.sendMessage(user, {
      'image': { 'url': imageUrl },
      'caption': "*powered by ALPHA-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Sadcat Meme Command
keith({
  'nomCom': "sadcat",
  'reaction': '📡',
  'categorie': 'AI'
}, async (user, message, context) => {
  const { repondre: sendMessage, arg, ms } = context;
  try {
    if (!arg || arg.length === 0) {
      return sendMessage("Provide some text.");
    }
    const text = arg.join(" ");
    const imageUrl = `https://api.popcat.xyz/sadcat?text=${text}`;
    message.sendMessage(user, {
      'image': { 'url': imageUrl },
      'caption': "*powered by ALPHA-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Nokia Meme Command
keith({
  'nomCom': "nokia",
  'reaction': '📡',
  'categorie': 'AI'
}, async (user, message, context) => {
  const { repondre: sendMessage, arg, ms } = context;
  try {
    if (!arg || arg.length === 0) {
      return sendMessage("Provide some text.");
    }
    const text = arg.join(" ");
    const imageUrl = `https://api.popcat.xyz/nokia?image=${text}`;
    message.sendMessage(user, {
      'image': { 'url': imageUrl },
      'caption': "*powered by ALPHA-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Unforgivable Meme Command
keith({
  'nomCom': "unforgivable",
  'reaction': '📡',
  'categorie': 'AI'
}, async (user, message, context) => {
  const { repondre: sendMessage, arg, ms } = context;
  try {
    if (!arg || arg.length === 0) {
      return sendMessage("Provide some text.");
    }
    const text = arg.join(" ");
    const imageUrl = `https://api.popcat.xyz/unforgivable?text=${text}`;
    message.sendMessage(user, {
      'image': { 'url': imageUrl },
      'caption': "*powered by ALPHA-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Pooh Meme Command
keith({
  'nomCom': "pooh",
  'reaction': '📡',
  'categorie': 'AI'
}, async (user, message, context) => {
  const { repondre: sendMessage, arg, ms } = context;
  try {
    if (!arg || arg.length === 0) {
      return sendMessage("Provide some text.");
    }
    const text = arg.join(" ");
    const imageUrl = `https://api.popcat.xyz/pooh?text1=&text2=${text}`;
    message.sendMessage(user, {
      'image': { 'url': imageUrl },
      'caption': "*powered by ALPHA-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Oogway Meme Command
keith({
  'nomCom': "oogway",
  'reaction': '📡',
  'categorie': 'AI'
}, async (user, message, context) => {
  const { repondre: sendMessage, arg, ms } = context;
  try {
    if (!arg || arg.length === 0) {
      return sendMessage("Provide a quote.");
    }
    const text = arg.join(" ");
    const imageUrl = `https://api.popcat.xyz/oogway?text=${text}`;
    message.sendMessage(user, {
      'image': { 'url': imageUrl },
      'caption': "*powered by ALPHA-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Biden Meme Command
keith({
  'nomCom': "biden",
  'reaction': '📡',
  'categorie': 'AI'
}, async (user, message, context) => {
  const { repondre: sendMessage, arg, ms } = context;
  try {
    if (!arg || arg.length === 0) {
      return sendMessage("Provide some text.");
    }
    const text = arg.join(" ");
    const imageUrl = `https://api.popcat.xyz/biden?text=${text}`;
    message.sendMessage(user, {
      'image': { 'url': imageUrl },
      'caption': "*powered by ALPHA-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Drip Meme Command
keith({
  'nomCom': "drip",
  'reaction': '📡',
  'categorie': 'AI'
}, async (user, message, context) => {
  const { repondre: sendMessage, arg, ms } = context;
  try {
    if (!arg || arg.length === 0) {
      return sendMessage("Provide an image URL.");
    }
    const imageUrl = `https://api.popcat.xyz/drip?image=${arg.join(" ")}`;
    message.sendMessage(user, {
      'image': { 'url': imageUrl },
      'caption': "*powered by ALPHA-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Clown Meme Command
keith({
  'nomCom': "clown",
  'reaction': '📡',
  'categorie': 'AI'
}, async (user, message, context) => {
  const { repondre: sendMessage, arg, ms } = context;
  try {
    if (!arg || arg.length === 0) {
      return sendMessage("Provide some text.");
    }
    const text = arg.join(" ");
    const imageUrl = `https://api.popcat.xyz/clown?text=${text}`;
    message.sendMessage(user, {
      'image': { 'url': imageUrl },
      'caption': "*powered by ALPHA-MD*"
    }, { 'quoted': ms });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});


// Image generation command
keith({
  'nomCom': "generate",
  'reaction': '📡',
  'category': 'AI-LOGO'
}, async (user, message, context) => {
  const { respond: sendMessage, args, messageInstance } = context;
  try {
    if (!args || args.length === 0) {
      return sendMessage("Please enter the necessary information to generate the image.");
    }
    const prompt = args.join(" ");
    const generatedImageUrl = "https://www.samirxpikachu.run.place/marjia?prompt=" + prompt;
    message.sendMessage(user, {
      'image': {
        'url': generatedImageUrl
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': messageInstance
    });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Image text extraction command
keith({
  'nomCom': "extract",
  'reaction': '📡',
  'category': 'AI-LOGO'
}, async (user, message, context) => {
  const { respond: sendMessage, args, messageInstance } = context;
  try {
    if (!args || args.length === 0) {
      return sendMessage("Please insert the image URL and Alpha-MD will extract the text for you.");
    }
    const imageUrl = args.join(" ");
    const extractedTextUrl = "https://www.samirxpikachu.run.place/extract/text?url=" + imageUrl;
    message.sendMessage(user, {
      'image': {
        'url': extractedTextUrl
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': messageInstance
    });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Bing image generation command
keith({
  'nomCom': "flux",
  'reaction': '📡',
  'category': 'AI-LOGO'
}, async (user, message, context) => {
  const { respond: sendMessage, args, messageInstance } = context;
  try {
    if (!args || args.length === 0) {
      return sendMessage("Please describe your image and Alpha-MD will generate it.");
    }
    const prompt = args.join(" ");
    const generatedImageUrl = "https://www.samirxpikachu.run.place/flux?prompt=" + prompt;
    message.sendMessage(user, {
      'image': {
        'url': generatedImageUrl
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': messageInstance
    });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Bing2 image generation command
keith({
  'nomCom': "bing2",
  'reaction': '📡',
  'category': 'AI-LOGO'
}, async (user, message, context) => {
  const { respond: sendMessage, args, messageInstance } = context;
  try {
    if (!args || args.length === 0) {
      return sendMessage("Please describe your image and Alpha-MD will generate it.");
    }
    const prompt = args.join(" ");
    const generatedImageUrl = "https://www.samirxpikachu.run.place/marjia?prompt=" + prompt;
    message.sendMessage(user, {
      'image': {
        'url': generatedImageUrl
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': messageInstance
    });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Ilama image generation command
keith({
  'nomCom': "ilama",
  'reaction': '📡',
  'category': 'AI-LOGO'
}, async (user, message, context) => {
  const { respond: sendMessage, args, messageInstance } = context;
  try {
    if (!args || args.length === 0) {
      return sendMessage("Please describe your image and Alpha-MD will generate it.");
    }
    const prompt = args.join(" ");
    const generatedImageUrl = "https://www.samirxpikachu.run.place/multi/Ml?prompt=" + prompt;
    message.sendMessage(user, {
      'image': {
        'url': generatedImageUrl
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': messageInstance
    });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});

// Beautify image command
keith({
  'nomCom': "beautify",
  'reaction': '📡',
  'category': 'AI-LOGO'
}, async (user, message, context) => {
  const { respond: sendMessage, args, messageInstance } = context;
  try {
    if (!args || args.length === 0) {
      return sendMessage("Kindly enter a valid image URL to beautify your image.");
    }
    const imageUrl = args.join(" ");
    const beautifiedImageUrl = "https://samirxpikachuio.onrender.com/remacne?url=" + imageUrl;
    message.sendMessage(user, {
      'image': {
        'url': beautifiedImageUrl
      },
      'caption': "*powered by ALPHA-MD*"
    }, {
      'quoted': messageInstance
    });
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    sendMessage("Oops, an error occurred while processing your request");
  }
});
keith(
  {
    nomCom: "animevid",
    categorie: "Fun",
    reaction: "🎥"
  },
  async (origineMessage, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;
    const jsonURL = "https://widipe.com/download/storyanime";

    try {
      // Fetch data from the API
      const response = await axios.get(jsonURL);
      const data = response.data;

      // Check if the expected fields are in the response
      if (data?.status && data?.result?.url) {
        const videoUrl = data.result.url;
        const caption = "*POWERED BY ALPHA-MD*";

        // Send video message with caption
        await zk.sendMessage(origineMessage, 
          { 
            video: { url: videoUrl }, 
            caption 
          }, 
          { quoted: ms }
        );
      } else {
        // Respond if no video is found in the data
        await repondre("No video found. Please try again later.");
      }
    } catch (error) {
      console.error('Error retrieving data from JSON:', error);
      await repondre('There was an error retrieving the video.');
    }
  }
);

keith({
  nomCom: "bible",
  reaction: '🎎',
  categorie: "General"
}, async (context, message, params) => {
  const { repondre: respond, arg, ms } = params;
  const reference = arg.join(" ");
  
  if (!reference) {
    return respond("Please specify the book, chapter, and verse you want to read. Example: bible john 3:16");
  }
  
  try {
    const response = await fetch(`https://bible-api.com/${reference}`);
    
    if (!response.ok) {
      return respond("Invalid reference. Example: bible john 3:16");
    }
    
    const data = await response.json();
    const messageText = `
ᬑ *ALPHA HOLY BIBLE* ᬒ

⧭ *_WE'RE READING:_* ${data.reference}

⧭ *_NUMBER OF VERSES:_* ${data.verses.length}

⧭ *_NOW READ:_* ${data.text}

⧭ *_LANGUAGE:_* ${data.translation_name}
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆ `;
    
    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred while fetching the Bible passage.");
  }
});

// Poll Command
keith({
  nomCom: "poll",
  reaction: '✨',
  categorie: "General"
}, async (context, message, params) => {
  const { repondre: respond, arg, ms } = params;
  const [question, ...options] = arg.join(" ").split('/');
  
  if (options.length < 2) {
    return respond("Incorrect format. Example: poll what is 1+1/2, 3, 4");
  }
  
  const pollOptions = options[0].split(',').map(option => option.trim());
  
  await message.sendMessage(context, {
    poll: {
      name: question,
      values: pollOptions
    }
  });
});

// Fact Command
keith({
  nomCom: "fact",
  reaction: '✌️',
  categorie: "User"
}, async (context, message, params) => {
  const { repondre: respond, arg, ms } = params;
  
  try {
    const response = await fetch("https://nekos.life/api/v2/fact");
    const data = await response.json();
    const factMessage = `
┏━━━━ *ALPHA-FACT* ━━━━━◆                     
┃
┃   *◇* ${data.fact} 
┃
┃   *◇* Regards *ALPHA MD*
┃      
 ╭────────────────◆
 │ *_Powered by keithkeizzah._*
 ╰─────────────────◆
    `;
    
    await respond(factMessage);
  } catch (error) {
    console.error(error);
    await respond("An error occurred while fetching the fact.");
  }
});

// Quote Command
keith({
  nomCom: "quotes",
  reaction: '🗿',
  categorie: "User"
}, async (context, message, params) => {
  const { repondre: respond, arg, ms } = params;
  
  try {
    const response = await fetch("https://favqs.com/api/qotd");
    const data = await response.json();
    const quoteMessage = `
   ┏   ━━━━━QUOTE━━━━━━◆
   ┃   *◇* _${data.quote.body}_
   ┃  
   ┃   *◇* *AUTHOR:* ${data.quote.author}
  ┃      
  ┃    *◇*  *regards ALPHA MD*
  ┃    
   ╭  ────────────────◆
   │ *_Powered by keithkeizzah._*
   ╰─────────────────◆
    `;
    
    await respond(quoteMessage);
  } catch (error) {
    console.error(error);
    await respond("An error occurred while fetching the quote.");
  }
});

// Define Command
keith({
  nomCom: "define",
  reaction: '😁',
  categorie: "Search"
}, async (context, message, params) => {
  const { repondre: respond, arg, ms } = params;
  const term = arg.join(" ");
  
  if (!term) {
    return respond("Please provide a term to define.");
  }
  
  try {
    const { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${term}`);
    const definition = data.list[0];
    
    if (definition) {
      const definitionMessage = `
        Word: ${term}
        Definition: ${definition.definition.replace(/\[|\]/g, '')}
        Example: ${definition.example.replace(/\[|\]/g, '')}
      `;
      
      return respond(definitionMessage);
    } else {
      return respond(`No result found for "${term}".`);
    }
  } catch (error) {
    console.error(error);
    return respond("An error occurred while fetching the definition.");
  }
});

// Element Command
keith({
  nomCom: "element",
  reaction: '📓',
  categorie: "Education-corner"
}, async (context, message, params) => {
  const { repondre: sendResponse, arg: commandArgs } = params;
  const elementQuery = commandArgs.join(" ").trim();

  if (!elementQuery) {
    return sendResponse("Please provide an element symbol or name.");
  }

  try {
    let response = await fetch(`https://api.popcat.xyz/periodic-table?element=${elementQuery}`);
    
    if (!response.ok) {
      return sendResponse("Could not find information for the provided element. Please check the symbol or name.");
    }

    let data = await response.json();
    let formattedMessage = `
*Alpha Md Element Information:*
🚀 *Name:* ${data.name}
🚀 *Symbol:* ${data.symbol}
🚀 *Atomic Number:* ${data.atomic_number}
🚀 *Atomic Mass:* ${data.atomic_mass}
🚀 *Period:* ${data.period}
🚀 *Phase:* ${data.phase}
🚀 *Discovered By:* ${data.discovered_by}
🚀 *Summary:* ${data.summary}
   𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐀𝐋𝐏𝐇𝐀 𝐌𝐃
> Regards keithkeizzah `;

    await sendResponse(formattedMessage);

  } catch (error) {
    sendResponse("An error occurred while fetching the element data. Please try again later.");
  }
});

// GitHub Command
keith({
  nomCom: "github",
  reaction: '💻',
  categorie: "Search"
}, async (context, message, params) => {
  const { repondre: respond, arg, ms } = params;
  const githubUsername = arg.join(" ");

  if (!githubUsername) {
    return respond("Give me a valid GitHub username like: github keithkeizzah");
  }

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}`);
    const data = await response.json();

    if (data.message === "Not Found") {
      return respond(`User ${githubUsername} not found.`);
    }

    const githubMessage = `
°GITHUB USER INFO°
🚩 Id: ${data.id}
🔖 Name: ${data.name}
🔖 Username: ${data.login}
✨ Bio: ${data.bio}
🏢 Company: ${data.company}
📍 Location: ${data.location}
📧 Email: ${data.email || "Not provided"}
📰 Blog: ${data.blog || "Not provided"}
🔓 Public Repos: ${data.public_repos}
🔐 Public Gists: ${data.public_gists}
👪 Followers: ${data.followers}
🫶 Following: ${data.following}
`;

    await respond(githubMessage);
  } catch (error) {
    console.error(error);
    await respond("An error occurred while fetching GitHub user data.");
  }
});

// TikTok Stalk Command
keith({
  nomCom: "tiktokstalk",
  reaction: '🎎',
  categorie: "Stalkers"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const username = arg.join(" ");
  
  if (!username) {
    return respond("Please specify the username");
  }
  
  try {
    const response = await axios.get(`https://www.noobs-api.000.pe/dipto/tiktokinfo?userName=${encodeURIComponent(username)}`);
    
    if (response.status !== 200) {
      return respond("Invalid username");
    }
    
    const userInfo = response.data;

    const messageText = `
┌──「 *ALPHA TIKTOK STALK* 
▢ *🔖Name:* ${userInfo.full_name || 'Unknown'}
▢ *🔖Username:* ${userInfo.username || "Unknown"}
▢ *👥Followers:* ${userInfo.followers || 'Unknown'}
▢ *🫂Following:* ${userInfo.following || "Unknown"}
▢ *📌Bio:* ${userInfo.biography || "No Bio"}
▢ *🔗 External Link:* ${userInfo.external_url || "No Link"}
▢ *🔗 Profile Link:* https://tiktok.com/${userInfo.username || "unknown"}
└────────────`;

    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred.");
  }
});

// Instagram Stalk Command
keith({
  nomCom: "instastalk",
  reaction: '🎎',
  categorie: "Stalkers"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const username = arg.join(" ");
  
  if (!username) {
    return respond("Please specify the username");
  }
  
  try {
    const response = await axios.get(`https://www.noobs-api.000.pe/dipto/instainfo?username=${encodeURIComponent(username)}`);
    
    if (response.status !== 200) {
      return respond("Invalid username");
    }
    
    const userInfo = response.data;

    const messageText = `
┌──「 *ALPHA INSTAGRAM STALK* 
▢ *🔖Name:* ${userInfo.full_name || 'Unknown'}
▢ *🔖Username:* ${userInfo.username || "Unknown"}
▢ *👥Followers:* ${userInfo.followers || 'Unknown'}
▢ *🫂Following:* ${userInfo.following || "Unknown"}
▢ *📌Bio:* ${userInfo.biography || "No Bio"}
▢ *🔗 External Link:* ${userInfo.external_url || "No Link"}
▢ *🔗 Profile Link:* https://instagram.com/${userInfo.username || "unknown"}
└────────────`;

    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred.");
  }
});

// WhatsApp Channel Stalk Command
keith({
  nomCom: "channelstalk",
  reaction: '🎎',
  categorie: "Stalkers"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const username = arg.join(" ");
  
  if (!username) {
    return respond("Please specify the username");
  }
  
  try {
    const response = await axios.get(`https://api.giftedtechnexus.co.ke/api/stalk/wachannel?url=${encodeURIComponent(username)}`);
    
    if (response.status !== 200) {
      return respond("Invalid link");
    }
    
    const userInfo = response.data;

    const messageText = `
┌──「 *ALPHA CHANNEL STALK* 
▢ *🔖Name:* ${userInfo.full_name || 'Unknown'}
▢ *👥Followers:* ${userInfo.followers || 'Unknown'}
▢ *📌Bio:* ${userInfo.biography || "No Bio"}
▢ *🔗 External Link:* ${userInfo.external_url || "No Link"}
▢ *🔗 Profile Link:* https://whatsapp.com/${userInfo.username || "unknown"}
└────────────`;

    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred.");
  }
});

// IP Stalk Command
keith({
  nomCom: "ipstalk",
  reaction: '🎎',
  categorie: "Stalkers"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const username = arg.join(" ");
  
  if (!username) {
    return respond("Please specify the username");
  }
  
  try {
    const response = await axios.get(`https://www.noobs-api.000.pe/dipto/instainfo?username=${encodeURIComponent(username)}`);
    
    if (response.status !== 200) {
      return respond("Invalid username");
    }
    
    const userInfo = response.data;

    const messageText = `
❪ *°ALPHA-MD IP ADDRESS STALKER°* ❫
│
│▢ *Continent:* ${userInfo.continent || "Unknown"}
│▢ *Country:* ${userInfo.country || "Unknown"}
│▢ *Region:* ${userInfo.region || "Unknown"}
│▢ *City:* ${userInfo.city || "Unknown"}
│▢ *ZIP:* ${userInfo.zip || "Unknown"}
│▢ *Latitude:* ${userInfo.lat || "Unknown"}
│▢ *Longitude:* ${userInfo.lon || "Unknown"}
│▢ *Timezone:* ${userInfo.timezone || "Unknown"}
│▢ *Currency:* ${userInfo.currency || "Unknown"}
│▢ *ISP:* ${userInfo.isp || "Unknown"}
│▢ *Organization:* ${userInfo.org || "Unknown"}
│▢ *AS:* ${userInfo.as || "Unknown"}
│▢ *Reverse DNS:* ${userInfo.reverse || "Unknown"}
│▢ *Mobile:* ${userInfo.mobile || "Unknown"}
│▢ *Proxy:* ${userInfo.proxy || "Unknown"}
│▢ *Hosting:* ${userInfo.hosting || "Unknown"}
│▢ *IP Address:* ${userInfo.ip || "Unknown"}
└─────────────────◆
╭───────────────────◆
│ *_Powered by keithkeizzah._*
╰────────────────────◆`;

    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred.");
  }
});

// GitHub Stalk Command
keith({
  nomCom: "gitstalk",
  reaction: '🎎',
  categorie: "Stalkers"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const username = arg.join(" ");
  
  if (!username) {
    return respond("Please specify the username");
  }
  
  try {
    const response = await axios.get(`https://api.github.com/users/${encodeURIComponent(username)}`);
    
    if (response.status !== 200) {
      return respond("Invalid username");
    }
    
    const userInfo = response.data;

    const messageText = `
❴ *°ALPHA-MD GITHUB STALKER°* ❵
│
│♦️ Name: ${userInfo.name || 'N/A'}
│🔖 Username: ${userInfo.login || 'N/A'}
│✨ Bio: ${userInfo.bio || "N/A"}
│🏢 Company: ${userInfo.company || 'N/A'}
│📍 Location: ${userInfo.location || "N/A"}
│📧 Email: ${userInfo.email || "N/A"}
│📰 Blog: ${userInfo.blog || "N/A"}
│🔓 Public Repos: ${userInfo.public_repos || 0}
│👪 Followers: ${userInfo.followers || 0}
│🫶 Following: ${userInfo.following || 0}
╭───────────────────◆
│ *_Powered by keithkeizzah._*
╰────────────────────◆`;

    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred.");
  }
});

// Twitter Stalk Command
keith({
  nomCom: "twitterstalk",
  reaction: '🎎',
  categorie: "Stalkers"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const username = arg.join(" ");
  
  if (!username) {
    return respond("Please specify the username");
  }
  
  try {
    const response = await axios.get(`https://www.noobs-api.000.pe/dipto/twitterinfo?username=${encodeURIComponent(username)}`);
    
    if (response.status !== 200) {
      return respond("Invalid username");
    }
    
    const userInfo = response.data;

    const messageText = `
┌──「 *ALPHA TWITTER STALK* 
▢ *🔖Name:* ${userInfo.full_name || 'Unknown'}
▢ *🔖Username:* ${userInfo.username || "Unknown"}
▢ *👥Followers:* ${userInfo.followers || 'Unknown'}
▢ *🫂Following:* ${userInfo.following || "Unknown"}
▢ *📌Bio:* ${userInfo.biography || "No Bio"}
▢ *🔗 External Link:* ${userInfo.external_url || "No Link"}
▢ *🔗 Profile Link:* https://x.com/${userInfo.username || "unknown"}
└────────────`;

    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred.");
  }
});

// Facebook Stalk Command
keith({
  nomCom: "facebookstalk",
  reaction: '🎎',
  categorie: "Stalkers"
}, async (context, message, params) => {
  const { repondre: respond, arg } = params;
  const accessToken = arg.join(" ");
  
  if (!accessToken) {
    return respond("Please specify the Facebook token");
  }
  
  try {
    const response = await axios.get(`https://www.noobs-api.000.pe/dipto/fbinfo?accestoken=${encodeURIComponent(accessToken)}`);
    
    if (response.status !== 200) {
      return respond("Invalid Facebook token");
    }
    
    const userInfo = response.data;

    const messageText = `
┌──「 *ALPHA FACEBOOK STALK* 
▢ *🔖Name:* ${userInfo.full_name || 'Unknown'}
▢ *🔖Username:* ${userInfo.username || "Unknown"}
▢ *👥Followers:* ${userInfo.followers || 'Unknown'}
▢ *🫂Following:* ${userInfo.following || "Unknown"}
▢ *📌Bio:* ${userInfo.biography || "No Bio"}
▢ *🔗 External Link:* ${userInfo.external_url || "No Link"}
▢ *🔗 Profile Link:* https://facebook.com/${userInfo.username || "unknown"}
└────────────`;

    await respond(messageText);
  } catch (error) {
    console.error(error);
    await respond("An error occurred.");
  }
});

keith({
  nomCom: "support",
  categorie: "General"
}, async (dest, client, commandeOptions) => {
  const {
    ms,
    repondre,
    auteurMessage
  } = commandeOptions;
  repondre("https://chat.whatsapp.com/DvXonepPp1XBPOYIBziTl1");
  await client.sendMessage(auteurMessage, {
    text: `https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47`
  }, {
    quoted: ms
  });
});

keith({
  nomCom: 'setcmd',
  categorie: 'stickcmd'
}, async (dest, zk, commandeOptions) => {
  const {
    ms,
    arg,
    repondre,
    superUser,
    msgRepondu
  } = commandeOptions;
  if (!superUser) {
    repondre('You cannot use this command.');
    return;
  }
  if (msgRepondu && msgRepondu.stickerMessage) {
    if (!arg || !arg[0]) {
      repondre('Please provide the name of the command.');
      return;
    }
    try {
      await addstickcmd(arg[0].toLowerCase(), msgRepondu.stickerMessage.url);
      repondre('Sticker command saved successfully.');
    } catch (error) {
      repondre('An error occurred while saving the sticker command.');
    }
  } else {
    repondre('Please mention a sticker.');
  }
});
keith({
  nomCom: 'delcmd',
  categorie: 'stickcmd'
}, async (dest, zk, commandeOptions) => {
  const {
    ms,
    arg,
    repondre,
    superUser
  } = commandeOptions;
  if (!superUser) {
    repondre('Only mods can use this command.');
    return;
  }
  if (!arg || !arg[0]) {
    repondre('Please provide the name of the command you want to delete.');
    return;
  }
  const cmdToDelete = arg[0].toLowerCase();
  try {
    await deleteCmd(cmdToDelete);
    repondre(`The command "${cmdToDelete}" has been deleted successfully.`);
  } catch (error) {
    repondre(`The command "${cmdToDelete}" does not exist.`);
  }
});
keith({
  nomCom: 'allcmd',
  categorie: 'stickcmd'
}, async (dest, zk, commandeOptions) => {
  const {
    repondre,
    superUser
  } = commandeOptions;
  if (!superUser) {
    repondre('Only mods can use this command.');
    return;
  }
  try {
    const allCmds = await getAllStickCmds();
    if (allCmds.length > 0) {
      const cmdList = allCmds.map(cmd => cmd.cmd).join(', ');
      repondre(`*List of all stickcmds:*\n${cmdList}`);
    } else {
      repondre('No stickcmds saved.');
    }
  } catch (error) {
    repondre('An error occurred while retrieving stickcmds.');
  }

});
keith({
  nomCom: "img",
  aliases: ['images', 'image'],
  categorie: "Search",
  reaction: "📷"
}, async (dest, zk, commandeOptions) => {
  const {
    repondre,
    ms,
    arg
  } = commandeOptions;

  // Check if the user provided a search term
  if (!arg[0]) {
    repondre('Which image would you like to search for? Please provide a search term.');
    return;
  }

  // Join the search terms into a single string
  const searchTerm = arg.join(" ");

  // Search for images using the search term
  gis(searchTerm, (error, results) => {
    if (error) {
      repondre("Oops, there was an error while searching for images.");
      console.error(error);
      return;
    }

    // If results are found, send images
    if (results && results.length > 0) {
      for (let i = 0; i < Math.min(5, results.length); i++) {
        const imageUrl = results[i].url;

        // Send the image with a caption
        zk.sendMessage(dest, {
          image: {
            url: imageUrl
          },
          caption: "*Powered by Alpha Md*"
        }, {
          quoted: ms
        });
      }
    } else {
      repondre("No images found for the search term.");
    }
  });
});
keith({
  'nomCom': "run-c++",
  'aliases': ["c++", "runc++"],
  'categorie': "Coding"
}, async (message, args, context) => {
  const {
    ms: messageSentTime,
    arg: commandArguments,
    repondre: reply,
    auteurMessage: messageAuthor,
    nomAuteurMessage: authorName,
    msgRepondu: repliedMessage,
    auteurMsgRepondu: repliedMessageAuthor
  } = context;
  try {
    // Check if the user provided a valid code
    if (!commandArguments[0]) {
      return reply("Quote a valid and short C++ code to compile.");
    }

    // Join the command arguments into a single code string
    let code = commandArguments.join(" ");

    // Compile and run the C++ code
    let result = await cpp.runSource(code);

    // Handle result
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});
keith({
  'nomCom': "run-c",
  'aliases': ["runcc", "runc"],
  'categorie': "Coding"
}, async (message, args, context) => {
  const {
    ms: messageSentTime,
    arg: commandArguments,
    repondre: reply,
    auteurMessage: messageAuthor,
    nomAuteurMessage: authorName,
    msgRepondu: repliedMessage,
    auteurMsgRepondu: repliedMessageAuthor
  } = context;
  try {
    // Check if the user provided a valid code
    if (!commandArguments[0]) {
      return reply("Quote a valid and short C code to compile.");
    }

    // Join the command arguments into a single code string
    let code = commandArguments.join(" ");

    // Compile and run the C++ code
    let result = await c.runSource(code);

    // Handle result
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});
keith({
  'nomCom': "run-java",
  'aliases': ["java", "runjava"],
  'categorie': "Coding"
}, async (message, args, context) => {
  const {
    ms: messageSentTime,
    arg: commandArguments,
    repondre: reply,
    auteurMessage: messageAuthor,
    nomAuteurMessage: authorName,
    msgRepondu: repliedMessage,
    auteurMsgRepondu: repliedMessageAuthor
  } = context;
  try {
    // Check if the user provided a valid code
    if (!commandArguments[0]) {
      return reply("Quote a valid and short java code to compile.");
    }

    // Join the command arguments into a single code string
    let code = commandArguments.join(" ");

    // Compile and run the C++ code
    let result = await java.runSource(code);

    // Handle result
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});
keith({
  'nomCom': "run-js",
  'aliases': ["node", "javascript"],
  'categorie': "Coding"
}, async (message, args, context) => {
  const {
    ms: messageSentTime,
    arg: commandArguments,
    repondre: reply,
    auteurMessage: messageAuthor,
    nomAuteurMessage: authorName,
    msgRepondu: repliedMessage,
    auteurMsgRepondu: repliedMessageAuthor
  } = context;
  try {
    // Check if the user provided a valid code
    if (!commandArguments[0]) {
      return reply("Quote a valid and short javascript code to compile.");
    }

    // Join the command arguments into a single code string
    let code = commandArguments.join(" ");

    // Compile and run the C++ code
    let result = await node.runSource(code);

    // Handle result
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});
keith({
  'nomCom': "run-py",
  'aliases': ["python", "runpy"],
  'categorie': "Coding"
}, async (message, args, context) => {
  const {
    ms: messageSentTime,
    arg: commandArguments,
    repondre: reply,
    auteurMessage: messageAuthor,
    nomAuteurMessage: authorName,
    msgRepondu: repliedMessage,
    auteurMsgRepondu: repliedMessageAuthor
  } = context;
  try {
    // Check if the user provided a valid code
    if (!commandArguments[0]) {
      return reply("Quote a valid and short python code to compile.");
    }

    // Join the command arguments into a single code string
    let code = commandArguments.join(" ");

    // Compile and run the C++ code
    let result = await python.runSource(code);

    // Handle result
    if (result.error) {
      reply(`Error: ${result.error}`);
    } else {
      reply(`Output:\n${result.stdout}`);
      if (result.stderr) {
        reply(`Error Output:\n${result.stderr}`);
      }
    }
  } catch (err) {
    // Handle unexpected errors
    console.error(err);
    reply("An error occurred while trying to run the code.");
  }
});
keith({
  'nomCom': "debinary",
  // Command name
  'aliases': ["decode", "decodebinary"],
  // Aliases for the command
  'categorie': "Coding" // Category of the command
}, async (zk, args, context) => {
  const {
    ms,
    repondre
  } = context;

  // Get the text (argument) provided after the command
  const text = args.join(" ").trim();

  // If no text is provided after the command, send an error message
  if (!text) {
    return repondre('Please provide a text to decode.');
  }
  // Extract the basePath from the input text (if needed)
  const basePath = text.split(/^[\\/!#.]/)[0] || '/';

  // Check if the text starts with a valid condition
  const isPathStartsWithCondition = text.slice(basePath.length).trim().split(' ')[0]?.toLowerCase();
  const possibleKeys = ['Please pro', 'decode text to video'];

  // If the decoded key matches any of the valid keys, proceed with decoding
  if (possibleKeys.includes(isPathStartsWithCondition)) {
    // Extract the key for decoding the binary data
    const decodedKey = text.slice(basePath.length + isPathStartsWithCondition.length).trim();
    if (!decodedKey) {
      return repondre('Invalid decoding request.');
    }
    try {
      // Decode the binary data asynchronously using dBinary
      const decodedData = await dBinary(decodedKey);
      repondre(decodedData);
    } catch (error) {
      repondre('An error occurred while decoding the data.');
    }
  } else {
    repondre('Invalid decoding request.');
  }
});
keith({
  'nomCom': "ebinary",
  // Command name
  'aliases': ["encode", "encodebinary"],
  // Aliases for the command
  'categorie': "Coding" // Category of the command
}, async (zk, args, context) => {
  const {
    ms,
    repondre
  } = context;

  // Get the text (argument) provided after the command
  const text = args.join(" ").trim(); // Use `args` instead of `ms.body`

  // If no text is provided after the command, send an error message
  if (!text) {
    repondre('Please provide a text to encode.');
    return;
  }

  // Attempt to encode the text in binary
  try {
    let encodedResult = await eBinary(text); // Encode the text to binary

    // Send the encoded result back to the user
    repondre(encodedResult);
  } catch (error) {
    // If an error occurs during encoding, send an error message
    repondre('Error encoding the text to binary.');
  }
});
keith({
  'nomCom': "encrypt",
  'aliases': ["enc", "obfuscate", "obfu"],
  'categorie': "Coding"
}, async (message, args, context) => {
  const {
    ms: messageSentTime,
    arg: commandArguments,
    repondre: reply,
    auteurMessage: messageAuthor,
    nomAuteurMessage: authorName,
    msgRepondu: repliedMessage,
    auteurMsgRepondu: repliedMessageAuthor
  } = context;
  try {
    // Join the command arguments into a single string
    let codeToObfuscate = commandArguments.join(" ");

    // Check if there's no code provided to obfuscate
    if (!commandArguments[0]) {
      reply("After the command, provide a valid JavaScript code for encryption.");
      return;
    }

    // Obfuscate the JavaScript code with specific options
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(codeToObfuscate, {
      'compact': true,
      'controlFlowFlattening': true,
      'controlFlowFlatteningThreshold': 0.1,
      'numbersToExpressions': true,
      'simplify': true,
      'stringArrayShuffle': true,
      'splitStrings': true,
      'stringArrayThreshold': 0.1
    });

    // Send back the obfuscated code
    await reply(obfuscatedCode.getObfuscatedCode());
  } catch (error) {
    // In case of any errors, notify the user
    reply("Something went wrong. Please check if your code is logical and has the correct syntax.");
  }
});

keith({
  'nomCom': "carbon",
  'aliases': ["C", "run-carbon"],
  'categorie': "Coding"
}, async (zk, args, context) => {
  const { ms, repondre } = context;

  try {
    // Ensure that the user has provided code to compile
    if (!args || args.length === 0) {
      return repondre("Please provide a valid and short Carbon code to compile.");
    }

    // Join the arguments into a single code string
    let code = args.join(" ");

    // Send the request to the Carbonara API to generate the image
    try {
      const response = await axios.post('https://carbonara.solopov.dev/api/cook', {
        code: code,
        backgroundColor: '#1F816D', // You can change the background color here
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the API response is valid
      if (response.status !== 200) {
        return repondre('API failed to fetch a valid response.');
      }

      // Get the image buffer from the response (response.data is base64 encoded)
      const imageBuffer = Buffer.from(response.data, 'base64');

      // Send the generated image as a message
      const caption = "Downloaded by Alpha Md";
      await zk.sendMessage(ms, { image: imageBuffer, caption: caption }, { quoted: ms });
    } catch (error) {
      return repondre("An error occurred while processing your request.\n" + error.message);
    }
  } catch (error) {
    return repondre('An unexpected error occurred: ' + error.message);
  }
});

keith({
  'nomCom': 'apk',
  'aliases': ['app', 'playstore'],
  'reaction': '✨',
  'categorie': 'Download'
}, async (groupId, client, context) => {
  const { repondre, arg, ms } = context;

  try {
    // Check if app name is provided
    const appName = arg.join(" ");
    if (!appName) {
      return repondre("Please provide an app name.");
    }

    // Fetch app search results from the BK9 API
    const searchResponse = await axios.get(`https://bk9.fun/search/apk?q=${appName}`);
    const searchData = searchResponse.data;

    // Check if any results were found
    if (!searchData.BK9 || searchData.BK9.length === 0) {
      return repondre("No app found with that name, please try again.");
    }

    // Fetch the APK details for the first result
    const appDetailsResponse = await axios.get(`https://bk9.fun/download/apk?id=${searchData.BK9[0].id}`);
    const appDetails = appDetailsResponse.data;

    // Check if download link is available
    if (!appDetails.BK9 || !appDetails.BK9.dllink) {
      return repondre("Unable to find the download link for this app.");
    }

    // Send the APK file to the group
    await client.sendMessage(
      groupId,
      {
        document: { url: appDetails.BK9.dllink },
        fileName: `${appDetails.BK9.name}.apk`,
        mimetype: "application/vnd.android.package-archive",
        caption: "Downloaded by Alpha"
      },
      { quoted: ms }
    );

  } catch (error) {
    // Catch any errors and notify the user
    console.error("Error during APK download process:", error);
    repondre("APK download failed. Please try again later.");
  }
});
