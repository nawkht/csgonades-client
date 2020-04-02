import { FC, memo } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Nade } from "../../models/Nade/Nade";
import { capitalize } from "../../utils/Common";
import { PageLink } from "../../common/PageLink";

type Props = {
  nade: Nade;
};

export const NadeBreadcrumb: FC<Props> = memo(({ nade }) => {
  if (!nade.map || !nade.title) {
    return null;
  }

  return (
    <>
      <div className="nade-breadcrumb-wrap">
        <div className="nade-breadcrumb">
          <PageLink href="/" as="/">
            <span className="bc-item link">Home</span>
          </PageLink>
          <FaChevronRight size={10} />
          <PageLink href={`/maps/[map]`} as={`/maps/${nade.map}`}>
            <span className="bc-item link">{capitalize(nade.map)}</span>
          </PageLink>
          <FaChevronRight size={10} />
          <span className="bc-item">{nade.title}</span>
        </div>
      </div>

      <style jsx>{`
        .nade-breadcrumb-wrap {
          display: flex;
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
        }

        .link {
          color: #a4a4a4;
        }

        .link:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
});
