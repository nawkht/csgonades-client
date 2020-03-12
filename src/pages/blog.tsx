import { NextPage } from "next";
import { withRedux } from "../utils/WithRedux";

type Props = {};

const Blog: NextPage<Props> = ({}) => {
  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
};

Blog.getInitialProps = async () => {
  return;
};

export default withRedux(Blog);
