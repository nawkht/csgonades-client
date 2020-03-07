import { FC } from "react";
import { useBlog } from "../store/BlogStore/BlogHooks";

type Props = {};

export const AdminArticleList: FC<Props> = ({}) => {
  const {} = useBlog();
  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
};
