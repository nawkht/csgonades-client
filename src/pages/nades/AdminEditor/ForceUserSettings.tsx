import { ChangeEvent, FC, useState } from "react";
import { Button, Input } from "semantic-ui-react";
import { useUpdateUser } from "../../../store/NadeStore/NadeHooks";

type Props = {
  nadeId: string;
  onClose: () => void;
};

export const ForceUserSettings: FC<Props> = ({ nadeId, onClose }) => {
  const [steamIdOrUrl, setSteamIdOrUrl] = useState("");
  const updateUser = useUpdateUser();

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSteamIdOrUrl(event.target.value);
  }

  function onUpdateUser() {
    const steamId = cleanSteamId(steamIdOrUrl);
    updateUser(nadeId, steamId);
    onClose();
  }

  return (
    <>
      <Input fluid value={steamIdOrUrl} onChange={onInputChange} />
      <Button onClick={onUpdateUser}>Update</Button>
    </>
  );
};

const cleanSteamId = (steamIdOrUrl: string) => {
  const index = steamIdOrUrl.lastIndexOf("/");
  const steamId = steamIdOrUrl.substr(index + 1);
  return steamId;
};
