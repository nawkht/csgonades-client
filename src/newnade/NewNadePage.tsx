import { FC, useEffect } from "react";
import { Message, Step } from "semantic-ui-react";
import { Layout2 } from "../common/layout/Layout2";
import { PageCentralize } from "../common/PageCentralize";
import { useNewNade } from "../store/NewNadeStore/NewNadeHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { AddGfycat } from "./AddGfycat";
import { AddImage } from "./AddImage";

export const NewNadePage: FC = () => {
  const { currentStep, setStep, reset, error } = useNewNade();
  const { colors } = useTheme();

  useEffect(() => {
    reset();
  }, []);

  function onGfyStepClick() {
    setStep("gfycat");
  }

  function onImgStepClick() {
    setStep("result-img");
  }

  return (
    <Layout2 title="New nade" canonical="/newnade">
      <PageCentralize>
        <div className="nade-new-container">
          <Step.Group>
            <Step
              active={currentStep === "gfycat"}
              icon="video"
              link
              title="Video"
              description="Add gfycat video"
              onClick={onGfyStepClick}
            />
            <Step
              active={currentStep === "result-img"}
              icon="image"
              link
              title="Screenshot"
              description="Add a image of the resulting nade"
              onClick={onImgStepClick}
            />
          </Step.Group>

          {error && (
            <Message negative>
              <Message.Header>Error</Message.Header>
              <p>{error}</p>
            </Message>
          )}

          <div className="new-nade-step">
            {currentStep === "gfycat" && <AddGfycat />}
            {currentStep === "result-img" && <AddImage />}
          </div>
        </div>
      </PageCentralize>

      <style jsx>
        {`
          .nade-new-container {
            margin-top: 50px;
            margin-bottom: 100px;
          }

          .new-nade-step {
            border: 1px solid ${colors.BORDER};
            background: ${colors.DP01};
            border-radius: 4px;
            padding: 12px;
          }
        `}
      </style>
    </Layout2>
  );
};
