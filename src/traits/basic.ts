export const traits = [
  {
    label: "Absent-Minded",
    iconUrl: "/Trait_Absent-Minded.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Genius", factor: 0.1 },
      { trait: "Artistic", factor: 10 },
    ],
    ownInfluence: [{ trait: "Genius", factor: 0 }],
    requiredAge: "baby",
  },
  {
    label: "Artistic",
    iconUrl: "/Trait_Artistic.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Virtuoso", factor: 10 },
      { trait: "Can't Stand Art", factor: 0.1 },
    ],
    ownInfluence: [{ trait: "Can't Stand Art", factor: 0 }],
    requiredAge: "baby",
  },
  {
    label: "Athletic",
    iconUrl: "/Trait_Athletic.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Adventurous", factor: 10 },
      { trait: "Cou`ch Potato", factor: 0.1 },
    ],
    ownInfluence: [{ trait: "Couch Potato", factor: 0 }],
    requiredAge: "baby",
  },
  {
    label: "Brave",
    iconUrl: "/Trait_Brave.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Daredevil", factor: 10 },
      { trait: "Coward", factor: 0.1 },
    ],
    ownInfluence: [{ trait: "Coward", factor: 0 }],
    requiredAge: "baby",
  },
  {
    label: "Clumsy",
    iconUrl: "/Trait_Clumsy.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Athletic", factor: 0.1 },
      { trait: "Handy", factor: 0.1 },
    ],
    ownInfluence: [
      { trait: "Athletic", factor: 0 },
      { trait: "Handy", factor: 0 },
    ],
    requiredAge: "baby",
  },
  {
    label: "Couch Potato",
    iconUrl: "/Trait_Couch_Potato.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Athletic", factor: 0.1 },
      { trait: "Adventurous", factor: 0.1 },
    ],
    ownInfluence: [
      { trait: "Athletic", factor: 0 },
      { trait: "Adventurous", factor: 0 },
    ],
    requiredAge: "baby",
  },
  {
    label: "Disciplined",
    iconUrl: "/Trait_Disciplined.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Adventurous", factor: 10 },
      { trait: "Rebellious", factor: 0.1 },
    ],
    ownInfluence: [{ trait: "Rebellious", factor: 0 }],
    requiredAge: "baby",
  },
  {
    label: "Easily Impressed",
    iconUrl: "/Trait_Easily_Impressed.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Charismatic", factor: 10 },
      { trait: "Snob", factor: 0.1 },
    ],
    ownInfluence: [{ trait: "Snob", factor: 0 }],
    requiredAge: "baby",
  },
  {
    label: "Eccentric",
    iconUrl: "/Trait_Eccentric.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Genius", factor: 10 },
      { trait: "Absent-Minded", factor: 10 },
    ],
    ownInfluence: [{ trait: "Serious", factor: 0 }],
    requiredAge: "baby",
  },
  {
    label: "Evil",
    iconUrl: "/Trait_Evil.webp",
    weight: 100,
    parentInfluence: [
      { trait: "Mean Spirited", factor: 10 },
      { trait: "Good", factor: 0.1 },
    ],
    ownInfluence: [
      { trait: "Good", factor: 0 },
      { trait: "Friendly", factor: 0 },
    ],
    requiredAge: "baby",
  },
];
