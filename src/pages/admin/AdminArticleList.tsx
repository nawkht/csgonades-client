import { FC } from "react";
import { useArticles } from "../../store/ArticleStore/ArticleHooks";

type Props = {};

export const AdminArticleList: FC<Props> = ({}) => {
  const {} = useArticles();
  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
};
