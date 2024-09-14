const { zokou } = require("../framework/zokou");
var mumaker = require("mumaker");
zokou({nomCom:"birthday1",categorie:"Logo",reaction:"🥵"},async(dest,zk,commandeOptions)=>{


  let {ms,arg,prefixe,repondre}=commandeOptions;
  try{
      if(!arg||arg=="")
      {
        repondre(prefixe+"arena Alpha Md");return;
      }

    var lien="https://en.ephoto360.com/birthday-cake-96.html";

    var img = await mumaker.ephoto(lien,arg.join(' '));
   repondre("processing ...")
    await zk.sendMessage(dest,{image:{url:img.image},caption:" *Powered by Alpha Md*"},{quoted:ms})
  }catch(e){repondre(e)}
})
