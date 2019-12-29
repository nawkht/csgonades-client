export const NadeMovements = {
  stationary: "Stationary",
  crouching: "Crouching",
  walking: "Walking",
  running: "Running",
  crouchwalking: "Crouchwalking"
};

export function nadeMovementOptions() {
  let options = [];
  for (let key in NadeMovements) {
    options.push({
      key,
      //@ts-ignore
      text: NadeMovements[key],
      value: key
    });
  }
  return options;
}

export type Movement = keyof typeof NadeMovements;
