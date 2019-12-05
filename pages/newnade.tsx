import { NextPage } from "next";
import { NewNadePage } from "../src/pagecontainers/newnadepage";

const NewNadeContainer: NextPage = () => {
  return <NewNadePage />;
};

NewNadeContainer.getInitialProps = async () => {
  return {};
};

export default NewNadeContainer;
