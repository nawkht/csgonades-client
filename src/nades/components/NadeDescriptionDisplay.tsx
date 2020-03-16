import { FC } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import breaks from "remark-breaks";
import { Dimensions } from "../../constants/Constants";

type Props = {
  value?: string;
};

export const NadeDescriptionDisplay: FC<Props> = ({ value }) => {
  if (!value || value.length === 0) {
    return (
      <>
        <div className="no-desc">
          <em>No description. Mouse over me and click edit.</em>
        </div>
        <style jsx>{`
          .no-desc {
            min-height: 250px;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div className="desc-wrap">
        <ReactMarkdown
          linkTarget="_blank"
          disallowedTypes={["heading"]}
          source={value}
          plugins={[breaks]}
        />
      </div>
      <style jsx>{`
        .desc-wrap {
          min-height: 200px;
          padding: 20px 40px;
        }
      `}</style>
    </>
  );
};
