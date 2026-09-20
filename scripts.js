const playerBirthdates = {
  "Nathan Aspinall": "2006-03-30",
  "Sean Barnhill": "2007-01-08",
  "Jacob Battaglia": "2006-03-17",
  "Raoul Boilard": "2006-01-07",
  "EJ Emery": "2006-03-30",
  "Mikkel Eriksen": "2007-09-13",
  "Felix Farhammar": "2007-04-11",
  "Rico Gredig": "2005-02-01",
  "Liam Greentree": "2006-01-01",
  "Artem Gonchar": "2006-10-25",
  "Ty Henricks": "2005-06-28",
  "Samuel Jung": "2006-05-18",
  "Rasmus Larsson": "2004-02-09",
  "Zeb Lindgren": "2007-04-14",
  "Evan Passmore": "2006-12-05",
  "Malcolm Spence": "2006-09-22",
  "Jaroslav Chmelar": "2003-07-20",
  "Drew Fortescue": "2005-04-28",
  "Gabe Perreault": "2005-05-07",
  "Adam Sykora": "2004-09-07",
  "Noah Laba": "2003-08-04",
  "Dylan Garand": "2002-06-07",
  "Brett Berard": "2002-09-09",
  "William Trudeau": "2002-10-11",
  "Talyn Boyko": "2002-10-16",
  "Brendan Brisson": "2001-10-22",
  "Jackson Dorrington": "2004-04-13",
  "Brody Lamb": "2003-08-30",
  "Bryce McConnell-Barker": "2004-06-04",
  "Scott Morrow": "2002-11-01",
  "Hugo Ollas": "2002-04-24",
  "Dylan Roobroeck": "2004-07-27",
  "Carey Terrance": "2005-05-10",
  "Callum Tung": "2003-11-23",
  "Kalle Vaisanen": "2003-01-28",
  "Karl Henriksson": "2001-02-05",
  "Lauri Pajuniemi": "1999-09-12",
  "Juuso Parssinen": "2001-02-01",
  "Aidan Thompson": "2002-02-18",
  "Vincent Iorio": "2002-11-14",
  "Alberts Smits": "2007-12-02",
  "Benjamin MacBeath": "2008-03-04",
  "Danai Shaiikov": "2007-04-13",
  "Charlie Morrison": "2007-10-12",
  "Tomas Chrenko": "2007-11-02",
  "Spencer Bowes": "2007-09-19",
  "Andre Mondoux": "2007-03-16",
  "Darian Anderson": "2006-12-22",
  "Ivan Patrikhayev": "2006-02-03",
  "Massimo Rizzo": "2001-06-13",
  "Cole Beaudoin": "2006-04-24",
};

const playerMeasurements = {
  "nathan-aspinall": { height: "6'6\"", weight: "198 lb", heightInInches: 78, weightInPounds: 198 },
  "sean-barnhill": { height: "6'6\"", weight: "209 lb", heightInInches: 78, weightInPounds: 209 },
  "jacob-battaglia": { height: "6'1\"", weight: "196 lb", heightInInches: 73, weightInPounds: 196 },
  "raoul-boilard": { height: "6'1\"", weight: "187 lb", heightInInches: 73, weightInPounds: 187 },
  "ej-emery": { height: "6'4\"", weight: "183 lb", heightInInches: 76, weightInPounds: 183 },
  "mikkel-eriksen": { height: "5'11\"", weight: "186 lb", heightInInches: 71, weightInPounds: 186 },
  "felix-farhammar": { height: "6'0\"", weight: "184 lb", heightInInches: 72, weightInPounds: 184 },
  "rico-gredig": { height: "6'1\"", weight: "189 lb", heightInInches: 73, weightInPounds: 189 },
  "liam-greentree": { height: "6'2\"", weight: "207 lb", heightInInches: 74, weightInPounds: 207 },
  "artem-gonchar": { height: "6'0\"", weight: "156 lb", heightInInches: 72, weightInPounds: 156 },
  "ty-henricks": { height: "6'4\"", weight: "209 lb", heightInInches: 76, weightInPounds: 209 },
  "samuel-jung": { height: "6'3\"", weight: "175 lb", heightInInches: 75, weightInPounds: 175 },
  "rasmus-larsson": { height: "6'3\"", weight: "204 lb", heightInInches: 75, weightInPounds: 204 },
  "zeb-lindgren": { height: "6'1\"", weight: "196 lb", heightInInches: 73, weightInPounds: 196 },
  "evan-passmore": { height: "6'4\"", weight: "216 lb", heightInInches: 76, weightInPounds: 216 },
  "malcolm-spence": { height: "6'1\"", weight: "190 lb", heightInInches: 73, weightInPounds: 190 },
  "jaroslav-chmelar": { height: "6'4\"", weight: "226 lb", heightInInches: 76, weightInPounds: 226 },
  "drew-fortescue": { height: "6'2\"", weight: "195 lb", heightInInches: 74, weightInPounds: 195 },
  "gabe-perreault": { height: "5'11\"", weight: "180 lb", heightInInches: 71, weightInPounds: 180 },
  "adam-sykora": { height: "5'11\"", weight: "193 lb", heightInInches: 71, weightInPounds: 193 },
  "noah-laba": { height: "6'3\"", weight: "214 lb", heightInInches: 75, weightInPounds: 214 },
  "dylan-garand": { height: "6'1\"", weight: "185 lb", heightInInches: 73, weightInPounds: 185 },
  "brett-berard": { height: "5'9\"", weight: "175 lb", heightInInches: 69, weightInPounds: 175 },
  "william-trudeau": { height: "6'1\"", weight: "205 lb", heightInInches: 73, weightInPounds: 205 },
  "talyn-boyko": { height: "6'7\"", weight: "220 lb", heightInInches: 79, weightInPounds: 220 },
  "brendan-brisson": { height: "6'0\"", weight: "188 lb", heightInInches: 72, weightInPounds: 188 },
  "jackson-dorrington": { height: "6'3\"", weight: "216 lb", heightInInches: 75, weightInPounds: 216 },
  "brody-lamb": { height: "6'1\"", weight: "179 lb", heightInInches: 73, weightInPounds: 179 },
  "bryce-mcconnell-barker": { height: "6'1\"", weight: "191 lb", heightInInches: 73, weightInPounds: 191 },
  "scott-morrow": { height: "6'2\"", weight: "210 lb", heightInInches: 74, weightInPounds: 210 },
  "hugo-ollas": { height: "6'8\"", weight: "260 lb", heightInInches: 80, weightInPounds: 260 },
  "dylan-roobroeck": { height: "6'7\"", weight: "222 lb", heightInInches: 79, weightInPounds: 222 },
  "carey-terrance": { height: "6'0\"", weight: "203 lb", heightInInches: 72, weightInPounds: 203 },
  "callum-tung": { height: "6'3\"", weight: "209 lb", heightInInches: 75, weightInPounds: 209 },
  "kalle-vaisanen": { height: "6'5\"", weight: "200 lb", heightInInches: 77, weightInPounds: 200 },
  "karl-henriksson": { height: "5'10\"", weight: "178 lb", heightInInches: 70, weightInPounds: 178 },
  "lauri-pajuniemi": { height: "6'0\"", weight: "202 lb", heightInInches: 72, weightInPounds: 202 },
  "juuso-parssinen": { height: "6'3\"", weight: "207 lb", heightInInches: 75, weightInPounds: 207 },
  "aidan-thompson": { height: "5'11\"", weight: "180 lb", heightInInches: 71, weightInPounds: 180 },
  "vincent-iorio": { height: "6'4\"", weight: "220 lb", heightInInches: 76, weightInPounds: 220 },
  "alberts-smits": { height: "6'3\"", weight: "209 lb", heightInInches: 75, weightInPounds: 209 },
  "benjamin-macbeath": { height: "6'2\"", weight: "196 lb", heightInInches: 74, weightInPounds: 196 },
  "danai-shaiikov": { height: "6'2\"", weight: "186 lb", heightInInches: 74, weightInPounds: 186 },
  "charlie-morrison": { height: "6'4\"", weight: "200 lb", heightInInches: 76, weightInPounds: 200 },
  "tomas-chrenko": { height: "5'11\"", weight: "172 lb", heightInInches: 71, weightInPounds: 172 },
  "spencer-bowes": { height: "6'0\"", weight: "172 lb", heightInInches: 72, weightInPounds: 172 },
  "andre-mondoux": { height: "6'3\"", weight: "201 lb", heightInInches: 75, weightInPounds: 201 },
  "darian-anderson": { height: "6'3\"", weight: "196 lb", heightInInches: 75, weightInPounds: 196 },
  "ivan-patrikhayev": { height: "6'0\"", weight: "185 lb", heightInInches: 72, weightInPounds: 185 },
  "massimo-rizzo": { height: "5'10\"", weight: "175 lb", heightInInches: 70, weightInPounds: 175 },
  "cole-beaudoin": { height: "6'2\"", weight: "212 lb", heightInInches: 74, weightInPounds: 212 },
};

const playerProfiles = [
  {
    name: "Nathan Aspinall",
    position: "F",
    group: "Current prospect",
    acquired: "2024 draft, Rd 5, No. 159",
    currentTeam: "Flint Firebirds, OHL",
  },
  {
    name: "Alberts Smits",
    position: "D",
    group: "2026 draft class",
    acquired: "2026 draft, Rd 1, No. 5",
    currentTeam: "Rangers organization (signed ELC; assignment pending)",
  },
  {
    name: "Benjamin MacBeath",
    position: "D",
    group: "2026 draft class",
    acquired: "2026 draft, Rd 2, No. 64",
    currentTeam: "Calgary Hitmen, WHL",
  },
  {
    name: "Danai Shaiikov",
    position: "G",
    group: "2026 draft class",
    acquired: "2026 draft, Rd 3, No. 67",
    currentTeam: "Gatineau Olympiques, QMJHL",
  },
  {
    name: "Charlie Morrison",
    position: "D",
    group: "2026 draft class",
    acquired: "2026 draft, Rd 3, No. 77",
    currentTeam: "Quebec Remparts, QMJHL",
  },
  {
    name: "Tomas Chrenko",
    position: "C",
    group: "2026 draft class",
    acquired: "2026 draft, Rd 3, No. 81",
    currentTeam: "HK Nitra, Slovakia",
  },
  {
    name: "Spencer Bowes",
    position: "LW",
    group: "2026 draft class",
    acquired: "2026 draft, Rd 4, No. 102",
    currentTeam: "Ottawa 67's, OHL",
  },
  {
    name: "Andre Mondoux",
    position: "D",
    group: "2026 draft class",
    acquired: "2026 draft, Rd 6, No. 162",
    currentTeam: "Kingston Frontenacs, OHL",
  },
  {
    name: "Darian Anderson",
    position: "RW",
    group: "2026 draft class",
    acquired: "2026 draft, Rd 6, No. 163",
    currentTeam: "Clarkson University, NCAA",
  },
  {
    name: "Ivan Patrikhayev",
    position: "D",
    group: "2026 draft class",
    acquired: "2026 draft, Rd 7, No. 193",
    currentTeam: "CSKA Moskva, KHL",
  },
  {
    name: "Cole Beaudoin",
    position: "C",
    group: "Current prospect",
    acquired: "Trade from Utah, July 1, 2026",
    currentTeam: "Assignment TBD",
  },
  {
    name: "Sean Barnhill",
    position: "D",
    group: "Current prospect",
    acquired: "2025 draft, Rd 3, No. 70",
    currentTeam: "Michigan State, NCAA",
  },
  {
    name: "Jacob Battaglia",
    position: "F",
    group: "Current prospect",
    acquired: "Trade from Calgary, Mar. 6, 2026",
    currentTeam: "Flint Firebirds, OHL",
  },
  {
    name: "Raoul Boilard",
    position: "C",
    group: "Current prospect",
    acquired: "2024 draft, Rd 4, No. 119",
    currentTeam: "Lake Superior State, NCAA",
  },
  {
    name: "EJ Emery",
    position: "D",
    group: "Current prospect",
    acquired: "2024 draft, Rd 1, No. 30",
    currentTeam: "Univ. of North Dakota, NCAA",
  },
  {
    name: "Mikkel Eriksen",
    position: "C",
    group: "Current prospect",
    acquired: "2025 draft, Rd 4, No. 111",
    currentTeam: "Farjestad BK U20",
  },
  {
    name: "Felix Farhammar",
    position: "D",
    group: "Current prospect",
    acquired: "2025 draft, Rd 7, No. 203",
    currentTeam: "Muskegon Lumberjacks, USHL",
  },
  {
    name: "Rico Gredig",
    position: "F",
    group: "Current prospect",
    acquired: "2024 draft, Rd 6, No. 191",
    currentTeam: "EV Zug, NL",
  },
  {
    name: "Liam Greentree",
    position: "F",
    group: "Current prospect",
    acquired: "Trade from Los Angeles, Feb. 4, 2026",
    currentTeam: "Windsor Spitfires, OHL",
  },
  {
    name: "Artem Gonchar",
    position: "D",
    group: "Current prospect",
    acquired: "2025 draft, Rd 3, No. 89",
    currentTeam: "Sudbury Wolves, OHL",
  },
  {
    name: "Ty Henricks",
    position: "F",
    group: "Current prospect",
    acquired: "2023 draft, Rd 6, No. 183",
    currentTeam: "Western Michigan, NCAA",
  },
  {
    name: "Samuel Jung",
    position: "F",
    group: "Current prospect",
    acquired: "2025 draft, Rd 6, No. 166",
    currentTeam: "KalPa, Liiga",
  },
  {
    name: "Rasmus Larsson",
    position: "D",
    group: "Current prospect",
    acquired: "2023 draft, Rd 5, No. 152",
    currentTeam: "Robert Morris Univ., NCAA",
  },
  {
    name: "Zeb Lindgren",
    position: "D",
    group: "Current prospect",
    acquired: "2025 draft, Rd 5, No. 139",
    currentTeam: "Red Deer Rebels, WHL",
  },
  {
    name: "Evan Passmore",
    position: "F",
    group: "Current prospect",
    acquired: "2025 draft, Rd 6, No. 171",
    currentTeam: "Barrie Colts, OHL",
  },
  {
    name: "Malcolm Spence",
    position: "F",
    group: "Current prospect",
    acquired: "2025 draft, Rd 2, No. 43",
    currentTeam: "Univ. of Michigan, NCAA",
  },
  {
    name: "Jaroslav Chmelar",
    position: "F",
    group: "Graduation watch",
    acquired: "2021 draft, Rd 5, No. 144",
    currentTeam: "New York Rangers, NHL",
  },
  {
    name: "Drew Fortescue",
    position: "D",
    group: "Current prospect",
    acquired: "2023 draft, Rd 3, No. 90",
    currentTeam: "New York Rangers, NHL",
  },
  {
    name: "Gabe Perreault",
    position: "F",
    group: "Graduated",
    acquired: "2023 draft, Rd 1, No. 23",
    currentTeam: "New York Rangers, NHL",
  },
  {
    name: "Adam Sykora",
    position: "F",
    group: "Graduation watch",
    acquired: "2022 draft, Rd 2, No. 63",
    currentTeam: "New York Rangers, NHL",
  },
  {
    name: "Noah Laba",
    position: "F",
    group: "Graduated",
    acquired: "2022 draft, Rd 4, No. 111",
    currentTeam: "New York Rangers, NHL",
  },
  {
    name: "Dylan Garand",
    position: "G",
    group: "Graduation watch",
    acquired: "2020 draft, Rd 4, No. 103",
    currentTeam: "New York Rangers, NHL",
  },
  {
    name: "William Trudeau",
    position: "D",
    group: "In-system prospect",
    acquired: "Trade from Montreal, June 26, 2026",
    currentTeam: "Rangers organization (signed one-year; assignment TBD)",
  },
  {
    name: "Brett Berard",
    position: "F",
    group: "Traded draft picks",
    acquired: "2020 draft, Rd 5, No. 134",
    currentTeam: "Montreal Canadiens organization",
  },
  {
    name: "Talyn Boyko",
    position: "G",
    group: "Roster review",
    acquired: "2021 draft, Rd 4, No. 112",
    currentTeam: "UFA - no qualifying offer",
  },
  {
    name: "Brendan Brisson",
    position: "C",
    group: "Roster review",
    acquired: "Trade from Vegas, Mar. 6, 2025",
    currentTeam: "UFA - no qualifying offer",
  },
  {
    name: "Jackson Dorrington",
    position: "D",
    group: "In-system prospect",
    acquired: "Trade from Vancouver, Feb. 1, 2025",
    currentTeam: "Hartford Wolf Pack, AHL",
  },
  {
    name: "Brody Lamb",
    position: "F",
    group: "In-system prospect",
    acquired: "2021 draft, Rd 4, No. 104",
    currentTeam: "Hartford Wolf Pack, AHL",
  },
  {
    name: "Bryce McConnell-Barker",
    position: "C",
    group: "In-system prospect",
    acquired: "2022 draft, Rd 3, No. 97",
    currentTeam: "Hartford Wolf Pack, AHL",
  },
  {
    name: "Scott Morrow",
    position: "D",
    group: "In-system prospect",
    acquired: "Trade from Carolina, July 1, 2025",
    currentTeam: "Hartford Wolf Pack, AHL",
  },
  {
    name: "Hugo Ollas",
    position: "G",
    group: "Roster review",
    acquired: "2020 draft, Rd 7, No. 197",
    currentTeam: "UFA - no qualifying offer",
  },
  {
    name: "Dylan Roobroeck",
    position: "C",
    group: "In-system prospect",
    acquired: "2023 draft, Rd 6, No. 178",
    currentTeam: "Hartford Wolf Pack, AHL",
  },
  {
    name: "Carey Terrance",
    position: "C",
    group: "In-system prospect",
    acquired: "Trade from Anaheim, June 12, 2025",
    currentTeam: "Hartford Wolf Pack, AHL",
  },
  {
    name: "Callum Tung",
    position: "G",
    group: "In-system prospect",
    acquired: "Undrafted signing, Apr. 1, 2025",
    currentTeam: "Bloomington Bison, ECHL",
  },
  {
    name: "Kalle Vaisanen",
    position: "F",
    group: "Traded draft picks",
    acquired: "2021 draft, Rd 4, No. 106",
    currentTeam: "Boston Bruins organization",
  },
  {
    name: "Karl Henriksson",
    position: "C",
    group: "Unsigned rights",
    acquired: "2019 draft, Rd 2, No. 58",
    currentTeam: "Vaxjo Lakers HC, SHL",
  },
  {
    name: "Lauri Pajuniemi",
    position: "F",
    group: "Unsigned rights",
    acquired: "2018 draft, Rd 5, No. 132",
    currentTeam: "Malmo Redhawks, SHL",
  },
  {
    name: "Juuso Parssinen",
    position: "C",
    group: "Roster review",
    acquired: "Trade from Colorado, Mar. 1, 2025",
    currentTeam: "Hartford Wolf Pack, AHL",
  },
  {
    name: "Aidan Thompson",
    position: "C",
    group: "Roster review",
    acquired: "Trade from Chicago, Mar. 6, 2026",
    currentTeam: "Hartford Wolf Pack, AHL",
  },
  {
    name: "Vincent Iorio",
    position: "D",
    group: "Roster review",
    acquired: "Waiver claim, Jan. 31, 2026",
    currentTeam: "New York Rangers, NHL",
  },
  {
    name: "Massimo Rizzo",
    position: "C",
    group: "Roster review",
    acquired: "Trade from Nashville, June 27, 2026",
    currentTeam: "UFA - no qualifying offer",
  },
];

