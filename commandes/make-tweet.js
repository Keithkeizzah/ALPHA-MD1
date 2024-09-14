const { zokou } = require("../framework/zokou");

zokou({
  'nomCom': "elements",
  'reaction': '📓',
  'categorie': "Education-corner"
}, async (context, args, options) => {
  const { repondre: sendResponse, arg: commandArgs } = options;
  const elementQuery = commandArgs.join(" ").trim();

  if (!elementQuery) {
    return sendResponse("Please provide an element symbol or name.");
  }

  try {
    let response = await fetch(`https://api.popcat.xyz/periodic-table?element=${elementQuery}`);
    
    if (!response.ok) {
      return sendResponse("Could not find information for the provided element. Please check the symbol or name.");
    }

    let data = await response.json();
    let formattedMessage = `
*Element Information:*
• *Name:* ${data.name}
• *Symbol:* ${data.symbol}
• *Atomic Number:* ${data.atomic_number}
• *Atomic Mass:* ${data.atomic_mass}
• *Period:* ${data.period}
• *Phase:* ${data.phase}
• *Discovered By:* ${data.discovered_by}
• *Summary:* ${data.summary}
    `;

    await sendResponse(formattedMessage);

  } catch (error) {
    sendResponse("An error occurred while fetching the element data. Please try again later.");
  }
});
