import { FC } from "react";
import { CsgnInput } from "../../common/inputs/CsgnInput";

type Props = {};

export const GfyInput: FC<Props> = ({}) => {
  return (
    <>
      <CsgnInput
        label="Gfycat Video Url"
        placeholder="Example: https://gfycat.com/confusedwiltedamazonparrot"
        onChange={() => {
          //no-op
        }}
      />
      <style jsx>{``}</style>
    </>
  );
};