const tradeAcquisitionDetails = {
  "jacob-battaglia": {
    date: "Mar. 6, 2026",
    partner: "Calgary Flames",
    rangersReceived: ["Jacob Battaglia"],
    rangersSent: ["Brennan Othmann"],
    source: {
      label: "2025-26 NHL transactions",
      url: "https://en.wikipedia.org/wiki/2025%E2%80%9326_NHL_transactions",
    },
  },
  "liam-greentree": {
    date: "Feb. 4, 2026",
    partner: "Los Angeles Kings",
    rangersReceived: [
      "Liam Greentree",
      "Conditional 2026 pick: earlier of Columbus or Los Angeles' 2nd-round picks if Los Angeles wins at least one 2026 playoff round; otherwise earlier of Dallas or Los Angeles' 3rd-round picks",
      "Conditional Dallas 2028 4th-round pick if Los Angeles wins at least two 2026 playoff rounds",
    ],
    rangersSent: [
      "Artemi Panarin",
      "50% salary retention on Panarin's remaining 2025-26 contract",
    ],
    source: {
      label: "2025-26 NHL transactions",
      url: "https://en.wikipedia.org/wiki/2025%E2%80%9326_NHL_transactions",
    },
  },
  "brendan-brisson": {
    date: "Mar. 6, 2025",
    partner: "Vegas Golden Knights",
    rangersReceived: [
      "Brendan Brisson",
      "San Jose's 2025 3rd-round pick",
    ],
    rangersSent: [
      "Reilly Smith",
      "50% salary retention on Smith's remaining 2024-25 contract",
    ],
    source: {
      label: "NHL.com trade report",
      url: "https://www.nhl.com/news/reilly-smith-traded-to-vegas-golden-knights-by-new-york-rangers",
    },
  },
  "jackson-dorrington": {
    date: "Jan. 31, 2025",
    partner: "Vancouver Canucks",
    rangersReceived: ["J.T. Miller", "Erik Brannstrom", "Jackson Dorrington"],
    rangersSent: [
      "Filip Chytil",
      "Victor Mancini",
      "New York's 2025 1st-round pick, No. 12 overall, after the original 2025-or-2026 condition converted",
    ],
    note:
      "The pick was conditional at the time of the trade and later converted when New York elected to convey its 2025 first-round pick.",
    source: {
      label: "2024-25 NHL transactions",
      url: "https://en.wikipedia.org/wiki/2024%E2%80%9325_NHL_transactions",
    },
  },
  "scott-morrow": {
    date: "July 1, 2025",
    partner: "Carolina Hurricanes",
    rangersReceived: [
      "Scott Morrow",
      "Carolina's 2026 2nd-round pick",
      "Dallas' 2026 1st-round pick, after the original Carolina/Dallas first-round condition resolved",
    ],
    rangersSent: ["K'Andre Miller"],
    note:
      "At the time of the trade, the first-rounder was conditional between Carolina/Dallas 2026 paths and a possible 2027 fallback.",
    source: {
      label: "2026 NHL Draft traded picks",
      url: "https://en.wikipedia.org/wiki/2026_NHL_entry_draft",
    },
  },
  "carey-terrance": {
    date: "June 12, 2025",
    partner: "Anaheim Ducks",
    rangersReceived: [
      "Carey Terrance",
      "Toronto's 2025 3rd-round pick, No. 89 overall, later used on Artem Gonchar",
    ],
    rangersSent: [
      "Chris Kreider",
      "Anaheim's 2025 4th-round pick, No. 104 overall, later used on Elijah Neuenschwander",
    ],
    source: {
      label: "2024-25 NHL transactions",
      url: "https://en.wikipedia.org/wiki/2024%E2%80%9325_NHL_transactions",
    },
  },
  "juuso-parssinen": {
    date: "Mar. 1, 2025",
    partner: "Colorado Avalanche",
    rangersReceived: [
      "Calvin de Haan",
      "Juuso Parssinen",
      "Better of Carolina or New York's 2025 2nd-round picks",
      "Better of Colorado or Vancouver's 2025 4th-round picks",
    ],
    rangersSent: [
      "Hank Kempf",
      "Ryan Lindgren",
      "Jimmy Vesey",
      "50% salary retention on Lindgren's remaining 2024-25 contract",
    ],
    source: {
      label: "NHL.com trade report",
      url: "https://www.nhl.com/news/topic/trade-coverage/ryan-lindgren-jimmy-vesey-traded-to-colorado-avalanche-by-new-york-rangers",
    },
  },
  "aidan-thompson": {
    date: "Mar. 6, 2026",
    partner: "Chicago Blackhawks",
    rangersReceived: ["Aidan Thompson"],
    rangersSent: ["Derrick Pouliot"],
    source: {
      label: "2025-26 NHL transactions",
      url: "https://en.wikipedia.org/wiki/2025%E2%80%9326_NHL_transactions",
    },
  },
  "william-trudeau": {
    date: "June 26, 2026",
    partner: "Montreal Canadiens",
    rangersReceived: ["William Trudeau"],
    rangersSent: ["Brett Berard"],
    source: {
      label: "New York Post trade report",
      url: "https://nypost.com/2026/06/26/sports/rangers-trade-brett-berard-to-canadiens-for-william-trudeau/",
    },
  },
  "massimo-rizzo": {
    date: "June 27, 2026",
    partner: "Nashville Predators",
    rangersReceived: ["Massimo Rizzo", "2026 fifth-round pick, No. 148"],
    rangersSent: ["Adam Edstrom"],
    note: "The Rangers later traded No. 131 and No. 148 to Seattle for No. 102 and selected Spencer Bowes.",
    source: {
      label: "Rangers official trade release",
      url: "https://www.nhl.com/rangers/news/rangers-acquire-2026-fifth-round-draft-pick-and-massimo-rizzo-in-exchange-for-adam-edstrom",
    },
  },
  "cole-beaudoin": {
    date: "July 1, 2026",
    partner: "Utah Mammoth",
    rangersReceived: ["Sean Durzi", "Cole Beaudoin", "2027 third-round pick"],
    rangersSent: ["Vincent Trocheck"],
    note:
      "The trade was reported during free agency day and added Beaudoin as the Rangers' newest first-round-pedigree center prospect.",
    source: {
      label: "New York Post trade report",
      url: "https://nypost.com/2026/07/01/sports/rangers-trading-vincent-trocheck-to-mammoth-in-major-shakeup/",
    },
  },
};

const tradedOutDetails = {
  "brett-berard": {
    date: "June 26, 2026",
    partner: "Montreal Canadiens",
    rangersReceived: ["William Trudeau"],
    rangersSent: ["Brett Berard"],
    source: {
      label: "New York Post trade report",
      url: "https://nypost.com/2026/06/26/sports/rangers-trade-brett-berard-to-canadiens-for-william-trudeau/",
    },
  },
  "kalle-vaisanen": {
    date: "July 1, 2026",
    partner: "Boston Bruins",
    rangersReceived: ["Joonas Korpisalo"],
    rangersSent: ["Kalle Vaisanen", "2028 fourth-round pick"],
    source: {
      label: "NHL.com trade report",
      url: "https://www.nhl.com/news/topic/trade-coverage/joonas-korpisalo-traded-to-new-york-rangers-by-boston-bruins",
    },
  },
};

// Updated September 20, 2026 from current expert, official, and scouting ranking signals.
const prospectConsensusOrder = [
  "Alberts Smits",
  "Liam Greentree",
  "Cole Beaudoin",
  "Malcolm Spence",
  "Scott Morrow",
  "Drew Fortescue",
  "EJ Emery",
  "Adam Sykora",
  "Tomas Chrenko",
  "Benjamin MacBeath",
  "Dylan Garand",
  "Nathan Aspinall",
  "Jacob Battaglia",
  "William Trudeau",
  "Bryce McConnell-Barker",
  "Jaroslav Chmelar",
  "Mikkel Eriksen",
  "Aidan Thompson",
  "Sean Barnhill",
  "Brendan Brisson",
  "Andre Mondoux",
  "Raoul Boilard",
  "Brody Lamb",
  "Dylan Roobroeck",
  "Carey Terrance",
  "Charlie Morrison",
  "Danai Shaiikov",
  "Jackson Dorrington",
  "Spencer Bowes",
  "Artem Gonchar",
  "Callum Tung",
  "Talyn Boyko",
  "Rico Gredig",
  "Rasmus Larsson",
  "Zeb Lindgren",
  "Felix Farhammar",
  "Samuel Jung",
  "Evan Passmore",
  "Darian Anderson",
  "Ivan Patrikhayev",
  "Ty Henricks",
  "Vincent Iorio",
  "Massimo Rizzo",
  "Juuso Parssinen",
  "Hugo Ollas",
  "Karl Henriksson",
  "Lauri Pajuniemi",
  "Gabe Perreault",
  "Noah Laba",
  "Kalle Vaisanen",
  "Brett Berard",
];

const dobberScoutingSlugs = new Set([
  "nathan-aspinall",
  "sean-barnhill",
  "jacob-battaglia",
  "raoul-boilard",
  "ej-emery",
  "mikkel-eriksen",
  "felix-farhammar",
  "liam-greentree",
  "ty-henricks",
  "samuel-jung",
  "rasmus-larsson",
  "zeb-lindgren",
  "evan-passmore",
  "malcolm-spence",
  "jaroslav-chmelar",
  "drew-fortescue",
  "gabe-perreault",
  "adam-sykora",
  "noah-laba",
  "dylan-garand",
  "brett-berard",
  "talyn-boyko",
  "brendan-brisson",
  "jackson-dorrington",
  "brody-lamb",
  "bryce-mcconnell-barker",
  "scott-morrow",
  "hugo-ollas",
  "carey-terrance",
  "callum-tung",
  "kalle-vaisanen",
  "aidan-thompson",
  "vincent-iorio",
]);

