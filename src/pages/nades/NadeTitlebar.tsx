import { FC, useState } from "react";
import { Icon, Input, Button } from "semantic-ui-react";
import { useUpdateNadeAction } from "../../store/NadeStore/NadeActions";
import { useRouter } from "next/router";
import { Nade } from "../../models/Nade";
import { FavoriteButton } from "./FavoriteButton";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeTitlebar: FC<Props> = ({ nade, allowEdit }) => {
  const router = useRouter();
  const updateNade = useUpdateNadeAction();
  const [isEditing, setIsEditing] = useState(false);
  const [nadeTitle, setNadeTitle] = useState(nade.title || "");

  const theTitle = nadeTitle.length > 0 ? nadeTitle : "No title";

  function onTitleSave() {
    setIsEditing(false);
    updateNade(nade.id, { title: nadeTitle });
  }

  return (
    <>
      <div className="nade-title">
        <div onClick={() => router.back()}>
          <Icon link className="back-icon" name="chevron left" size="large" />
        </div>
        {allowEdit && isEditing && (
          <div className="title-edit-container">
            <Input
              value={nadeTitle}
              onChange={e => setNadeTitle(e.target.value)}
            />
            <Button onClick={onTitleSave}>Update</Button>
          </div>
        )}

        {!isEditing && (
          <h1>
            {theTitle}
            {allowEdit && (
              <div className="title-edit-button">
                <Button
                  icon="pencil alternate"
                  circular
                  onClick={() => setIsEditing(true)}
                />
              </div>
            )}
          </h1>
        )}

        <FavoriteButton nadeId={nade.id} />
      </div>
      <style jsx>{`
        .nade-title {
          display: flex;
          align-items: center;
          padding: 18px 18px 0 18px;
        }

        .nade-title h1 {
          display: inline-flex;
          padding: 0;
          margin: 0;
          font-size: 1.9em;
          margin-left: 12px;
          font-weight: normal;
          flex: 1;
          align-items: center;
        }

        .title-edit-container {
          flex: 1;
        }

        .nade-title h1:hover .title-edit-button {
          opacity: 1;
        }

        .nade-title h1 .title-edit-button {
          margin-left: 12px;
          opacity: 0;
          transition: opacity 0.3s;
        }
      `}</style>
    </>
  );
};
