const seedData = {
  users: [
    {
      email: "hi@skogsraven.com",
      password: "pw",
      shippingAddress: {
        name: "Jay",
        street: "Skogsväg 1",
        zipCode: 12345,
        city: "Äventyrsberg",
        country: "Sweden",
      },
      billingAddress: {
        name: "Jay",
        street: "Skogsväg 1",
        zipCode: 12345,
        city: "Äventyrsberg",
        country: "Sweden",
      },
    },
  ],
  categories: [
    {
      name: "Cooking",
    },
    {
      name: "Clothing",
    },
    {
      name: "Tents",
    },
    {
      name: "Sleeping bags",
    },
    {
      name: "Climbing gear",
    },
    {
      name: "Vanlife",
    },
    {
      name: "Wintersports",
    },
    {
      name: "Other",
    },
  ],
  products: [
    // Cooking
    {
      name: "Storm kitchen set",
      categoryName: "Cooking",
      shortDescription: "2 gas powered stoves including 2 pots",
      description:
        "Compact storm kitchen for outdoor cooking (l: 48cm, w: 25cm, h: 9cm). Comes with 2 collapsable pots (15cm and 22cm diameter). Space for 2 butane gas cartridges. Outdoor use only!",
      price: 49,
      numAvailable: 100,
    },
    {
      name: "Portable Coffee Press",
      categoryName: "Cooking",
      shortDescription: "Compact coffee maker for 1-2 cups",
      description:
        "Lightweight and durable coffee press with 350ml capacity. Made of BPA-free plastic. Perfect for camping mornings.",
      price: 24.99,
      numAvailable: 75,
    },
    {
      name: "Titanium Cutlery Set",
      categoryName: "Cooking",
      shortDescription: "Spoon, fork, knife & chopsticks",
      description:
        "Ultralight titanium cutlery with carrying pouch. Rust-proof and heat-resistant. Total weight: 120g.",
      price: 19.95,
      numAvailable: 120,
    },
    {
      name: "Collapsible Kettle",
      categoryName: "Cooking",
      shortDescription: "Silicone kettle for gas stoves",
      description:
        "1L collapsible silicone kettle with aluminum base. Folds down to 5cm height. For outdoor gas stoves only.",
      price: 34.5,
      numAvailable: 60,
    },
    {
      name: "Camping Spice Rack",
      categoryName: "Cooking",
      shortDescription: "6 refillable spice containers in soft roll case",
      description:
        "Bring your favorite spices to the wild. Includes salt, pepper, garlic, chili flakes, oregano, and curry powder.",
      price: 14.99,
      numAvailable: 80,
    },

    // Clothing
    {
      name: "Merino Wool Base Layer",
      categoryName: "Clothing",
      shortDescription: "Thermal shirt for cold climates",
      description:
        "Breathable, itch-free merino wool shirt (260g/m²). Natural odor resistance. Unisex fit, sizes S–XL.",
      price: 59,
      numAvailable: 95,
    },
    {
      name: "Convertible Hiking Pants",
      categoryName: "Clothing",
      shortDescription: "Zip-off pants to shorts",
      description:
        "Quick-dry fabric with UV protection. Multiple zippered pockets. Available in 4 colors.",
      price: 44.9,
      numAvailable: 110,
    },
    {
      name: "Insulated Down Jacket",
      categoryName: "Clothing",
      shortDescription: "Warm and compressible jacket",
      description:
        "650-fill goose down insulation, packs into own pocket. Windproof outer layer. Water-repellent coating.",
      price: 129,
      numAvailable: 50,
    },
    {
      name: "Wool Hiking Socks (3-Pack)",
      categoryName: "Clothing",
      shortDescription: "Breathable and warm hiking socks",
      description:
        "Anti-blister, moisture-wicking blend. Sizes M–XL. Perfect for long treks.",
      price: 22,
      numAvailable: 150,
    },
    {
      name: "Sun Protection Hat",
      categoryName: "Clothing",
      shortDescription: "Wide-brim hat with neck cover",
      description:
        "UPF 50+ protection. Adjustable strap and breathable fabric. Folds flat.",
      price: 18.5,
      numAvailable: 90,
    },

    // Tents
    {
      name: "Alpine 2-Person Tent",
      categoryName: "Tents",
      shortDescription: "Lightweight, 3-season tent",
      description:
        "2.4kg freestanding dome tent. Waterproof up to 3000mm. Vestibule for gear storage. Mesh roof for ventilation.",
      price: 189,
      numAvailable: 30,
    },
    {
      name: "Solo Bivy Shelter",
      categoryName: "Tents",
      shortDescription: "Minimalist one-person tent",
      description:
        "Compact bivy shelter with waterproof breathable fabric. Weight: 900g. Ideal for fastpacking or alpine missions.",
      price: 115,
      numAvailable: 40,
    },
    {
      name: "Family Dome Tent 6P",
      categoryName: "Tents",
      shortDescription: "Spacious 6-person tent with divider",
      description:
        "Interior divider for privacy. Rainfly, mesh windows, 3 doors. Weight: 6.8kg.",
      price: 239,
      numAvailable: 20,
    },
    {
      name: "Ultralight Tarp Shelter",
      categoryName: "Tents",
      shortDescription: "Versatile tarp with multiple configurations",
      description:
        "Can be pitched with trekking poles. 3x3m, ripstop nylon. Weight: 600g.",
      price: 59,
      numAvailable: 55,
    },

    // Sleeping bags
    {
      name: "Down Sleeping Bag -5°C",
      categoryName: "Sleeping bags",
      shortDescription: "3-season mummy sleeping bag",
      description:
        "850g bag filled with hydrophobic duck down. Comfort rated to -5°C. Packs to 20x12cm.",
      price: 139,
      numAvailable: 0,
    },
    {
      name: "Sleeping Pad Ultralight",
      categoryName: "Sleeping bags",
      shortDescription: "Inflatable pad with R-value 3.2",
      description:
        "190cm x 55cm pad, only 480g. 8cm thick when inflated. Repair kit included.",
      price: 42.5,
      numAvailable: 85,
    },
    {
      name: "Sleeping Bag Liner",
      categoryName: "Sleeping bags",
      shortDescription: "Microfiber liner for added warmth",
      description:
        "Increases sleeping bag warmth by ~5°C. Easy to wash. Packs down small.",
      price: 21,
      numAvailable: 70,
    },
    {
      name: "Double Sleeping Bag",
      categoryName: "Sleeping bags",
      shortDescription: "Spacious bag for two people",
      description:
        "Rated to 0°C. Can also be split into two singles. Includes compression sack.",
      price: 89.9,
      numAvailable: 30,
    },

    // Climbing gear
    {
      name: "Climbing Harness Pro",
      categoryName: "Climbing gear",
      shortDescription: "Adjustable harness with 4 gear loops",
      description:
        "Padded waist and leg loops, reinforced tie-in points. Fits waist sizes 68–110cm.",
      price: 58,
      numAvailable: 45,
    },
    {
      name: "Chalk Bag + Chalk Ball",
      categoryName: "Climbing gear",
      shortDescription: "Non-spill bag and refillable chalk ball",
      description:
        "Drawstring closure chalk bag with adjustable waist belt. Comes with 60g of magnesium carbonate.",
      price: 17.5,
      numAvailable: 100,
    },
    {
      name: "Belay Device + Carabiner",
      categoryName: "Climbing gear",
      shortDescription: "Assisted-braking belay device combo",
      description:
        "Durable aluminum belay device with auto-locking. Includes locking HMS carabiner.",
      price: 39,
      numAvailable: 70,
    },
    {
      name: "Helmet - Lightweight Climber",
      categoryName: "Climbing gear",
      shortDescription: "Ventilated climbing helmet",
      description:
        "Impact-absorbing shell, adjustable chin strap. CE-certified for rock climbing and alpine use.",
      price: 64,
      numAvailable: 40,
    },

    // Vanlife
    {
      name: "12V Mini Fridge",
      categoryName: "Vanlife",
      shortDescription: "Electric cooler for camper vans",
      description:
        "Fits 12L. Powered by 12V DC. Energy-efficient compressor, temp down to -10°C. Quiet operation.",
      price: 169,
      numAvailable: 20,
    },
    {
      name: "Folding Camp Table",
      categoryName: "Vanlife",
      shortDescription: "Aluminum table with adjustable height",
      description:
        "90x60cm surface. Folds to briefcase size. Legs extend 40–70cm. Includes carry handle.",
      price: 49.9,
      numAvailable: 55,
    },
    {
      name: "Solar Shower 20L",
      categoryName: "Vanlife",
      shortDescription: "Heated water bag for outdoor use",
      description:
        "PVC water bag with black coating to absorb heat. Hanging cord included. Reaches 45°C after 3 hours of sun.",
      price: 26,
      numAvailable: 70,
    },
    {
      name: "Van Window Insulation Kit",
      categoryName: "Vanlife",
      shortDescription: "Thermal covers for camper van windows",
      description:
        "Set of 6 reflective, insulated covers. Reduces heat loss and adds privacy.",
      price: 74,
      numAvailable: 25,
    },

    // Wintersports
    {
      name: "Snowshoes Trekking Pro",
      categoryName: "Wintersports",
      shortDescription: "Durable aluminum snowshoes",
      description:
        "Supports up to 120kg. Adjustable bindings, heel lifts for inclines. For snowy terrain and trails.",
      price: 89,
      numAvailable: 0,
    },
    {
      name: "Thermal Ski Gloves",
      categoryName: "Wintersports",
      shortDescription: "Insulated waterproof gloves",
      description:
        "Windproof and breathable. Synthetic insulation with touchscreen fingertips. Available in sizes S–XL.",
      price: 34,
      numAvailable: 80,
    },
    {
      name: "Ski Goggles Dual Lens",
      categoryName: "Wintersports",
      shortDescription: "Anti-fog, UV-protective ski goggles",
      description:
        "Double-layer lens, anti-scratch coating. Interchangeable lens system. OTG compatible.",
      price: 52.5,
      numAvailable: 60,
    },
    {
      name: "Heated Boot Insoles",
      categoryName: "Wintersports",
      shortDescription: "Rechargeable heated insoles",
      description:
        "Keeps feet warm for up to 8 hours. Wireless remote temperature control.",
      price: 59,
      numAvailable: 40,
    },

    // Other
    {
      name: "Hammock XL",
      categoryName: "Other",
      shortDescription: "Hammock for 2 with mosquito net",
      description:
        "Extra large outdoor hammock (l: 230cm, w: 75cm). Extra light and robust, quickly drying material. Can take up to 300kg. Comes with rope for attaching it to trees.",
      price: 39.5,
      numAvailable: 49,
    },
    {
      name: "Multitool 18-in-1",
      categoryName: "Other",
      shortDescription: "Compact stainless steel tool",
      description:
        "Includes knife, pliers, screwdriver, bottle opener, saw, and more. Foldable, comes with belt pouch.",
      price: 29.9,
      numAvailable: 95,
    },
    {
      name: "Water Filter Straw",
      categoryName: "Other",
      shortDescription: "Drink directly from streams",
      description:
        "Filters 99.99% of bacteria and protozoa. Filters up to 1500L. Weighs only 60g.",
      price: 21,
      numAvailable: 100,
    },
    {
      name: "Headlamp 300 Lumen",
      categoryName: "Other",
      shortDescription: "Rechargeable headlamp with red light",
      description:
        "USB-charging, water-resistant (IPX5), 4 lighting modes. Battery life up to 40 hours.",
      price: 32,
      numAvailable: 0,
    },
    {
      name: "First Aid Kit - Trail",
      categoryName: "Other",
      shortDescription: "Compact kit for minor injuries",
      description:
        "Includes bandages, antiseptic, tweezers, scissors, gloves, emergency blanket. Weighs 180g.",
      price: 19,
      numAvailable: 65,
    },
  ],
};

export default seedData;
