import { FC } from "react";
import { Message } from "semantic-ui-react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  onAddImage: (imageData: string) => void;
};

export const AddImage: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="add-img">
        <h2>Result image</h2>
        <Message info>
          <h3>Important</h3>
          <h4>Hide HUD (Required)</h4>
          <code>
            r_drawviewmodel 0; cl_draw_only_deathnotices 1; cl_drawhud 0
          </code>
          <p>Reset command</p>
          <code>
            r_drawviewmodel 1; cl_draw_only_deathnotices 1; cl_drawhud 1
          </code>
        </Message>
      </div>
      <style jsx>{`
        h2 {
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
