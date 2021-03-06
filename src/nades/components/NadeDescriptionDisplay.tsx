import { FC } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import breaks from "remark-breaks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  value?: string;
};

export const NadeDescriptionDisplay: FC<Props> = ({ value }) => {
  const { colors } = useTheme();
  if (!value || value.length === 0) {
    return (
      <>
        <div className="no-desc">
          <em>No description. Mouse over me and click edit.</em>
        </div>
        <style jsx>{`
          .no-desc {
            min-height: 200px;
            margin: 15px 30px;
            padding: 10px;
            background: ${colors.WARNING};
            color: white;
            border-radius: 5px;
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
          padding: 40px 40px;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
