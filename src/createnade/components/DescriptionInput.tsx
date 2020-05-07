import { FC } from "react";
import { CsgnTextArea } from "../../common/inputs/CsgnTextArea";

type Props = {};

export const DescriptionInput: FC<Props> = ({}) => {
  return (
    <>
      <CsgnTextArea
        placeholder="Write how to perform the throw."
        label="Description"
        onChange={() => {
          // no-op
        }}
      />
    </>
  );
};
