const { zokou } = require("../framework/zokou");
const { delay, loading, react } = require("../framework/utils");
const moment = require("moment-timezone");
const conf = require("../set.js");
const fs = require("fs");
const path = require("path");
const {
    generateWAMessageFromContent,
    proto
} = require("@whiskeysockets/baileys");

const { lydia } = require("../framework/autoreply/lydia");

zokou(
	{
		pattern: 'lydia ?(.*)',
		fromMe: true,
		desc: 'to on off chat bot',
		type: 'misc',
	},
	async (message, match) => {
		if (!match)
			return await message.send(
				'*Example : lydia on/off*\n_Reply or mention to activate for a person only._'
			)
		const user = message.mention[0] || message.reply_message.jid
		await setLydia(message.jid, match == 'on', user)
		await message.send(
			`_Lydia ${
				match == 'on' ? 'Activated' : 'Deactivated'
			}_\n*Only works from reply msg.`
		)
	}
)
