import { FC } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  value: string;
};

export const NadeDescriptionDisplay: FC<Props> = ({ value }) => {
  console.log("NadeDescriptionDisplay", value);

  if (value.length === 0) {
    return <div>No description</div>;
  }

  return <ReactMarkdown source={value} />;
};
