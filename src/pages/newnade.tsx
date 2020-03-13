import { NextPage } from "next";
import { NewNadePage } from "../newnade/NewNadePage";
import { withRedux } from "../utils/WithRedux";

const NewNadeContainer: NextPage = () => {
  return <NewNadePage />;
};

export default withRedux(NewNadeContainer, { ssr: false });
