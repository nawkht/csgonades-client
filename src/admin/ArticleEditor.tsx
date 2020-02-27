import React, { FC, useState } from "react";
// @ts-ignore
import JsxParser from "react-jsx-parser";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import breaks from "remark-breaks";
import { NadeMarkdown } from "../common/NadeMarkdown";

export const ArticleEditor: FC = () => {
  const [content, setContent] = useState("");

  const components = {
    NadeMarkdown,
  };

  return (
    <>
      <textarea
        className="markdown-editor"
        onBlur={e => {
          setContent(e.target.value);
        }}
      />
      <div className="react-markdown">
        <ReactMarkdown
          source={content}
          plugins={[breaks]}
          escapeHtml={false}
          renderers={{
            code: ({ language, value }) => {
              // render "jsx" type as self-contained JSX (with only above components exposed)
              if (language === "jsx") {
                return <JsxParser jsx={value} components={components} />;
              }

              const className = language && `language-${language}`;
              const code = React.createElement(
                "code",
                className ? { className: className } : null,
                value
              );
              return React.createElement("pre", {}, code);
            },
          }}
        />
      </div>
      <style jsx>{`
        .markdown-editor {
          width: 100%;
          min-height: 50vh;
          outline: none;
        }
        .react-markdown {
          border: 1px solid red;
        }
      `}</style>
    </>
  );
};
