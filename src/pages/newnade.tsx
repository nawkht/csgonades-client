import { NextPage } from "next";
import { NewNadePage } from "../newnade/NewNadePage";
import { SEO } from "../layout/Seo";

const NewNadeContainer: NextPage = () => {
  return (
    <>
      <SEO canonical="/newnade" title="New nade" />
      <NewNadePage />
    </>
  );
};

export default NewNadeContainer;
