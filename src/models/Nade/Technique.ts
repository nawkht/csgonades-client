const TechniqueValues = {
  left: "Mouse left",
  right: "Mouse right",
  both: "Mouse both",
  jumpthrow: "Jumpthrow bind",
};

export type Technique = keyof typeof TechniqueValues;

type TechniqueOption = {
  key: Technique;
  text: string;
  value: Technique;
};

export function techniqueString(tech: Technique) {
  return TechniqueValues[tech];
}

export function nadeTechniqueOptions() {
  const options: TechniqueOption[] = [];
  for (const key in TechniqueValues) {
    const objKey = key as Technique;
    const text = techniqueString(objKey);
    options.push({
      key: objKey,
      text,
      value: objKey,
    });
  }
  return options;
}
