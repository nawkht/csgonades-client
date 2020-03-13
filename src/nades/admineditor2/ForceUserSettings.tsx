import { FC, useState } from "react";
import { CsgnInput } from "../../common/inputs/CsgnInput";
import { CsgnSaveButton } from "../../common/inputs/CsgnSaveButton";
import { useUpdateNadeUser } from "../../store/NadeStore/hooks/useUpdateNadeUser";

type Props = {
  nadeId: string;
  onClose: () => void;
};

export const ForceUserSettings: FC<Props> = ({ nadeId, onClose }) => {
  const [steamIdOrUrl, setSteamIdOrUrl] = useState("");
  const updateUser = useUpdateNadeUser();

  function onUpdateUser() {
    const steamId = cleanSteamId(steamIdOrUrl);
    updateUser(nadeId, steamId);
    onClose();
  }

  return (
    <>
      <CsgnInput value={steamIdOrUrl} onChange={setSteamIdOrUrl} />
      <CsgnSaveButton onClick={onUpdateUser} />
    </>
  );
};

const cleanSteamId = (steamIdOrUrl: string) => {
  const index = steamIdOrUrl.lastIndexOf("/");
  const steamId = steamIdOrUrl.substr(index + 1);
  return steamId;
};
