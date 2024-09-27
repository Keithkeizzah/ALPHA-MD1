const { zokou } = require("../framework/zokou");
const axios = require("axios");

const fetchAPI = async (url, repondre) => {
  try {
    const response = await axios.get(url);
    await repondre(response.data.result);
  } catch (error) {
    console.error("Error fetching data:", error);
    repondre("An error occurred while fetching data.");
  }
};

zokou({
  nomCom: "mygroups",
  categorie: "User",
  reaction: "💿"
}, async (senn, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    const getGroupzs = await zk.groupFetchAllParticipating();
    const groupzs = Object.values(getGroupzs);
    const groupIds = groupzs.map(v => v.id);
    let responseMessage = `*GROUPS AM IN*\n\n`;

    repondre(`You are currently in ${groupIds.length} groups. Alpha MD will send that list shortly...`);

    for (const id of groupIds) {
      const metadata = await zk.groupMetadata(id);
      responseMessage += `*GROUP NAME:* ${metadata.subject}\n`;
      responseMessage += `*MEMBERS:* ${metadata.participants.length}\n`;
      responseMessage += `*GROUP ID:* ${id}\n\n`;
    }
    
    await repondre(responseMessage);
  } catch (error) {
    console.error("Error fetching groups:", error);
    repondre("An error occurred while fetching groups.");
  }
});

zokou({
  nomCom: "flirt",
  reaction: '😁',
  categorie: "FUN"
}, async (client, user, options) => {
  const { repondre } = options;
  await fetchAPI("https://shizoapi.onrender.com/api/texts/flirt?apikey=shizo", repondre);
});

zokou({
  nomCom: "pickupline",
  reaction: '😁',
  categorie: "FUN"
}, async (client, user, options) => {
  const { repondre } = options;
  await fetchAPI("https://api.popcat.xyz/pickuplines", repondre);
});

zokou({
  nomCom: "yomama😂",
  reaction: '😁',
  categorie: "FUN"
}, async (client, user, options) => {
  const { repondre } = options;
  await fetchAPI("https://yomamaindra.onrender.com/jokes", repondre);
});

const generateImage = async (messageId, sender, prompt, category) => {
  try {
    const imageUrl = `https://www.noobs-api.000.pe/dipto/${category}?prompt=${encodeURIComponent(prompt)}`;
    
    await sender.sendMessage(messageId, {
      image: {
        url: imageUrl
      },
      caption: "*powered by ALPHA-MD*"
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return "Oops, an error occurred while processing your request.";
  }
};

const imageCommands = [
  { nomCom: "meta", category: "meta" },
  { nomCom: "genix", category: "genix" },
  { nomCom: "sdxl", category: "sdxl" },
  { nomCom: "monster", category: "monster" },
  { nomCom: "midjourney", category: "mj" },
  { nomCom: "pixart", category: "pixart" }
];

imageCommands.forEach(({ nomCom, category }) => {
  zokou({
    nomCom,
    reaction: '📡',
    categorie: 'META-AI'
  }, async (messageId, sender, { repondre, arg }) => {
    if (!arg || arg.length === 0) {
      return repondre("Please enter the necessary information to generate the image.");
    }

    const query = arg.join(" ");
    await generateImage(messageId, sender, query, category);
  });
});
