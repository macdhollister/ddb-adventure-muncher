const sources = [
  {
    id: 1,
    name: "BR",
    description: "Basic Rules",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/136/637248073409717512.jpeg",
    sourceURL: "sources/basic-rules",
  },
  {
    id: 2,
    name: "PHB",
    description: "Player's Handbook",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10435/389/637248131811862290.jpeg",
    sourceURL: "sources/phb",
  },
  {
    id: 3,
    name: "DMG",
    description: "Dungeon Master's Guide",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10367/593/637245347063211867.jpeg",
    sourceURL: "sources/dmg",
  },
  {
    id: 4,
    name: "EE",
    description: "Elemental Evil Player's Companion",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL: "https://www.dndbeyond.com/avatars/",
    sourceURL: "",
  },
  {
    id: 5,
    name: "MM",
    description: "Monster Manual",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/816/637248105832999293.jpeg",
    sourceURL: "sources/mm",
  },
  {
    id: 6,
    name: "CoS",
    description: "Curse of Strahd",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10349/296/637244603965977140.jpeg",
    sourceURL: "sources/cos",
  },
  {
    id: 7,
    name: "HotDQ",
    description: "Hoard of the Dragon Queen",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10432/68/637247937818392417.jpeg",
    sourceURL: "sources/hotdq",
  },
  {
    id: 8,
    name: "LMoP",
    description: "Lost Mine of Phandelver",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/616/637248096401764265.jpeg",
    sourceURL: "sources/lmop",
  },
  {
    id: 9,
    name: "OotA",
    description: "Out of the Abyss",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/19/735/636383500945700817.jpeg",
    sourceURL: "sources/oota",
  },
  {
    id: 10,
    name: "PotA",
    description: "Princes of the Apocalypse",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10435/524/637248137744435932.jpeg",
    sourceURL: "sources/pota",
  },
  {
    id: 11,
    name: "RoT",
    description: "Rise of Tiamat",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10435/605/637248141604547323.jpeg",
    sourceURL: "sources/rot",
  },
  {
    id: 12,
    name: "SKT",
    description: "Storm King's Thunder",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/19/740/636383501361665378.jpeg",
    sourceURL: "sources/skt",
  },
  {
    id: 13,
    name: "SCAG",
    description: "Sword Coast Adventurer's Guide",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10435/793/637248149475504723.jpeg",
    sourceURL: "sources/scag",
  },
  {
    id: 14,
    name: "TftYP",
    description: "Tales from the Yawning Portal",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/177/637248652153094716.jpeg",
    sourceURL: "sources/tftyp",
  },
  {
    id: 15,
    name: "VGtM",
    description: "Volo's Guide to Monsters",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/464/637248679743732719.jpeg",
    sourceURL: "sources/vgtm",
  },
  {
    id: 16,
    name: "TSC",
    description: "The Sunless Citadel",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/402/637248674372576676.jpeg",
    sourceURL: "sources/tftyp/a1",
  },
  {
    id: 17,
    name: "TFoF",
    description: "The Forge of Fury",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10436/4/637248156999902689.jpeg",
    sourceURL: "sources/tftyp/a2",
  },
  {
    id: 18,
    name: "THSoT",
    description: "The Hidden Shrine of Tamoachan",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/236/637248657347161458.jpeg",
    sourceURL: "sources/tftyp/a3",
  },
  {
    id: 19,
    name: "WPM",
    description: "White Plume Mountain",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/751/637248705560259195.jpeg",
    sourceURL: "sources/tftyp/a4",
  },
  {
    id: 20,
    name: "DiT",
    description: "Dead in Thay",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/246/637248079254127234.jpeg",
    sourceURL: "sources/tftyp/a5",
  },
  {
    id: 21,
    name: "AtG",
    description: "Against the Giants",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10433/315/637248029897296032.jpeg",
    sourceURL: "sources/tftyp/a6",
  },
  {
    id: 22,
    name: "ToH",
    description: "Tomb of Horrors",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/371/637248671854035769.jpeg",
    sourceURL: "sources/tftyp/a7",
  },
  {
    id: 25,
    name: "ToA",
    description: "Tomb of Annihilation",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/339/637248669136195626.jpeg",
    sourceURL: "sources/toa",
  },
  {
    id: 26,
    name: "CoSCO",
    description: "Curse of Strahd: Character Options",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10349/289/637244603748885696.jpeg",
    sourceURL: "",
  },
  {
    id: 27,
    name: "XGtE",
    description: "Xanathar's Guide to Everything",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/803/637248709455777906.jpeg",
    sourceURL: "sources/xgte",
  },
  {
    id: 28,
    name: "TTP",
    description: "The Tortle Package",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/39/300/636411199124473334.png",
    sourceURL: "sources/ttp",
  },
  {
    id: 29,
    name: "UA",
    description: "Unearthed Arcana",
    sourceCategoryId: 3,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/100/464/636506973225556542.png",
    sourceURL: "",
  },
  {
    id: 30,
    name: "DDB",
    description: "D&amp;D Beyond",
    sourceCategoryId: 1,
    isReleased: false,
    avatarURL: "https://www.dndbeyond.com/avatars/",
    sourceURL: "",
  },
  {
    id: 31,
    name: "CR",
    description: "Critical Role",
    sourceCategoryId: 2,
    isReleased: true,
    avatarURL: "https://www.dndbeyond.com/avatars/",
    sourceURL: "",
  },
  {
    id: 32,
    name: "TCS",
    description: "Tal'Dorei Campaign Setting",
    sourceCategoryId: 1,
    isReleased: false,
    avatarURL: "https://www.dndbeyond.com/avatars/",
    sourceURL: "",
  },
  {
    id: 33,
    name: "MToF",
    description: "Mordenkainen’s Tome of Foes",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/949/637248111148617766.jpeg",
    sourceURL: "sources/mtof",
  },
  {
    id: 34,
    name: "DDIA-MORD",
    description: "Rrakkma",
    sourceCategoryId: 12,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/319/345/636622116959280867.jpeg",
    sourceURL: "sources/ddia-mord",
  },
  {
    id: 35,
    name: "WDH",
    description: "Waterdeep: Dragon Heist",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/343/499/636632335939805190.jpeg",
    sourceURL: "sources/wdh",
  },
  {
    id: 36,
    name: "WDotMM",
    description: "Waterdeep: Dungeon of the Mad Mage",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/493/637248684031810278.jpeg",
    sourceURL: "sources/wdotmm",
  },
  {
    id: 37,
    name: "WGtE",
    description: "Wayfinder's Guide to Eberron",
    sourceCategoryId: 8,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10449/715/637248702538222765.jpeg",
    sourceURL: "sources/wgte",
  },
  {
    id: 38,
    name: "GGtR",
    description: "Guildmasters' Guide to Ravnica",
    sourceCategoryId: 7,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10369/823/637245482341163840.jpeg",
    sourceURL: "sources/ggtr",
  },
  {
    id: 39,
    name: "_APT",
    description: "Archived Playtest",
    sourceCategoryId: 9,
    isReleased: false,
    avatarURL: "https://www.dndbeyond.com/avatars/",
    sourceURL: "",
  },
  {
    id: 40,
    name: "LLoK",
    description: "Lost Laboratory of Kwalish",
    sourceCategoryId: 12,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/498/637248091075319276.jpeg",
    sourceURL: "sources/llok",
  },
  {
    id: 41,
    name: "DoIP",
    description: "Dragon of Icespire Peak",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10350/957/637244676648122088.jpeg",
    sourceURL: "sources/doip",
  },
  {
    id: 42,
    name: "TMR",
    description: "Tactical Maps Reincarnated",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/5336/630/636850745475942698.jpeg",
    sourceURL: "",
  },
  {
    id: 43,
    name: "GoS",
    description: "Ghosts of Saltmarsh",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10370/66/637245493047936420.jpeg",
    sourceURL: "sources/gos",
  },
  {
    id: 44,
    name: "AI",
    description: "Acquisitions Incorporated",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10350/905/637244674570907870.jpeg",
    sourceURL: "sources/ai",
  },
  {
    id: 47,
    name: "HftT",
    description: "Hunt for the Thessalhydra",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10432/12/637247932786703735.jpeg",
    sourceURL: "sources/hftt",
  },
  {
    id: 48,
    name: "BGDiA",
    description: "Baldur's Gate: Descent into Avernus",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10350/927/637244675832719441.jpeg",
    sourceURL: "sources/bgdia",
  },
  {
    id: 49,
    name: "ERftLW",
    description: "Eberron: Rising from the Last War",
    sourceCategoryId: 8,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10368/6/637245381196842264.jpeg",
    sourceURL: "sources/erftlw",
  },
  {
    id: 50,
    name: "SLW",
    description: "Storm Lord’s Wrath",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10350/964/637244676927254855.jpeg",
    sourceURL: "sources/slw",
  },
  {
    id: 51,
    name: "SDW",
    description: "Sleeping Dragon’s Wake",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10350/959/637244676820916158.jpeg",
    sourceURL: "sources/sdw",
  },
  {
    id: 52,
    name: "DC",
    description: "Divine Contention",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10350/951/637244676535367295.jpeg",
    sourceURL: "sources/dc",
  },
  {
    id: 53,
    name: "SAC",
    description: "Sage Advice Compendium",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10435/702/637248145947271474.jpeg",
    sourceURL: "sources/sac",
  },
  {
    id: 54,
    name: "DDvRaM",
    description: "Dungeons &amp; Dragons vs. Rick and Morty",
    sourceCategoryId: 10,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10367/229/637245316031917098.jpeg",
    sourceURL: "sources/ddvram",
  },
  {
    id: 55,
    name: "LR",
    description: "Locathah Rising",
    sourceCategoryId: 12,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/650/637248098360957592.jpeg",
    sourceURL: "sources/lr",
  },
  {
    id: 56,
    name: "IMR",
    description: "Infernal Machine Rebuild",
    sourceCategoryId: 12,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/395/637248086063224834.jpeg",
    sourceURL: "sources/imr",
  },
  {
    id: 57,
    name: "MFFV1",
    description: "Mordenkainen's Fiendish Folio Volume 1",
    sourceCategoryId: 12,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/743/637248102793792401.jpeg",
    sourceURL: "sources/mffv1",
  },
  {
    id: 58,
    name: "SD",
    description: "Sapphire Dragon",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10435/899/637248153278056972.jpeg",
    sourceURL: "",
  },
  {
    id: 59,
    name: "EGtW",
    description: "Explorer's Guide to Wildemount",
    sourceCategoryId: 2,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10367/769/637245363413951140.jpeg",
    sourceURL: "sources/egtw",
  },
  {
    id: 60,
    name: "OGA",
    description: "One Grung Above",
    sourceCategoryId: 12,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10435/68/637248116464990081.jpeg",
    sourceURL: "sources/oga",
  },
  {
    id: 61,
    name: "MOoT",
    description: "Mythic Odysseys of Theros",
    sourceCategoryId: 7,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10434/885/637248108609488365.jpeg",
    sourceURL: "sources/moot",
  },
  {
    id: 62,
    name: "WA",
    description: "Frozen Sick",
    sourceCategoryId: 2,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/9193/755/637200909525723425.jpeg",
    sourceURL: "sources/wa",
  },
  {
    id: 65,
    name: "LRDToB",
    description: "Legends of Runeterra: Dark Tides of Bilgewater",
    sourceCategoryId: 11,
    isReleased: false,
    avatarURL:
      "https://www.dndbeyond.com/avatars/10995/854/637274159147304961.png",
    sourceURL: "sources/lrdtob",
  },
  {
    id: 66,
    name: "IDRotF",
    description: "Icewind Dale: Rime of the Frostmaiden",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/11095/550/637278965847502335.jpeg",
    sourceURL: "sources/idrotf",
  },
  {
    id: 67,
    name: "TCoE",
    description: "Tasha’s Cauldron of Everything",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/13665/613/637400361423035085.jpeg",
    sourceURL: "sources/tcoe",
  },
  {
    id: 68,
    name: "CM",
    description: "Candlekeep Mysteries",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/14917/783/637456355214291364.jpeg",
    sourceURL: "sources/cm",
  },
  {
    id: 69,
    name: "VRGtR",
    description: "Van Richten’s Guide to Ravenloft",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/15973/81/637496917952314322.jpeg",
    sourceURL: "sources/vrgtr",
  },
  {
    id: 71,
    name: "DDAL-10-00",
    description: "DDAL-10-00: Ice Road Trackers",
    sourceCategoryId: 13,
    isReleased: false,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18114/942/637583248932249475.jpeg",
    sourceURL: "sources/al-season-10/ddal-10-00",
  },
  {
    id: 72,
    name: "DDAL-10-01",
    description: "DDAL 10-01: The Frozen North",
    sourceCategoryId: 13,
    isReleased: false,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18114/944/637583249060084705.jpeg",
    sourceURL: "sources/al-season-10/ddal-10-01",
  },
  {
    id: 73,
    name: "DDAL-10-02",
    description: "DDAL 10-02: Gnashing Teeth",
    sourceCategoryId: 13,
    isReleased: false,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18114/946/637583249142428992.jpeg",
    sourceURL: "sources/al-season-10/ddal-10-02",
  },
  {
    id: 74,
    name: "DDAL-10-03",
    description: "DDAL 10-03: Divining Evil",
    sourceCategoryId: 13,
    isReleased: false,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18114/950/637583249250769417.jpeg",
    sourceURL: "sources/al-season-10/ddal-10-03",
  },
  {
    id: 75,
    name: "DDAL-10-04",
    description: "DDAL 10-04: Cold Benevolence",
    sourceCategoryId: 13,
    isReleased: false,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18114/955/637583249324187643.jpeg",
    sourceURL: "sources/al-season-10/ddal-10-04",
  },
  {
    id: 76,
    name: "DDAL-10-05",
    description: "DDAL 10-05: A Blight in the Darkness",
    sourceCategoryId: 13,
    isReleased: false,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18114/959/637583249404744735.jpeg",
    sourceURL: "sources/al-season-10/ddal-10-05",
  },
  {
    id: 77,
    name: "DDAL-10-06",
    description: "DDAL 10-06: The Fallen Star",
    sourceCategoryId: 13,
    isReleased: false,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18114/962/637583249478651354.jpeg",
    sourceURL: "sources/al-season-10/ddal-10-06",
  },
  {
    id: 78,
    name: "DDAL-10-07",
    description: "DDAL 10-07: Into Darkness",
    sourceCategoryId: 13,
    isReleased: false,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18114/964/637583249555517033.jpeg",
    sourceURL: "sources/al-season-10/ddal-10-07",
  },
  {
    id: 79,
    name: "TWBtW",
    description: "The Wild Beyond the Witchlight",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18223/997/637587419509160992.jpeg",
    sourceURL: "sources/twbtw",
  },
  {
    id: 80,
    name: "SACoC",
    description: "Strixhaven: A Curriculum of Chaos",
    sourceCategoryId: 7,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/18228/52/637587668398315568.jpeg",
    sourceURL: "sources/sacoc",
  },
  {
    id: 81,
    name: "FToD",
    description: "Fizban's Treasury of Dragons",
    sourceCategoryId: 1,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/19075/983/637620380256293999.jpeg",
    sourceURL: "sources/ftod",
  },
  {
    id: 83,
    name: "CotN",
    description: "Critical Role: Call of the Netherdeep",
    sourceCategoryId: 2,
    isReleased: true,
    avatarURL:
      "https://www.dndbeyond.com/avatars/20906/943/637695655261542821.jpeg",
    sourceURL: "sources/cotn",
  },
];

exports.sources = sources;