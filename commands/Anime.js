const axios = require("axios");
const { keith } = require("../keizzah/keith");
const traduire = require("../keizzah/traduction");
const { Sticker, StickerTypes } = require("wa-sticker-formatter");

// Anime random command
keith({
  nomCom: "ranime",
  categorie: "Fun",
  reaction: "📺"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const jsonURL = "https://api.jikan.moe/v4/random/anime";

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url;
    const episodes = data.episodes;
    const status = data.status;

    const message = `📺 Titre: ${title}\n🎬 Épisodes: ${episodes}\n📡 Statut: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}`;
    
    // Send image and information
    await zk.sendMessage(origineMessage, {
      image: { url: imageUrl },
      caption: message
    }, { quoted: ms });
  } catch (error) {
    console.error('Error retrieving data from JSON:', error);
    repondre('Error retrieving data from JSON.');
  }
});

// Google search command
keith({
  nomCom: "google",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Give me a query.\n*Example: .google What is a bot.*");
    return;
  }

  const google = require('google-it');
  try {
    const results = await google({ query: arg.join(" ") });
    let msg = `Google search for: ${arg.join(" ")}\n\n`;

    for (let result of results) {
      msg += `➣ Title: ${result.title}\n`;
      msg += `➣ Description: ${result.snippet}\n`;
      msg += `➣ Link: ${result.link}\n\n────────────────────────\n\n`;
    }
    
    repondre(msg);
  } catch (error) {
    console.error('Google search error:', error);
    repondre("An error occurred during Google search.");
  }
});

// Movie/Series search command (IMDb)
keith({
  nomCom: "movie",
  aliases: ["series", "imdb"],
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0]) {
    repondre("Give the name of a series or movie.");
    return;
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg.join(" ")}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    imdbInfo += " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n";
    imdbInfo += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    imdbInfo += `🎬Title: ${imdbData.Title}\n`;
    imdbInfo += `📅 Year: ${imdbData.Year}\n`;
    imdbInfo += `⭐ Rating: ${imdbData.Rated}\n`;
    imdbInfo += `📆 Release: ${imdbData.Released}\n`;
    imdbInfo += `⏳ Runtime: ${imdbData.Runtime}\n`;
    imdbInfo += `🌀 Genre: ${imdbData.Genre}\n`;
    imdbInfo += `👨🏻‍💻 Director: ${imdbData.Director}\n`;
    imdbInfo += `✍ Writers: ${imdbData.Writer}\n`;
    imdbInfo += `👨‍🎬 Actors: ${imdbData.Actors}\n`;
    imdbInfo += `📃 Synopsis: ${imdbData.Plot}\n`;
    imdbInfo += `🌐 Language: ${imdbData.Language}\n`;
    imdbInfo += `🌍 Country: ${imdbData.Country}\n`;
    imdbInfo += `🎖️ Awards: ${imdbData.Awards}\n`;
    imdbInfo += `📦 Box Office: ${imdbData.BoxOffice}\n`;
    imdbInfo += `🏙️ Production: ${imdbData.Production}\n`;
    imdbInfo += `🌟 Score: ${imdbData.imdbRating}\n`;
    imdbInfo += `❎ IMDb Votes: ${imdbData.imdbVotes}`;

    await zk.sendMessage(dest, {
      image: { url: imdbData.Poster },
      caption: imdbInfo
    }, { quoted: ms });
  } catch (error) {
    console.error('IMDb search error:', error);
    repondre("An error occurred while searching IMDb.");
  }
});

// Emojimix command
keith({
  nomCom: "emomix",
  categorie: "Conversion"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0] || arg.length !== 1) {
    repondre("Incorrect use. Example: .emojimix 😀;🥰");
    return;
  }

  const emojis = arg.join(" ").split(";");
  
  if (emojis.length !== 2) {
    repondre("Please specify two emojis using a ';' as a separator.");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
      const sticker = new Sticker(response.data.result, {
        pack: "ALPHA-MD",
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer = await sticker.toBuffer();
      await zk.sendMessage(dest, { sticker: stickerBuffer }, { quoted: ms });
    } else {
      repondre("Unable to create emoji mix.");
    }
  } catch (error) {
    console.error('Emoji mix error:', error);
    repondre("An error occurred while creating the emoji mix.");
  }
});
