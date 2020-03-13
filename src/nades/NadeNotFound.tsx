import { FC } from "react";
import { Layout2 } from "../layout/Layout2";

export const NadeNotFound: FC = () => {
  return (
    <Layout2 title="Not found">
      <div className="not-found">
        <h1>404 NOT FOUND</h1>
        <p>
          We could not find the nade, perhaps you where linked here from remote
          site.
        </p>
        <p> Try browsing the nades by map and you might find it again.</p>
      </div>
      <style jsx>{`
        .not-found {
          min-height: 82vh;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
      `}</style>
    </Layout2>
  );
};
