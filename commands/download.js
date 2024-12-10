const {keith} = require('../keizzah/keith');
const fs = require('fs');
const traduire = require("../keizzah/traduction");
const pkg = require('@whiskeysockets/baileys');
const { generateWAMessageFromContent, proto } = pkg;

const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');

keith({nomCom : "igdl" , categorie : "Download" , aliases : ["insta" , "instagram"] },async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('Veillez insérer un lien video instagramme');return}; 

  try {
     
    let igvid = await axios('http://api.maher-zubair.tech/download/instagram?url='+link)

    try {
      //console.log(igvid.data.result[0].url) ;
    zk.sendMessage(dest,{video : {url : igvid.data.result[0].url},caption : "ig video downloader powered by *Alpha-Md*",gifPlayback : false },{quoted : ms}) 
    }
    catch (e) {

        zk.sendMessage(dest,{image : {url : igvid.data.result[0].url},caption : "ig image downloader powered by *Alpha-Md*"})
    }
  
  } catch (e) {repondre("erreur survenue lors du téléchargement \n " + e)}
  
});


keith({
  nomCom: "fbdl",
 aliases: ["fb", "facebook"],
  categorie: "Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.hd  }, caption: 'facebook video downloader powered by *Alpha-MD*' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre('try fbdl2 on this link')});


   
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.' , error);
  }
});



keith({ nomCom: "tiktok", categorie: "Download", reaction: "🎵" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`how to use this command:\n ${prefixe}tiktok tiktok_video_link`);
    return;
  }

  const videoUrl = arg.join(" ");

 let data = await axios.get('http://api.maher-zubair.tech/download/tiktok2?url='+ videoUrl) ;

  let tik = data.data.result

      // Envoi du message avec le thumbnail de la vidéo
      const caption = `
Title: ${tik.title}`;

         
      zk.sendMessage(dest, { video: { url: tik.video[0]} , caption : caption },{quoted : ms});    

  
});

keith({
  nomCom: "fbdl2",
  categorie: "Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link! !');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.sd  }, caption: 'facebook video downloader powered by *Alpha-MD*' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre(error)});


   
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.' , error);
  }
});
