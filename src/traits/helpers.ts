export const traitExistsForAge = (age: string, requiredAge: string) => {
  switch (requiredAge) {
    case "adult":
      return age === "adult";
    case "teen":
      return age === "teen" || age === "adult";
    case "child":
      return age === "child" || age === "teen" || age === "adult";
    case "baby":
      return true;
    default:
      return false;
  }
};
