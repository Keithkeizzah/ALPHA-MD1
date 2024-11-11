const { keith } = require("../keizzah/keith");
const { default: axios } = require("axios");

// Pair code handler
keith({
  'nomCom': "code",
  'aliases': ["session", "pair", "paircode", "qrcode"],
  'reaction': '🚀',
  'categorie': 'User'
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

// Tech News handler
keith({
  'nomCom': "technews",
  'reaction': '📰',
  'categorie': 'News'
}, async (command, message, context) => {
  const { reply: replyToUser, messageQuote: quotedMessage } = context;

  try {
    const response = await axios.get("https://fantox001-scrappy-api.vercel.app/technews/random");
    const { thumbnail, news } = response.data;

    const messageContent = `*ALPHA-MD*\n\n${news}\n\n> *Powered by keithkeizzah*`;

    await message.sendMessage(command, {
      'image': { 'url': thumbnail },
      'caption': messageContent
    }, {
      'quoted': quotedMessage
    });
  } catch (error) {
    console.error("Error fetching tech news:", error);
    await replyToUser("Sorry, there was an error retrieving the news. Please try again later.");
  }
});

// Temporary Email handler
keith({
  'nomCom': "tempmail",
  'aliases': ['mail', 'temp'],
  'reaction': '📧',
  'categorie': "General"
}, async (sender, _replyFunction, context) => {
  const { repondre, prefixe, ms } = context;

  try {
    const tempEmail = Math.random().toString(36).substring(2, 12) + "@1secmail.com";
    await _replyFunction.sendMessage(sender, {
      text: `Your temporary email is: ${tempEmail}\n\nYou can use this email for temporary purposes. I will notify you if you receive any emails.`
    }, {
      quoted: ms
    });

    const checkEmails = async () => {
      try {
        const response = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${tempEmail}&domain=1secmail.com`);
        const emails = await response.json();
        if (emails.length > 0) {
          for (const email of emails) {
            const emailDetail = await fetch(`https://www.1secmail.com/api/v1/?action=readMessage&login=${tempEmail}&domain=1secmail.com&id=${email.id}`);
            const emailData = await emailDetail.json();
            const links = emailData.textBody.match(/(https?:\/\/[^\s]+)/g) || [];
            const linksText = links.length > 0 ? links.join("\n") : "No links found in the email content.";

            await _replyFunction.sendMessage(sender, {
              text: `You have received a new email!\n\nFrom: ${emailData.from}\nSubject: ${emailData.subject}\n\n${emailData.textBody}\n\nLinks found:\n${linksText}`
            }, {
              quoted: ms
            });
          }
        }
      } catch (err) {
        console.error("Error checking temporary email:", err);
      }
    };

    const intervalId = setInterval(checkEmails, 30000);
    setTimeout(() => {
      clearInterval(intervalId);
      _replyFunction.sendMessage(sender, {
        text: "Your temporary email session has ended. Please create a new temporary email if needed."
      }, {
        quoted: ms
      });
    }, 3600000); // Session timeout after 1 hour

  } catch (error) {
    console.error("Error generating temporary email:", error);
    await _replyFunction.sendMessage(sender, {
      text: "Error generating temporary email. Please try again later."
    }, {
      quoted: ms
    });
  }
});

// DALL·E Image Generator (Bing API)
keith({
  'nomCom': "bing",
  'aliases': ["dalle", "dal"],
  'reaction': '📡',
  'categorie': 'AI'
}, async (sender, _replyFunction, context) => {
  const { repondre, arg } = context;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please enter the necessary information to generate the image.");
    }

    const query = arg.join(" ");
    const imageUrl = `https://widipe.com/dalle?text=${encodeURIComponent(query)}`;

    await _replyFunction.sendMessage(sender, {
      'image': { 'url': imageUrl },
      'caption': "*Powered by ALPHA-MD*"
    });
  } catch (error) {
    console.error("Error generating image:", error);
    repondre("Oops, an error occurred while processing your request.");
  }
});

// Time in a specific country handler
keith({
  'nomCom': "time",
  'aliases': ["clock", "live", "now"],
  'reaction': '⌚',
  'categorie': "General"
}, async (sender, _replyFunction, context) => {
  const { repondre, arg } = context;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Enter the name of the country you want to know its time and date.");
    }

    const country = arg.join(" ");
    const response = await fetch(`https://levanter.onrender.com/time?code=${country}`);
    const data = await response.json();
    const { name, time, timeZone } = data.result[0];

    await repondre(`Live Time in *${name}* Stats:\n\n*Date & Time:* ${time}\n*TimeZone:* ${timeZone}\n\n> *POWERED BY ALPHA-MD*`);
  } catch (error) {
    console.error("Error fetching time data:", error);
    repondre("That country name is incorrect!");
  }
});
