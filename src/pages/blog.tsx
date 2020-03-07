import { NextPage } from "next";

type Props = {};

const Blog: NextPage<Props> = ({}) => {
  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
};

Blog.getInitialProps = async ({ store }) => {
  const { dispatch } = store;

  return;
};

export default Blog;
