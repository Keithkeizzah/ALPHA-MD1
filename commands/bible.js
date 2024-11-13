const { keith } = require("../keizzah/keith");
const axios = require("axios");
const Genius = require("genius-lyrics");

const geniusClient = new Genius.Client("jKTbbU-6X2B9yWWl-KOm7Mh3_Z6hQsgE4mmvwV3P3Qe7oNa9-hsrLxQV5l5FiAZO");

// Bible Command
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
