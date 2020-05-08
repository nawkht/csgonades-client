import { FC } from "react";
import { Nade } from "../models/Nade/Nade";
import { useCanEditNade } from "../store/NadeStore/hooks/useCanEditNade";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { BigLabel } from "../createnade/components/BigLabel";
import { MapSelector } from "../createnade/components/MapSelector";
import { useEditNadeState } from "./state/reducer";
import { GfyInput } from "../createnade/components/GfyInput";
import { EndPosInput } from "../createnade/components/EndPosInput";
import { ThrownFromInput } from "../createnade/components/ThrownFromInput";
import { DescriptionInput } from "../createnade/components/DescriptionInput";
import { ImageSelector } from "../createnade/components/ImageSelector";
import { MapPositionEditor } from "../nades/components/MapPositionEditor";
import { TypeSelector } from "../createnade/components/TypeSelector";
import { MovementSelector } from "../createnade/components/MovementSelector";
import { TechniqueSelector } from "../createnade/components/TechniqueSelector";
import { PreviewNade } from "../createnade/PreviewNades";
import { SumbitBtn } from "../createnade/components/SubmitBtn";
import { ImageUploader } from "../newnade/ImageUploader";

type Props = {
  nade: Nade;
};

export const EditNadePage: FC<Props> = ({ nade }) => {
  const { state, dispatch, onUpdate, disableSubmit } = useEditNadeState(nade);
  const { colors } = useTheme();
  const canEdit = useCanEditNade(nade);

  if (!canEdit) {
    return null;
  }

  return (
    <>
      <PageCentralize>
        <h1 id="title">EDIT NADE</h1>
        <div id="edit-nade-page">
          <div id="info-label">
            <BigLabel value="Information" />
          </div>
          <div id="map-selector">
            <MapSelector
              defaultValue={nade.map}
              onChange={(map) => dispatch({ type: "CreateNade/SetMap", map })}
            />
          </div>
          <div id="gfy-input">
            <GfyInput
              defaultValue={nade.gfycat.gfyId}
              onChange={(data) =>
                dispatch({ type: "CreateNade/SetGfyData", data })
              }
            />
          </div>
          <div id="end-pos">
            <EndPosInput
              defaultValue={nade.endPosition}
              onChange={(endPosition) =>
                dispatch({ type: "CreateNade/SetEndPosition", endPosition })
              }
            />
          </div>
          <div id="start-pos">
            <ThrownFromInput
              defaultValue={nade.startPosition}
              onChange={(startPosition) =>
                dispatch({ type: "CreateNade/SetStartPosition", startPosition })
              }
            />
          </div>
          <div id="description">
            <DescriptionInput
              defaultValue={nade.description}
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
              imageIsSet={true}
              onClick={() => dispatch({ type: "CreateNade/ShowImageSelector" })}
            />
          </div>

          <div id="map-position-selector">
            <MapPositionEditor
              map={nade.map}
              endPos={state.mapEndCoord || nade.mapEndCoord}
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
              defaultValue={nade.type}
              onChange={(nadeType) =>
                dispatch({ type: "CreateNade/SetNadeType", nadeType })
              }
            />
          </div>

          <div id="movement-selector">
            <MovementSelector
              defaultValue={nade.movement}
              onChange={(movement) =>
                dispatch({ type: "CreateNade/SetMovement", movement })
              }
            />
          </div>

          <div id="technique-selector">
            <TechniqueSelector
              defaultValue={nade.technique}
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
            <PreviewNade
              nade={{
                description: state.description || nade.description,
                endPosition: state.endPosition || nade.endPosition,
                gfycat: state.gfycat || nade.gfycat,
                imageBase64: state.imageBase64 || nade.images.thumbnailUrl,
                map: state.map || nade.map,
                mapEndCoord: state.mapEndCoord || nade.mapEndCoord,
                movement: state.movement || nade.movement,
                startPosition: state.startPosition || nade.startPosition,
                technique: state.technique || nade.technique,
                tickrate: state.tickrate || nade.tickrate,
                type: state.type || nade.type,
              }}
            />
          </div>

          <div id="submit">
            <SumbitBtn onSubmit={onUpdate} disabled={disableSubmit} />
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

        #edit-nade-page {
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

        #image-adder {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          padding: ${Dimensions.GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
