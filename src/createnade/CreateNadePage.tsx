import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { PageCentralize } from "../common/PageCentralize";
import { TypeSelector } from "./components/TypeSelector";
import { Dimensions } from "../constants/Constants";
import { BigLabel } from "./components/BigLabel";
import { GfyInput } from "./components/GfyInput";
import { MapSelector } from "./components/MapSelector";
import { ThrownFromInput } from "./components/ThrownFromInput";
import { EndPosInput } from "./components/EndPosInput";
import { DescriptionInput } from "./components/DescriptionInput";
import { ImageSelector } from "./components/ImageSelector";
import { MovementSelector } from "./components/MovementSelector";
import { TechniqueSelector } from "./components/TechniqueSelector";

type Props = {};

export const CreateNadePage: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <PageCentralize>
        <h1 id="title">SUBMIT NADE</h1>
        <div id="create-nade-page">
          <div id="info-label">
            <BigLabel value="Information" />
          </div>

          <div id="map-selector">
            <MapSelector />
          </div>

          <div id="gfy-input">
            <GfyInput />
          </div>

          <div id="end-pos">
            <EndPosInput />
          </div>

          <div id="start-pos">
            <ThrownFromInput />
          </div>

          <div id="description">
            <DescriptionInput />
          </div>

          <div id="media-label">
            <BigLabel value="Images" />
          </div>

          <div id="result-image">
            <ImageSelector />
          </div>

          <div id="meta-label">
            <BigLabel value="Meta data" />
          </div>

          <div id="type-selector">
            <TypeSelector />
          </div>

          <div id="movement-selector">
            <MovementSelector />
          </div>

          <div id="technique-selector">
            <TechniqueSelector />
          </div>

          <div id="preview-label">
            <BigLabel value="Preview" />
          </div>

          <div id="preview">Preview...</div>

          <button id="submit">Submit</button>
        </div>
      </PageCentralize>

      <aside></aside>
      <style jsx>{`
        #title {
          background: ${colors.DP01};
          font-size: 24px;
          padding: 15px 30px;
          margin: 0;
          display: block;
          margin-top: ${Dimensions.GUTTER_SIZE}px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        #create-nade-page {
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-template-areas:
            "infolabel medialabel"
            "mapsel resultimg"
            "gfyip metalabel"
            "endpos typesel"
            "startpos movesel"
            "desc techsel"
            "desc ."
            "desc previewlabel"
            "desc preview"
            ". submit";
          grid-row-gap: ${Dimensions.GUTTER_SIZE / 1.5}px;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          padding: 30px 30px;
          background: ${colors.DP02};
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          margin-bottom: 150px;
        }

        #preview {
          grid-area: preview;
        }

        #technique-selector {
          grid-area: techsel;
        }

        #movement-selector {
          grid-area: movesel;
        }

        #result-image {
          grid-area: resultimg;
        }

        #description {
          grid-area: desc;
        }

        #end-pos {
          grid-area: endpos;
        }

        #start-pos {
          grid-area: startpos;
        }

        #map-selector {
          grid-area: mapsel;
        }

        #gfy-input {
          grid-area: gfyip;
        }

        #media-label {
          grid-area: medialabel;
        }

        #meta-label {
          grid-area: metalabel;
          align-self: end;
        }

        #type-selector {
          grid-area: typesel;
        }

        #info-label {
          grid-area: infolabel;
        }

        #submit {
          grid-area: submit;
        }

        #preview-label {
          grid-area: previewlabel;
        }
      `}</style>
    </>
  );
};
