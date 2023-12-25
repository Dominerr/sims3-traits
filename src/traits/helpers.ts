export const traitExistsForAge = (age: string, requiredAge: string) => {
  switch (age) {
    case "baby":
      return requiredAge === "baby";
    case "child":
      return requiredAge === "baby" || requiredAge === "child";
    case "teen":
      return (
        requiredAge === "baby" ||
        requiredAge === "child" ||
        requiredAge === "teen"
      );
    case "adult":
      return true;
    default:
      return false;
  }
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
