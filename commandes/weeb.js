const axios = require('axios');
const fs = require('fs');
const { zokou } = require("../framework/zokou");
const { writeFile } = require('fs/promises')

// Commande waifu
zokou({
  nomCom: "Keithhuncho",
  categorie: "Weeb",
  reaction: "😏"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://telegra.ph/file/65b51c8109714e63c497b.jpg'; // Remplacez avec le lien réel de l'API waifu.pics

  try {
    
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});

// Commande neko
zokou({
  nomCom: "Keithtech",
  categorie: "Weeb",
  reaction: "☣"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://telegra.ph/file/964d06db1f4a5aee6b290.jpg'; // Remplacez avec le lien réel de l'API waifu.pics ou une autre API de nekos

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});

// Commande shinobu
zokou({
  nomCom: "keitharsenal",
  categorie: "Weeb",
  reaction: "👑"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://telegra.ph/file/48632fe75d0394ad1faba.jpg'; // Remplacez avec le lien réel de l'API waifu.pics ou une autre API avec des images de Shinobu

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});

// Commande megumin
zokou({
  nomCom: "hacker",
  categorie: "Weeb",
  reaction: "☣"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://telegra.ph/file/8e8c281178741cc77350c.jpg'; // Remplacez avec le lien réel de l'API waifu.pics ou une autre API avec des images de Megumin

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage,{ image: { url: imageUrl } }, { quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données :', error);
  }
});



zokou({
  nomCom: "Keithmd",
  categorie: "Weeb",
  reaction: "☣"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;



  try {
    for (let i = 0; i < 5; i++) {
      let url = 'https://telegra.ph/file/0cd65d867552c273f1739.jpg'
      
   const response = await   axios.get(url, { responseType: 'arraybuffer' })

  

  const image = response.data;

   await writeFile('./cosplay.jpg', image)
      zk.sendMessage(origineMessage,{image : {url : `./cosplay.jpg`}},{quoted :ms}) }
  
  } catch (e) {
    repondre("je reçois malheureusement une erreur : " + e);
  }
});


zokou({nomCom:"alphabot"it,categorie: "Weeb",reaction : "💞"},async(dest,zk,commandeOptions)=>{ const {repondre , ms} = commandeOptions;
    let api = 'https://telegra.ph/file/49a3833ccbc65a8e7ea4b.jpg'
  try {
     repondre('she/he dont love you :)')
 const result = await axios.get(api)
  

    zk.sendMessage(dest, { image: { url: result.data.male }, caption: `For Man` }, { quoted: ms })
        zk.sendMessage(dest, { image: { url: result.data.female }, caption: `_For woman_` }, { quoted: ms })
    
  } catch (e) { repondre(e)}                                                                                        
  
}
      )

