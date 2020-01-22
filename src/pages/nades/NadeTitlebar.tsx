import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Icon, Input } from "semantic-ui-react";
import { Nade } from "../../models/Nade/Nade";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useUpdateNade } from "../../store/NadeStore/NadeHooks";
import { EditButton } from "../../ui-common/EditButton";
import { capitalize } from "../../utils/Common";

type Props = {
  nade: Nade;
  allowEdit: boolean;
};

export const NadeTitlebar: FC<Props> = ({ nade, allowEdit }) => {
  const router = useRouter();
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
            {nade.map && (
              <div className="back-btn">
                <Link href={`/maps?name=${nade.map}`} as={`/maps/${nade.map}`}>
                  <a>{capitalize(nade.map)}</a>
                </Link>

                <Icon name="chevron right" />
              </div>
            )}

            <h1 className="title-text">{theTitle}</h1>
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
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
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
          display: flex;
          font-size: 1.1em;
          font-weight: 400;
          color: #bbb;
        }

        .back-btn a {
          color: ${theme.colors.PRIMARY_BLACK};
          margin-right: 6px;
          font-size: 1.1em;
        }

        .back-btn a:hover {
          text-decoration: underline;
          color: ${theme.colors.PRIMARY};
        }
      `}</style>
    </>
  );
};