const scoutingProfiles = {
  "nathan-aspinall": {
    bio:
      "Nathan Aspinall is a 20-year-old, 6'6\" winger in the OHL with a late-round profile built around size, reach, and runway.",
    style:
      "Large-frame winger who projects as a north-south forechecker and net-front player more than a pure rush creator. His best shifts come when he gets below the goal line, leans on defenders, and keeps plays alive around the wall.",
    strengths:
      "Size, reach, puck protection flashes, net-front presence, board work, and the ability to make smaller plays in traffic when he plays through contact.",
    development:
      "The key is pace. His skating mechanics, first-step quickness, and off-puck routes need to keep improving so the size advantage translates against faster pro defenders.",
    projection:
      "Long-range bottom-six power winger if the skating and details come. The realistic path is becoming a heavy, matchup-friendly winger who can support a cycle line.",
    comparable:
      "Style-only comp: Michael Rasmussen/Lawson Crouse family. That means a big winger whose value has to come from straight-line pressure, reach, and net-front utility.",
  },
  "alberts-smits": {
    bio:
      "Alberts Smits is an 18-year-old left-shot Latvian defenseman with NHL-ready size, pro experience in Finland and Germany, and senior international reps for Latvia.",
    style:
      "Big, mobile two-way defenseman who already plays a pro-style game against older competition. He uses his reach and frame to close space, but his appeal is not only size; he can move pucks, support exits, and keep plays in front of him under pressure.",
    strengths:
      "Size, mobility, defensive range, mature reads, pro-game reps, international experience, first-pass ability, and the confidence to handle difficult minutes against older players.",
    development:
      "Needs to keep sharpening puck management under heavy forecheck pressure, add more consistent offensive activation, and adjust to North American pace and rink spacing if the Rangers eventually bring him over.",
    projection:
      "Top-four two-way defenseman upside if the puck game keeps growing. His floor looks higher than a typical draft pick because he has already handled meaningful pro and international minutes.",
    comparable:
      "Style-only comp: Hampus Lindholm/Esa Lindell family, with a little Moritz Seider-lite in the pro-tested, big, mobile defender lane. This is a style comparison, not a point-production promise.",
    sources: [
      {
        label: "NHL.com draft stock profile",
        url: "https://www.nhl.com/news/alberts-smits-2026-nhl-draft-stock-on-rise-after-playing-for-latvia-in-olympics",
      },
      {
        label: "NHL.com E.J. McGuire Award",
        url: "https://www.nhl.com/news/alberts-smits-named-recipient-of-2026-ej-mcguire-award-of-excellence",
      },
      {
        label: "Rangers ELC release",
        url: "https://www.nhl.com/rangers/news/rangers-agree-to-terms-with-alberts-smits",
      },
      {
        label: "Elite Prospects",
        url: "https://www.eliteprospects.com/player/876994/alberts-smits",
      },
      {
        label: "NHL draft video",
        url: "https://www.nhl.com/video/stenberg-smits-at-draft-combine-6397682458112",
      },
    ],
    highlights: [
      {
        label: "Rangers draft video",
        url: "https://www.nhl.com/rangers/video/2026-nhl-draft-alberts-smits-6399507718112",
      },
      {
        label: "2025-26 highlight reel",
        url: "https://www.youtube.com/watch?v=WcHWT1uga44",
      },
    ],
  },
  "benjamin-macbeath": {
    bio:
      "Benjamin MacBeath is an 18-year-old left-shot defenseman from Calgary who broke out with the WHL's Calgary Hitmen and is committed to the University of Denver.",
    style:
      "Two-way defenseman who likes to move with the play instead of staying static. His value comes from skating, joining the rush at the right time, creating shooting lanes from the blue line, and defending with enough feet to close quickly.",
    strengths:
      "Skating, edge work, transition involvement, passing touch, offensive-zone movement, and the confidence to activate while still carrying a defense-first frame.",
    development:
      "Needs to keep adding strength, simplify some puck decisions under pressure, and prove at Denver that the offensive instincts can translate against older, faster NCAA competition.",
    projection:
      "Second-pair upside if the puck-moving game keeps climbing. The safer projection is a mobile two-way defenseman who can move pucks and support a transition-heavy pair.",
    comparable:
      "Style-only comp: Brady Skjei/Devon Toews family. That points to a mobile left-shot defenseman who can defend, skate pucks out, and add offense without being only a power-play specialist.",
    sources: [
      {
        label: "NHL profile",
        url: "https://www.nhl.com/player/ben-macbeath-8486064",
      },
      {
        label: "WHL draft profile",
        url: "https://chl.ca/whl/article/2026-nhl-draft-profile-ben-macbeath-calgary-hitmen",
      },
      {
        label: "Rangers draft video",
        url: "https://www.nhl.com/rangers/video/2026-nhl-draft-macbeath-chrenko-and-bowes-6399578439112",
      },
    ],
    highlights: [
      {
        label: "WHL highlight reel",
        url: "https://chl.ca/whl/video/2025-26-nhl-draft-highlight-reels-ben-macbeath/",
      },
      {
        label: "Rangers draft video",
        url: "https://www.nhl.com/rangers/video/2026-nhl-draft-macbeath-chrenko-and-bowes-6399578439112",
      },
    ],
  },
  "danai-shaiikov": {
    bio:
      "Danai Shaiikov is an 18-year-old left-catching goaltender from Almaty, Kazakhstan, who moved from the Avangard Omsk system to Gatineau in the QMJHL.",
    style:
      "Athletic, quick-reacting goalie whose game is built around feet, reads, and recovery ability. He can make second saves with explosiveness and has already handled a heavy QMJHL workload.",
    strengths:
      "Quickness, lateral pushes, compete, tracking through traffic, recovery saves, and the ability to keep his game alive when a play breaks down.",
    development:
      "Needs more North American reps to smooth rebound control, post integration, and save selection so the athletic tools become more repeatable instead of reactive.",
    projection:
      "High-upside development goalie. The path is longer, but the Rangers are betting on athletic traits, starter workload experience, and room for technical refinement.",
    comparable:
      "Style-only comp: Pyotr Kochetkov/Semyon Varlamov family. That means an athletic goalie with quick reads and recovery tools, not a guarantee of that ceiling.",
    sources: [
      {
        label: "NHL profile",
        url: "https://www.nhl.com/player/danai-shaiikov-8486226",
      },
      {
        label: "QMJHL prospect feature",
        url: "https://chl.ca/lhjmq/en/article/prospect-of-the-week-danai-shaiikov",
      },
      {
        label: "Elite Prospects",
        url: "https://www.eliteprospects.com/player/896458/danai-shaiikov",
      },
    ],
    highlights: [
      {
        label: "QMJHL game highlight",
        url: "https://chl.ca/lhjmq/en/video/what-a-game-for-danai-shaiikov-olympiques-2-foreurs-1/",
      },
      {
        label: "QMJHL plays of the week",
        url: "https://chl.ca/lhjmq/en/video/the-plays-of-the-week-presented-by-flohockey-week-26-2025-26/",
      },
    ],
  },
  "charlie-morrison": {
    bio:
      "Charlie Morrison is an 18-year-old left-shot defenseman from Miramichi, New Brunswick, who plays for the Quebec Remparts in the QMJHL.",
    style:
      "Big, assertive defensive defenseman who wants to end plays early. He closes gaps, angles puck carriers into pressure, leans into board battles, and plays with a noticeable edge around his own zone.",
    strengths:
      "Size, reach, physical pressure, defensive stick, crease and wall work, and the willingness to make life uncomfortable for attackers.",
    development:
      "Needs to keep improving first-pass consistency and puck decisions so he is not only a stopper. Discipline and timing will matter as he faces better rush players.",
    projection:
      "Shutdown third-pair upside if the puck game becomes clean enough. His NHL case is built on defending hard minutes, not running offense.",
    comparable:
      "Style-only comp: Carson Soucy/Brenden Dillon family. That means a heavy, matchup-leaning left-shot defenseman who wins through size and defensive pressure.",
    sources: [
      {
        label: "NHL profile",
        url: "https://www.nhl.com/player/charlie-morrison-8486069",
      },
      {
        label: "McKeen's scouting report",
        url: "https://www.mckeenshockey.com/nhl-blog/2026-nhl-draft-detailed-scouting-report-charlie-morrison-d-quebec-remparts-qmjhl/",
      },
      {
        label: "Elite Prospects",
        url: "https://www.eliteprospects.com/player/745779/charlie-morrison",
      },
    ],
    highlights: [
      {
        label: "Coast-to-coast goal",
        url: "https://www.flohockey.tv/video/14694871-2026-nhl-draft-prospect-charlie-morrison-goes-coast-to-coast-for-first-goal",
      },
      {
        label: "Scouting video clips",
        url: "https://www.mckeenshockey.com/nhl-blog/2026-nhl-draft-detailed-scouting-report-charlie-morrison-d-quebec-remparts-qmjhl/",
      },
    ],
  },
  "tomas-chrenko": {
    bio:
      "Tomas Chrenko is an 18-year-old right-shot Slovak center from Nitra who played senior minutes for HK Nitra and produced in Slovakia's top league.",
    style:
      "Creative offensive center who plays with touch, pace, and confidence through the middle of the ice. He can pass off movement, attack one-on-one, and use his hands to turn broken plays into chances.",
    strengths:
      "Puck skill, playmaking, quick release, east-west creativity, hockey sense, and a history of producing against older competition in Slovakia.",
    development:
      "Needs added strength and more detail away from the puck to stay at center long term. The Rangers will want the creativity to survive tighter checking and faster defensive pressure.",
    projection:
      "Middle-six skill center upside if the pace and two-way habits keep coming. There is real offensive ceiling here compared with a typical third-round pick.",
    comparable:
      "Style-only comp: Mikael Granlund/Martin Necas family. That means a creative, slippery forward who can beat checks with skill and vision, not a one-for-one projection.",
    sources: [
      {
        label: "NHL profile",
        url: "https://www.nhl.com/player/tomas-chrenko-8486232",
      },
      {
        label: "Muskegon draft note",
        url: "https://muskegonlumberjacks.com/news/2026/6/27/mens-ice-hockey-tom-chrenko-selected-81st-overall-by-the-new-york-rangers-in-2026-nhl-draft.aspx",
      },
      {
        label: "Rangers draft video",
        url: "https://www.nhl.com/rangers/video/2026-nhl-draft-macbeath-chrenko-and-bowes-6399578439112",
      },
    ],
    highlights: [
      {
        label: "Scouting video clips",
        url: "https://www.mckeenshockey.com/nhl-blog/2026-nhl-draft-detailed-scouting-report-tomas-chrenko-c-hk-nitra-slovakia/",
      },
      {
        label: "2025-26 highlight reel",
        url: "https://www.youtube.com/watch?v=XgoMPak0IKA",
      },
    ],
  },
  "spencer-bowes": {
    bio:
      "Spencer Bowes is an 18-year-old left-shot forward from Almonte, Ontario, who plays for the Ottawa 67's and is committed to Providence College.",
    style:
      "Pace winger whose game starts with his feet. He hunts space, times routes well, attacks off the rush, and gets value from constant movement rather than waiting for the play to arrive.",
    strengths:
      "Skating pace, route timing, even-strength scoring, forecheck energy, transition support, and the ability to arrive in dangerous ice at speed.",
    development:
      "Needs to add strength, become harder to knock off routes, and keep rounding out defensive details before the Providence step.",
    projection:
      "Middle-six energy winger upside if the pace offense keeps translating. The safer path is a quick, useful support winger who can forecheck and chip in secondary scoring.",
    comparable:
      "Style-only comp: Brandon Hagel/Blake Coleman family. That points to pace, pressure, and useful offense more than pure star-skill projection.",
    sources: [
      {
        label: "NHL profile",
        url: "https://www.nhl.com/player/spencer-bowes-8486247",
      },
      {
        label: "Ottawa 67's ranking note",
        url: "https://chl.ca/ohl-67s/article/five-ottawa-67s-players-ranked-in-the-nhl-central-scouting-final-rankings/",
      },
      {
        label: "Rangers draft video",
        url: "https://www.nhl.com/rangers/video/2026-nhl-draft-macbeath-chrenko-and-bowes-6399578439112",
      },
    ],
    highlights: [
      {
        label: "OHL play of the night",
        url: "https://chl.ca/ohl/video/ohl-play-of-the-night-spencer-bowes-goes-forehand-backhand/",
      },
      {
        label: "Playoff goal highlight",
        url: "https://www.flohockey.tv/teams/10316266-ottawa-67s/videos?nav_id=503&playing=15786104",
      },
      {
        label: "Game 2 goal highlight",
        url: "https://www.flohockey.tv/teams/10316266-ottawa-67s/videos?nav_id=503&playing=15778777",
      },
    ],
  },
  "andre-mondoux": {
    bio:
      "Andre Mondoux is a 19-year-old left-shot defenseman from North Bay, Ontario, who moved from Pickering in the OJHL into a full OHL role with Kingston.",
    style:
      "Late-rising, steady defenseman with size, patience, and a simple defensive identity. He is most comfortable killing plays, making the next pass, and handling reliable minutes instead of chasing highlight offense.",
    strengths:
      "Frame, reach, defensive growth, penalty-kill tools, composure, and a development curve that improved after he reached Kingston.",
    development:
      "Needs to keep improving puck speed and retrievals against harder forechecks. The pro question is whether the first pass gets clean enough for higher-paced games.",
    projection:
      "Long-range depth defenseman with third-pair defensive upside. He is a bet on size, maturity, and late development.",
    comparable:
      "Style-only comp: Niko Mikkola/Ben Chiarot family. That means a hard, simple, defense-first left-shot defender.",
    sources: [
      {
        label: "NHL profile",
        url: "https://www.nhl.com/player/andre-mondoux-8485710",
      },
      {
        label: "Kingston development feature",
        url: "https://chl.ca/ohl-frontenacs/article/unlocking-potential-andre-mondouxs-rise-from-11th-round-pick-to-nhl-draft-hopeful/",
      },
      {
        label: "Kingston season video",
        url: "https://chl.ca/ohl-frontenacs/video/andre-mondoux-reflects-on-a-strong-season-for-the-black-and-gold/",
      },
      {
        label: "OHL post-draft interview",
        url: "https://chl.ca/ohl/video/andre-mondoux-post-nhl-draft-interview/",
      },
    ],
    highlights: [
      {
        label: "First OHL goal",
        url: "https://chl.ca/ohl/video/andre-mondoux-first-ohl-goal/",
      },
      {
        label: "Kingston season video",
        url: "https://chl.ca/ohl-frontenacs/video/andre-mondoux-reflects-on-a-strong-season-for-the-black-and-gold/",
      },
      {
        label: "OHL post-draft interview",
        url: "https://chl.ca/ohl/video/andre-mondoux-post-nhl-draft-interview/",
      },
    ],
  },
  "darian-anderson": {
    bio:
      "Darian Anderson is a 19-year-old right-shot winger from Falls Church, Virginia, who produced for the Flint Firebirds in his first OHL season and is committed to Clarkson University for 2026-27.",
    style:
      "Big right wing with scoring touch, net-drive habits, and enough skill to finish plays around the slot. His profile is built on size, a right-shot look, and a jump in production after moving into the OHL.",
    strengths:
      "Frame, finishing, playoff production, right-shot utility, net-front routes, and the ability to play with skilled linemates without only being a passenger.",
    development:
      "Needs to keep improving pace, shift-to-shift consistency, and defensive reads. The next checkpoint is carrying his Flint scoring growth into the NCAA at Clarkson.",
    projection:
      "Bottom-six to middle-six power winger upside if the OHL scoring jump is real. He is a useful swing on size, shot, and late growth.",
    comparable:
      "Style-only comp: Jordan Greenway/Blake Coleman family. That means a bigger winger who has to bring forecheck value and useful secondary scoring.",
    sources: [
      {
        label: "NHL profile",
        url: "https://www.nhl.com/player/darian-anderson-8486295",
      },
      {
        label: "Flint draft note",
        url: "https://chl.ca/ohl-firebirds/article/two-firebirds-selected-at-2026-nhl-draft",
      },
      {
        label: "NY Post development camp note",
        url: "https://nypost.com/2026/07/04/sports/trio-of-ohl-prospects-reunited-with-rangers-after-being-linemates-for-historic-season/",
      },
      {
        label: "College Hockey Inc. commitments",
        url: "https://www.collegehockeyinc.com/college-commitments/",
      },
      {
        label: "Elite Prospects",
        url: "https://www.eliteprospects.com/player/807163/darian-anderson",
      },
    ],
    highlights: [
      {
        label: "First OHL goal",
        url: "https://chl.ca/ohl/video/darian-anderson-first-ohl-goal/",
      },
      {
        label: "Playoff goal highlight",
        url: "https://www.flohockey.tv/leagues/10826825-ontario-hockey-league-ohl/videos?playing=15771122",
      },
      {
        label: "Second playoff goal",
        url: "https://www.flohockey.tv/video/15742222-darian-anderson-scores-his-second-of-the-game",
      },
    ],
  },
  "ivan-patrikhayev": {
    bio:
      "Ivan Patrikhayev is a 20-year-old left-shot Russian defenseman from Ekaterinburg who played senior KHL minutes with CSKA Moskva before the Rangers selected him in the seventh round.",
    style:
      "Mobile puck-moving defenseman with pro experience and a skating-first profile. He can catch pucks in motion, escape pressure, and move play north when he has an outlet.",
    strengths:
      "Skating, agility, puck retrieval movement, passing off pressure, pro reps in Russia, and the ability to handle tempo better than many late-round defense picks.",
    development:
      "Needs added strength, more defensive consistency, and a clear long-term North American path. His value depends on the mobility becoming reliable two-way minutes.",
    projection:
      "Long-view puck-moving depth defenseman. The upside is more interesting than the draft slot because he already has KHL experience, but the transfer path and defensive polish are key.",
    comparable:
      "Style-only comp: Dmitry Orlov/Artem Zub family. That means a mobile Russian defenseman who can move pucks under pressure, not a direct ceiling projection.",
    sources: [
      {
        label: "NHL profile",
        url: "https://www.nhl.com/player/ivan-patrikhayev-8486321",
      },
      {
        label: "Elite Prospects",
        url: "https://www.eliteprospects.com/player/835563/ivan-patrikhayev",
      },
      {
        label: "NHL draft API",
        url: "https://api-web.nhle.com/v1/draft/picks/2026/all",
      },
    ],
    highlights: [
      {
        label: "KHL first goal recap",
        url: "https://www.khl.ru/news/2025/11/27/554072.html",
      },
      {
        label: "KHL season review",
        url: "https://en.khl.ru/news/2026/06/25/563407.html",
      },
    ],
  },
  "sean-barnhill": {
    bio:
      "Sean Barnhill is a 6'6\" defenseman headed through the college route with a toolkit centered on length, defensive range, and projection.",
    style:
      "Big, rangy defender who is at his best closing space early, steering rushes wide, and using his reach to break plays before they become dangerous.",
    strengths:
      "Frame, wingspan, defensive stick, board defense, shot-blocking tools, and the raw ingredients to become difficult to play through once his reads mature.",
    development:
      "Needs college reps to sharpen retrievals, puck decisions under pressure, and lateral mobility. The goal is to become cleaner on first passes without losing the defensive identity.",
    projection:
      "Developmental shutdown defenseman with third-pair upside if the skating and puck movement stabilize. He is more about prevention than production.",
    comparable:
      "Style-only comp: Brandon Carlo/Erik Cernak family. That is the big, reach-heavy defensive defenseman lane, not a promise of the same ceiling.",
  },
  "jacob-battaglia": {
    bio:
      "Jacob Battaglia is a 20-year-old winger with OHL scoring pedigree who came into the Rangers system through the Calgary trade route.",
    style:
      "Skilled scoring winger who can work as both a shooter and a secondary creator. He is most dangerous when he finds soft ice, gets pucks off his stick quickly, and attacks seams from the circles.",
    strengths:
      "Shot release, offensive instincts, power-play touch, puck skill in the offensive zone, and enough playmaking to punish defenders who overcommit to the shot.",
    development:
      "Needs to keep adding pace, strength through contact, and consistency away from the puck so his offensive game survives the jump from junior to pro.",
    projection:
      "Middle-six scoring winger upside if the skating and two-way detail come along. More likely path is a complementary winger who can help a second power-play unit.",
    comparable:
      "Style-only comp: Tyler Toffoli/Jason Robertson family. That means a winger who wins with timing, shot quality, and offensive feel more than pure speed.",
  },
  "raoul-boilard": {
    bio:
      "Raoul Boilard is a 20-year-old center whose value comes from a two-way profile, faceoff-route projection, and a college development runway.",
    style:
      "Responsible center who plays a structured game, supports the puck low, and looks to make the next efficient play rather than forcing offense.",
    strengths:
      "Hockey sense, defensive positioning, support habits, passing touch, and the ability to play a useful middle-lane game when he keeps his feet moving.",
    development:
      "Needs more pace and stronger separation skills. The pro question is whether he can create enough offense while still maintaining the defensive habits that make him interesting.",
    projection:
      "Bottom-six center or versatile depth forward if the offense rises. He profiles best as a responsible support player who can handle matchup minutes.",
    comparable:
      "Style-only comp: Phillip Danault/Adam Lowry family. That points to a defense-first center lane, with the offensive ceiling still to be earned.",
  },
  "ej-emery": {
    bio:
      "EJ Emery is a 20-year-old right-shot defenseman at North Dakota with NHL size, athletic tools, and a defense-first identity.",
    style:
      "Long, mobile shutdown defender who wants to kill plays early with his feet, reach, and gap control. He is not built around point production, but he can move pucks simply when the game is in front of him.",
    strengths:
      "Skating for his size, reach, defensive range, rush defense, penalty-kill tools, and the ability to erase space against skilled forwards.",
    development:
      "The offensive and breakout layers are still developing. He needs cleaner puck touches, more confidence under forecheck pressure, and continued strength gains.",
    projection:
      "Second- or third-pair matchup defenseman if the puck game becomes steady enough. His NHL case is built around defending, not quarterbacking offense.",
    comparable:
      "Style-only comp: K'Andre Miller/Brandon Carlo family. That means a long, athletic defender whose value starts with skating and reach.",
  },
  "mikkel-eriksen": {
    bio:
      "Mikkel Eriksen is a 2025 draft center developing in Sweden, with a profile based on skill, puck touches, and offensive growth.",
    style:
      "Skilled, smaller-framed center who looks to play with pace through the middle of the ice. He is most interesting when he is handling pucks in motion and connecting plays quickly.",
    strengths:
      "Puck skill, east-west vision, quick hands, offensive instincts, and enough competitiveness to stay involved despite not having a big frame.",
    development:
      "Needs strength, defensive reliability, and pro pace. The center projection depends on whether he can win enough inside battles and handle heavier matchups.",
    projection:
      "Long-range playmaking forward. If center does not hold, he could still have a path as a skill winger who supports a scoring line.",
    comparable:
      "Style-only comp: Jesper Bratt/Mikael Granlund family. That means a smaller skill forward who must win with pace, touch, and processing.",
  },
  "felix-farhammar": {
    bio:
      "Felix Farhammar is a 2025 seventh-round defenseman developing in Sweden with a late-blooming, puck-moving profile.",
    style:
      "Mobile defenseman who is at his best when he keeps his reads simple, joins the second wave, and moves pucks before pressure arrives.",
    strengths:
      "Skating base, puck movement, composure flashes, and the ability to support transition without needing to dominate the puck.",
    development:
      "Needs physical maturity, defensive assertiveness, and more consistency against older pro competition. His margin for error is tied to becoming reliable shift to shift.",
    projection:
      "Long-range depth defenseman if the skating and puck movement continue to pop. He needs time and pro reps before the NHL case becomes clear.",
    comparable:
      "Style-only comp: Erik Gustafsson/Matt Grzelcyk family. That means a mobile support defenseman whose value comes from puck movement and decisions.",
  },
  "rico-gredig": {
    bio:
      "Rico Gredig is a Swiss forward with pro experience, size, and a mature development path through the National League.",
    style:
      "Straightforward winger who can play a support game, pressure defenders, and use his frame to extend possessions. He is more of a utility forward than a pure skill bet.",
    strengths:
      "Pro habits, physical maturity, board work, direct routes, and the ability to fit into a structured forechecking role.",
    development:
      "Needs to show enough pace and offensive touch to separate from a depth profile. Continued growth as a checker and penalty-kill option matters.",
    projection:
      "Depth winger candidate with a bottom-six path if the skating keeps improving. His best NHL case is as a reliable, physical support forward.",
    comparable:
      "Style-only comp: Nino Niederreiter-lite/Noel Acciari wing version. That means simple, heavy, responsible hockey rather than high-end creativity.",
  },
  "liam-greentree": {
    bio:
      "Liam Greentree is a 20-year-old left-shot winger with NHL size, OHL captaincy experience, and a high-end junior scoring record with Windsor.",
    style:
      "Big, skilled scoring winger who can play a power-forward style without being only a crash-and-bang player. He is at his best protecting pucks, delaying to find options, attacking inside ice, and finishing from dangerous areas.",
    strengths:
      "Heavy shot, soft hands around traffic, puck protection, power-play scoring touch, offensive-zone patience, and enough playmaking sense to create for linemates when defenders overplay the shot.",
    development:
      "The swing skill is pace. His skating, first-step quickness, and defensive details need to keep improving so the scoring tools translate against NHL pressure.",
    projection:
      "Middle-six scoring winger with second-line upside if the pace catches up. He fits best with linemates who can transport the puck and let him work below the dots, around the circles, and on the power play.",
    comparable:
      "Style-only comp: Matt Boldy/Jason Robertson family. That means a big, skilled winger who wins with hands, processing, puck protection, and shot quality more than pure footspeed.",
    sources: [
      {
        label: "Blue Seat Blogs",
        url: "https://blueseatblogs.com/2026/02/05/liam-greentree-scouting-report/",
      },
      {
        label: "DobberProspects",
        url: "https://dobberprospects.com/player/liam-greentree/",
      },
      {
        label: "LA Kings Insider",
        url: "https://lakingsinsider.com/2024/06/28/kings-select-forward-liam-greentree-round-1-pick-26/",
      },
      {
        label: "NHL profile",
        url: "https://www.nhl.com/player/liam-greentree-8484802",
      },
    ],
  },
  "artem-gonchar": {
    bio:
      "Artem Gonchar is a 2025 draft defenseman developing in the OHL with a mobile, modern blue-line profile.",
    style:
      "Puck-moving defenseman who wants to activate, move laterally, and create cleaner exits. He is most noticeable when he is skating pucks out of trouble or supporting offense from the blue line.",
    strengths:
      "Mobility, puck poise, offensive instincts, edge work, and the confidence to look for plays instead of defaulting to glass-and-out clears.",
    development:
      "Needs strength, defensive consistency, and better risk management. The next step is proving he can defend pro pace while still using his puck game.",
    projection:
      "Long-range offensive support defenseman. If the defending catches up, he has a third-pair/power-play-support path.",
    comparable:
      "Style-only comp: Tony DeAngelo/Sean Durzi family. That means an offense-leaning puck mover whose NHL case depends on managing defensive risk.",
  },
  "ty-henricks": {
    bio:
      "Ty Henricks is a big winger on the college path whose NHL interest starts with size, heaviness, and net-front tools.",
    style:
      "North-south power winger who is most useful when he gets to the hard areas, finishes checks, and forces defenders into long shifts.",
    strengths:
      "Size, strength potential, physicality, net-front presence, wall play, and the ability to make life uncomfortable below the dots.",
    development:
      "Needs more pace, puck skill under pressure, and offensive consistency. The college route should give him time to refine details and special-teams utility.",
    projection:
      "Depth power winger if the skating rises. His most realistic NHL path is as a physical bottom-six forward who can play a direct checking game.",
    comparable:
      "Style-only comp: Garnet Hathaway/Nicolas Deslauriers skill-up version. That points to heaviness and role value, not top-six offense.",
  },
  "samuel-jung": {
    bio:
      "Samuel Jung is a 2025 draft forward with a big frame and a European development path through Finland.",
    style:
      "Rangy forward who projects as a straight-line support player. He is best when he keeps his game simple, pressures pucks, and uses his length around the boards.",
    strengths:
      "Size, reach, defensive potential, net-front tools, and room to grow into a more assertive pro-style game.",
    development:
      "Needs more strength, puck confidence, and offensive assertiveness. The question is whether he can create enough pressure and production against older competition.",
    projection:
      "Long-range depth winger. The path is becoming a responsible, heavy support forward rather than a primary scorer.",
    comparable:
      "Style-only comp: Eeli Tolvanen body-lane with a Marcus Foligno support-role target. That means the tools need to become direct, physical, and useful.",
  },
  "rasmus-larsson": {
    bio:
      "Rasmus Larsson is a big defenseman with a college development path and a profile built around size, reach, and defensive projection.",
    style:
      "Stay-at-home defender who plays best when he keeps the game in front of him, closes gaps with his reach, and makes the first simple pass.",
    strengths:
      "Size, defensive stick, box-out tools, board battles, and the frame to handle heavier matchups as he matures.",
    development:
      "Needs quicker puck decisions, better feet on retrievals, and more confidence against fast forechecks. The details have to become automatic.",
    projection:
      "Depth defensive defenseman if the mobility and puck movement reach pro standard. The ceiling is tied to becoming steady rather than flashy.",
    comparable:
      "Style-only comp: Ryan Graves/Brayden McNabb family. That means a big, simple defender who adds value by ending plays.",
  },
  "zeb-lindgren": {
    bio:
      "Zeb Lindgren is a 2025 draft defenseman developing in Sweden with a mobile two-way profile.",
    style:
      "Skating defenseman who can move pucks and support transition. He is most useful when he plays with pace, keeps his gaps tight, and chooses simple outlets.",
    strengths:
      "Mobility, puck movement, defensive stick, and the potential to grow into a balanced support defenseman.",
    development:
      "Needs strength, pro defensive habits, and more consistency against pressure. The offensive side should not come at the expense of structure.",
    projection:
      "Long-range third-pair defenseman if his two-way game matures. He needs time against older competition.",
    comparable:
      "Style-only comp: Mattias Samuelsson mobility-lite/Jonas Brodin support lane. That points to skating and defense-first value.",
  },
  "evan-passmore": {
    bio:
      "Evan Passmore is a big OHL forward with a late-round profile built around size, development runway, and tool projection.",
    style:
      "Large winger who is most effective playing direct hockey. He needs to use his frame to pressure defensemen, protect pucks, and get inside the dots.",
    strengths:
      "Frame, reach, board work, straight-line pressure, and the raw ingredients for a heavier pro-style role.",
    development:
      "Needs pace, touch, and repeatable offensive habits. The next step is turning size into consistent shift-to-shift impact.",
    projection:
      "Long-range bottom-six winger if he keeps adding speed and detail. The value case is built around size plus responsible forechecking.",
    comparable:
      "Style-only comp: Miles Wood/Josh Anderson family. That means speed-and-size pressure, with the skill level still developing.",
  },
  "malcolm-spence": {
    bio:
      "Malcolm Spence is a 2025 second-round winger with size, competitiveness, and a power-forward toolkit.",
    style:
      "High-motor winger who can play through contact, drive the middle lane, and affect games without needing the puck every shift.",
    strengths:
      "Forecheck pressure, board battles, net drives, two-way habits, puck protection, and enough offensive touch to fit with skilled linemates.",
    development:
      "Needs to keep sharpening finishing touch and puck decisions at higher pace. If the offense pops, the floor becomes much more attractive.",
    projection:
      "Middle-six winger with matchup utility. His NHL path is a hard, reliable winger who can complement scorers and still chip in offense.",
    comparable:
      "Style-only comp: Chris Kreider/Brandon Saad family. That means a power winger who can skate, pressure, and score around the net.",
  },
  "jaroslav-chmelar": {
    bio:
      "Jaroslav Chmelar is a big Rangers winger on graduation watch after splitting the 2025-26 season between Hartford and New York.",
    style:
      "Straight-line power winger who is most useful when he plays through contact, gets below the dots, and makes defensemen handle his size on retrievals.",
    strengths:
      "Frame, forecheck pressure, board work, net-front routes, and enough finishing touch to convert chances around the crease.",
    development:
      "Needs to keep proving his pace, puck decisions, and discipline can hold up over a full NHL role rather than only in shorter fourth-line usage.",
    projection:
      "Bottom-six NHL winger with energy-line utility if the details continue to settle.",
    comparable:
      "Style-only comp: Sammy Blais/Julien Gauthier family. That means size, pressure, and direct play with role value tied to consistency.",
  },
  "drew-fortescue": {
    bio:
      "Drew Fortescue is a left-shot defenseman with a defense-first identity, major college experience, and a strong matchup toolkit.",
    style:
      "Reliable shutdown defender who wants to play tight gaps, kill rushes early, and move pucks efficiently rather than chase offense.",
    strengths:
      "Defensive reads, skating base, reach, penalty-kill utility, competitiveness, and the ability to handle difficult minutes without needing touches.",
    development:
      "Needs to keep improving puck confidence and breakout variety. The more he can make clean exits, the easier it is to project him into NHL minutes.",
    projection:
      "Third-pair matchup defenseman with second-pair defensive usage if the puck game continues to mature.",
    comparable:
      "Style-only comp: Ryan Lindgren/Jaccob Slavin defensive-lane blend. That means detail, stick, and matchup value rather than power-play offense.",
  },
  "gabe-perreault": {
    bio:
      "Gabe Perreault is a graduated Rangers prospect and highly skilled winger whose game is built around elite offensive feel and playmaking touch.",
    style:
      "Creative scoring winger who thinks the game ahead of pressure. He finds seams, delays defenders out of position, and can finish or pass from deceptive angles.",
    strengths:
      "Vision, hands, small-area playmaking, power-play creativity, offensive-zone timing, and chemistry-driven puck movement.",
    development:
      "Needs strength, pace through contact, and continued growth away from the puck. The question is not skill, but how much of it he can access against NHL checking.",
    projection:
      "Top-nine skill winger with power-play upside. If the physical and pace adjustments hold, he has legitimate top-six offensive potential.",
    comparable:
      "Style-only comp: Johnny Gaudreau/Mitch Marner family. That means a high-skill winger whose best trait is processing, deception, and playmaking.",
  },
  "adam-sykora": {
    bio:
      "Adam Sykora is a high-energy winger whose game is built around skating, pressure, and details.",
    style:
      "Relentless forechecking winger who plays fast, gets under opponents, and creates value by forcing rushed decisions.",
    strengths:
      "Motor, speed, defensive effort, penalty-kill projection, puck pressure, and the willingness to play inside despite not being oversized.",
    development:
      "Needs more finishing and offensive poise. The pressure game is NHL-caliber in flashes, but he has to turn more retrievals into scoring chances.",
    projection:
      "Bottom-six energy winger with matchup utility and penalty-kill value. If the offense ticks up, he can become more than a spark-plug role player.",
    comparable:
      "Style-only comp: Jesper Fast/Brandon Tanev family. That means pace, checking detail, and trust from coaches.",
  },
  "noah-laba": {
    bio:
      "Noah Laba is a big two-way center whose game is built around responsibility, size, and a pro-style middle-lane profile.",
    style:
      "Direct center who supports low, plays through contact, and can handle defensive assignments while still pushing offense off retrievals.",
    strengths:
      "Size, defensive habits, faceoff-route projection, net drives, puck protection, and the ability to play a mature, structured game.",
    development:
      "Needs to keep proving the scoring touch translates against faster pro competition. His NHL value rises if he can be more than a checker.",
    projection:
      "Bottom-six center with middle-six upside if the offense continues to grow. He profiles as a useful matchup center.",
    comparable:
      "Style-only comp: Charlie Coyle/Jordan Staal-lite family. That means size, two-way responsibility, and interior play.",
  },
  "dylan-garand": {
    bio:
      "Dylan Garand is a goaltender with a strong junior pedigree, pro experience, and a competitive technical profile.",
    style:
      "Athletic, battle-oriented goalie who relies on reads, compete, and controlled movement more than overwhelming size.",
    strengths:
      "Competitiveness, tracking, recovery ability, playoff experience, and the mental makeup to handle heavy workloads.",
    development:
      "Needs consistency against lateral plays, traffic management, and cleaner rebound control at NHL pace.",
    projection:
      "NHL backup or tandem goalie upside if the consistency settles. His path is built on reliability and compete rather than pure size advantage.",
    comparable:
      "Style-only comp: Jake Allen/Jaroslav Halak family. That means a competitive, technically sound goalie who can give a team stable starts.",
  },
  "brett-berard": {
    bio:
      "Brett Berard is a smaller winger with a high-compete game, pro pace, and a disruptive forechecking identity.",
    style:
      "Fast, fearless winger who wins by arriving first, pressuring pucks, and playing a bigger game than his frame suggests.",
    strengths:
      "Motor, acceleration, puck pressure, inside courage, penalty-kill utility, and the ability to create chaos on the forecheck.",
    development:
      "Needs to keep finding offense at NHL pace and avoid getting boxed out by bigger defenders. Shot selection and finishing are key.",
    projection:
      "Bottom-six energy winger with enough skill to move around a lineup. He can become a useful spark player if the production holds.",
    comparable:
      "Style-only comp: Conor Garland/Brendan Gallagher family. That means smaller, relentless, irritating, and more skilled than the size suggests.",
  },
  "william-trudeau": {
    bio:
      "William Trudeau is a left-shot defenseman acquired from Montreal in the Brett Berard trade and signed by the Rangers to a one-year contract on July 6, 2026.",
    style:
      "Mobile, support-oriented defenseman who relies on reads, puck retrievals, and quick outlet decisions more than pure shutdown muscle.",
    strengths:
      "AHL experience, left-shot depth value, scanning before retrievals, first-pass decisions, offensive instincts from the blue line, and enough mobility to help exits.",
    development:
      "Needs to prove he can handle NHL pace and defend consistently against heavier forechecks. His next step is turning AHL reliability into recall trust.",
    projection:
      "Depth/recall defenseman with third-pair upside if the puck-moving and defensive detail translate.",
    comparable:
      "Style-only comp: Jordan Harris/Mike Reilly family. That means a mobile left-shot support defender whose value comes from exits and simple puck movement.",
  },
  "talyn-boyko": {
    bio:
      "Talyn Boyko is a 6'7\" goaltender whose prospect case is built on size, patience, and long-term technical refinement.",
    style:
      "Large goalie who can cover a lot of net when set. He is at his best when his depth, stance, and tracking stay calm and compact.",
    strengths:
      "Frame, crease coverage, reach, raw upside, and the physical tools teams cannot teach.",
    development:
      "Needs consistency in mechanics, rebound placement, and recovery routes. Big goalies can take longer, and his path depends on smoothing out details.",
    projection:
      "Long-range organizational goalie with NHL backup upside if the technical game catches up to the frame.",
    comparable:
      "Style-only comp: Ben Bishop/Ukko-Pekka Luukkonen family. That means a size-driven goalie profile that depends on structure and patience.",
  },
  "brendan-brisson": {
    bio:
      "Brendan Brisson is a skilled forward with a first-round draft background and a profile built around shooting and power-play offense.",
    style:
      "Offense-leaning center/winger who is most dangerous as a shooter, especially when he can set his feet or work into one-timer space.",
    strengths:
      "Shot, release, power-play instincts, offensive-zone timing, and the ability to find quiet ice as a scoring option.",
    development:
      "Needs stronger five-on-five impact, defensive consistency, and more pace through contact. The shot is the carrying tool, but the rest of the game has to support it.",
    projection:
      "Middle-six scoring forward or power-play specialist if the play away from the puck becomes reliable enough.",
    comparable:
      "Style-only comp: Mike Hoffman/Cole Caufield shooting-lane family. That means a shot-first forward who needs chances created around him.",
  },
  "jackson-dorrington": {
    bio:
      "Jackson Dorrington is a big left-shot defenseman with a defensive foundation and a college development background.",
    style:
      "Defense-first blue-liner who plays a simple, physical game. He is best when he closes space, separates players from pucks, and makes the safe outlet.",
    strengths:
      "Size, reach, board defense, physical engagement, net-front defense, and a low-maintenance style when he keeps his reads clean.",
    development:
      "Needs quicker puck movement and more consistency under pressure. His offensive ceiling is limited, so the defensive details have to be strong.",
    projection:
      "Depth defensive defenseman with third-pair upside. His NHL case is built around size, simplicity, and penalty-kill utility.",
    comparable:
      "Style-only comp: Ryan Graves/Carson Soucy family. That means a big support defender who can play heavy minutes if the details hold.",
  },
  "brody-lamb": {
    bio:
      "Brody Lamb is a winger with college production, shooting tools, and a profile that depends on pace and finishing.",
    style:
      "Straight-line scoring winger who is most useful when he gets into shooting areas, attacks off the rush, and plays with tempo.",
    strengths:
      "Shot, skating flashes, size-speed combination, transition scoring, and the ability to finish when linemates create space.",
    development:
      "Needs more physical engagement, defensive detail, and consistency creating offense without time and space.",
    projection:
      "Middle-six scoring winger upside if the pace and two-way game reach pro level. More likely path is a complementary shooter.",
    comparable:
      "Style-only comp: Kasperi Kapanen/Anthony Beauvillier family. That means speed, shot, and complementary scoring value.",
  },
  "bryce-mcconnell-barker": {
    bio:
      "Bryce McConnell-Barker is a center with leadership experience, two-way habits, and a pro-style support profile.",
    style:
      "Reliable center who plays through the middle of the ice, supports teammates, and can handle a checking assignment while chipping in offense.",
    strengths:
      "Hockey sense, faceoff-route potential, defensive awareness, leadership habits, and a useful blend of size and skill.",
    development:
      "Needs to prove his offense can separate at the pro level. Pace, strength, and quicker puck decisions are the key separators.",
    projection:
      "Bottom-six center with utility value if the defensive game and faceoff work translate. The upside is a trustworthy matchup forward.",
    comparable:
      "Style-only comp: Boone Jenner/Adam Lowry family. That means a responsible, hard center whose value is not only scoring.",
  },
  "scott-morrow": {
    bio:
      "Scott Morrow is an offensive right-shot defenseman with puck-moving skill, shooting confidence, and power-play upside.",
    style:
      "Aggressive puck mover who wants to activate, carry through pressure, and create offense from the blue line.",
    strengths:
      "Skating with the puck, offensive instincts, shot, deception at the line, transition carries, and power-play tools.",
    development:
      "Needs defensive reads, risk management, and consistency without the puck. His offense is real, but NHL trust will come from cleaner decisions.",
    projection:
      "Puck-moving NHL defenseman with second-pair offense if the defending matures. He has power-play support upside.",
    comparable:
      "Style-only comp: Shayne Gostisbehere/John Klingberg family. That means an offensive defenseman whose value is tied to puck movement and activation.",
  },
  "hugo-ollas": {
    bio:
      "Hugo Ollas is a 6'8\" goaltender with rare size and a development path that has moved through college, Sweden, and Hartford.",
    style:
      "Large positional goalie who can seal space when his feet are set. His best game is controlled, patient, and angle-driven.",
    strengths:
      "Frame, net coverage, reach, calm structure, and the ability to make shooters beat him clean when he is square.",
    development:
      "Needs quicker recoveries, sharper reads through traffic, and consistency handling rebounds. Size creates margin, but details decide the ceiling.",
    projection:
      "Organizational goalie with NHL backup upside if the technical game becomes repeatable against pro pace.",
    comparable:
      "Style-only comp: Ben Bishop/Alexandar Georgiev size-and-structure lane. That means coverage and patience first.",
  },
  "dylan-roobroeck": {
    bio:
      "Dylan Roobroeck is a 6'7\" center with a rare frame, junior production, and a pro projection built around size down the middle.",
    style:
      "Huge center who can protect pucks, extend shifts, and create offense by making plays over and through defenders.",
    strengths:
      "Size, reach, puck protection, playmaking flashes, net-front tools, and matchup versatility if he can stay at center.",
    development:
      "Needs skating pace, defensive consistency, and stronger habits without the puck. The center projection depends on mobility.",
    projection:
      "Bottom-six center or big utility forward with middle-six flashes if the skating improves. His frame gives him a real development hook.",
    comparable:
      "Style-only comp: Nick Bjugstad/Logan Brown family. That means a towering center whose value depends on skating and using reach intelligently.",
  },
  "carey-terrance": {
    bio:
      "Carey Terrance is a center with speed, competitiveness, and a two-way profile that can fit a pro checking role.",
    style:
      "Fast, direct forward who can pressure pucks, attack in transition, and play a responsible game through the middle.",
    strengths:
      "Speed, motor, defensive engagement, penalty-kill potential, faceoff-route utility, and enough offense to be more than a pure checker.",
    development:
      "Needs finishing consistency and stronger puck touches under pressure. The speed is useful, but it has to lead to controlled chances.",
    projection:
      "Bottom-six center/winger with matchup and penalty-kill value. He has a realistic NHL path if the offensive detail holds.",
    comparable:
      "Style-only comp: Andrew Cogliano/Blake Coleman family. That means pace, checking, and useful secondary offense.",
  },
  "callum-tung": {
    bio:
      "Callum Tung is an undrafted goaltender signed into the Rangers system after a strong development rise.",
    style:
      "Athletic goalie who competes through broken plays and relies on quick reactions, reads, and recovery ability.",
    strengths:
      "Athleticism, compete, tracking flashes, confidence, and the late-blooming growth curve that made him worth signing.",
    development:
      "Needs pro consistency, rebound control, and cleaner structure against east-west attacks. The tools are interesting, but the sample has to grow.",
    projection:
      "Developmental organizational goalie with upside to climb if the technical base keeps improving.",
    comparable:
      "Style-only comp: Filip Gustavsson/Anthony Stolarz family. That means a goalie whose size and athleticism need a steady technical shell.",
  },
  "kalle-vaisanen": {
    bio:
      "Kalle Vaisanen is a 6'5\" winger from Finland with size, pro experience, and bottom-six projection traits. The Rangers traded him to Boston on July 1, 2026.",
    style:
      "Big support winger who can play a straight-line forechecking game, get to the net, and use his reach to disrupt possessions.",
    strengths:
      "Size, reach, defensive awareness, board work, net-front presence, and the ability to fit a simple checking role.",
    development:
      "Needs more pace and offensive assertiveness. His NHL value depends on becoming hard to play against every shift.",
    projection:
      "Depth winger with penalty-kill and fourth-line potential if the skating and physical consistency translate.",
    comparable:
      "Style-only comp: Joel Armia/Marcus Foligno family. That means a big winger whose value is detail, reach, and heaviness.",
  },
  "cole-beaudoin": {
    bio:
      "Cole Beaudoin is a 20-year-old left-shot center from Ottawa who was drafted No. 24 overall by Utah in 2024 and acquired by the Rangers in the reported Vincent Trocheck trade.",
    style:
      "Hard, direct two-way center who plays through traffic, wins inside ice, and brings a forecheck-and-matchup identity. His game is built more on force, motor, and habits than pure flash.",
    strengths:
      "Compete level, strength, defensive detail, faceoff-route projection, net-front routes, forecheck pressure, and a scoring jump that made him one of the OHL's most productive older forwards in 2025-26.",
    development:
      "The next step is proving the offense carries into pro hockey. He needs a confirmed Rangers assignment, more pace against older defenders, and quicker puck decisions under AHL/NHL pressure.",
    projection:
      "Middle-six center upside if the OHL scoring surge translates. The safer path is a hard bottom-six center who can kill penalties, pressure pucks, and bring matchup value.",
    comparable:
      "Style-only comp: Boone Jenner/Charlie Coyle family. That means a heavy, useful center who can play through contact and handle hard minutes, not a one-for-one ceiling promise.",
    sources: [
      {
        label: "NHL profile",
        url: "https://www.nhl.com/utah/player/cole-beaudoin-8484786",
      },
      {
        label: "NHL.com draft feature",
        url: "https://www.nhl.com/news/cole-beaudoin-has-chance-to-change-culture-for-utah",
      },
      {
        label: "OHL player of the week",
        url: "https://chl.ca/ohl/article/colts-cole-beaudoin-named-cogeco-ohl-player-of-the-week",
      },
      {
        label: "New York Post trade report",
        url: "https://nypost.com/2026/07/01/sports/rangers-trading-vincent-trocheck-to-mammoth-in-major-shakeup/",
      },
    ],
    highlights: [
      {
        label: "2024 draft prospect profile",
        url: "https://www.youtube.com/watch?v=4e29-ETSD8g",
      },
      {
        label: "Utah trades up and selects Beaudoin",
        url: "https://www.youtube.com/watch?v=rE4A3WdbK64",
      },
    ],
  },
  "karl-henriksson": {
    bio:
      "Karl Henriksson is an older unsigned-rights center who has built a pro career in Sweden around intelligence and support play.",
    style:
      "Smart two-way center who plays a connective game, supports the puck, and makes efficient decisions rather than forcing skill plays.",
    strengths:
      "Hockey sense, defensive detail, passing, faceoff-route utility, and experience against pro competition.",
    development:
      "The question is upside. He needs more offensive separation or a clear checking-specialist role to become an NHL option.",
    projection:
      "European pro center with depth NHL recall traits if his rights path ever reopens. More likely he remains a strong pro outside the NHL.",
    comparable:
      "Style-only comp: Marcus Johansson/Jesper Boqvist support lane. That means intelligence and versatility more than heavy physical play.",
  },
  "lauri-pajuniemi": {
    bio:
      "Lauri Pajuniemi is an older unsigned-rights winger known for shooting touch and European pro scoring.",
    style:
      "Shot-first winger who is most dangerous when he finds soft ice, sets his feet, and gets pucks off quickly.",
    strengths:
      "Release, one-shot scoring, offensive instincts, power-play utility, and the confidence to attack from distance.",
    development:
      "Needs pace, two-way impact, and five-on-five versatility to be more than a specialist. His NHL path is narrow but skill-based.",
    projection:
      "Scoring-depth winger if he returns to the NHL path. More likely value is as a productive European pro scorer.",
    comparable:
      "Style-only comp: Mike Hoffman/Viktor Arvidsson shooting-lane family. That means scoring touch first, with role fit depending on pace and details.",
  },
  "juuso-parssinen": {
    bio:
      "Juuso Parssinen is a big center/forward with NHL experience, playmaking touch, and a roster-review profile in the Rangers system.",
    style:
      "Large, skilled support center who can slow plays down, protect pucks, and create off possession rather than pure speed.",
    strengths:
      "Size, hands, passing, puck protection, board work, and the ability to play center or wing depending on lineup need.",
    development:
      "Needs pace, consistency, and defensive reliability. The skill is there, but NHL lineup trust depends on shift-to-shift details.",
    projection:
      "Depth middle-six/bottom-six forward who can provide size and secondary playmaking if the pace holds.",
    comparable:
      "Style-only comp: Charlie Coyle/Nick Bjugstad family. That means a big forward with skill who needs consistency to hold a defined NHL role.",
  },
  "aidan-thompson": {
    bio:
      "Aidan Thompson is a skilled center with a college scoring background and an older-prospect development profile.",
    style:
      "Clever playmaking forward who looks to connect plays through the middle, work off give-and-go touches, and create with timing.",
    strengths:
      "Vision, hands, passing touch, offensive instincts, and the ability to play a controlled possession game when he has support.",
    development:
      "Needs pace, strength, and a pro defensive identity. The next step is proving his scoring game works when time and space shrink.",
    projection:
      "Skilled depth forward with middle-six playmaking flashes if he adjusts quickly to pro pace.",
    comparable:
      "Style-only comp: Alex Kerfoot/Alex Newhook family. That means a smaller skilled forward whose value comes from speed, reads, and versatility.",
  },
  "vincent-iorio": {
    bio:
      "Vincent Iorio is a big right-shot defenseman with NHL experience and a profile built around defensive utility.",
    style:
      "Simple, rangy defenseman who is at his best closing space, moving pucks efficiently, and avoiding high-risk plays.",
    strengths:
      "Size, reach, right-shot value, defensive stick, penalty-kill tools, and enough mobility to play a modern depth role.",
    development:
      "Needs consistency moving pucks under pressure and a cleaner first pass. His NHL case depends on being low-maintenance defensively.",
    projection:
      "Third-pair/depth defenseman with recall value. He fits best as a steady right-shot option who can handle simple matchup minutes.",
    comparable:
      "Style-only comp: Dylan DeMelo/Nick Jensen family. That means a right-shot support defender whose value comes from decisions and defensive reliability.",
  },
  "massimo-rizzo": {
    bio:
      "Massimo Rizzo is a 25-year-old left-shot center from Burnaby, British Columbia, acquired from Nashville with pick No. 148 during the 2026 NHL Draft.",
    style:
      "Skilled, smaller playmaking forward whose best stretches come when he is touching the puck, finding seams, and creating off east-west reads.",
    strengths:
      "College production, vision, puck skill, passing touch, offensive-zone patience, and enough versatility to play center or wing in a depth role.",
    development:
      "Needs a settled contract/assignment, stronger pro pace, and more consistent AHL production. His Rangers status should be treated as roster review until the organization confirms whether he is qualified or signed.",
    projection:
      "AHL skill forward and rights-review player. If he sticks in the organization, the likely path is earning Hartford minutes and proving the Denver scoring touch can translate consistently at the pro level.",
    comparable:
      "Style-only comp: Vinni Lettieri/T.J. Tynan family. That means a skilled depth forward whose value depends on offense translating against pro checking.",
    sources: [
      {
        label: "Rangers official trade release",
        url: "https://www.nhl.com/rangers/news/rangers-acquire-2026-fifth-round-draft-pick-and-massimo-rizzo-in-exchange-for-adam-edstrom",
      },
      {
        label: "NHL profile",
        url: "https://www.nhl.com/rangers/player/massimo-rizzo-8481760",
      },
      {
        label: "AHL profile",
        url: "https://theahl.com/stats/player/10166",
      },
    ],
  },
};

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getLeague(currentTeam) {
  const match = currentTeam.match(/,\s*([^,]+)$/);

  if (match) {
    return match[1].trim();
  }

  if (/pending|tbd/i.test(currentTeam)) {
    return "Assignment TBD";
  }

  if (/no qualifying offer|ufa/i.test(currentTeam)) {
    return "Roster Review";
  }

  if (/\bU20\b/i.test(currentTeam)) {
    return "Sweden Jr.";
  }

  return "TBD";
}

