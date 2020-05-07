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
import { useCreateNadeState } from "./CreateNadeReducer";
import { PreviewNade } from "./PreviewNades";
import { ImageUploader } from "../newnade/ImageUploader";
import { MapPositionEditor } from "../nades/components/MapPositionEditor";
import { SumbitBtn } from "./components/SubmitBtn";

type Props = {};

export const CreateNadePage: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { state, dispatch, disableSubmit } = useCreateNadeState();

  return (
    <>
      <PageCentralize>
        <h1 id="title">SUBMIT NADE</h1>
        <div id="create-nade-page">
          <div id="info-label">
            <BigLabel value="Information" />
          </div>

          <div id="map-selector">
            <MapSelector
              onChange={(map) => dispatch({ type: "CreateNade/SetMap", map })}
            />
          </div>

          <div id="gfy-input">
            <GfyInput
              onChange={(data) =>
                dispatch({ type: "CreateNade/SetGfyData", data })
              }
            />
          </div>

          <div id="end-pos">
            <EndPosInput
              onChange={(endPosition) =>
                dispatch({ type: "CreateNade/SetEndPosition", endPosition })
              }
            />
          </div>

          <div id="start-pos">
            <ThrownFromInput
              onChange={(startPosition) =>
                dispatch({ type: "CreateNade/SetStartPosition", startPosition })
              }
            />
          </div>

          <div id="description">
            <DescriptionInput
              onChange={(description) =>
                dispatch({ type: "CreateNade/SetDescription", description })
              }
            />
          </div>

          <div id="media-label">
            <BigLabel value="Images" />
          </div>

          <div id="result-image">
            <ImageSelector
              imageIsSet={!!state.imageBase64}
              onClick={() => dispatch({ type: "CreateNade/ShowImageSelector" })}
            />
          </div>

          <div id="map-position-selector">
            <MapPositionEditor
              map={state.map}
              endPos={state.mapEndCoord}
              onSave={(coords) =>
                dispatch({ type: "CreateNade/SetEndPosCoords", coords })
              }
            />
          </div>

          <div id="meta-label">
            <BigLabel value="Meta Data" />
          </div>

          <div id="type-selector">
            <TypeSelector
              onChange={(nadeType) =>
                dispatch({ type: "CreateNade/SetNadeType", nadeType })
              }
            />
          </div>

          <div id="movement-selector">
            <MovementSelector
              onChange={(movement) =>
                dispatch({ type: "CreateNade/SetMovement", movement })
              }
            />
          </div>

          <div id="technique-selector">
            <TechniqueSelector
              onChange={(technique) =>
                dispatch({
                  type: "CreateNade/SetTechnique",
                  technique,
                })
              }
            />
          </div>

          <div id="preview-label">
            <BigLabel value="Preview" />
          </div>

          <div id="preview">
            <PreviewNade nade={state} />
          </div>

          <div id="submit">
            <SumbitBtn disabled={disableSubmit} />
          </div>

          {state.showImageAdder && (
            <div id="image-adder">
              <ImageUploader
                onImageCropped={(image) =>
                  dispatch({ type: "CreateNade/SetImage", image })
                }
              />
            </div>
          )}
        </div>
      </PageCentralize>

      <aside></aside>
      <style jsx>{`
        #image-adder {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          padding: ${Dimensions.GUTTER_SIZE}px;
        }

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
          position: relative;
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-template-areas:
            "infolabel medialabel"
            "mapsel resultimg"
            "posselector metalabel"
            "typesel movesel"
            "gfyip techsel"
            "endpos previewlabel"
            "startpos preview"
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

        #map-position-selector {
          grid-area: posselector;
        }

        #meta-label {
          grid-area: metalabel;
          align-self: end;
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
          align-self: end;
        }
      `}</style>
    </>
  );
};
