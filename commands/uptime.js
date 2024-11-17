const { keith } = require("../keizzah/keith");
const { getBuffer } = require("../keizzah/dl/Function");
const speed = require("performance-now");
const os = require('os');
const { exec } = require("child_process");

const {
  performance
} = require('perf_hooks');
const conf = require('../set');


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

keith(
  {
    nomCom: 'ping',
    categorie: 'General',
    reaction: '👁',
  },

  async (dest, zk, commandOptions) => {
    const {
      ms, arg, repondre
    } = commandOptions;
    const start = new Date().getTime();
    const msg = await zk.sendMessage(dest, {
      text: 'Pinging...',
    }, {
      quoted: ms
    });
    const end = new Date().getTime();
    const ping = end - start;
    await zk.sendMessage(dest, {
      text: `𝖆𝖑𝖕𝖍𝖆 𝖘𝖕𝖊𝖊𝖉 ${ping}𝐌/𝐒`, edit: {
        id: msg.key.id, remoteJid: dest
      }});
    await zk.sendMessage(dest, {
      react: {
        text: "⚪", key: ms.key
      }})
  }
)

keith(
  {
    nomCom: 'info',
    reaction: '🎙',
    alias: ['i']
  },

  async (dest, zk, commandOptions) => {
    const {
      ms, arg, repondre
    } = commandOptions;
    // data
    const tumbUrl = 'https://i.ibb.co/wyYKzMY/68747470733a2f2f74656c656772612e70682f66696c652f6530376133643933336662346361643062333739312e6a7067.jpg';
    const used = process.memoryUsage();
    const cpus = os.cpus().map(cpu => {
      cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
      return cpu
    });
    const cpu = cpus.reduce((last, cpu, _, {
      length
    }) => {
      last.total += cpu.total
      last.speed += cpu.speed / length
      last.times.user += cpu.times.user
      last.times.nice += cpu.times.nice
      last.times.sys += cpu.times.sys
      last.times.idle += cpu.times.idle
      last.times.irq += cpu.times.irq
      return last
    }, {
      speed: 0,
      total: 0,
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0
      }
    });
    let timestamp = speed();
    let latensi = speed() - timestamp;
    let neww = performance.now();
    let oldd = performance.now();
    const response = `
Response Speed ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}

💻 Info Server
    RAM: ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}

_NodeJS Memory Usaage_
    ${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${format(used[key])}`).join('\n')}

${cpus[0] ? `_Total CPU Usage_
    ${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
    ${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}`: ''}
    `.trim();
    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: `${conf.BOT}`,
          body: `${latensi.toFixed(4)} Second`,
          thumbnailUrl: `${tumbUrl}`,
          sourceUrl: global.link,
          mediaType: 1,
          renderLargerAbhinail: true
        }
      }
    }, {
      quoted: ms
    })
  }
);



// Command configuration
keith(
  {
    nomCom: "reboot",
    categorie: "Mods",
    reaction: "👨🏿‍💼",
    aliases: ["restart", "reload"], // Adding aliases for the command
  },
  async (dest, z, com) => {
    const { repondre, superUser } = com;

    // Check if the user is authorized
    if (!superUser) {
      return repondre("This command is for owner only");
    }

    // Notify the user and restart the process
    repondre("*restarting...*");
    exec("pm2 restart all");
  }
);
