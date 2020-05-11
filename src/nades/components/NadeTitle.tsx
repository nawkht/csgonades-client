import { FC, memo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import Link from "next/link";
import { FaEdit, FaChevronLeft } from "react-icons/fa";
import { TitleFavBtn } from "./TitleFavBtn";
import { TitleReportBtn } from "./TileReportBtn";
import { CsgoMap } from "../../models/Nade/CsGoMap";

type Props = {
  inModal?: boolean;
  nadeId: string;
  nadeSlug?: string;
  title: string;
  subTitle?: string;
  canEdit?: boolean;
  map?: CsgoMap;
};

export const NadeTitle: FC<Props> = memo(
  ({ title, subTitle, nadeId, canEdit, nadeSlug, inModal, map }) => {
    const { colors } = useTheme();

    return (
      <>
        <div className="title">
          <div id="actions">
            <TitleReportBtn nadeId={nadeId} />
            <TitleFavBtn nadeId={nadeId} />
          </div>

          {!inModal && (
            <div id="back">
              <Link href="/maps/[map]" as={`/maps/${map}`}>
                <button>
                  <FaChevronLeft />
                </button>
              </Link>
            </div>
          )}

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
            position: relative;
            display: grid;
            grid-template-columns: 50px 100px 1fr 100px 50px;
            grid-template-areas:
              "backbtn backbtn title actions actions"
              "backbtn backbtn title actions actions";
            width: 100%;
            padding-left: 20px;
            padding-right: 20px;
          }

          #actions {
            grid-area: actions;
            align-self: center;
            justify-self: end;
            display: flex;
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
            position: absolute;
            top: 0;
            left: 0;
          }

          .edit-btn {
            background: ${colors.filterBg};
            border: none;
            border-top-left-radius: 5px;
            border-bottom-right-radius: 5px;
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
            margin-top: -8px;
          }

          @media only screen and (max-width: 700px) {
            .title {
              grid-template-columns: 50px 1fr 50px;
              grid-template-areas:
                "backbtn title actions"
                "backbtn title actions";
              padding-left: 10px;
              padding-right: 10px;
            }
          }

          @media only screen and (max-width: 600px) {
            .main-title {
              font-size: 20px;
            }

            .sub-title {
              font-size: 12px;
              opacity: 0.75;
              margin-top: -8px;
            }
          }

          @media only screen and (max-width: 500px) {
            .title {
              grid-template-columns: 30px 1fr 30px;
              grid-template-areas:
                "backbtn title actions"
                "backbtn title actions";
              padding-left: 10px;
              padding-right: 10px;
            }

            #actions {
              display: none;
            }
          }
        `}</style>
      </>
    );
  }
);
