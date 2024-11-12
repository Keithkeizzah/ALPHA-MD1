const { keith } = require("../keizzah/keith");
const { getBuffer } = require("../keizzah/dl/Function");
const speed = require("performance-now");

// Function to format the uptime into days, hours, minutes, and seconds
const formatUptime = function (uptimeInSeconds) {
  uptimeInSeconds = Number(uptimeInSeconds);

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(uptimeInSeconds / 86400);
  const hours = Math.floor((uptimeInSeconds % 86400) / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  // Format the uptime output
  let formattedUptime = '';
  formattedUptime += days > 0 ? `${days} d, ` : '';
  formattedUptime += hours > 0 ? `${hours} h, ` : '';
  formattedUptime += minutes > 0 ? `${minutes} m, ` : '';
  formattedUptime += seconds > 0 ? `${seconds} s` : '';

  return formattedUptime;
};

// Track the start time to calculate the speed
let timestamp = speed();
let alphaSpeed = (speed() - timestamp).toFixed(4);

// Command to check uptime
keith({
  nomCom: "uptime",
  desc: "To check runtime",
  Categorie: "General",
  reaction: '💧',
  fromMe: true
}, async (sender, message, context) => {
  const { repondre: reply } = context;
  const uptime = formatUptime(process.uptime());
  await reply(`*ALPHA-MD UPTIME IS*: ${uptime}`);
});

// Command to take a screenshot of a website
keith({
  nomCom: 'ss',
  aliases: ["screenshot", "sshot"],
  Categorie: "General",
  reaction: '🎥',
  fromMe: true
}, async (sender, message, context) => {
  const { arg, repondre: reply } = context;

  // Ensure the user has provided a URL
  if (!arg || arg.length === 0) {
    return reply("Please provide a URL...");
  }

  // Join the URL if multiple arguments are provided
  const url = arg.join(" ");
  
  try {
    // Generate the screenshot URL and get the image buffer
    const screenshotUrl = `https://image.thum.io/get/fullpage/${encodeURIComponent(url)}`;
    let imageBuffer = await getBuffer(screenshotUrl);
    
    // Send the screenshot image as a reply
    await message.sendMessage(sender, {
      image: imageBuffer
    }, {
      caption: "*Powered by ALPHA-MD*"
    }, {
      quoted: message
    });
  } catch (error) {
    // Handle any errors during the screenshot process
    console.error(error);
    await reply("Failed to capture the screenshot. Please try again.");
  }
});
