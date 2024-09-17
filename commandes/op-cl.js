import _0x217aff from 'node-cron';
import _0x376708 from 'moment-timezone';
import { zokou } from '../framework/zokou'; // Adjust the import based on your actual file structure

let scheduledTasks = {};

zokou({
  nomCom: 'group-setting', // Name of the command
  fromMe: 'mode', // Adjust based on your bot's mode
  desc: 'Manage group settings with open/close scheduling',
  dontAddCommandList: true, // If you want this command to not appear in the command list
  categorie: 'Admin', // Adjust based on your categories
}, async (message, match, { prefix, bot }) => {
  try {
    const body = message.body;
    const prefixChar = body.match(/^[\\/!#.]/);
    const commandPrefix = prefixChar ? prefixChar[0] : '/';
    const command = body.startsWith(commandPrefix) ? body.slice(commandPrefix.length).split(" ")[0].toLowerCase() : '';
    const validCommands = ["group"];
    
    if (!validCommands.includes(command)) {
      return;
    }
    
    if (!message.isGroup) {
      return message.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS*");
    }
    
    const groupMetadata = await bot.groupMetadata(message.from);
    const participants = groupMetadata.participants;
    const botJid = await bot.decodeJid(bot.user.id);
    const botAdmin = participants.find(p => p.id === botJid)?.admin;
    const userAdmin = participants.find(p => p.id === message.sender)?.admin;
    
    if (!botAdmin) {
      return message.reply("*📛 BOT MUST BE AN ADMIN TO USE THIS COMMAND*");
    }
    if (!userAdmin) {
      return message.reply("*📛 YOU MUST BE AN ADMIN TO USE THIS COMMAND*");
    }
    
    const args = body.slice(commandPrefix.length + command.length).trim().split(/\s+/);
    if (args.length < 1) {
      return message.reply(`Please specify a setting (open/close) and optionally a time.\n\nExample:\n*${commandPrefix}${command} open* or *${commandPrefix}${command} open 04:00 PM*`);
    }
    
    const setting = args[0].toLowerCase();
    const time = args.slice(1).join(" ");
    
    if (!time) {
      if (setting === "close") {
        await bot.groupSettingUpdate(message.from, "announcement");
        return message.reply("Group successfully closed.");
      } else if (setting === "open") {
        await bot.groupSettingUpdate(message.from, "not_announcement");
        return message.reply("Group successfully opened.");
      } else {
        return message.reply(`Invalid setting. Use "open" to open the group and "close" to close the group.\n\nExample:\n*${commandPrefix}${command} open* or *${commandPrefix}${command} close*`);
      }
    }
    
    if (!/^\d{1,2}:\d{2}\s*(?:AM|PM)$/i.test(time)) {
      return message.reply(`Invalid time format. Use HH:mm AM/PM format.\n\nExample:\n*${commandPrefix}${command} open 04:00 PM*`);
    }
    
    const [hours, minutes] = _0x376708(time, ["h:mm A", "hh:mm A"]).format("HH:mm").split(':').map(Number);
    const cronTime = `${minutes} ${hours} * * *`;
    
    console.log(`Scheduling ${setting} at ${cronTime} IST`);
    
    if (scheduledTasks[message.from]) {
      scheduledTasks[message.from].stop();
      delete scheduledTasks[message.from];
    }
    
    scheduledTasks[message.from] = _0x217aff.schedule(cronTime, async () => {
      try {
        console.log(`Executing scheduled task for ${setting} at ${_0x376708().format("HH:mm")} IST`);
        if (setting === "close") {
          await bot.groupSettingUpdate(message.from, "announcement");
          await bot.sendMessage(message.from, { text: "Group successfully closed." });
        } else if (setting === "open") {
          await bot.groupSettingUpdate(message.from, "not_announcement");
          await bot.sendMessage(message.from, { text: "Group successfully opened." });
        }
      } catch (error) {
        console.error("Error during scheduled task execution:", error);
        await bot.sendMessage(message.from, { text: "An error occurred while updating the group setting." });
      }
    }, { timezone: "Africa/Nairobi" });
    
    message.reply(`Group will be set to "${setting}" at ${time} IST.`);
  } catch (error) {
    console.error("Error:", error);
    message.reply("An error occurred while processing the command.");
  }
});

export default groupSetting;
