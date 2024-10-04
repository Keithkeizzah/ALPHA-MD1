const {zokou} = require('../framework/zokou');
const fs = require("fs");
const { exec } = require("child_process");


const filename = `${Math.random().toString(36)}`;

zokou (
    {
        nomCom : 'blown',
        categorie : 'Audio-Edit',

    }, async (dest , zk, commandeOptions) => {
        const {ms , repondre,msgRepondu} = commandeOptions;

        if (msgRepondu) {
            if(msgRepondu.audioMessage) {

                const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage)

                let set = "-af acrusher=.1:1:64:0:log";
                let ran = `${filename}.mp3`;
            
                try {
                  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) return repondre("error during the procedure " + err );
                   
                    let buff1 = fs.readFileSync(ran);
                   
                    zk.sendMessage(
                      dest,
                      { audio: buff1, mimetype: "audio/mpeg" },
                      { quoted: ms }
                    );
                    fs.unlinkSync(ran);
                  });
                } catch (e) {
                 
                  repondre("error");
                }

            } else {
                repondre('the command only works with audio messages')
            }

        } else {
            repondre('Please mention an audio')
        }
    }
);
zokou (
    {
        nomCom : 'earrape',
        categorie : 'Audio-Edit',

    }, async (dest , zk, commandeOptions) => {
        const {ms , repondre,msgRepondu} = commandeOptions;

        if (msgRepondu) {
            if(msgRepondu.audioMessage) {

                const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage)

                let set = "-af volume=12";
                let ran = `${filename}.mp3`;
            
                try {
                  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) return repondre("error during the procedure " + err );
                   
                    let buff1 = fs.readFileSync(ran);
                   
                    zk.sendMessage(
                      dest,
                      { audio: buff1, mimetype: "audio/mpeg" },
                      { quoted: ms }
                    );
                    fs.unlinkSync(ran);
                  });
                } catch (e) {
                 
                  repondre("error");
                }

            } else {
                repondre('the command only works with audio messages')
            }

        } else {
            repondre('Please mention an audio')
        }
    }
);
zokou (
    {
        nomCom : 'fat',
        categorie : 'Audio-Edit',

    }, async (dest , zk, commandeOptions) => {
        const {ms , repondre,msgRepondu} = commandeOptions;

        if (msgRepondu) {
            if(msgRepondu.audioMessage) {

                const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage)

                let set = '-filter:a "atempo=1.6,asetrate=22100"';
                let ran = `${filename}.mp3`;
            
                try {
                  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) return repondre("error during the procedure " + err );
                   
                    let buff1 = fs.readFileSync(ran);
                   
                    zk.sendMessage(
                      dest,
                      { audio: buff1, mimetype: "audio/mpeg" },
                      { quoted: ms }
                    );
                    fs.unlinkSync(ran);
                  });
                } catch (e) {
                 
                  repondre("error");
                }

            } else {
                repondre('the command only works with audio messages')
            }

        } else {
            repondre('Please mention an audio')
        }
    }
);
zokou (
    {
        nomCom : 'robot',
        categorie : 'Audio-Edit',

    }, async (dest , zk, commandeOptions) => {
        const {ms , repondre,msgRepondu} = commandeOptions;

        if (msgRepondu) {
            if(msgRepondu.audioMessage) {

                const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage)

                let set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
                let ran = `${filename}.mp3`;
            
                try {
                  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) return repondre("error during the procedure " + err );
                   
                    let buff1 = fs.readFileSync(ran);
                   
                    zk.sendMessage(
                      dest,
                      { audio: buff1, mimetype: "audio/mpeg" },
                      { quoted: ms }
                    );
                    fs.unlinkSync(ran);
                  });
                } catch (e) {
                 
                  repondre("error");
                }

            } else {
                repondre('the command only works with audio messages')
            }

        } else {
            repondre('Please mention an audio')
        }
    }
);
zokou (
    {
        nomCom : 'tupai',
        categorie : 'Audio-Edit',

    }, async (dest , zk, commandeOptions) => {
        const {ms , repondre,msgRepondu} = commandeOptions;

        if (msgRepondu) {
            if(msgRepondu.audioMessage) {

                const media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage)

                let set = '-filter:a "atempo=0.5,asetrate=65100"';
                let ran = `${filename}.mp3`;
            
                try {
                  exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) return repondre("error during the procedure " + err );
                   
                    let buff1 = fs.readFileSync(ran);
                   
                    zk.sendMessage(
                      dest,
                      { audio: buff1, mimetype: "audio/mpeg" },
                      { quoted: ms }
                    );
                    fs.unlinkSync(ran);
                  });
                } catch (e) {
                 
                  repondre("error");
                }

            } else {
                repondre('the command only works with audio messages')
            }

        } else {
            repondre('Please mention an audio')
        }
    }
);
