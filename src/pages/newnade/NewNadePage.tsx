import { FC, useEffect } from "react";
import { Message, Step } from "semantic-ui-react";
import { useNewNade } from "../../store/NewNadeStore/NewNadeHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Layout } from "../../ui-common/Layout";
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
    <Layout title="New nade" canonical="/newnade">
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

      <style jsx>
        {`
          .nade-new-container {
            margin: 18px;
          }

          .new-nade-step {
            border: 1px solid ${colors.BORDER};
            background: ${colors.UI_BG};
            border-radius: 4px;
            padding: 12px;
          }
        `}
      </style>
    </Layout>
  );
};