const playerByName = new Map(playerProfiles.map((player) => [player.name, player]));
const playerBySlug = new Map(
  playerProfiles.map((player) => [slugify(player.name), player]),
);
const consensusRankByName = new Map(
  prospectConsensusOrder.map((name, index) => [name, index]),
);
const inactiveRegistryGroups = new Set(["Graduated", "Traded draft picks"]);

function isActiveRegistryPlayer(player) {
  return !inactiveRegistryGroups.has(player.group);
}

const leagueBreakdownItems = [
  {
    key: "ahl",
    label: "AHL",
    kind: "league",
    description: "Hartford Wolf Pack prospects and roster-review players.",
  },
  {
    key: "nhl",
    label: "NHL",
    kind: "league",
    description: "Players currently listed on the Rangers roster.",
  },
  {
    key: "ncaa",
    label: "NCAA",
    kind: "league",
    description: "College prospects across Michigan, North Dakota, and more.",
  },
  {
    key: "ohl",
    label: "OHL",
    kind: "league",
    description: "Major junior prospects and recently acquired forwards.",
  },
  {
    key: "whl",
    label: "WHL",
    kind: "league",
    description: "Western Hockey League draft-class tracking.",
  },
  {
    key: "qmjhl",
    label: "QMJHL",
    kind: "league",
    description: "Quebec Maritimes junior prospect tracking.",
  },
  {
    key: "shl",
    label: "SHL",
    kind: "league",
    description: "Swedish pro players with unsigned NHL rights.",
  },
  {
    key: "echl",
    label: "ECHL",
    kind: "league",
    description: "Bloomington development tracking.",
  },
  {
    key: "ushl",
    label: "USHL",
    kind: "league",
    description: "United States Hockey League development tracking.",
  },
  {
    key: "hockeyallsvenskan",
    label: "HockeyAllsvenskan",
    kind: "league",
    description: "Swedish second-tier pro assignment tracking.",
  },
  {
    key: "sweden-jr",
    label: "Sweden Jr.",
    kind: "league",
    description: "Junior-level Swedish assignments to verify daily.",
  },
  {
    key: "liiga",
    label: "Liiga",
    kind: "league",
    description: "Finnish pro prospect tracking.",
  },
  {
    key: "del",
    label: "DEL",
    kind: "league",
    description: "German pro prospect tracking.",
  },
  {
    key: "khl",
    label: "KHL",
    kind: "league",
    description: "Russian pro prospect tracking.",
  },
  {
    key: "slovakia",
    label: "Slovakia",
    kind: "league",
    description: "Slovak pro prospect tracking.",
  },
  {
    key: "nl",
    label: "NL",
    kind: "league",
    description: "Swiss pro prospect tracking.",
  },
  {
    key: "assignment-tbd",
    label: "Assignment TBD",
    kind: "league",
    description: "Players waiting on a verified current assignment.",
  },
  {
    key: "roster-review",
    label: "Roster Review",
    kind: "league",
    description: "No-QO and status-review players pending archive approval.",
  },
  {
    key: "graduated",
    label: "Graduated",
    kind: "status",
    description: "Players moved out of active prospect tracking.",
  },
  {
    key: "traded-draft-picks",
    label: "Traded draft picks",
    kind: "status",
    description: "Rangers draft picks moved out of the organization by trade.",
  },
  {
    key: "2026-picks",
    label: "2026 Picks",
    kind: "draft",
    description: "Rangers 2026 draft class and remaining scheduled picks.",
  },
];

