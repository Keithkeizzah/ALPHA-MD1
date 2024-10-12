const { zokou } = require("../framework/zokou");
const axios = require("axios");

const bookSearch = {
  nomCom: "book",
  reaction: '🤔',
  categorie: 'IA'
};

zokou(bookSearch, async (repondre, arg, { arg: userArgs }) => {
  try {
    if (!userArgs || userArgs.length === 0) {
      return repondre("Ask for any book and Alpha bot will send you the information.");
    }

    const query = userArgs.join(" ");
    const response = await axios.get(`https://itzpire.com/search/books?query=${encodeURIComponent(query)}`);
    
    const result = response.data;
    if (result) {
      repondre(result.result || "No results found.");
    } else {
      repondre("Error during response generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request.");
  }
});
