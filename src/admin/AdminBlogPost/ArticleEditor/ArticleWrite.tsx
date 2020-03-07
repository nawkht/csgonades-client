import { FC } from "react";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";

type Props = {
  title: string;
  body: string;
  thumbnailImageUrl: string;
  largeImageUrl: string;
  onTitleChange: (title: string) => void;
  onBodyChange: (body: string) => void;
  onThumbnailImageChange: (thumbnailUrl: string) => void;
  onLargeImageChange: (largeImageUrl: string) => void;
};

export const ArticleWrite: FC<Props> = ({
  onBodyChange,
  onTitleChange,
  onLargeImageChange,
  onThumbnailImageChange,
  title,
  body,
  largeImageUrl,
  thumbnailImageUrl,
}) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="article-writer">
        <input
          defaultValue={title}
          className="article-title"
          placeholder="Title..."
          onBlur={e => onTitleChange(e.target.value)}
        />

        <textarea
          defaultValue={body}
          className="article-body"
          placeholder="Write something :)"
          onBlur={e => {
            onBodyChange(e.target.value);
          }}
        />

        <div className="article-input">
          <label>Article Image Url:</label>
          <input
            defaultValue={largeImageUrl}
            placeholder="Large url..."
            onBlur={e => onLargeImageChange(e.target.value)}
          ></input>
        </div>

        <div className="article-input">
          <label>Article Thumbnail Url:</label>
          <input
            defaultValue={thumbnailImageUrl}
            placeholder="Thumbnail url..."
            onBlur={e => onThumbnailImageChange(e.target.value)}
          ></input>
        </div>
      </div>
      <style jsx>{`
        .article-input {
          display: flex;
          margin-bottom: 12px;
          align-items: center;
        }

        .article-input label {
          min-width: 150px;
        }

        .article-input input {
          flex: 1;
          outline: none;
          padding: 6px;
          border: 1px solid ${colors.BORDER};
          border-radius: 4px;
        }

        .article-writer {
          background: ${colors.DP01};
          padding: 12px;
          border-radius: 4px;
          border: 1px solid ${colors.BORDER};
        }

        .article-title {
          appearance: none;
          border: none;
          margin: 0;
          padding: 0;
          font-size: 1.6em;
          outline: none;
          width: 100%;
          margin-bottom: 12px;
          color: ${colors.TEXT};
          background: ${colors.DP01};
        }

        .article-body {
          width: 100%;
          min-height: 50vh;
          outline: none;
          border: none;
          color: ${colors.TEXT};
          background: ${colors.DP01};
        }
      `}</style>
    </>
  );
};
