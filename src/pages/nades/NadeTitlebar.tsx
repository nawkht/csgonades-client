import Router from "next/router";
import { FC, useState } from "react";
import { Icon, Input } from "semantic-ui-react";
import { Nade } from "../../models/Nade/Nade";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useUpdateNade } from "../../store/NadeStore/NadeHooks";
import { EditButton } from "../../ui-common/EditButton";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";
import { FavoriteButton } from "./FavoriteButton";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeTitlebar: FC<Props> = ({ nade, allowEdit }) => {
  const theme = useTheme();
  const updateNade = useUpdateNade();
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

  function navigateBack() {
    GoogleAnalytics.event("NadePage", "Navigate back");
    Router.back();
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
            <div className="back-btn" onClick={navigateBack}>
              <Icon name="chevron left" /> Back
            </div>
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
          padding: ${theme.isMobile
            ? theme.uiDimensions.INNER_GUTTER_SIZE
            : theme.uiDimensions.OUTER_GUTTER_SIZE}px;
          padding-bottom: ${theme.isMobile
            ? theme.uiDimensions.INNER_GUTTER_SIZE
            : 0}px;
        }

        .title-contrainer {
          display: flex;
          align-items: center;
        }

        .nade-title h1 {
          display: inline-flex;
          padding: 0;
          margin: 0;
          font-size: ${theme.isMobile ? "1.3em" : "1.4em"};
          font-weight: normal;
          align-items: center;
          margin-top: -2px;
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

        .back-btn {
          cursor: pointer;
          font-size: 1.2em;
          opacity: 0.8;
          margin-right: 12px;
          border-right: 1px solid ${theme.colors.PRIMARY_BORDER};
          padding-right: 12px;
          font-weight: 400;
        }

        .back-btn:hover {
          opacity: 1;
        }
      `}</style>
    </>
  );
};
