const {
  zokou
} = require('../framework/zokou');
const flagGame = [{
  'country': "Afghanistan",
  'flag': '🇦🇫'
}, {
  'country': "Albania",
  'flag': "🇦🇱"
}, {
  'country': "Algeria",
  'flag': "🇩🇿"
}, {
  'country': 'Andorra',
  'flag': "🇦🇩"
}, {
  'country': "Angola",
  'flag': "🇦🇴"
}, {
  'country': "Antigua and Barbuda",
  'flag': "🇦🇬"
}, {
  'country': 'Argentina',
  'flag': '🇦🇷'
}, {
  'country': "Armenia",
  'flag': "🇦🇲"
}, {
  'country': "Australia",
  'flag': "🇦🇺"
}, {
  'country': "Austria",
  'flag': "🇦🇹"
}, {
  'country': "Azerbaijan",
  'flag': "🇦🇿"
}, {
  'country': "Bahamas",
  'flag': '🇧🇸'
}, {
  'country': "Bahrain",
  'flag': '🇧🇭'
}, {
  'country': "Bangladesh",
  'flag': '🇧🇩'
}, {
  'country': 'Barbados',
  'flag': "🇧🇧"
}, {
  'country': "Belarus",
  'flag': "🇧🇾"
}, {
  'country': "Belgium",
  'flag': "🇧🇪"
}, {
  'country': "Belize",
  'flag': '🇧🇿'
}, {
  'country': "Benin",
  'flag': "🇧🇯"
}, {
  'country': "Bhutan",
  'flag': "🇧🇹"
}, {
  'country': 'Bolivia',
  'flag': "🇧🇴"
}, {
  'country': "Bosnia and Herzegovina",
  'flag': "🇧🇦"
}, {
  'country': "Botswana",
  'flag': "🇧🇼"
}, {
  'country': "Brazil",
  'flag': "🇧🇷"
}, {
  'country': 'Brunei',
  'flag': '🇧🇳'
}, {
  'country': 'Bulgaria',
  'flag': "🇧🇬"
}, {
  'country': "Burkina Faso",
  'flag': "🇧🇫"
}, {
  'country': 'Burundi',
  'flag': "🇧🇮"
}, {
  'country': "Cabo Verde",
  'flag': "🇨🇻"
}, {
  'country': "Cambodia",
  'flag': '🇰🇭'
}, {
  'country': 'Cameroon',
  'flag': '🇨🇲'
}, {
  'country': 'Canada',
  'flag': "🇨🇦"
}, {
  'country': "Central African Republic",
  'flag': "🇨🇫"
}, {
  'country': "Chad",
  'flag': "🇹🇩"
}, {
  'country': 'Chile',
  'flag': '🇨🇱'
}, {
  'country': 'China',
  'flag': "🇨🇳"
}, {
  'country': "Colombia",
  'flag': "🇨🇴"
}, {
  'country': "Comoros",
  'flag': "🇰🇲"
}, {
  'country': "Congo, Democratic Republic of the",
  'flag': "🇨🇩"
}, {
  'country': "Congo, Republic of the",
  'flag': "🇨🇬"
}, {
  'country': "Costa Rica",
  'flag': '🇨🇷'
}, {
  'country': "Croatia",
  'flag': '🇭🇷'
}, {
  'country': "Cuba",
  'flag': "🇨🇺"
}, {
  'country': "Cyprus",
  'flag': '🇨🇾'
}, {
  'country': "Czech Republic",
  'flag': "🇨🇿"
}, {
  'country': 'Denmark',
  'flag': "🇩🇰"
}, {
  'country': 'Djibouti',
  'flag': "🇯🇵"
}, {
  'country': 'Dominica',
  'flag': "🇩🇲"
}, {
  'country': "Dominican Republic",
  'flag': "🇩🇴"
}, {
  'country': "East Timor",
  'flag': "🇹🇱"
}, {
  'country': "Ecuador",
  'flag': "🇪🇨"
}, {
  'country': "Egypt",
  'flag': "🇪🇬"
}, {
  'country': "El Salvador",
  'flag': "🇸🇻"
}, {
  'country': "Equatorial Guinea",
  'flag': '🇨🇲'
}, {
  'country': 'Eritrea',
  'flag': "🇪🇷"
}, {
  'country': "Estonia",
  'flag': "🇪🇪"
}, {
  'country': "Eswatini",
  'flag': '🇸🇿'
}, {
  'country': "Ethiopia",
  'flag': "🇪🇹"
}, {
  'country': "Fiji",
  'flag': "🇫🇯"
}, {
  'country': "Finland",
  'flag': '🇫🇮'
}, {
  'country': "France",
  'flag': "🇫🇷"
}, {
  'country': "Gabon",
  'flag': '🇬🇦'
}, {
  'country': "Gambia",
  'flag': '🇬🇲'
}, {
  'country': 'Georgia',
  'flag': "🇬🇪"
}, {
  'country': "Germany",
  'flag': "🇩🇪"
}, {
  'country': "Ghana",
  'flag': "🇬🇭"
}, {
  'country': 'Greece',
  'flag': '🇬🇷'
}, {
  'country': 'Grenada',
  'flag': '🇬🇩'
}, {
  'country': "Guatemala",
  'flag': "🇵🇪"
}, {
  'country': "Guinea",
  'flag': "🇬🇳"
}, {
  'country': "Guinea-Bissau",
  'flag': "🇬🇼"
}, {
  'country': "Guyana",
  'flag': '🇬🇾'
}, {
  'country': "Haiti",
  'flag': "🇭🇹"
}, {
  'country': "Honduras",
  'flag': '🇭🇳'
}, {
  'country': 'Hungary',
  'flag': "🇭🇺"
}, {
  'country': "Iceland",
  'flag': "🇮🇸"
}, {
  'country': 'India',
  'flag': "🇮🇳"
}, {
  'country': "Indonesia",
  'flag': "🇮🇩"
}, {
  'country': "Iran",
  'flag': '🇮🇷'
}, {
  'country': "Iraq",
  'flag': '🇮🇶'
}, {
  'country': "Ireland",
  'flag': "🇮🇪"
}, {
  'country': "Israel",
  'flag': "🇮🇱"
}, {
  'country': "Italy",
  'flag': "🇮🇹"
}, {
  'country': "Jamaica",
  'flag': "🇯🇲"
}, {
  'country': "Japan",
  'flag': "🇯🇵"
}, {
  'country': "Jordan",
  'flag': "🇯🇴"
}, {
  'country': "Kazakhstan",
  'flag': "🇰🇿"
}, {
  'country': 'Kenya',
  'flag': "🇰🇪"
}, {
  'country': "Kiribati",
  'flag': "🇰🇮"
}, {
  'country': "Korea, North",
  'flag': "🇰🇵"
}, {
  'country': "Korea, South",
  'flag': "🇰🇷"
}, {
  'country': "Kosovo",
  'flag': '🇽🇰'
}, {
  'country': "Kuwait",
  'flag': '🇰🇼'
}, {
  'country': "Kyrgyzstan",
  'flag': "🇰🇬"
}, {
  'country': 'Laos',
  'flag': "🇱🇦"
}, {
  'country': 'Latvia',
  'flag': "🇱🇻"
}, {
  'country': "Lebanon",
  'flag': "🇱🇧"
}, {
  'country': "Lesotho",
  'flag': "🇱🇸"
}, {
  'country': "Liberia",
  'flag': '🇱🇸'
}, {
  'country': 'Libya',
  'flag': "🇱🇾"
}, {
  'country': 'Liechtenstein',
  'flag': "🇱🇮"
}, {
  'country': 'Lithuania',
  'flag': "🇱🇹"
}, {
  'country': 'Luxembourg',
  'flag': "🇱🇺"
}, {
  'country': "Madagascar",
  'flag': '🇲🇬'
}, {
  'country': "Malawi",
  'flag': '🇲🇼'
}, {
  'country': "Malaysia",
  'flag': "🇲🇾"
}, {
  'country': "Maldives",
  'flag': "🇲🇻"
}, {
  'country': "Mali",
  'flag': "🇲🇱"
}, {
  'country': 'Malta',
  'flag': "🇲🇹"
}, {
  'country': "Marshall Islands",
  'flag': '🇲🇭'
}, {
  'country': "Mauritania",
  'flag': "🇲🇷"
}, {
  'country': "Mauritius",
  'flag': '🇲🇺'
}, {
  'country': "Mexico",
  'flag': "🇲🇽"
}, {
  'country': 'Micronesia',
  'flag': "🇲🇵"
}, {
  'country': "Moldova",
  'flag': "🇲🇩"
}, {
  'country': "Monaco",
  'flag': "🇲🇨"
}, {
  'country': 'Mongolia',
  'flag': '🇲🇳'
}, {
  'country': "Montenegro",
  'flag': "🇲🇪"
}, {
  'country': 'Morocco',
  'flag': '🇲🇦'
}, {
  'country': "Mozambique",
  'flag': "🇲🇿"
}, {
  'country': "Myanmar",
  'flag': "🇲🇲"
}, {
  'country': "Namibia",
  'flag': '🇳🇦'
}, {
  'country': "Nauru",
  'flag': "🇳🇷"
}, {
  'country': "Nepal",
  'flag': '🇳🇵'
}, {
  'country': 'Netherlands',
  'flag': "🇳🇱"
}, {
  'country': "New Zealand",
  'flag': '🇳🇿'
}, {
  'country': 'Nicaragua',
  'flag': "🇳🇮"
}, {
  'country': "Niger",
  'flag': "🇳🇪"
}, {
  'country': "Nigeria",
  'flag': '🇳🇬'
}, {
  'country': "North Macedonia",
  'flag': '🇲🇰'
}, {
  'country': "Norway",
  'flag': "🇳🇴"
}, {
  'country': "Oman",
  'flag': "🇴🇲"
}, {
  'country': "Pakistan",
  'flag': "🇵🇰"
}, {
  'country': 'Palau',
  'flag': "🇵🇼"
}, {
  'country': 'Panama',
  'flag': "🇵🇦"
}, {
  'country': "Papua New Guinea",
  'flag': "🇵🇬"
}, {
  'country': "Paraguay",
  'flag': "🇵🇾"
}, {
  'country': 'Peru',
  'flag': "🇵🇪"
}, {
  'country': 'Philippines',
  'flag': "🇵🇭"
}, {
  'country': "Poland",
  'flag': "🇵🇱"
}, {
  'country': "Portugal",
  'flag': '🇵🇹'
}, {
  'country': "Qatar",
  'flag': '🇶🇦'
}, {
  'country': "Romania",
  'flag': "🇷🇴"
}, {
  'country': 'Russia',
  'flag': "🇷🇺"
}, {
  'country': "Rwanda",
  'flag': "🇷🇼"
}, {
  'country': "Saint Kitts and Nevis",
  'flag': '🇰🇳'
}, {
  'country': "Saint Lucia",
  'flag': "🇱🇨"
}, {
  'country': "Saint Vincent and the Grenadines",
  'flag': '🇻🇨'
}, {
  'country': 'Samoa',
  'flag': "🇼🇸"
}, {
  'country': "San Marino",
  'flag': "🇸🇲"
}, {
  'country': "Sao Tome and Principe",
  'flag': "🇹🇱"
}, {
  'country': "Saudi Arabia",
  'flag': '🇸🇦'
}, {
  'country': 'Senegal',
  'flag': "🇸🇳"
}, {
  'country': "Serbia",
  'flag': '🇷🇸'
}, {
  'country': "Seychelles",
  'flag': "🇸🇨"
}, {
  'country': "Sierra Leone",
  'flag': '🇸🇱'
}, {
  'country': "Singapore",
  'flag': '🇸🇬'
}, {
  'country': "Slovakia",
  'flag': "🇸🇰"
}, {
  'country': "Slovenia",
  'flag': "🇸🇮"
}, {
  'country': "Solomon Islands",
  'flag': "🇸🇧"
}, {
  'country': "Somalia",
  'flag': "🇸🇴"
}, {
  'country': "South Africa",
  'flag': '🇿🇦'
}, {
  'country': "South Sudan",
  'flag': '🇸🇸'
}, {
  'country': "Spain",
  'flag': '🇪🇸'
}, {
  'country': "Sri Lanka",
  'flag': "🇱🇰"
}, {
  'country': "Sudan",
  'flag': '🇸🇩'
}, {
  'country': "Suriname",
  'flag': "🇸🇷"
}, {
  'country': "Sweden",
  'flag': "🇸🇪"
}, {
  'country': 'Switzerland',
  'flag': "🇨🇭"
}, {
  'country': "Syria",
  'flag': "🇸🇾"
}, {
  'country': "Taiwan",
  'flag': "🇹🇼"
}, {
  'country': "Tajikistan",
  'flag': "🇹🇯"
}, {
  'country': 'Tanzania',
  'flag': "🇹🇿"
}, {
  'country': "Thailand",
  'flag': "🇹🇭"
}, {
  'country': 'Togo',
  'flag': '🇹🇬'
}, {
  'country': "Tonga",
  'flag': "🇹🇴"
}, {
  'country': "Trinidad and Tobago",
  'flag': "🇹🇹"
}, {
  'country': 'Tunisia',
  'flag': "🇹🇳"
}, {
  'country': "Turkey",
  'flag': "🇹🇷"
}, {
  'country': 'Turkmenistan',
  'flag': "🇹🇲"
}, {
  'country': "Tuvalu",
  'flag': "🇹🇻"
}, {
  'country': "Uganda",
  'flag': '🇺🇬'
}, {
  'country': "Ukraine",
  'flag': "🇺🇦"
}, {
  'country': "United Arab Emirates",
  'flag': "🇦🇪"
}, {
  'country': "United Kingdom",
  'flag': "🇬🇧"
}, {
  'country': "United States",
  'flag': "🇺🇸"
}, {
  'country': "Uruguay",
  'flag': "🇺🇾"
}, {
  'country': "Uzbekistan",
  'flag': "🇺🇿"
}, {
  'country': "Vanuatu",
  'flag': "🇻🇺"
}, {
  'country': "Vatican City",
  'flag': "🇻🇦"
}, {
  'country': "Venezuela",
  'flag': "🇻🇪"
}, {
  'country': "Vietnam",
  'flag': '🇻🇳'
}, {
  'country': "Yemen",
  'flag': '🇾🇪'
}, {
  'country': 'Zambia',
  'flag': '🇿🇲'
}, {
  'country': 'Zimbabwe',
  'flag': "🇿🇼"
}];
zokou({
  'nomCom': "guessflag",
  'categorie': "Games"
}, async (_0x257d2c, _0x269913, _0x599529) => {
  const {
    ms: _0xfc7d9c,
    repondre: _0x2a54ac,
    prefixe: _0x3d9f03
  } = _0x599529;
  const _0x38da03 = flagGame[Math.floor(Math.random() * flagGame.length)];
  await _0x269913.sendMessage(_0x257d2c, {
    'text': "🌍 Guess the country for this flag: " + _0x38da03.flag + "\n\nYou have 30 seconds to guess!"
  }, {
    'quoted': _0xfc7d9c
  });
  const _0x1af680 = async (_0x2e3168, _0x1c2d13) => {
    return _0x2e3168.toLowerCase() === _0x38da03.country.toLowerCase() ? (await _0x269913.sendMessage(_0x257d2c, {
      'text': "✅ Correct! The country is " + _0x38da03.country + '.'
    }, {
      'quoted': _0xfc7d9c
    }), true) : _0x1c2d13 === 0x1 ? (await _0x269913.sendMessage(_0x257d2c, {
      'text': "❌ Wrong answer! You have one more try."
    }, {
      'quoted': _0xfc7d9c
    }), false) : (await _0x269913.sendMessage(_0x257d2c, {
      'text': "⏳ Time's up! The correct answer was: " + _0x38da03.country
    }, {
      'quoted': _0xfc7d9c
    }), true);
  };
  const _0x2a95d7 = _0x366c16 => new Promise(_0x1a0815 => setTimeout(_0x1a0815, _0x366c16));
  await _0x2a95d7(0x2710);
  if (!(await _0x1af680("exampleUserResponse", 0x1))) {
    await _0x2a95d7(0x3e8);
    await _0x269913.sendMessage(_0x257d2c, {
      'text': "You now have 10 seconds to make another guess!"
    }, {
      'quoted': _0xfc7d9c
    });
    await _0x2a95d7(0x2710);
    await _0x1af680("exampleUserResponse", 0x2);
  } else {
    await _0x269913.sendMessage(_0x257d2c, {
      'text': "Try, you might get this!"
    }, {
      'quoted': _0xfc7d9c
    });
  }
});
