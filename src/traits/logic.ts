import { traits } from "@/traits/basic";
import { traitExistsForAge } from "./helpers";
export function generateChildTrait(
  age: string,
  parentsTraits: typeof traits,
  ownTraits: typeof traits,
  expansions: string[]
) {
  const filteredTraits = traits.filter(
    (trait) =>
      expansions.includes(trait.expansion) || trait.expansion === "Base Game"
  );
  const babyTraits = [...ownTraits];
  let newTraits = JSON.parse(JSON.stringify(filteredTraits)) as typeof traits;
  newTraits = newTraits.filter(
    (trait) =>
      traitExistsForAge(age, trait.requiredAge) &&
      !babyTraits.map((trait) => trait.label).includes(trait.label)
  );

  const isBaby = age === "baby";

  parentsTraits.forEach((parentTrait) => {
    parentTrait.parentInfluence.forEach((influence) => {
      const updatedTrait = newTraits.find(
        (trait) => trait.label === influence?.trait
      );
      if (!updatedTrait) return;
      updatedTrait.weight *= influence?.factor || 1;
      newTraits = Array.from(new Set([...newTraits, updatedTrait]));
    });
  });

  (ownTraits || []).forEach((ownTrait) => {
    ownTrait.ownInfluence.forEach((influence) => {
      const updatedTrait = newTraits.find(
        (trait) => trait.label === influence?.trait
      );
      if (!updatedTrait) return;
      updatedTrait.weight *= influence?.factor || 1;
      newTraits = Array.from(new Set([...newTraits, updatedTrait]));
    });
  });

  if (isBaby) {
    const firstTrait = selectRandomTrait(newTraits);
    if (!firstTrait) throw new Error("No trait found");
    newTraits = newTraits.filter((trait) => trait.label !== firstTrait);
    const secondTrait = selectRandomTrait(newTraits);
    return [firstTrait, secondTrait];
  }

  return [selectRandomTrait(newTraits)];
}

function selectRandomTrait(traitWeights: typeof traits) {
  let totalWeight = 0;
  let cumulativeWeights: {
    trait: string;
    cumulativeWeight: number;
  }[] = [];

  // Calculate the total weight of all traits
  traitWeights.forEach((trait) => {
    totalWeight += trait.weight;
    cumulativeWeights.push({
      trait: trait.label,
      cumulativeWeight: totalWeight,
    });
  });

  // Select a random trait
  const randomWeight = Math.random() * totalWeight;
  const selectedTrait = cumulativeWeights.find(
    (cw) => randomWeight <= cw.cumulativeWeight
  )!;

  return selectedTrait.trait;
}
