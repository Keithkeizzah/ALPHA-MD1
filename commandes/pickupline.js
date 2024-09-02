const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({ 'nomCom': "pickupline", 'reaction': '💫', 'categorie': "FUN" }, async (_0x50a2f3, _0x22193f, _0x37bde5) => {
    const { repondre: _0x1358da, arg: _0x1891cd, ms: _0x32f549 } = _0x37bde5;
    
    try {
        const response = await axios.get("https://api.popcat.xyz/pickuplines");
        const data = response.data;
        
        await _0x1358da(data.result);
        console.log(data.completion);
    } catch (error) {
        console.error(error);
    }
});
