import React, { FC, useState } from "react";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { ArticlePreview } from "./ArticlePreview";
import { ArticleWrite } from "./ArticleWrite";

type ArticleEditorTab = "write" | "preview";

export const ArticleEditor: FC = () => {
  const { colors } = useTheme();
  const [tab, setTab] = useState<ArticleEditorTab>("write");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [thumbnailImagelUrl, setThumbnaiImagelUrl] = useState("");
  const [largeImageUrl, setLargeImageUrl] = useState("");

  function onSave() {
    // no-op
  }

  return (
    <>
      <div className="article-editor">
        <div className="article-editor-tabs">
          <button onClick={() => setTab("write")}>Write</button>
          <button onClick={() => setTab("preview")}>Preview</button>
          <button onClick={onSave}>Save</button>
        </div>
        {tab === "write" && (
          <ArticleWrite
            title={title}
            body={body}
            largeImageUrl={largeImageUrl}
            thumbnailImageUrl={thumbnailImagelUrl}
            onTitleChange={setTitle}
            onBodyChange={setBody}
            onLargeImageChange={setLargeImageUrl}
            onThumbnailImageChange={setThumbnaiImagelUrl}
          />
        )}
        {tab === "preview" && <ArticlePreview title={title} body={body} />}
      </div>
      <style jsx>{`
        .article-editor-tabs {
          background: ${colors.DP01};
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 4px;
          border: 1px solid ${colors.BORDER};
        }
      `}</style>
    </>
  );
};
