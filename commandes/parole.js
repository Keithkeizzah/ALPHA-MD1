const {zokou} = require("../framework/zokou")

const lyrics = require("lyric-music");

zokou ({nomCom : "paroles",categorie :"Recherche"} , async (dest,zk,commandeOptions) => {
  const {ms,repondre,arg} = commandeOptions;

  const query = arg.join(" ")

  if(!query) {repondre("veiller entrer un terme de recherche ") ; return} ;

    try {
        const lyric = await lyrics(query);

      console.log(lyric)
        repondre(lyric);
    } catch (error) {
        repondre("paroles non trouvée");
    }



  
})
