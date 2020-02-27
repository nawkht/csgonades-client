import { FC } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import breaks from "remark-breaks";

type Props = {
  value?: string;
};

export const NadeDescriptionDisplay: FC<Props> = ({ value }) => {
  if (!value || value.length === 0) {
    return <div>No description</div>;
  }

  return (
    <ReactMarkdown
      linkTarget="_blank"
      disallowedTypes={["heading"]}
      source={value}
      plugins={[breaks]}
    />
  );
};
