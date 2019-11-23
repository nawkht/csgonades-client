import { Dropdown } from "semantic-ui-react";

export const NadeMeta = () => {
  const maps = ["dust2", "mirage", "cache"];
  const mapsOptions = maps.map(map => ({
    key: map,
    text: upper(map),
    value: map
  }));

  return (
    <>
      Map: <Dropdown placeholder="Map" selection options={mapsOptions} />
      <br />
      Movement: <Dropdown placeholder="Map" selection options={mapsOptions} />
      <br />
      Technique: <Dropdown placeholder="Map" selection options={mapsOptions} />
      <br />
    </>
  );
};

const upper = (value: string) =>
  value.charAt(0).toUpperCase() + value.substring(1);
