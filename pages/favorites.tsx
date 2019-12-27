import { NextPage } from "next";
import { Layout } from "../src/ui-common/layout/layout";
import { FavoritesPage } from "../src/pages/favorites/FavoritesPage";

const FavoritesContrainer: NextPage = () => {
  return (
    <Layout>
      <FavoritesPage />
    </Layout>
  );
};

export default FavoritesContrainer;
