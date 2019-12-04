import { Nade } from "../models/Nade";
import { Layout } from "../components/layout/layout";
import { NadePageMain } from "../components/NadePageMain";
import { Colors } from "../../constants/colors";
import { NadeTitlebar } from "../components/newnade/NadeTitlebar";

type Props = {
  nade: Nade;
};

const NadePage: React.FC<Props> = ({ nade }) => {
  return (
    <Layout>
      <NadeTitlebar title={nade.title} />
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
          }
          .nade-main {
            min-width: 65%;
          }
          .nade-aside {
            border-left: 1px solid ${Colors.PRIMARY_BORDER};
            height: 50px;
            background: white;
            flex: 1;
          }
        `}
      </style>
    </Layout>
  );
};

export { NadePage };
