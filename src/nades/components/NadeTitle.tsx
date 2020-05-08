import { FC } from "react";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  nadeId: string;
  nadeSlug?: string;
  title: string;
  canEdit?: boolean;
};

export const NadeTitle: FC<Props> = ({ title, canEdit, nadeId, nadeSlug }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="title">
        <h1>{title}</h1>
        {canEdit && (
          <Link
            href="/nades/[...slug]"
            as={`/nades/${nadeSlug || nadeId}/edit`}
          >
            <button className="edit-btn">
              <FaEdit /> EDIT
            </button>
          </Link>
        )}
      </div>

      <style jsx>{`
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-right: 15px;
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
        }

        .edit-btn:hover {
          background: ${colors.filterBgHover};
        }

        h1 {
          font-size: 28px;
          margin: 0;
          padding: 0;
          font-weight: 300;
          padding: 10px 0px;
          color: ${colors.TEXT};
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
