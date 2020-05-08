import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import Link from "next/link";
import { FaEdit, FaChevronLeft } from "react-icons/fa";

type Props = {
  nadeId: string;
  nadeSlug?: string;
  title: string;
  subTitle?: string;
  canEdit?: boolean;
};

export const NadeTitle: FC<Props> = ({
  title,
  subTitle,
  nadeId,
  canEdit,
  nadeSlug,
}) => {
  const { colors } = useTheme();

  function onBackClick() {
    window.history.back();
  }

  return (
    <>
      <div className="title">
        <div id="back">
          <button onClick={onBackClick}>
            <FaChevronLeft />
          </button>
        </div>

        <h1 className="nade-title">
          <span className="main-title">{title}</span>
          <span className="sub-title">{subTitle}</span>
        </h1>

        {canEdit && (
          <div className="edit">
            <Link
              href="/nades/[...slug]"
              as={`/nades/${nadeSlug || nadeId}/edit`}
            >
              <button className="edit-btn">
                <FaEdit /> EDIT
              </button>
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        .title {
          display: grid;
          grid-template-columns: 70px 1fr 70px;
          grid-template-areas: "backbtn title editbtn";
          width: 100%;
          padding-left: 20px;
          padding-right: 20px;
        }

        #back {
          grid-area: backbtn;
          align-self: center;
        }

        #back button {
          color: ${colors.TEXT};
          font-size: 24px;
          display: block;
          position: relative;
          top: 0px;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          margin: 0;
          padding: 0;
          display: block;
          width: 30px;
          height: 24px;
        }

        .nade-title {
          grid-area: title;
          padding-top: 15px;
        }

        .edit {
          grid-area: editbtn;
          justify-self: end;
          align-self: center;
        }

        .edit-btn {
          background: ${colors.filterBg};
          border: none;
          border-radius: 5px;
          color: white;
          padding: 5px 10px;
          outline: none;
          font-size: 14px;
          cursor: pointer;
          white-space: nowrap;
        }

        .edit-btn:hover {
          background: ${colors.filterBgHover};
        }

        h1 {
          font-size: 26px;
          margin: 0;
          padding: 0;
          font-weight: 300;
          padding: 10px 0px;
          color: ${colors.TEXT};
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .main-title {
        }

        .sub-title {
          font-size: 15px;
          opacity: 0.75;
          margin-top: -15px;
        }

        @media only screen and (max-width: 800px) {
          h1 {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};
