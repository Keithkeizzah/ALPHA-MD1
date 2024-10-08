const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "population",
  reaction: "🗞️",
  categorie: "NEWS"
}, async (repondre, arg, ms) => {
  try {
    const response = await axios.get("https://bk9.fun/details/population");
    const data = response.data;

    if (data && data.status) {
      const result = data.BK9; // Accessing BK9 object directly
      const message = `*WORLDWIDE POPULATION STATISTICS:*\n\n` +
        `- *Total Population:* ${result.current.total}\n` +
        `- *Male Population:* ${result.current.male}\n` +
        `- *Female Population:* ${result.current.female}\n` +
        `- *Births This Year:* ${result.this_year.births}\n` +
        `- *Deaths This Year:* ${result.this_year.deaths}\n` +
        `- *Births Today:* ${result.today.births}\n` +
        `- *Deaths Today:* ${result.today.deaths}\n\n` +
        `> *Powered by keithkeizzah*`;

      await repondre(message);
    } else {
      await repondre("No population data found.");
    }
  } catch (error) {
    console.error("Error fetching population data:", error);
    await repondre("There was an error fetching the population data. Please try again later.");
  }
});
