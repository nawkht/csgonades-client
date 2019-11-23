import { Nade } from "../models/Nade";
import { Layout } from "../components/layout/layout";
import { NadePageMain } from "../components/NadePageMain";

type Props = {
  nade: Nade;
};

const NadePage: React.FC<Props> = ({ nade }) => {
  return (
    <Layout>
      <div className="nade-container">
        <div className="nade-main">
          <NadePageMain nade={nade} />
        </div>
        <div className="nade-aside"></div>
      </div>
      <style jsx>
        {`
          .nade-container {
            display: flex;
            padding: 18px;
          }
          .nade-main {
            width: 65%;
            margin-right: 18px;
          }
          .nade-aside {
            border: 1px solid purple;
            background: orange;
            height: 50px;
            flex: 1;
          }
        `}
      </style>
    </Layout>
  );
};

export { NadePage };
