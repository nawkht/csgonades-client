import { FC, useMemo } from "react";
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
import { OneWaySelector } from "../createnade/components/OneWaySelector";
import { SEO } from "../layout/SEO2";
import { StatusSelector } from "./comp/StatusSelector";
import {
  useIsAdminOrModerator,
  useIsAdmin,
} from "../store/AuthStore/AuthHooks";
import { TickrateSelector } from "../createnade/components/TickrateSelector";
import { SlugInput } from "./comp/SlugInput";
import { IsProSelector } from "./comp/IsProSelector";

type Props = {
  nade: Nade;
};

export const EditNadePage: FC<Props> = ({ nade }) => {
  const isAdmin = useIsAdmin();
  const isAdminOrModerator = useIsAdminOrModerator();
  const { state, dispatch, onUpdate, disableSubmit } = useEditNadeState(nade);
  const { colors } = useTheme();
  const canEdit = useCanEditNade(nade.steamId);

  const showTickrateSelector = useMemo(() => {
    if (state.technique && state.technique === "jumpthrow") {
      return true;
    }
    if (!state.technique && nade.technique === "jumpthrow") {
      return true;
    }
    return false;
  }, [nade.technique, state.technique]);

  if (!canEdit) {
    return null;
  }

  return (
    <>
      <PageCentralize>
        <SEO
          key={`seo-${nade.id}`}
          title={"Edit nade"}
          canonical={`/nades/${nade.slug || nade.id}/edit`}
        />

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
              label="Result Image"
              imageIsSet={true}
              onClick={() => dispatch({ type: "CreateNade/ShowImageSelector" })}
            />
          </div>

          <div id="lineup-image">
            <ImageSelector
              optional
              label="Line Up Image"
              imageIsSet={!!nade.images.lineupId || !!state.lineUpImageBase64}
              onClick={() =>
                dispatch({ type: "EditNade/ToggleLineupImageAdder" })
              }
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

          {showTickrateSelector && (
            <div id="tickrate-selector">
              <TickrateSelector
                defaultValue={nade.tickrate}
                onChange={(tick) =>
                  dispatch({ type: "EditNade/SetTickrate", tick })
                }
              />
            </div>
          )}

          <div id="oneway-selector">
            <OneWaySelector
              initialValue={nade.oneWay}
              onClick={(oneWay) =>
                dispatch({ type: "EditNade/SetOneWay", oneWay })
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
                oneWay: state.oneWay || nade.oneWay,
              }}
            />
          </div>

          <div id="submit">
            <SumbitBtn onSubmit={onUpdate} disabled={disableSubmit} />
          </div>

          {isAdminOrModerator && (
            <>
              <div id="modlabel">
                <BigLabel value="Moderator settings" />
              </div>

              <div id="status">
                <StatusSelector
                  initValue={nade.status}
                  onChange={(status) =>
                    dispatch({ type: "EditNade/SetNadeStatus", status })
                  }
                />
              </div>

              <div id="is-pro">
                <IsProSelector
                  initialValue={nade.isPro}
                  onClick={(isPro) => {
                    if (isPro) {
                      dispatch({ type: "EditNade/SetIsPro" });
                    } else {
                      dispatch({ type: "EditNade/UnSetIsPro" });
                    }
                  }}
                />
              </div>

              {isAdmin && (
                <div id="slug">
                  <SlugInput
                    defaultValue={nade.slug}
                    onChange={(slug) =>
                      dispatch({ type: "EditNade/SetSlug", slug })
                    }
                  />
                </div>
              )}
            </>
          )}

          {state.showImageAdder && (
            <div id="image-adder">
              <ImageUploader
                message={<></>}
                onDismiss={() =>
                  dispatch({ type: "CreateNade/ShowImageSelector" })
                }
                onImageCropped={(image) =>
                  dispatch({ type: "CreateNade/SetImage", image })
                }
              />
            </div>
          )}

          {state.showLineupImgAdder && (
            <div id="lineup-adder">
              <ImageUploader
                message={
                  <div className="lineup-msg">
                    <h3>Guideline</h3>
                    <ul>
                      <li>Image must be 16:9 aspect ratio</li>
                      <li>Aim at the position</li>
                      <li>
                        Remove your hud (cl_drawhud 0; r_drawviewmodel 0;)
                      </li>
                      <li>Take screenshot</li>
                    </ul>
                    <p>
                      Don&apos;t resize the image. Keep it as it is. A crosshair
                      will be added in the middle of the image automatically.
                    </p>
                    <p>
                      If you must, you can draw anything on the image in your
                      own software, just don&apos;t resize the image.
                    </p>
                  </div>
                }
                aspectRatio="16:9"
                onDismiss={() =>
                  dispatch({ type: "EditNade/ToggleLineupImageAdder" })
                }
                onImageCropped={(image) =>
                  dispatch({ type: "EditNade/SetLineUpImage", image })
                }
              />
            </div>
          )}
        </div>
      </PageCentralize>
      <style jsx>{`
        .lineup-msg {
          background: rgba(255, 255, 255, 0.8);
          color: #111;
          border-radius: 5px;
          margin-bottom: 15px;
          padding: 10px;
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

        #edit-nade-page {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 300px;
          grid-template-areas:
            "infolabel medialabel"
            "mapsel resultimg"
            "posselector lineup"
            "typesel metalabel"
            "gfyip movesel"
            "endpos techsel"
            "startpos tick"
            ". oneway"
            "desc previewlabel"
            "desc preview"
            "desc preview"
            "modlabel preview"
            "status preview"
            "slug preview"
            "pro preview"
            ". submit";
          grid-row-gap: ${Dimensions.GUTTER_SIZE / 1.5}px;
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          padding: 30px 30px;
          background: ${colors.DP02};
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
          margin-bottom: 150px;
        }

        #is-pro {
          grid-area: pro;
        }

        #slug {
          grid-area: slug;
        }

        #tickrate-selector {
          grid-area: tick;
        }

        #lineup-image {
          grid-area: lineup;
        }

        #modlabel {
          grid-area: modlabel;
        }

        #status {
          grid-area: status;
        }

        #oneway-selector {
          grid-area: oneway;
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

        #image-adder,
        #lineup-adder {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          z-index: 999;
          overflow-y: auto;
        }
      `}</style>
    </>
  );
};
