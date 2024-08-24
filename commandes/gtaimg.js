const { zokou } = require('../framework/zokou');
const axios = require('axios');
const fs = require('fs');

zokou({nomCom:"GTAImg",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

async function getGTAImg() {
  const imageSrc = 'https://i.postimg.cc/P5cPtzZJ/FB-IMG-1720537848140.jpg';
  const apiUrl = ('https://www.samirxpikachu.run.place/gta?url=${encodeURIComponent(imageSrc)};

  try {
    const response = await axios({
      method: 'get',
      url: apiUrl,
      responseType: 'arraybuffer',
    });

    fs.writeFileSync('gta.jpg', response.data);
    console.log('Saved as gta.jpg');
  } catch (error) {
    console.error('Error:', error);
  }
}

getGTAImg();
