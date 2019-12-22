import { FC, useState, ChangeEvent } from "react";
import { Button } from "semantic-ui-react";
import { useUpdateUser } from "../../../store/NadeStore/NadeActions";

type Props = {
  nadeId: string;
};

export const ForceUserSettings: FC<Props> = ({ nadeId }) => {
  const [steamId, setSteamId] = useState("");
  const updateUser = useUpdateUser();

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSteamId(event.target.value);
  }

  function onUpdateUser() {
    updateUser(nadeId, steamId);
  }

  return (
    <>
      <input
        placeholder="Steam id..."
        value={steamId}
        onChange={onInputChange}
      />
      <Button onClick={onUpdateUser}>Update</Button>
    </>
  );
};
