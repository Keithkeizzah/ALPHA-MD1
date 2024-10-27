const { zokou } = require("../framework/zokou");
const axios = require("axios");

const config = {
  nomCom: "breaking",
  reaction: '🤔',
  categorie: 'IA'
};

zokou(config, async (responseHandler, args, context) => {
  const { repondre, arg, ms } = context;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Ask any news update and Alpha bot will send you.");
    }

    const query = arg.join(" ");
    const apiResponse = await axios.get(`https://www.samirxpikachu.run.place/ppx?query=${query}`);
    const result = apiResponse.data;

    if (result) {
      repondre(result.result);
    } else {
      repondre("Error during response generation.");
    }
  } catch (error) {
    console.error("Error:", error.message || "An error occurred");
    repondre("Oops, an error occurred while processing your request.");
  }
});
