import { FC, useState } from "react";
import { Input, Button, Icon } from "semantic-ui-react";
import { useUpdateNadeAction } from "../../store/NadeStore/NadeActions";
import { Nade } from "../../models/Nade/Nade";
import { FavoriteButton } from "./FavoriteButton";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { EditButton } from "../../ui-common/EditButton";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeTitlebar: FC<Props> = ({ nade, allowEdit }) => {
  const theme = useTheme();
  const updateNade = useUpdateNadeAction();
  const [isEditing, setIsEditing] = useState(false);
  const [nadeTitle, setNadeTitle] = useState(nade.title || "");

  const theTitle = nadeTitle.length > 0 ? nadeTitle : "No title";

  function onTitleSave() {
    setIsEditing(false);
    updateNade(nade.id, { title: nadeTitle });
  }

  function onCancel() {
    setIsEditing(false);
    setNadeTitle(nade.title);
  }

  return (
    <>
      <div className="nade-title">
        {allowEdit && isEditing && (
          <div className="title-edit-container">
            <Input
              transparent
              placeholder="Search..."
              size="massive"
              value={nadeTitle}
              onChange={e => setNadeTitle(e.target.value)}
            />
            <div className="nade-edit-container">
              <span onClick={onCancel}>
                <Icon circular link color="grey" name="cancel" />
              </span>
              <span onClick={onTitleSave}>
                <Icon inverted circular link color="olive" name="check" />
              </span>
            </div>
          </div>
        )}

        {!isEditing && (
          <div className="title-contrainer">
            <h1>{theTitle}</h1>
            {allowEdit && (
              <div className="title-edit-button">
                <EditButton
                  isEditing={isEditing}
                  onClick={() => setIsEditing(true)}
                />
              </div>
            )}
          </div>
        )}

        <FavoriteButton nadeId={nade.id} />
      </div>
      <style jsx>{`
        .nade-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: ${theme.uiDimensions.OUTER_GUTTER_SIZE}px;
          padding-bottom: 0;
        }

        .title-contrainer {
          display: flex;
          align-items: center;
        }

        .nade-title h1 {
          display: inline-flex;
          padding: 0;
          margin: 0;
          font-size: ${theme.isMobile ? "1.3em" : "1.73em"};
          font-weight: normal;
          align-items: center;
        }

        .title-contrainer:hover .title-edit-button {
          opacity: 1;
        }

        .nade-title .title-edit-button {
          margin-left: 12px;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .title-edit-container {
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  );
};
