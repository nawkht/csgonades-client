import { FC, useMemo, useState } from "react";
import { Icon } from "semantic-ui-react";
import { EditButton } from "../common/EditButton";
import { Nade } from "../models/Nade/Nade";
import { useUpdateNade } from "../store/NadeStore/NadeHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { capitalize } from "../utils/Common";
type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeTitlebar: FC<Props> = ({ nade, allowEdit }) => {
  const { colors } = useTheme();
  const updateNade = useUpdateNade();
  const [isEditing, setIsEditing] = useState(false);
  const [nadeTitle, setNadeTitle] = useState(nade.title || "");

  const theTitle = useMemo(() => {
    const titleBuilder = [];

    if (nade.map) {
      titleBuilder.push(capitalize(nade.map));
    }

    if (nade.type) {
      titleBuilder.push(nade.type);
      titleBuilder.push("for");
    }

    if (nadeTitle.length) {
      titleBuilder.push(nadeTitle);
    }

    if (titleBuilder.length === 0) {
      return "No title";
    }

    return titleBuilder.join(" ");
  }, [nade, nadeTitle]);

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
            <input
              className="nade-edit-input"
              value={nadeTitle}
              onChange={e => setNadeTitle(e.target.value)}
              placeholder="Add a title.."
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
            {nade.map && (
              <div className="title">
                <h1 itemProp="name">{theTitle}</h1>
              </div>
            )}

            {!nade.map && <h1 className="title-text">{theTitle}</h1>}

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
      </div>
      <style jsx>{`
        .nade-title {
          display: flex;
          margin-bottom: 18px;
        }

        .title h1 {
          padding: 0;
          margin: 0;
          font-size: 1.5em;
          font-weight: 300;
          color: ${colors.TEXT};
        }

        h1 a {
          color: ${colors.TEXT};
        }

        h1 a:hover {
          text-decoration: underline;
        }

        .title-contrainer {
          display: flex;
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

        .nade-edit-input {
          font-size: 1.5em;
          font-weight: 300;
          color: ${colors.TEXT};
          min-width: 500px;
          background: transparent;
          border: none;
          margin-right: 6px;
          outline: none;
        }
      `}</style>
    </>
  );
};
