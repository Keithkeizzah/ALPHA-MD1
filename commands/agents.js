const {
  zokou
} = require("../framework/zokou");
const {
  getAllSudoNumbers,
  isSudoTableNotEmpty
} = require("../bdd/sudo");
const conf = require("../set");
zokou({
  'nomCom': "agents",
  'categorie': 'General',
  'reaction': "👌 "
}, async (_0x1b06c5, _0x54bb8b, _0x2358bf) => {
  const {
    ms: _0x2aecc0,
    mybotpic: _0x43a6e2
  } = _0x2358bf;
  const _0x21b56d = [{
    'nom': "Belta from Kenya",
    'numero': "254114141192"
  }, {
    'nom': "Ibrahim Adams Kenya",
    'numero': "254 710 772666"
  }, {
    'nom': "Baraka Bega From Tanzania",
    'numero': "255 762 190 568"
  }, {
    'nom': "Cod3Uchicha From Zimbabwe",
    'numero': "263 78 502 8126"
  }, {
    'nom': "Joel Ai From Tanzania",
    'numero': "255 714 595 078"
  }, {
    'nom': "M.Peneti From Zimbabwe",
    'numero': "263 78 966 0160"
  }, {
    'nom': "Gifted Mourice From Kenya",
    'numero': "254 762 016957"
  }, {
'nom': "Kijana ya Minister From Kenya",
    'numero': "254 783 995304"
  }, {
'nom': "Adict Manlung From Kenya",
    'numero': "254 745 682493"
  }, {
'nom': "Prince From Pakistan",
    'numero': "92 309 2668108"
  }, {
'nom': "Sams From Kenya",
    'numero': "254 743995989"
  }, {
    'nom': "᚛M๏𝓷keℽ D Lบffy᚜ From Togo",
    'numero': "228 91 73 33 00"
  }];
  let _0x2d5c7e = "Hello👋  *Thanks for CHOOSING ALPHA-MD* \nThe following numbers are for  *ALPHA-MD* agents, \nYou can ask them anything regarding Alpha Bot \n*KEEP USING ALPHA-MD*:\n\n";
  for (const _0x14eeec of _0x21b56d) {
    _0x2d5c7e += "----------------\n(●) " + _0x14eeec.nom + " : https://wa.me/" + _0x14eeec.numero + "\n";
  }
  var _0x11d31d = _0x43a6e2();
  if (_0x11d31d.match(/\.(mp4|gif)$/i)) {
    try {
      _0x54bb8b.sendMessage(_0x1b06c5, {
        'video': {
          'url': _0x11d31d
        },
        'caption': _0x2d5c7e
      }, {
        'quoted': _0x2aecc0
      });
    } catch (_0x55af9c) {
      console.log("🥵🥵 Menu erreur " + _0x55af9c);
      repondre("🥵🥵 Menu erreur " + _0x55af9c);
    }
  } else {
    if (_0x11d31d.match(/\.(jpeg|png|jpg)$/i)) {
      try {
        _0x54bb8b.sendMessage(_0x1b06c5, {
          'image': {
            'url': _0x11d31d
          },
          'caption': _0x2d5c7e
        }, {
          'quoted': _0x2aecc0
        });
      } catch (_0x39b1ed) {
        console.log("🥵🥵 Menu erreur " + _0x39b1ed);
        repondre("🥵🥵 Menu erreur " + _0x39b1ed);
      }
    } else {
      repondre(_0x11d31d);
      repondre("link error");
    }
  }
});