const total2026DraftPicks = 9;
const remaining2026DraftPickSlots = [];
const traded2026DraftPicks = [
  {
    pick: "No. 26",
    round: 1,
    overallPick: 26,
    team: "Vegas Golden Knights",
    trade: "Pavel Dorofeyev trade",
    source: "https://www.nhl.com/news/2025-26-nhl-trades",
  },
  {
    pick: "No. 92",
    round: 3,
    overallPick: 92,
    team: "Vegas Golden Knights",
    trade: "Pavel Dorofeyev trade",
    source: "https://www.nhl.com/news/2025-26-nhl-trades",
  },
  {
    pick: "No. 131",
    round: 5,
    overallPick: 131,
    team: "Seattle Kraken",
    trade: "No. 102 trade-up",
    source: "https://www.nhl.com/news/2025-26-nhl-trades",
  },
  {
    pick: "No. 148",
    round: 5,
    overallPick: 148,
    team: "Seattle Kraken",
    trade: "No. 102 trade-up",
    source: "https://www.nhl.com/news/2025-26-nhl-trades",
  },
];

const draftedRangersNews = [
  {
    playerName: "Braden Schneider",
    draftInfo: "NYR 2020 draft, Rd 1, No. 19",
    currentStatus: "New York Rangers defenseman",
    category: "Contract",
    date: "2026-07-13",
    detectedDate: "2026-07-14",
    title: "Signed one-year Rangers contract",
    summary:
      "The Rangers agreed to terms with Schneider on a one-year contract. This is tracked as drafted-by-Rangers news, not prospect game-log coverage.",
    source: {
      label: "Rangers release",
      url: "https://www.nhl.com/rangers/news/rangers-agree-to-terms-with-braden-schneider-x1385",
    },
  },
];

function getSelected2026DraftPlayers() {
  return playerProfiles
    .filter((player) => player.group === "2026 draft class")
    .sort((first, second) => {
      const firstPick = getPlayerDraftInfo(first).overallPick ?? Number.MAX_SAFE_INTEGER;
      const secondPick = getPlayerDraftInfo(second).overallPick ?? Number.MAX_SAFE_INTEGER;

      return firstPick - secondPick || first.name.localeCompare(second.name);
    });
}

function getRemaining2026DraftPicks() {
  return remaining2026DraftPickSlots.length;
}

