const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "guessflag",
  reaction: '📡',
  categorie: 'META-AI'
});

async function fetchFlagGameData() {
  try {
    const res = await axios.get("https://www.noobs-api.000.pe/dipto/flagGame");
    const data = res.data;

    // Assuming the data contains fields 'flag' and 'country'
    const flag = data.flag; // Adjust based on the actual API response structure
    const country = data.country; // Adjust based on the actual API response structure

    console.log(`Guess the country for this flag: ${flag}`);
    
    // You can implement further logic here to handle user input and check their guess

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchFlagGameData();
