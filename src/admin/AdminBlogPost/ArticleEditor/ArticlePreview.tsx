import React, { FC } from "react";
// @ts-ignore
import JsxParser from "react-jsx-parser";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import breaks from "remark-breaks";
import { NadeMarkdown } from "../../../common/NadeMarkdown";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";

const components = {
  NadeMarkdown,
};

type Props = {
  title: string;
  body: string;
};

export const ArticlePreview: FC<Props> = ({ title, body }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="article-preview">
        <h1>{title}</h1>
        <ReactMarkdown
          source={body}
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
        .article-preview {
          background: ${colors.DP01};
          padding: 12px;
          border-radius: 4px;
          border: 1px solid ${colors.BORDER};
          color: ${colors.TEXT};
        }

        .article-preview h1 {
          font-size: 1.5em;
        }
      `}</style>
    </>
  );
};