function calculateAge(birthdate, today = new Date()) {
  const [year, month, day] = birthdate.split("-").map(Number);
  let age = today.getFullYear() - year;
  const hasBirthdayPassed =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  return age;
}

function getPlayerMeasurements(player) {
  return playerMeasurements[slugify(player.name)] || {
    height: "TBD",
    weight: "TBD",
    heightInInches: null,
    weightInPounds: null,
  };
}

function getPlayerStatsRecord(player) {
  return window.NYR_PLAYER_STATS?.players?.[slugify(player.name)] || null;
}

function getPlayerLatestUpdateNews(player) {
  return getPlayerStatsRecord(player)?.latestUpdateNews || null;
}

function renderPlayerNewsDot(player) {
  const updateNews = getPlayerLatestUpdateNews(player);

  if (!updateNews) {
    return "";
  }

  const label = updateNews.note || "Updated in the latest automation cycle.";

  return `<span class="player-news-dot" title="${escapeHTML(label)}" aria-label="${escapeHTML(label)}"></span>`;
}

function appendPlayerNewsDot(link, player) {
  const parent = link.parentElement;

  if (!parent) {
    return;
  }

  parent.querySelectorAll(".player-news-dot").forEach((dot) => dot.remove());

  const updateNews = getPlayerLatestUpdateNews(player);

  if (!updateNews) {
    return;
  }

  const label = updateNews.note || "Updated in the latest automation cycle.";
  const dot = document.createElement("span");
  dot.className = "player-news-dot";
  dot.title = label;
  dot.setAttribute("aria-label", label);
  parent.appendChild(dot);
}

function parseDraftInfoFromAcquired(player) {
  const drafted = player.acquired.match(/(\d{4})\s+draft,\s*Rd\s*(\d+),\s*No\.\s*(\d+)/i);

  if (drafted) {
    const year = Number(drafted[1]);
    const round = Number(drafted[2]);
    const overallPick = Number(drafted[3]);

    return {
      status: "drafted",
      year,
      round,
      overallPick,
      displayYear: String(year),
      displayPick: `Rd ${round}, No. ${overallPick}`,
    };
  }

  if (/^Undrafted/i.test(player.acquired)) {
    return {
      status: "undrafted",
      year: null,
      round: null,
      overallPick: null,
      displayYear: "Undrafted",
      displayPick: "Undrafted",
    };
  }

  return {
    status: "not_listed",
    year: null,
    round: null,
    overallPick: null,
    displayYear: "TBD",
    displayPick: "TBD",
  };
}

function getPlayerDraftInfo(player, playerStats = getPlayerStatsRecord(player)) {
  const draftInfo = playerStats?.draftInfo;

  if (draftInfo?.displayYear || draftInfo?.displayPick) {
    return {
      ...draftInfo,
      displayYear: draftInfo.displayYear || "TBD",
      displayPick: draftInfo.displayPick || "TBD",
    };
  }

  return parseDraftInfoFromAcquired(player);
}

function createRegistryHeader(label) {
  const header = document.createElement("th");
  header.setAttribute("aria-sort", "none");
  header.innerHTML = `
    <button class="sort-button" type="button">
      ${label}
      <span class="sort-indicator" aria-hidden="true"></span>
    </button>
  `;

  return header;
}

function renumberRegistrySortColumns(table) {
  Array.from(table.querySelectorAll("thead .sort-button")).forEach(
    (button, index) => {
      button.dataset.sortColumn = String(index);
    },
  );
}

function updateRegistryAges() {
  document.querySelectorAll(".registry-table tbody tr").forEach((row) => {
    const playerCell = row.cells[0];
    const ageCell = row.cells[1];

    if (!playerCell || !ageCell) {
      return;
    }

    const birthdate = playerBirthdates[playerCell.textContent.trim()];

    if (!birthdate) {
      return;
    }

    ageCell.textContent = String(calculateAge(birthdate));
    ageCell.dataset.birthdate = birthdate;
    ageCell.dataset.sortValue = ageCell.textContent;
    ageCell.title = `Born ${birthdate}`;
  });
}

function updateRegistryVitals() {
  document.querySelectorAll(".registry-table:not(.stats-table)").forEach((table) => {
    const headerRow = table.tHead?.rows[0];

    if (headerRow && !headerRow.querySelector("[data-registry-field='position']")) {
      const groupHeader = headerRow.cells[2];
      const positionHeader = createRegistryHeader("Position");
      const heightHeader = createRegistryHeader("Height");
      const weightHeader = createRegistryHeader("Weight");
      const draftYearHeader = createRegistryHeader("Draft Year");
      const draftPickHeader = createRegistryHeader("Draft Pick");
      positionHeader.dataset.registryField = "position";
      heightHeader.dataset.registryField = "height";
      weightHeader.dataset.registryField = "weight";
      draftYearHeader.dataset.registryField = "draft-year";
      draftPickHeader.dataset.registryField = "draft-pick";
      headerRow.insertBefore(positionHeader, groupHeader);
      headerRow.insertBefore(heightHeader, groupHeader);
      headerRow.insertBefore(weightHeader, groupHeader);
      headerRow.insertBefore(draftYearHeader, groupHeader);
      headerRow.insertBefore(draftPickHeader, groupHeader);
      renumberRegistrySortColumns(table);
    }

    table.querySelectorAll("tbody tr").forEach((row) => {
      const playerName = row.cells[0]?.textContent.trim();
      const player = playerByName.get(playerName);

      if (!player) {
        return;
      }

      const measurements = getPlayerMeasurements(player);
      const draftInfo = getPlayerDraftInfo(player);
      const groupCell = row.cells[2];
      let positionCell = row.querySelector("[data-registry-field='position']");
      let heightCell = row.querySelector("[data-registry-field='height']");
      let weightCell = row.querySelector("[data-registry-field='weight']");
      let draftYearCell = row.querySelector("[data-registry-field='draft-year']");
      let draftPickCell = row.querySelector("[data-registry-field='draft-pick']");

      if (!positionCell) {
        positionCell = document.createElement("td");
        positionCell.dataset.registryField = "position";
        row.insertBefore(positionCell, groupCell);
      }

      if (!heightCell) {
        heightCell = document.createElement("td");
        heightCell.dataset.registryField = "height";
        row.insertBefore(heightCell, groupCell);
      }

      if (!weightCell) {
        weightCell = document.createElement("td");
        weightCell.dataset.registryField = "weight";
        row.insertBefore(weightCell, groupCell);
      }

      if (!draftYearCell) {
        draftYearCell = document.createElement("td");
        draftYearCell.dataset.registryField = "draft-year";
        row.insertBefore(draftYearCell, groupCell);
      }

      if (!draftPickCell) {
        draftPickCell = document.createElement("td");
        draftPickCell.dataset.registryField = "draft-pick";
        row.insertBefore(draftPickCell, groupCell);
      }

      positionCell.textContent = player.position;
      heightCell.textContent = measurements.height;
      weightCell.textContent = measurements.weight;
      draftYearCell.textContent = draftInfo.displayYear;
      draftPickCell.textContent = draftInfo.displayPick;
      positionCell.dataset.sortValue = player.position;
      heightCell.dataset.sortValue = measurements.heightInInches ?? "";
      weightCell.dataset.sortValue = measurements.weightInPounds ?? "";
      draftYearCell.dataset.sortValue = draftInfo.year ?? "";
      draftPickCell.dataset.sortValue = draftInfo.overallPick ?? "";
    });
  });
}

function applyDefaultProspectOrder() {
  const tbody = document.querySelector("#registry .registry-table tbody");

  if (!tbody) {
    return;
  }

  Array.from(tbody.querySelectorAll("tr"))
    .map((row, index) => {
      const name = row.cells[0]?.textContent.trim() || "";
      const rank = consensusRankByName.get(name);

      if (rank !== undefined) {
        row.dataset.defaultRank = String(rank + 1);
      }

      return {
        index,
        rank: rank ?? Number.MAX_SAFE_INTEGER,
        row,
      };
    })
    .sort((first, second) => first.rank - second.rank || first.index - second.index)
    .forEach(({ row }) => tbody.appendChild(row));
}

function linkRegistryPlayers() {
  document.querySelectorAll(".registry-table tbody tr").forEach((row) => {
    const playerCell = row.cells[0];
    const existingLink = playerCell?.querySelector("a");

    if (!playerCell) {
      return;
    }

    const name = existingLink ? existingLink.textContent.trim() : playerCell.textContent.trim();
    const player = playerByName.get(name);

    if (!player) {
      return;
    }

    if (existingLink) {
      appendPlayerNewsDot(existingLink, player);
      return;
    }

    const link = document.createElement("a");
    link.className = "player-link";
    link.href = `player.html?player=${slugify(player.name)}`;
    link.textContent = player.name;
    playerCell.textContent = "";
    playerCell.appendChild(link);
    appendPlayerNewsDot(link, player);
  });
}

function sortPlayersByConsensus(players) {
  return [...players].sort((first, second) => {
    const firstRank = consensusRankByName.get(first.name) ?? Number.MAX_SAFE_INTEGER;
    const secondRank = consensusRankByName.get(second.name) ?? Number.MAX_SAFE_INTEGER;

    return firstRank - secondRank || first.name.localeCompare(second.name);
  });
}

function getPlayersForBreakdownItem(item) {
  if (item.kind === "draft") {
    return [];
  }

  if (item.kind === "status") {
    return sortPlayersByConsensus(
      playerProfiles.filter((player) => player.group === item.label),
    );
  }

  return sortPlayersByConsensus(
    playerProfiles.filter(
      (player) => isActiveRegistryPlayer(player) && getLeague(player.currentTeam) === item.label,
    ),
  );
}

