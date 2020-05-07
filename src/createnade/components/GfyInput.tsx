import { FC } from "react";
import { CsgnInput } from "../../common/inputs/CsgnInput";
import { cleanGfycatUrl } from "../../utils/Common";
import { NadeApi } from "../../api/NadeApi";
import { GfycatData } from "../../models/Nade/GfycatData";
import { useDisplayToast } from "../../store/ToastStore/hooks/useDisplayToast";

type Props = {
  onChange: (value: GfycatData) => void;
};

export const GfyInput: FC<Props> = ({ onChange }) => {
  const displayToast = useDisplayToast();

  function onGfySet(value: string) {
    if (!value.length) {
      return;
    }

    verifyGfycat(value).then((val) => {
      if (!val) {
        displayToast({
          durationSeconds: 20,
          severity: "error",
          message:
            "Failed to validate Gfycat Url. It is either mistyped or Gfycat is down at the moment.",
        });
      } else {
        onChange(val);
      }
    });
  }

  return (
    <>
      <CsgnInput
        label="Gfycat Video Url"
        placeholder="Example: https://gfycat.com/confusedwiltedamazonparrot"
        onChange={onGfySet}
      />
    </>
  );
};

async function verifyGfycat(gfyUrl) {
  const cleanId = cleanGfycatUrl(gfyUrl);

  const gfyResult = await NadeApi.validateGfycat(cleanId);

  if (gfyResult.isErr()) {
    return false;
  }

  return gfyResult.value;
}
