import { FC } from "react";
import { Message } from "semantic-ui-react";
import { Layout2 } from "../common/layout/Layout2";

export const NadeNotFound: FC = () => {
  return (
    <Layout2 title="Not found">
      <div className="not-found">
        <Message negative size="large">
          <Message.Header>404 NOT FOUND</Message.Header>
          <p>
            We could not find the nade, perhaps you where linked here from
            remote site.
          </p>
          <p> Try browsing the nades by map and you might find it again.</p>
        </Message>
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
