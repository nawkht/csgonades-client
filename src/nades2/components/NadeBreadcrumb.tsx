import Link from "next/link";
import { FC } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Nade } from "../../models/Nade/Nade";
import { capitalize } from "../../utils/Common";

type Props = {
  nade: Nade;
};

export const NadeBreadcrumb: FC<Props> = ({ nade }) => {
  if (!nade.map || !nade.title) {
    return null;
  }

  return (
    <>
      <div className="nade-breadcrumb-wrap">
        <div className="nade-breadcrumb">
          <Link href="/">
            <a className="bc-item">Home</a>
          </Link>
          <FaChevronRight size={10} />
          <Link as={`/maps/${nade.map}`} href={`/maps?name=${nade.map}`}>
            <a className="bc-item">{capitalize(nade.map)}</a>
          </Link>
          <FaChevronRight size={10} />
          <span className="bc-item">{nade.title}</span>
        </div>
      </div>

      <style jsx>{`
        .nade-breadcrumb-wrap {
          display: flex;
          justify-content: space-around;
          margin-bottom: 5px;
        }

        .nade-breadcrumb {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          color: #a4a4a4;
        }

        .bc-item {
          margin-right: 5px;
          margin-left: 5px;
        }

        a {
          color: #a4a4a4;
        }

        a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
