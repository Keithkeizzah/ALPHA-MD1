const { zokou } = require('../framework/zokou');
const traduire = require("../framework/traduction") ;
const { default: axios } = require('axios');
//const conf = require('../set');



  zokou({ nomCom: "news", reaction: "❗", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre(`Please ask a question Keith will answer it.`);
      }
  
      // Regrouper les arguments en une seule chaîne séparée par "-"
      const question = arg.join(' ');
      const response = await axios.get(`https://www.samirxpikachu.run.place/ppx?query=`);
      
      const data = response.data;
      if (data) {
        repondre(data.data);
      } else {
        repondre("Error during response generation.");
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oops, an error occurred while processing your request.");
    }
  });


  


