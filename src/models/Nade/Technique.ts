const TechniqueValues = {
  left: "Mouse left",
  right: "Mouse right",
  both: "Mouse both",
  jumpthrow: "Jumpthrow script"
};

export type Technique = keyof typeof TechniqueValues;

export function nadeTechniqueOptions() {
  let options = [];
  for (let key in TechniqueValues) {
    const objKey = key as Technique;
    const text = techniqueString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey
    });
  }
  return options;
}

export function techniqueString(tech: Technique) {
  return TechniqueValues[tech];
}
