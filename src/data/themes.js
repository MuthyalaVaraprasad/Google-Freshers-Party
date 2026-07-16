export const themes = [
  {
    id: "galactic-carnival",
    name: "Galactic Carnival",
    tagline: "Beyond the Stars",
    concept: "A cosmic fresher party experience where the campus transforms into a space station. Featuring floating planetary spheres, neon-lit constellations, zero-gravity aesthetics, and interstellar dress codes (chrome, stardust, or neon). It's a high-energy, galactic welcome to the university galaxy.",
    accentColor: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.4)",
    themeClass: "theme-galactic",
    welcomeMessage: "Attention all recruits! Welcome aboard Starship Campus. Your 4-year voyage through the endless galaxy of knowledge and memories begins tonight. Prepare for warp speed!",
    games: [
      { title: "Blacklight Asteroid Dodgeball", desc: "Dodgeball played under UV blacklight with glowing, neon foam 'asteroids' and glowing team bibs." },
      { title: "Constellation Mixer", desc: "Each fresher gets a card with a star name. They must find other freshers with stars from the same constellation to form a team and unlock planetary mocktails." },
      { title: "Zero-Gravity Dance-Off", desc: "A dance floor equipped with high-powered fog machines, LED strobe lights, and wind fans to simulate low-gravity cosmic dancing." }
    ],
    quiz: [
      { question: "How long does it take light from the Sun to reach Earth?", options: ["About 8 minutes", "About 8 seconds", "About 8 hours", "Instantly"], answer: "About 8 minutes" },
      { question: "Which of these is the brightest star in our night sky?", options: ["Sirius", "Polaris", "Betelgeuse", "Proxima Centauri"], answer: "Sirius" },
      { question: "What is the name of our home galaxy?", options: ["Milky Way", "Andromeda", "Triangulum", "Sombrero"], answer: "Milky Way" }
    ],
    schedule: [
      { time: "06:00 PM", activity: "Warp-In & Boarding (Gates Open & Neon Registration)", icon: "🚀" },
      { time: "06:30 PM", activity: "Commander's Welcome & Constellation Mixer", icon: "✨" },
      { time: "07:30 PM", activity: "Interstellar Games (Asteroid Dodgeball & Quizzes)", icon: "🎯" },
      { time: "08:30 PM", activity: "Cosmic Banquet (Dinner at the Nebula Food Court)", icon: "🪐" },
      { time: "09:30 PM", activity: "Zero-Gravity Dance Floor & Laser Show", icon: "💃" },
      { time: "10:30 PM", activity: "Warp-Out (Closing Ceremony & Farewell Gifts)", icon: "🌌" }
    ],
    nanoBananaPromptBase: "A panoramic view of a university courtyard at night transformed into a glowing cosmic space-themed carnival. Giant floating neon planet spheres of Saturn and Jupiter hover in the air. Vibrant purple and deep blue laser light beams cut through the sky. Group of happy college freshers wearing silver chrome jackets and glowing neon bracelets are dancing on a glowing LED dance floor. Ultra-realistic, cinematic lighting, octane render, 8k resolution.",
    pitchScriptDraft: "Freshers get only one first impression of campus, and we are going to make it truly out of this world! Welcome to the Galactic Carnival: Beyond the Stars. Picture this: our campus courtyard transformed into an interstellar space station with glowing planets floating overhead and lasers cutting through the night. We'll break the ice with the 'Constellation Mixer' and play 'Blacklight Asteroid Dodgeball' under UV lights. Our welcome message treats college as a 4-year voyage aboard Starship Campus. For the visual poster, we've designed an incredible scene with neon planets hovering over our own college buildings. In just 60 seconds, you can see that this isn't just a party—it's a cosmic launchpad. Don't let freshers settle for a boring lobby. Vote 'WOULD ATTEND' and let's launch their college journey into hyperspace!",
    
    budget: { decor: 800, audio: 1200, food: 1500, prizes: 500 },
    mocktails: [
      { title: "Nebula Bubble Punch", ingredients: "Blue curaçao syrup, sprite, dry ice smoke, edible silver stardust glitter" },
      { title: "Supernova Fizz", ingredients: "Grenadine base, sparkling lemonade, pop-rocks candy rimmed glass" }
    ],
    playlist: [
      { title: "Starboy", artist: "The Weeknd" },
      { title: "Space Oddity", artist: "David Bowie" },
      { title: "Contact", artist: "Daft Punk" }
    ],
    tasks: [
      { id: "t1", title: "Order glowing LED planetary balloons", status: "todo" },
      { id: "t2", title: "Test UV blacklights in courtyard", status: "inprogress" },
      { id: "t3", title: "Design stardust entrance backdrop", status: "done" }
    ],
    layoutItems: [
      { id: "stage", type: "Stage", x: 2, y: 1 },
      { id: "dj", type: "DJ Booth", x: 4, y: 1 },
      { id: "bar", type: "Mocktail Bar", x: 1, y: 3 },
      { id: "photo", type: "Photo Hub", x: 5, y: 3 }
    ],
    seatingTables: [
      { id: "table-1", label: "Alpha Table", capacity: 6, occupants: ["CSE", "CSE", "ECE"] },
      { id: "table-2", label: "Beta Table", capacity: 6, occupants: ["MECH", "MECH", "CIVIL"] },
      { id: "table-3", label: "Gamma Table", capacity: 6, occupants: ["CSE", "ECE", "ECE"] },
      { id: "table-4", label: "Delta Table", capacity: 6, occupants: [] }
    ],
    attendees: [
      { id: "att-1", name: "Aarav Sharma", email: "aarav.cse@college.edu", dept: "CSE", food: "Veg" },
      { id: "att-2", name: "Neha Patel", email: "neha.ece@college.edu", dept: "ECE", food: "Vegan" },
      { id: "att-3", name: "Rohan Das", email: "rohan.mech@college.edu", dept: "MECH", food: "Non-Veg" }
    ],
    socialCalendar: [
      { day: "Day -5", topic: "Announce 'Warp-Speed' theme & teaser poster", status: "Published" },
      { day: "Day -3", topic: "Launch Mocktail brewing poll on Instagram", status: "Draft" },
      { day: "Day -1", topic: "Post final event timeline & DJ lineup", status: "Draft" }
    ],
    cateringEstimate: { attendees: 250, includeVip: false },
    sponsorship: {
      sponsorName: "Google Cloud Store",
      contribution: 1500,
      tier: "Gold",
      benefits: ["Logo on Poster", "VIP Lounge Access", "Stage Shoutout"]
    },
    // Iteration Logger history defaults
    geminiIterations: [
      { version: "v1 Base Concept", timestamp: "10:30 AM", description: "Created original Galactic concept draft with blacklight theme.", score: 85 },
      { version: "v2 Game refinement", timestamp: "11:15 AM", description: "Added UV Dodgeball and mapped interactive scavenger star hunts.", score: 92 },
      { version: "v3 Complete Package", timestamp: "02:20 PM", description: "Polished welcome message aboard Starship Campus and verified limits.", score: 98 }
    ],
    // Swag item designs
    swagList: [
      { item: "Space Hoodie", count: 120, cost: 1500, vendor: "Starship Prints Ltd" },
      { item: "Constellation Wristband", count: 250, cost: 200, vendor: "NeonGlow Swag Shop" }
    ],
    // 3D Poster Simulator variables
    posterMockup: { scale: 1, lighting: "Day", neonGlow: 50, fog: 20 }
  },
  {
    id: "pixel-forest",
    name: "Pixelated Pixie Forest",
    tagline: "Biophilic Arcade",
    concept: "A magical woodland fantasy forest merged with 8-bit retro video games. The campus is decorated with giant pixelated trees, glowing neon mushrooms, fairy lights, and retro game consoles. Freshers wear pixel-art headbands and explore a world where nature meets retro nostalgia.",
    accentColor: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.4)",
    themeClass: "theme-forest",
    welcomeMessage: "Congratulations! You have cleared the character selection screen and loaded into Level 1 of your university adventure. Ready Player One? Your quest starts now!",
    games: [
      { title: "Boss Battle Arena", desc: "Classic multiplayer retro games (like Mario Kart and Pac-Man) projected onto a massive campus building wall using custom controller docks." },
      { title: "Potion Brewing (Mocktail Chemistry)", desc: "A DIY mocktail station where freshers combine color-changing natural teas, dry ice, and edible glitter to brew their own power-up potions." },
      { title: "8-Bit Scavenger Quest", desc: "A physical treasure hunt where players scan pixelated QR codes hidden in trees to solve puzzles and earn 'XP points' for prizes." }
    ],
    quiz: [
      { question: "In what year was the original Pac-Man arcade game released?", options: ["1980", "1975", "1985", "1990"], answer: "1980" },
      { question: "What is the name of the princess whom Mario frequently rescues?", options: ["Peach", "Zelda", "Daisy", "Rosalina"], answer: "Peach" },
      { question: "What color is the '1UP' extra life mushroom in Super Mario Bros?", options: ["Green", "Red", "Blue", "Yellow"], answer: "Green" }
    ],
    schedule: [
      { time: "06:00 PM", activity: "Character Spawning (Registration & XP Card Handout)", icon: "🎮" },
      { time: "06:30 PM", activity: "Level 1 Intro & Potion Brewing Mixer", icon: "🍄" },
      { time: "07:30 PM", activity: "Arcade Quests (Boss Battles & QR scans)", icon: "🏆" },
      { time: "08:30 PM", activity: "8-Bit Banquet (Pixelated pizza buffet)", icon: "🍕" },
      { time: "09:30 PM", activity: "Pixelated Forest Dance party & DJ Loops", icon: "👾" },
      { time: "10:30 PM", activity: "Game Over (Closing Ceremony & Swag items giveaway)", icon: "💾" }
    ],
    nanoBananaPromptBase: "An 8-bit retro video game fantasy forest integrated into a modern university campus square at night. Giant pixelated pine trees with square pine needles glow in light green colors. Big glowing pixelated red-and-white mushrooms line the pathways. Students with pixelated green light bands and headbands are gathered around old wooden arcade cabinets. Warm string fairy lights, dynamic depth-of-field, volumetric fog render, 8k resolution.",
    pitchScriptDraft: "Ready Player One? Your college journey starts at Level 1, and we are going to make it an epic adventure! Welcome to the Pixelated Pixie Forest. We are merging a magical woodland fantasy with retro 8-bit arcade games. Imagine giant pixelated trees and glowing mushrooms decorating our courtyard. We'll play 'Boss Battle' projected on the side of our hostel blocks and go on an '8-Bit Scavenger Quest' scanning hidden QR codes to level up. For F&B, we'll brew color-changing potions with dry ice. Our welcome message greets freshers as characters who have cleared the selection screen. Our poster visualizes this retro-nature hybrid with pixel trees and arcade stations. Don't let freshers spawn into a boring lobby. Vote 'WOULD ATTEND' and let's start this game!",
    
    budget: { decor: 900, audio: 1100, food: 1400, prizes: 600 },
    mocktails: [
      { title: "Health Potion (Red)", ingredients: "Cranberry juice, apple cider, cinnamon sprinkle, sparkling soda" },
      { title: "Mana Potion (Blue)", ingredients: "Blueberry cordial, tonic water, lime twist, blue sugar rimmed glass" }
    ],
    playlist: [
      { title: "Get Lucky", artist: "Daft Punk" },
      { title: "Midnight City", artist: "M83" },
      { title: "Intro", artist: "The xx" }
    ],
    tasks: [
      { id: "t1", title: "Order pixelated cardboard tree cutouts", status: "todo" },
      { id: "t2", title: "Verify projector lumens output", status: "inprogress" },
      { id: "t3", title: "Draft QR code coordinates spreadsheet", status: "done" }
    ],
    layoutItems: [
      { id: "stage", type: "Stage", x: 3, y: 1 },
      { id: "dj", type: "DJ Booth", x: 3, y: 2 },
      { id: "bar", type: "Mocktail Bar", x: 1, y: 4 },
      { id: "photo", type: "Photo Hub", x: 5, y: 4 }
    ],
    seatingTables: [
      { id: "table-1", label: "Mario Table", capacity: 6, occupants: ["CSE", "ECE"] },
      { id: "table-2", label: "Luigi Table", capacity: 6, occupants: ["MECH", "CIVIL"] },
      { id: "table-3", label: "Peach Table", capacity: 6, occupants: ["CSE", "CSE"] },
      { id: "table-4", label: "Zelda Table", capacity: 6, occupants: [] }
    ],
    attendees: [
      { id: "att-1", name: "Aarav Sharma", email: "aarav.cse@college.edu", dept: "CSE", food: "Veg" },
      { id: "att-2", name: "Neha Patel", email: "neha.ece@college.edu", dept: "ECE", food: "Vegan" }
    ],
    socialCalendar: [
      { day: "Day -5", topic: "Post 'Character Spawning' teaser image on stories", status: "Published" },
      { day: "Day -3", topic: "Launch voting poll for retro game selections", status: "Draft" }
    ],
    cateringEstimate: { attendees: 200, includeVip: true },
    sponsorship: {
      sponsorName: "Red Bull India",
      contribution: 1800,
      tier: "Silver",
      benefits: ["Logo on Poster", "Stage Shoutout"]
    },
    geminiIterations: [
      { version: "v1 Base Concept", timestamp: "10:30 AM", description: "Created original forest concept draft with retro arcade game theme.", score: 82 },
      { version: "v2 Game refinement", timestamp: "11:15 AM", description: "Added Boss Battle projections and mapped Scavenger Hunt quests.", score: 90 },
      { version: "v3 Complete Package", timestamp: "02:20 PM", description: "Polished welcome message Level 1 Spawning and verified layouts.", score: 97 }
    ],
    swagList: [
      { item: "Pixel Cap", count: 100, cost: 1200, vendor: "Retro Wear Co" },
      { item: "8-Bit Keychains", count: 200, cost: 300, vendor: "Custom Swag India" }
    ],
    posterMockup: { scale: 1.1, lighting: "Night", neonGlow: 65, fog: 40 }
  },
  {
    id: "retro-futuristic-oasis",
    name: "Retro-Futuristic Oasis",
    tagline: "Synthwave Courtyard",
    concept: "A glowing synthwave resort lounge inside a high-tech desert oasis. Featuring magenta and cyan palm trees, grid lines projected across the floors, retro sports cars displays, and smooth vaporwave ambient soundtracks. It is a relaxing, stylish welcome to campus.",
    accentColor: "#ec4899",
    accentGlow: "rgba(236, 72, 153, 0.4)",
    themeClass: "theme-oasis",
    welcomeMessage: "Slide into the driver's seat. The sun is setting over the grid, the cassette player is loaded, and your university journey is stretching ahead. Welcome to the oasis!",
    games: [
      { title: "Grid Dodgeball", desc: "A neon dodgeball grid where players must navigate projected lines to capture power-up cores." },
      { title: "Vaporwave DJ Mixer Jam", desc: "A lounge jamming session where players create smooth synthwave loops on midi pads." },
      { title: "Cyber Cryptic Hunt", desc: "A trivia treasure hunt solving encrypted riddle tags about campus history to win prizes." }
    ],
    quiz: [
      { question: "What musical style features nostalgic 1980s synth sounds and visual imagery?", options: ["Synthwave", "Dubstep", "Lo-Fi", "Classical"], answer: "Synthwave" },
      { question: "Which primary neon colors define the visual vaporwave aesthetic?", options: ["Magenta and Cyan", "Red and Green", "Yellow and Blue", "White and Black"], answer: "Magenta and Cyan" },
      { question: "What is the iconic car model featured on typical synthwave grid horizons?", options: ["DeLorean DMC-12", "Ford Mustang", "Chevrolet Corvette", "Porsche 911"], answer: "DeLorean DMC-12" }
    ],
    schedule: [
      { time: "06:00 PM", activity: "Drive-In (Cassette Registrations & Oasis Cocktails)", icon: "🌴" },
      { time: "06:30 PM", activity: "Grid Welcome & Soundwave Jams", icon: "🎹" },
      { time: "07:30 PM", activity: "Cyber Hunts & Trivia Battles", icon: "🕶️" },
      { time: "08:30 PM", activity: "Oasis Banquet (Synthwave Diner Burger Bars)", icon: "🍔" },
      { time: "09:30 PM", activity: "Magenta Laser Show & Neon Dance", icon: "🌆" },
      { time: "10:30 PM", activity: "Drive-Out (Farewell Gifts & Swag Bags)", icon: "💾" }
    ],
    nanoBananaPromptBase: "A futuristic palm oasis built inside a modern university building courtyard at night. Tall palm tree silhouettes glowing in electric magenta and neon cyan lights line the walls. A virtual horizon wireframe grid lines the floor. A vintage DeLorean DMC-12 sports car sits in the center with vapor trails. Students wearing retro sunglasses are relaxing on glowing inflatable chairs under string lights. Cinematic lighting, octane render, 8k.",
    pitchScriptDraft: "Let's slide into the driver's seat of our university journey. Welcome to the Retro-Futuristic Oasis: Synthwave Courtyard! We are turning our campus into a relaxing, ultra-stylish vaporwave lounge. Picture electric magenta and cyan palm trees lining our brick walls, and a glowing wireframe grid projected across the courtyard floor. We'll play 'Grid Dodgeball' navigating neon lanes and host a 'Vaporwave DJ Jam' for smooth beats. Freshers get to kick back on glowing inflatable chairs under ambient string lights. Our welcome message treats college like a twilight drive with the cassette player loaded. For the visual poster, we've simulated a DeLorean sitting in the center with vapor trails reflecting neon colors. Vote 'WOULD ATTEND' and let's slide into the sunset together!",
    
    budget: { decor: 1000, audio: 1000, food: 1500, prizes: 500 },
    mocktails: [
      { title: "Outrun Sunrise", ingredients: "Orange juice, grenadine sunrise base, pineapple slice, neon cocktail stick" },
      { title: "Grid Chill", ingredients: "Coconut cream, blue syrup blender, pine soda, lime squeeze" }
    ],
    playlist: [
      { title: "Nightcall", artist: "Kavinsky" },
      { title: "Resonance", artist: "HOME" },
      { title: "Pacific Coast Highway", artist: "Kavinsky" }
    ],
    tasks: [
      { id: "t1", title: "Hire laser lights company for magenta rays", status: "todo" },
      { id: "t2", title: "Project wireframe grid on floor", status: "inprogress" },
      { id: "t3", title: "Print retro sunglasses stickers", status: "done" }
    ],
    layoutItems: [
      { id: "stage", type: "Stage", x: 2, y: 1 },
      { id: "dj", type: "DJ Booth", x: 4, y: 1 },
      { id: "bar", type: "Mocktail Bar", x: 1, y: 3 },
      { id: "photo", type: "Photo Hub", x: 5, y: 3 }
    ],
    seatingTables: [
      { id: "table-1", label: "Sunset Table", capacity: 6, occupants: ["CSE", "ECE"] },
      { id: "table-2", label: "Oasis Table", capacity: 6, occupants: ["MECH", "MECH"] },
      { id: "table-3", label: "Grid Table", capacity: 6, occupants: ["CIVIL", "ECE"] },
      { id: "table-4", label: "Cassette Table", capacity: 6, occupants: [] }
    ],
    attendees: [
      { id: "att-1", name: "Aarav Sharma", email: "aarav.cse@college.edu", dept: "CSE", food: "Veg" },
      { id: "att-2", name: "Neha Patel", email: "neha.ece@college.edu", dept: "ECE", food: "Vegan" }
    ],
    socialCalendar: [
      { day: "Day -5", topic: "Release Synthwave playlist on Spotify", status: "Published" },
      { day: "Day -3", topic: "Launch teaser poster with DeLorean graphics", status: "Draft" }
    ],
    cateringEstimate: { attendees: 300, includeVip: false },
    sponsorship: {
      sponsorName: "Monster Energy",
      contribution: 2000,
      tier: "Gold",
      benefits: ["Logo on Poster", "VIP Lounge Access", "Stage Shoutout"]
    },
    geminiIterations: [
      { version: "v1 Base Concept", timestamp: "10:30 AM", description: "Created original synthwave desert oasis lounge concept draft.", score: 86 },
      { version: "v2 Game refinement", timestamp: "11:15 AM", description: "Added Grid Dodgeball and mapped Vaporwave MIDI loop jams.", score: 91 },
      { version: "v3 Complete Package", timestamp: "02:20 PM", description: "Polished welcome message Driver Seat sunset and verified budgets.", score: 96 }
    ],
    swagList: [
      { item: "Retro Shades", count: 150, cost: 1500, vendor: "Oasis Eyewear" },
      { item: "Cassette Badge", count: 300, cost: 300, vendor: "Retro Badges Co" }
    ],
    posterMockup: { scale: 1, lighting: "Twilight", neonGlow: 60, fog: 30 }
  }
];
