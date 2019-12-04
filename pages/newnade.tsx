import { NextPage } from "next";
import { NewNadePage } from "../src/pagecontainers/newnadepage";

const NewNadeContainer: NextPage = () => {
  return <NewNadePage />;
};

NewNadeContainer.getInitialProps = async () => {
  console.log("New nade page get init props");
  return {};
};

export default NewNadeContainer;
