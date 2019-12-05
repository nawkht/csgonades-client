import { FC, useState } from "react";
import { Icon, Input, Button } from "semantic-ui-react";
import { updateNadeAction } from "../../store/NadeStore/NadeActions";
import { useReduxDispatch } from "../../store/StoreUtils/ThunkActionType";
import { useRouter } from "next/router";

type Props = {
  nadeId: string;
  title: string;
};

export const NadeTitlebar: FC<Props> = ({ title, nadeId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [nadeTitle, setNadeTitle] = useState(title);
  const dispatch = useReduxDispatch();

  const theTitle = nadeTitle.length > 0 ? nadeTitle : "No title";

  function onTitleSave() {
    setIsEditing(false);
    console.log("User saved nade");
    updateNadeAction(dispatch, nadeId, { title: nadeTitle });
  }

  return (
    <>
      <div className="nade-title">
        <div onClick={() => router.back()}>
          <Icon className="back-icon" link name="chevron left" size="large" />
        </div>
        {isEditing && (
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
            <div className="title-edit-button">
              <Button icon="edit" circular onClick={() => setIsEditing(true)} />
            </div>
          </h1>
        )}

        <Icon
          circular
          link
          color="yellow"
          className="favorite-icon"
          name="star"
          size="large"
        />
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