function renderLeaguePlayerList(players, item) {
  if (!players.length) {
    const message =
      item.kind === "draft"
        ? "No 2026 selections have been made yet."
        : "No players currently in this bucket.";

    return `<p class="league-empty">${escapeHTML(message)}</p>`;
  }

  return `
    <ul class="league-player-list">
      ${players
        .map((player) => {
          const birthdate = playerBirthdates[player.name];
          const age = birthdate ? calculateAge(birthdate) : "TBD";
          const draftInfo = getPlayerDraftInfo(player);

          return `
            <li>
              <a class="player-link" href="player.html?player=${slugify(player.name)}">${escapeHTML(player.name)}</a>
              ${renderPlayerNewsDot(player)}
              <span>${escapeHTML(player.position)} | Age ${escapeHTML(age)} | ${escapeHTML(player.currentTeam)}</span>
              <small>${escapeHTML(draftInfo.displayYear)} ${escapeHTML(draftInfo.displayPick)}</small>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

function getLeagueBreakdownUrl(item) {
  return `leagues.html#league-${encodeURIComponent(item.key)}`;
}

function getSelectedLeagueBreakdownItem() {
  const params = new URLSearchParams(window.location.search);
  const queryKey = params.get("group");
  const hashKey = window.location.hash.replace(/^#league-/, "");
  const selectedKey = queryKey || hashKey;

  return leagueBreakdownItems.find((item) => item.key === selectedKey) || null;
}

function getAllLeaguePlayers() {
  return sortPlayersByConsensus(playerProfiles);
}

function renderLeagueFilterNav(selectedKey) {
  const allClass = selectedKey ? "league-filter-link" : "league-filter-link is-active";

  return `
    <nav class="league-filter-nav" aria-label="League and status filters">
      <a class="${allClass}" href="leagues.html">All players</a>
      ${leagueBreakdownItems
        .map((item) => {
          const linkClass =
            item.key === selectedKey
              ? "league-filter-link is-active"
              : "league-filter-link";

          return `
            <a class="${linkClass}" href="${getLeagueBreakdownUrl(item)}">
              ${escapeHTML(item.label)}
            </a>
          `;
        })
        .join("")}
    </nav>
  `;
}

function renderLeagueTableHeader(label, index, registryField = "") {
  return `
    <th aria-sort="none"${registryField ? ` data-registry-field="${escapeHTML(registryField)}"` : ""}>
      <button class="sort-button" type="button" data-sort-column="${index}">
        ${escapeHTML(label)}
        <span class="sort-indicator" aria-hidden="true"></span>
      </button>
    </th>
  `;
}

function renderLeaguePlayerTable(players, emptyMessage) {
  if (!players.length) {
    return `<p class="league-empty">${escapeHTML(emptyMessage)}</p>`;
  }

  const headers = [
    ["Player", ""],
    ["Age", ""],
    ["Position", "position"],
    ["Height", "height"],
    ["Weight", "weight"],
    ["Draft Year", "draft-year"],
    ["Draft Pick", "draft-pick"],
    ["Status", ""],
    ["Current Team", ""],
    ["Acquired", ""],
  ];

  return `
    <div class="registry-table-wrap league-player-table-wrap" aria-label="League player list">
      <table class="registry-table league-player-table">
        <thead>
          <tr>
            ${headers
              .map(([label, field], index) =>
                renderLeagueTableHeader(label, index, field),
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${players
            .map((player) => {
              const birthdate = playerBirthdates[player.name];
              const age = birthdate ? calculateAge(birthdate) : "TBD";
              const measurements = getPlayerMeasurements(player);
              const draftInfo = getPlayerDraftInfo(player);

              return `
                <tr>
                  <td>
                    <a class="player-link" href="player.html?player=${slugify(player.name)}">
                      ${escapeHTML(player.name)}
                    </a>
                    ${renderPlayerNewsDot(player)}
                  </td>
                  <td data-sort-value="${escapeHTML(age === "TBD" ? "" : age)}">${escapeHTML(age)}</td>
                  <td data-registry-field="position" data-sort-value="${escapeHTML(player.position)}">${escapeHTML(player.position)}</td>
                  <td data-registry-field="height" data-sort-value="${escapeHTML(measurements.heightInInches ?? "")}">${escapeHTML(measurements.height)}</td>
                  <td data-registry-field="weight" data-sort-value="${escapeHTML(measurements.weightInPounds ?? "")}">${escapeHTML(measurements.weight)}</td>
                  <td data-registry-field="draft-year" data-sort-value="${escapeHTML(draftInfo.year ?? "")}">${escapeHTML(draftInfo.displayYear)}</td>
                  <td data-registry-field="draft-pick" data-sort-value="${escapeHTML(draftInfo.overallPick ?? "")}">${escapeHTML(draftInfo.displayPick)}</td>
                  <td>${escapeHTML(player.group)}</td>
                  <td>${escapeHTML(player.currentTeam)}</td>
                  <td>${escapeHTML(player.acquired)}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderDraftPickPanel() {
  const selectedPlayers = getSelected2026DraftPlayers();
  const remainingPicks = getRemaining2026DraftPicks();

  return `
    <div class="league-draft-panel">
      <h3>2026 Picks</h3>
      <p>
        The Rangers finished the 2026 NHL Draft with ${total2026DraftPicks}
        selection${total2026DraftPicks === 1 ? "" : "s"}.
        ${selectedPlayers.length} player${selectedPlayers.length === 1 ? "" : "s"} selected;
        ${traded2026DraftPicks.length} pick${traded2026DraftPicks.length === 1 ? "" : "s"} traded or moved;
        ${remainingPicks} scheduled pick${remainingPicks === 1 ? "" : "s"} still pending.
      </p>
      ${
        selectedPlayers.length
          ? `
            <h4>Selected players</h4>
            <ul class="drafted-player-list">
              ${selectedPlayers
                .map((player) => {
                  const draftInfo = getPlayerDraftInfo(player);

                  return `
                    <li>
                      <a class="player-link" href="player.html?player=${slugify(player.name)}">${escapeHTML(player.name)}</a>
                      ${renderPlayerNewsDot(player)}
                      <span>${escapeHTML(draftInfo.displayPick)} | ${escapeHTML(player.position)} | ${escapeHTML(player.currentTeam)}</span>
                    </li>
                  `;
                })
                .join("")}
            </ul>
          `
          : ""
      }
      ${
        remaining2026DraftPickSlots.length
          ? `
            <h4>Pending Rangers picks</h4>
            <ul class="drafted-player-list draft-pending-list">
              ${remaining2026DraftPickSlots
                .map(
                  (pick) => `
                    <li>
                      <strong>${escapeHTML(pick.pick)}</strong>
                      <span>Round ${escapeHTML(pick.round)} selection still pending in the official NHL draft feed.</span>
                    </li>
                  `,
                )
                .join("")}
            </ul>
          `
          : ""
      }
      ${
        traded2026DraftPicks.length
          ? `
            <h4>Traded 2026 picks</h4>
            <ul class="drafted-player-list">
              ${traded2026DraftPicks
                .map(
                  (pick) => `
                    <li>
                      <a class="player-link" href="${escapeHTML(pick.source)}" target="_blank" rel="noreferrer">${escapeHTML(pick.pick)}</a>
                      <span>Traded to ${escapeHTML(pick.team)} in the ${escapeHTML(pick.trade)}.</span>
                    </li>
                  `,
                )
                .join("")}
            </ul>
          `
          : ""
      }
    </div>
  `;
}

function renderDraftedRangersNewsList() {
  const container = document.querySelector("[data-drafted-rangers-news-list]");

  if (!container) {
    return;
  }

  if (!draftedRangersNews.length) {
    container.innerHTML = `<p class="league-empty">No drafted-by-Rangers alumni news is currently listed.</p>`;
    return;
  }

  const sortedNews = [...draftedRangersNews].sort((first, second) =>
    String(second.detectedDate || second.date).localeCompare(String(first.detectedDate || first.date)),
  );

  container.innerHTML = sortedNews
    .map(
      (item) => `
        <article class="drafted-news-card">
          <span>${escapeHTML(item.category || "News")} | ${escapeHTML(formatDateOnly(item.date))}</span>
          <strong>${escapeHTML(item.playerName)}</strong>
          <small>${escapeHTML(item.draftInfo)} | ${escapeHTML(item.currentStatus || "Status TBD")}</small>
          <p>${escapeHTML(item.summary)}</p>
          ${
            item.source?.url
              ? `<a href="${escapeHTML(item.source.url)}" target="_blank" rel="noreferrer">${escapeHTML(item.source.label || "Source")}</a>`
              : ""
          }
        </article>
      `,
    )
    .join("");
}

function renderLeagueBreakdownPage() {
  const page = document.querySelector("[data-leagues-page]");

  if (!page) {
    return false;
  }

  const activePlayers = playerProfiles.filter(isActiveRegistryPlayer);
  const graduatedPlayers = playerProfiles.filter((player) => player.group === "Graduated");
  const tradedDraftPicks = playerProfiles.filter((player) => player.group === "Traded draft picks");
  const selectedItem = getSelectedLeagueBreakdownItem();
  const selectedKey = selectedItem?.key || "";
  const visiblePlayers = selectedItem
    ? getPlayersForBreakdownItem(selectedItem)
    : getAllLeaguePlayers();
  const isDraftView = selectedItem?.kind === "draft";
  const selectedDraftPlayers = getSelected2026DraftPlayers();
  const viewTitle = selectedItem ? selectedItem.label : "All players";
  const viewDescription = selectedItem
    ? selectedItem.description
    : "Every player currently tracked in the Rangers system registry, including active and graduated players.";
  const viewCount = isDraftView ? selectedDraftPlayers.length : visiblePlayers.length;
  const viewCountLabel = isDraftView
    ? "2026 selections"
    : selectedItem
      ? "Players in view"
      : "Players tracked";
  const viewSmallText = selectedItem
    ? isDraftView
      ? `${selectedDraftPlayers.length} selected, ${getRemaining2026DraftPicks()} remaining, ${traded2026DraftPicks.length} traded or moved`
      : "Filtered league/status view"
    : `${activePlayers.length} active, ${graduatedPlayers.length} graduated, ${tradedDraftPicks.length} traded draft picks, ${getRemaining2026DraftPicks()} 2026 picks remaining`;
  const tableContent = isDraftView
    ? renderDraftPickPanel()
    : renderLeaguePlayerTable(
        visiblePlayers,
        selectedItem
          ? "No players currently in this bucket."
          : "No players are currently listed.",
      );

  page.innerHTML = `
    <section class="registry league-detail-page" aria-labelledby="leagues-title">
      <div class="section-heading">
        <p class="eyebrow">League Breakdown</p>
        <h1 id="leagues-title">Players by league and status</h1>
        <p>
          The main view shows every tracked player. Use the league and status
          links to open a filtered list for only that group.
        </p>
      </div>

      ${renderLeagueFilterNav(selectedKey)}

      <div class="league-breakdown" aria-label="Players by league and status">
        <div class="league-heading">
          <div>
            <p class="eyebrow">Current View</p>
            <h2>${escapeHTML(viewTitle)}</h2>
            <p>${escapeHTML(viewDescription)}</p>
          </div>
          <div class="league-total" aria-label="Total players tracked">
            <strong>${escapeHTML(viewCount)}</strong>
            <span>${escapeHTML(viewCountLabel)}</span>
            <small>${escapeHTML(viewSmallText)}</small>
          </div>
        </div>
        ${tableContent}
      </div>
    </section>
  `;

  return true;
}

function initRegistrySorting() {
  const table = document.querySelector(".registry-table");

  if (!table) {
    return;
  }

  const tbody = table.querySelector("tbody");
  const headers = Array.from(table.querySelectorAll("th"));
  const sortButtons = Array.from(table.querySelectorAll(".sort-button"));
  const collator = new Intl.Collator(undefined, {
    numeric: true,
    sensitivity: "base",
  });
  let activeColumn = null;
  let activeDirection = "asc";

  function getCellValue(row, column) {
    const cell = row.cells[column];
    return cell ? cell.textContent.trim() : "";
  }

  function getCellSortValue(row, column) {
    const cell = row.cells[column];
    return cell?.dataset.sortValue || getCellValue(row, column);
  }

  function compareRows(first, second, column, direction) {
    const firstRaw = getCellSortValue(first.row, column);
    const secondRaw = getCellSortValue(second.row, column);
    const firstValue = Number(firstRaw);
    const secondValue = Number(secondRaw);
    const firstIsNumeric = firstRaw !== "" && !Number.isNaN(firstValue);
    const secondIsNumeric = secondRaw !== "" && !Number.isNaN(secondValue);

    if (firstIsNumeric || secondIsNumeric) {
      if (!firstIsNumeric && !secondIsNumeric) {
        return first.index - second.index;
      }

      if (!firstIsNumeric) {
        return 1;
      }

      if (!secondIsNumeric) {
        return -1;
      }

      const result = firstValue - secondValue;
      return direction === "asc" ? result : -result;
    }

    const result = collator.compare(
      getCellValue(first.row, column),
      getCellValue(second.row, column),
    );

    if (result === 0) {
      return first.index - second.index;
    }

    return direction === "asc" ? result : -result;
  }

  function updateSortState(column, direction) {
    headers.forEach((header) => {
      header.setAttribute("aria-sort", "none");
    });

    sortButtons.forEach((button) => {
      button.classList.remove("is-sorted", "is-desc");
    });

    const activeHeader = headers[column];
    const activeButton = sortButtons.find(
      (button) => Number(button.dataset.sortColumn) === column,
    );

    if (!activeHeader || !activeButton) {
      return;
    }

    activeHeader.setAttribute(
      "aria-sort",
      direction === "asc" ? "ascending" : "descending",
    );
    activeButton.classList.add("is-sorted");

    if (direction === "desc") {
      activeButton.classList.add("is-desc");
    }
  }

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const column = Number(button.dataset.sortColumn);
      const nextDirection =
        activeColumn === column && activeDirection === "asc" ? "desc" : "asc";
      const sortedRows = Array.from(tbody.querySelectorAll("tr"))
        .map((row, index) => ({ row, index }))
        .sort((first, second) =>
          compareRows(first, second, column, nextDirection),
        );

      sortedRows.forEach(({ row }) => tbody.appendChild(row));

      activeColumn = column;
      activeDirection = nextDirection;
      updateSortState(column, nextDirection);
    });
  });
}

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatTimestamp(value, fallback = "Not checked yet") {
  if (!value) {
    return fallback;
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDateOnly(value) {
  if (!value || value === "TBD") {
    return "TBD";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(new Date(`${value}T00:00:00`));
}

function formatGameTime(value) {
  if (!value) {
    return "TBD";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getPositionLabel(position) {
  const labels = {
    C: "center",
    D: "defenseman",
    F: "forward",
    G: "goaltender",
    LW: "left wing",
    RW: "right wing",
  };

  return labels[position] || "player";
}

function getAcquisitionSentence(player, controlLabel) {
  const acquired = controlLabel || player.acquired;

  if (/^\d{4} NHL Draft/i.test(acquired)) {
    return `The Rangers selected ${player.name} in the ${acquired}.`;
  }

  if (/^\d{4} draft/i.test(acquired)) {
    return `The Rangers selected ${player.name} in the ${acquired.replace("draft", "NHL Draft")}.`;
  }

  if (/^Trade from/i.test(player.acquired) || /^Acquired from/i.test(acquired)) {
    return `The Rangers acquired ${player.name} via ${player.acquired.charAt(0).toLowerCase()}${player.acquired.slice(1)}.`;
  }

  if (/^Undrafted/i.test(player.acquired)) {
    return `The Rangers added ${player.name} as an undrafted signing: ${player.acquired}.`;
  }

  if (/^Waiver claim/i.test(player.acquired) || /^Claimed/i.test(acquired)) {
    return `The Rangers added ${player.name} via ${player.acquired.charAt(0).toLowerCase()}${player.acquired.slice(1)}.`;
  }

  return `Rangers acquisition: ${player.acquired}.`;
}

function renderTradePackageList(title, items = []) {
  if (!items.length) {
    return "";
  }

  return `
    <div class="trade-package-panel">
      <h4>${escapeHTML(title)}</h4>
      <ul>
        ${items.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderTradedOutAcquisition(player, controlLabel, controlDate, trade) {
  return `
    <div class="acquisition-package">
      <p>
        ${escapeHTML(
          `The Rangers originally controlled ${player.name} through ${controlLabel || player.acquired}. On ${trade.date}, New York traded him to the ${trade.partner}. Rangers control is tracked from ${formatDateOnly(controlDate)} through the trade date.`,
        )}
      </p>
      <div class="trade-package-grid">
        ${renderTradePackageList("Rangers received", trade.rangersReceived)}
        ${renderTradePackageList("Rangers sent", trade.rangersSent)}
      </div>
      ${
        trade.source?.url
          ? `
            <a class="trade-source-link" href="${escapeHTML(trade.source.url)}" target="_blank" rel="noreferrer">
              ${escapeHTML(trade.source.label || "Trade source")}
            </a>
          `
          : ""
      }
    </div>
  `;
}

function renderRangersAcquisition(player, controlLabel, controlDate) {
  const trade = tradeAcquisitionDetails[slugify(player.name)];
  const tradedOut = tradedOutDetails[slugify(player.name)];

  if (player.group === "Traded draft picks" && tradedOut) {
    return renderTradedOutAcquisition(player, controlLabel, controlDate, tradedOut);
  }

  if (!trade) {
    const acquisition = getAcquisitionSentence(player, controlLabel);

    return `
      <p>${escapeHTML(`${acquisition} Rangers control is tracked from ${formatDateOnly(controlDate)}.`)}</p>
    `;
  }

  return `
    <div class="acquisition-package">
      <p>
        ${escapeHTML(
          `The Rangers acquired ${player.name} from the ${trade.partner} on ${trade.date}. Rangers control is tracked from ${formatDateOnly(controlDate)}.`,
        )}
      </p>
      <div class="trade-package-grid">
        ${renderTradePackageList("Rangers received", trade.rangersReceived)}
        ${renderTradePackageList("Rangers sent", trade.rangersSent)}
      </div>
      ${trade.note ? `<p class="trade-package-note">${escapeHTML(trade.note)}</p>` : ""}
      ${
        trade.source?.url
          ? `
            <a class="trade-source-link" href="${escapeHTML(trade.source.url)}" target="_blank" rel="noreferrer">
              ${escapeHTML(trade.source.label || "Trade source")}
            </a>
          `
          : ""
      }
    </div>
  `;
}

function renderScoutingSources(sources = []) {
  if (!sources.length) {
    return "";
  }

  const links = sources
    .map(
      (source) =>
        `<a href="${escapeHTML(source.url)}" target="_blank" rel="noreferrer">${escapeHTML(source.label)}</a>`,
    )
    .join("");

  return `<div class="scouting-sources" aria-label="Scouting sources">${links}</div>`;
}

function getSeasonStatsPendingMessage() {
  return "Stats will update once the season starts.";
}

function getRecentGamesPendingMessage() {
  return "Recent game logs will update once the season starts.";
}

function getUpcomingGamesPendingMessage() {
  return "Upcoming games will update once the schedule is available.";
}

function humanizePendingGameNote(rawNote, fallback) {
  return /connector|not connected|post-selection|game logs will populate|schedule feed|not available yet/i.test(
    rawNote || "",
  )
    ? fallback
    : rawNote || fallback;
}

function getDefaultScoutingSources(player, playerStats) {
  const slug = slugify(player.name);
  const sources = [];
  const nhlProfile = playerStats?.sourceLinks?.find((source) =>
    /NHL\.com profile/i.test(source.label),
  );

  if (nhlProfile) {
    sources.push(nhlProfile);
  } else if (playerStats?.nhlApiPlayerId) {
    sources.push({
      label: "NHL profile",
      url: `https://www.nhl.com/player/${slug}-${playerStats.nhlApiPlayerId}`,
    });
  }

  if (dobberScoutingSlugs.has(slug)) {
    sources.push({
      label: "DobberProspects",
      url: `https://dobberprospects.com/player/${slug}/`,
    });
  }

  return sources;
}

function renderProspectWriteup(player, playerStats) {
  const scoutingProfile = scoutingProfiles[slugify(player.name)];

  if (!scoutingProfile) {
    return `
      <p class="scouting-note">Full scouting snapshot is still being built for this player.</p>
    `;
  }

  return `
    <div class="scouting-snapshot">
      <p><strong>Style:</strong> ${escapeHTML(scoutingProfile.style)}</p>
      <p><strong>Strengths:</strong> ${escapeHTML(scoutingProfile.strengths)}</p>
      <p><strong>Development focus:</strong> ${escapeHTML(scoutingProfile.development)}</p>
      <p><strong>Projection:</strong> ${escapeHTML(scoutingProfile.projection)}</p>
      <p><strong>Comparable style:</strong> ${escapeHTML(scoutingProfile.comparable)}</p>
      ${renderScoutingSources(scoutingProfile.sources?.length ? scoutingProfile.sources : getDefaultScoutingSources(player, playerStats))}
    </div>
  `;
}

function renderProspectHighlights(player) {
  const scoutingProfile = scoutingProfiles[slugify(player.name)];
  const links = Array.isArray(scoutingProfile?.highlights)
    ? scoutingProfile.highlights
    : [];

  if (!links.length) {
    return "";
  }

  return `
    <article class="bio-highlights-card">
      <h3>Highlights</h3>
      <p>Player-specific video links from league, team, NHL, or scouting video sources.</p>
      ${renderHighlightLinks(links)}
    </article>
  `;
}

function seasonLabelToSortValue(label) {
  const match = String(label).match(/^(\d{4})-(\d{2})$/);

  if (!match) {
    return 0;
  }

  const start = Number(match[1]);
  return Number(`${start}${start + 1}`);
}

function getLatestSeasonRows(playerStats) {
  const explicitRows = playerStats?.currentSeasonStats?.rows;

  if (Array.isArray(explicitRows) && explicitRows.length) {
    return explicitRows;
  }

  const seasons = playerStats?.seasons || [];
  const latestSeason = seasons.reduce((latest, row) => {
    if (!latest) {
      return row.season;
    }

    return seasonLabelToSortValue(row.season) > seasonLabelToSortValue(latest)
      ? row.season
      : latest;
  }, "");

  return latestSeason
    ? seasons.filter((row) => row.season === latestSeason)
    : [];
}

function renderSeasonStatsTable(player, playerStats) {
  const rows = getLatestSeasonRows(playerStats);
  const isGoalie = player.position === "G";
  const columns = isGoalie
    ? ["Season", "Type", "Team", "League", "GP", "W", "L", "OT", "GAA", "SV%"]
    : ["Season", "Type", "Team", "League", "GP", "G", "A", "PTS", "PIM"];

  if (!rows.length) {
    return `
      <p class="bio-data-empty">
        ${escapeHTML(getSeasonStatsPendingMessage(player))}
      </p>
    `;
  }

  const body = rows
    .map((row) => {
      const cells = isGoalie
        ? [
            row.season,
            row.type || "Regular",
            row.team,
            row.league || getLeague(player.currentTeam),
            row.gp,
            row.w,
            row.l,
            row.ot,
            row.gaa,
            row.savePct,
          ]
        : [
            row.season,
            row.type || "Regular",
            row.team,
            row.league || getLeague(player.currentTeam),
            row.gp,
            row.goals,
            row.assists,
            row.points,
            row.pim,
          ];

      return `<tr>${cells.map((cell) => `<td>${escapeHTML(cell ?? "TBD")}</td>`).join("")}</tr>`;
    })
    .join("");

  return `
    <div class="bio-table-wrap">
      <table class="registry-table bio-stats-table">
        <thead>
          <tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

function renderHighlightLinks(links = []) {
  if (!links.length) {
    return `<span class="highlight-empty">None</span>`;
  }

  return `
    <span class="highlight-links">
      ${links
        .map(
          (link) => `
            <a class="highlight-link" href="${escapeHTML(link.url)}" target="_blank" rel="noreferrer">
              ${escapeHTML(link.label || "Clip")}
            </a>
          `,
        )
        .join("")}
    </span>
  `;
}

function renderLastFiveGamesTable(player, playerStats) {
  const lastFive = playerStats?.lastFiveGames;
  const games = lastFive?.games || [];
  const isGoalie =
    player.position === "G" || games.some((game) => game.role === "goalie");
  const hasPlusMinus = !isGoalie && games.some((game) => game.plusMinus !== undefined && game.plusMinus !== null);
  const hasToi = games.some((game) => game.toi);
  const columns = isGoalie
    ? [
        "Date",
        "Matchup",
        "Type",
        "GS",
        "DEC",
        "SA",
        "GA",
        "SV%",
        ...(hasToi ? ["TOI"] : []),
        "Highlights",
      ]
    : [
        "Date",
        "Matchup",
        "Type",
        "G",
        "A",
        "PTS",
        "SOG",
        ...(hasPlusMinus ? ["+/-"] : []),
        "PIM",
        ...(hasToi ? ["TOI"] : []),
        "Highlights",
      ];

  if (!games.length) {
    const note = humanizePendingGameNote(
      lastFive?.note,
      getRecentGamesPendingMessage(player),
    );

    return `<p class="bio-data-empty">${escapeHTML(note)}</p>`;
  }

  const body = games
    .map((game) => {
      const matchup = `${game.team || "TBD"} ${game.homeAway || "vs"} ${game.opponent || "TBD"}`;
      const cells = isGoalie
        ? [
            formatDateOnly(game.date),
            matchup,
            game.type || "Regular",
            game.gamesStarted,
            game.decision,
            game.shotsAgainst,
            game.goalsAgainst,
            game.savePct,
            ...(hasToi ? [game.toi] : []),
          ]
        : [
            formatDateOnly(game.date),
            matchup,
            game.type || "Regular",
            game.goals,
            game.assists,
            game.points,
            game.shots,
            ...(hasPlusMinus ? [game.plusMinus] : []),
            game.pim,
            ...(hasToi ? [game.toi] : []),
          ];
      const statCells = cells
        .map((cell) => `<td>${escapeHTML(cell ?? "TBD")}</td>`)
        .join("");
      const highlightsCell = `<td>${renderHighlightLinks(game.highlightLinks)}</td>`;

      return `<tr>${statCells}${highlightsCell}</tr>`;
    })
    .join("");

  return `
    <div class="bio-table-wrap">
      <table class="registry-table bio-stats-table last-five-table">
        <thead>
          <tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

function renderNextFiveGamesTable(player, playerStats) {
  const nextFive = playerStats?.nextFiveGames;
  const games = nextFive?.games || [];
  const columns = ["Date", "Matchup", "League", "Type", "Status"];

  if (!games.length) {
    const note = humanizePendingGameNote(
      nextFive?.note,
      getUpcomingGamesPendingMessage(player),
    );

    return `<p class="bio-data-empty">${escapeHTML(note)}</p>`;
  }

  const body = games
    .map((game) => {
      const matchup = `${game.team || "TBD"} ${game.homeAway || "vs"} ${game.opponent || "TBD"}`;
      const statusParts = [
        game.status || "Scheduled",
        game.time ? formatGameTime(game.time) : "",
      ].filter(Boolean);
      const cells = [
        formatDateOnly(game.date),
        matchup,
        game.league || getLeague(player.currentTeam),
        game.type || "Regular",
        statusParts.join(" | ") || "Scheduled",
      ];

      return `<tr>${cells.map((cell) => `<td>${escapeHTML(cell ?? "TBD")}</td>`).join("")}</tr>`;
    })
    .join("");

  return `
    <div class="bio-table-wrap">
      <table class="registry-table bio-stats-table upcoming-games-table">
        <thead>
          <tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

function summarizeLatestSeason(player, playerStats) {
  const rows = getLatestSeasonRows(playerStats);

  if (!rows.length) {
    return getSeasonStatsPendingMessage(player);
  }

  const season = rows[0]?.season || "Latest";
  const teams = [...new Set(rows.map((row) => row.team).filter(Boolean))].join(", ");
  const gp = rows.reduce((sum, row) => sum + Number(row.gp || 0), 0);

  if (player.position === "G") {
    const wins = rows.reduce((sum, row) => sum + Number(row.w || 0), 0);
    const losses = rows.reduce((sum, row) => sum + Number(row.l || 0), 0);
    const ot = rows.reduce((sum, row) => sum + Number(row.ot || 0), 0);
    const latestRow = rows[rows.length - 1] || {};

    return `${season} latest line${teams ? ` with ${teams}` : ""}: ${gp} GP, ${wins}-${losses}-${ot}, ${latestRow.gaa || "TBD"} GAA, ${latestRow.savePct || "TBD"} SV%.`;
  }

  const goals = rows.reduce((sum, row) => sum + Number(row.goals || 0), 0);
  const assists = rows.reduce((sum, row) => sum + Number(row.assists || 0), 0);
  const points = rows.reduce((sum, row) => sum + Number(row.points || 0), 0);
  const hasUnknownPim = rows.some(
    (row) => row.pim === undefined || row.pim === null || Number.isNaN(Number(row.pim)),
  );
  const pim = hasUnknownPim
    ? "TBD"
    : rows.reduce((sum, row) => sum + Number(row.pim || 0), 0);

  return `${season} latest line${teams ? ` with ${teams}` : ""}: ${gp} GP, ${goals} G, ${assists} A, ${points} PTS, ${pim} PIM.`;
}

function summarizeLastFiveGames(player, playerStats) {
  const lastFive = playerStats?.lastFiveGames;
  const games = lastFive?.games || [];

  if (!games.length) {
    return humanizePendingGameNote(
      lastFive?.note,
      getRecentGamesPendingMessage(player),
    );
  }

  if (player.position === "G" || games.some((game) => game.role === "goalie")) {
    const starts = games.reduce((sum, game) => sum + Number(game.gamesStarted || 0), 0);
    const goalsAgainst = games.reduce(
      (sum, game) => sum + Number(game.goalsAgainst || 0),
      0,
    );
    const shotsAgainst = games.reduce(
      (sum, game) => sum + Number(game.shotsAgainst || 0),
      0,
    );

    return `Last ${games.length} imported games: ${starts} starts, ${shotsAgainst} shots against, ${goalsAgainst} goals against.`;
  }

  const goals = games.reduce((sum, game) => sum + Number(game.goals || 0), 0);
  const assists = games.reduce((sum, game) => sum + Number(game.assists || 0), 0);
  const points = games.reduce((sum, game) => sum + Number(game.points || 0), 0);

  return `Last ${games.length} imported games: ${goals} G, ${assists} A, ${points} PTS.`;
}

function summarizeNextFiveGames(player, playerStats) {
  const nextFive = playerStats?.nextFiveGames;
  const games = nextFive?.games || [];

  if (!games.length) {
    return humanizePendingGameNote(
      nextFive?.note,
      getUpcomingGamesPendingMessage(player),
    );
  }

  const firstGame = games[0];
  const matchup = `${firstGame.team || "TBD"} ${firstGame.homeAway || "vs"} ${firstGame.opponent || "TBD"}`;

  return `Next ${games.length} imported games start ${formatDateOnly(firstGame.date)}: ${matchup}.`;
}

function getHighlightCount(playerStats) {
  return (playerStats?.lastFiveGames?.games || []).reduce(
    (sum, game) => sum + (game.highlightLinks?.length || 0),
    0,
  );
}

function normalizeNewsNote(note) {
  if (typeof note === "string") {
    return {
      title: "Manual note",
      body: note,
    };
  }

  return note;
}

function isPublicNewsNote(note) {
  const text = `${note?.title || ""} ${note?.body || ""}`.toLowerCase();

  return ![
    "bio created",
    "source links were added",
    "added to the site",
    "connector is not fully connected",
    "not connected for",
    "waiting on the next verified update",
  ].some((phrase) => text.includes(phrase));
}

function getAutomatedNewsNotes(player, playerStats) {
  const notes = [
    {
      title: "Current assignment",
      body: `${player.name} is currently listed with ${player.currentTeam}.`,
    },
    {
      title: "Latest production",
      body: summarizeLatestSeason(player, playerStats),
    },
    {
      title: "Recent games",
      body: summarizeLastFiveGames(player, playerStats),
    },
    {
      title: "Upcoming games",
      body: summarizeNextFiveGames(player, playerStats),
    },
  ];
  const highlightCount = getHighlightCount(playerStats);

  if (highlightCount) {
    notes.push({
      title: "Highlights",
      body: `${highlightCount} player-specific highlight link${highlightCount === 1 ? "" : "s"} attached from recent game logs.`,
    });
  }

  return notes;
}

function renderNewsSource(source) {
  if (!source?.url) {
    return "";
  }

  return `
    <a href="${escapeHTML(source.url)}" target="_blank" rel="noreferrer">
      ${escapeHTML(source.label || "Source")}
    </a>
  `;
}

function renderPlayerNewsNotes(player, playerStats) {
  const manualNotes = Array.isArray(playerStats?.newsNotes)
    ? playerStats.newsNotes.map(normalizeNewsNote).filter(Boolean).filter(isPublicNewsNote)
    : [];
  const currentCycleNote = playerStats?.latestUpdateNews
    ? [
        {
          title: playerStats.latestUpdateNews.label || "News this cycle",
          date:
            playerStats.latestUpdateNews.date ||
            playerStats.latestUpdateNews.updatedAt?.slice(0, 10),
          body: playerStats.latestUpdateNews.note || "Updated in the latest automation cycle.",
        },
      ].filter(isPublicNewsNote)
    : [];
  const notes = [
    ...currentCycleNote,
    ...manualNotes,
    ...getAutomatedNewsNotes(player, playerStats).filter(isPublicNewsNote),
  ];

  return `
    <article class="bio-news-card">
      <div class="bio-data-heading">
        <h3>News &amp; Notes</h3>
      </div>
      <div class="news-notes-list">
        ${notes
          .map(
            (note) => `
              <div class="news-note">
                <div class="news-note-header">
                  <strong>${escapeHTML(note.title || "Note")}</strong>
                  ${note.date ? `<span>${escapeHTML(formatDateOnly(note.date))}</span>` : ""}
                </div>
                <p>${escapeHTML(note.body || "")}</p>
                ${renderNewsSource(note.source)}
              </div>
            `,
          )
          .join("")}
      </div>
    </article>
  `;
}

function renderPlayerBioStats(player, playerStats) {
  const currentSeason =
    playerStats?.currentSeasonStats?.season ||
    getLatestSeasonRows(playerStats)[0]?.season ||
    "Latest";
  const currentLeague = getLeague(player.currentTeam);
  const currentTeamName = player.currentTeam.split(",")[0]?.trim() || player.currentTeam;
  const lastFiveLabel =
    playerStats?.lastFiveGames?.team || playerStats?.lastFiveGames?.league
      ? `${playerStats.lastFiveGames.team || currentTeamName} / ${playerStats.lastFiveGames.league || currentLeague}`
      : `${currentTeamName} / ${currentLeague}`;
  const nextFiveLabel =
    playerStats?.nextFiveGames?.team || playerStats?.nextFiveGames?.league
      ? `${playerStats.nextFiveGames.team || currentTeamName} / ${playerStats.nextFiveGames.league || currentLeague}`
      : `${currentTeamName} / ${currentLeague}`;

  return `
    <div class="bio-data-grid" aria-label="Player latest stats">
      <article class="bio-data-card">
        <div class="bio-data-heading">
          <h3>Season Stats</h3>
          <span>${escapeHTML(currentSeason)}</span>
        </div>
        ${renderSeasonStatsTable(player, playerStats)}
      </article>
      <article class="bio-data-card">
        <div class="bio-data-heading">
          <h3>Last 5 Games</h3>
          <span>${escapeHTML(lastFiveLabel)}</span>
        </div>
        ${renderLastFiveGamesTable(player, playerStats)}
      </article>
      <article class="bio-data-card">
        <div class="bio-data-heading">
          <h3>Next 5 Games</h3>
          <span>${escapeHTML(nextFiveLabel)}</span>
        </div>
        ${renderNextFiveGamesTable(player, playerStats)}
      </article>
    </div>
  `;
}

function renderPlayerBio(player, age, playerStats, controlLabel, controlDate) {
  const positionLabel = getPositionLabel(player.position);
  const scoutingProfile = scoutingProfiles[slugify(player.name)];
  const measurements = getPlayerMeasurements(player);
  const measurementsText = `${measurements.height}, ${measurements.weight}`;
  const ageText = age === "TBD" ? "a Rangers-controlled" : `a ${age}-year-old`;
  const quickBio =
    scoutingProfile?.bio
      ? `${scoutingProfile.bio} Listed at ${measurementsText}.`
      : `${player.name} is ${ageText} ${positionLabel} listed at ${measurementsText} and currently with ${player.currentTeam}.`;
  const prospectWriteup = renderProspectWriteup(player, playerStats);
  const prospectHighlights = renderProspectHighlights(player);

  return `
    <section class="player-bio" aria-labelledby="bio-title">
      <div class="section-heading">
        <p class="eyebrow">Bio</p>
        <h2 id="bio-title">Player profile</h2>
      </div>
      ${renderPlayerNewsNotes(player, playerStats)}
      ${prospectHighlights}
      <div class="bio-grid">
        <article>
          <h3>Quick Bio</h3>
          <p>${escapeHTML(quickBio)}</p>
        </article>
        <article>
          <h3>Prospect Writeup</h3>
          ${prospectWriteup}
        </article>
        <article>
          <h3>Rangers Acquisition</h3>
          ${renderRangersAcquisition(player, controlLabel, controlDate)}
        </article>
      </div>
      ${renderPlayerBioStats(player, playerStats)}
    </section>
  `;
}

async function loadStatsData() {
  if (window.NYR_PLAYER_STATS) {
    return window.NYR_PLAYER_STATS;
  }

  const response = await fetch("data/player-stats.json", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Unable to load player stats data.");
  }

  return response.json();
}

function renderStatTable(player, playerStats) {
  const league = getLeague(player.currentTeam);
  const isGoalie = player.position === "G";
  const statColumns = isGoalie
    ? ["Season", "Type", "Team", "League", "GP", "W", "L", "OT", "GAA", "SV%"]
    : ["Season", "Type", "Team", "League", "GP", "G", "A", "PTS", "PIM"];
  const seasons = playerStats?.seasons || [];

  if (!seasons.length) {
    return `
      <table class="registry-table stats-table">
        <thead>
          <tr>${statColumns.map((column) => `<th>${column}</th>`).join("")}</tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="${statColumns.length}">
              ${escapeHTML(getSeasonStatsPendingMessage(player))}
            </td>
          </tr>
        </tbody>
      </table>
    `;
  }

  const rows = seasons
    .map((season) => {
      const cells = isGoalie
        ? [
            season.season,
            season.type || "Regular",
            season.team,
            season.league || league,
            season.gp,
            season.w,
            season.l,
            season.ot,
            season.gaa,
            season.savePct,
          ]
        : [
            season.season,
            season.type || "Regular",
            season.team,
            season.league || league,
            season.gp,
            season.goals,
            season.assists,
            season.points,
            season.pim,
          ];

      return `<tr>${cells.map((cell) => `<td>${escapeHTML(cell ?? "TBD")}</td>`).join("")}</tr>`;
    })
    .join("");

  return `
    <table class="registry-table stats-table">
      <thead>
        <tr>${statColumns.map((column) => `<th>${column}</th>`).join("")}</tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

async function renderPlayerPage() {
  const page = document.querySelector("[data-player-page]");

  if (!page) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const playerSlug = params.get("player") || "";
  const player = playerBySlug.get(playerSlug);

  if (!player) {
    page.innerHTML = `
      <section class="player-detail">
        <a class="back-link" href="index.html#registry">Back to registry</a>
        <h1>Player not found</h1>
        <p class="hero-copy">Choose a player from the registry to open a stats page.</p>
      </section>
    `;
    document.title = "Player Not Found | NYR Prospects HQ";
    return;
  }

  const birthdate = playerBirthdates[player.name];
  const age = birthdate ? calculateAge(birthdate) : "TBD";
  let statsData = null;
  let playerStats = null;
  let statsLoadError = "";

  try {
    statsData = await loadStatsData();
    playerStats = statsData.players?.[playerSlug] || null;
  } catch (error) {
    statsLoadError = error.message;
  }

  const controlLabel = playerStats?.controlStartLabel || player.acquired;
  const controlDate = playerStats?.controlStartDate || "TBD";
  const checkedAt = formatTimestamp(statsData?.metadata?.lastCheckedAt);
  const updatedAt = formatTimestamp(
    statsData?.metadata?.lastUpdatedAt,
    "Not updated yet",
  );
  const hasStatRows = Boolean(playerStats?.seasons?.length);
  const statsMessage = statsLoadError
    ? `Stats data could not be loaded: ${statsLoadError}`
    : hasStatRows
      ? `Showing stats since Rangers control: ${controlLabel}.`
      : getSeasonStatsPendingMessage(player);
  const statsTable = renderStatTable(player, playerStats);
  const playerBio = renderPlayerBio(
    player,
    age,
    playerStats,
    controlLabel,
    controlDate,
  );
  const backHref =
    player.group === "Graduated"
      ? "graduated.html"
      : player.group === "Traded draft picks"
        ? "traded-draft-picks.html"
        : "index.html#registry";
  const backLabel =
    player.group === "Graduated"
      ? "Back to graduated"
      : player.group === "Traded draft picks"
        ? "Back to traded picks"
        : "Back to registry";
  const measurements = getPlayerMeasurements(player);
  const draftInfo = getPlayerDraftInfo(player, playerStats);

  document.title = `${player.name} Stats | NYR Prospects HQ`;
  page.innerHTML = `
    <section class="player-detail">
      <a class="back-link" href="${backHref}">${backLabel}</a>
      <p class="eyebrow">${escapeHTML(player.group)}</p>
      <h1>${escapeHTML(player.name)}</h1>
      <div class="player-summary-grid" aria-label="Player profile summary">
        <article>
          <span>Position</span>
          <strong>${escapeHTML(player.position)}</strong>
        </article>
        <article>
          <span>Age</span>
          <strong>${escapeHTML(age)}</strong>
        </article>
        <article>
          <span>Height</span>
          <strong>${escapeHTML(measurements.height)}</strong>
        </article>
        <article>
          <span>Weight</span>
          <strong>${escapeHTML(measurements.weight)}</strong>
        </article>
        <article>
          <span>Draft Year</span>
          <strong>${escapeHTML(draftInfo.displayYear)}</strong>
        </article>
        <article>
          <span>Draft Pick</span>
          <strong>${escapeHTML(draftInfo.displayPick)}</strong>
        </article>
        <article>
          <span>Current Team</span>
          <strong>${escapeHTML(player.currentTeam)}</strong>
        </article>
        <article>
          <span>Acquired</span>
          <strong>${escapeHTML(player.acquired)}</strong>
        </article>
        <article>
          <span>Rangers Control</span>
          <strong>${escapeHTML(controlDate)}</strong>
        </article>
      </div>
    </section>

    ${playerBio}

    <section class="player-stats" aria-labelledby="stats-title">
      <div class="section-heading">
        <p class="eyebrow">Stats</p>
        <h2 id="stats-title">Stats since Rangers control</h2>
        <p>${escapeHTML(statsMessage)}</p>
        <div class="stats-meta" aria-label="Stats update timing">
          <span>Last checked: ${escapeHTML(checkedAt)}</span>
          <span>Last updated: ${escapeHTML(updatedAt)}</span>
        </div>
      </div>
      <div class="registry-table-wrap">
        ${statsTable}
      </div>
    </section>
  `;
}

function refreshLeagueBreakdownPage() {
  const rendered = renderLeagueBreakdownPage();

  if (rendered) {
    initRegistrySorting();
  }

  return rendered;
}

const renderedLeaguePage = refreshLeagueBreakdownPage();
applyDefaultProspectOrder();
linkRegistryPlayers();
updateRegistryAges();
updateRegistryVitals();
if (!renderedLeaguePage) {
  initRegistrySorting();
}
renderDraftedRangersNewsList();
renderPlayerPage();

window.addEventListener("hashchange", refreshLeagueBreakdownPage);
