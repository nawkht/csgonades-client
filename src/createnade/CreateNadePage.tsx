import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {};

export const CreateNadePage: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div id="create-nade-page">
        <div id="create-nade-container">
          <h1 id="title">CREATE NADE</h1>
          <div id="create-nade-fields">
            <div id="gfycat">Gfycat</div>
            <div id="preview">Preview</div>
            <div id="info">Start Location End Location</div>
            <div id="meta">Map Type Movement Technique Description</div>
            <button id="submit">Submit</button>
          </div>
        </div>
      </div>

      <aside></aside>
      <style jsx>{`
        #create-nade-page {
          grid-area: main;
          margin: 0px 30px;
          margin-bottom: 100px;
        }

        #create-nade-container {
          background: ${colors.DP02};
          border-radius: 5px;
          overflow: hidden;
        }

        #title {
          background: ${colors.DP01};
          font-size: 24px;
          padding: 15px 30px;
          margin: 0;
          display: block;
        }

        #create-nade-fields {
          display: grid;
          grid-template-columns: 1fr 1fr min-content;
          grid-template-areas:
            "gfycat info meta"
            "preview info meta"
            ". . submit";
          grid-row-gap: 30px;
          grid-column-gap: 30px;
          padding: 30px 30px;
        }

        #submit {
          grid-area: submit;
        }

        #gfycat {
          grid-area: gfycat;
          border: 1px solid red;
        }

        #preview {
          grid-area: preview;
          border: 1px solid green;
        }

        #info {
          grid-area: info;
          border: 1px solid blue;
        }

        #meta {
          grid-area: meta;
          border: 1px solid pink;
        }

        aside {
          width: 300px;
          grid-area: sidebar;
        }
      `}</style>
    </>
  );
};
