import { FC, memo, useMemo } from "react";
import { NadeType } from "../../models/Nade/NadeType";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { iconFromType } from "../../utils/Common";
import { Dimensions } from "../../constants/Constants";

type Props = {
  type: NadeType;
  currentType?: NadeType;
  mobile?: boolean;
  onFilterByType: (type: NadeType) => void;
};

export const NadeTypeButton: FC<Props> = memo(
  ({ type, currentType, mobile, onFilterByType }) => {
    const { colors } = useTheme();
    const iconUrl = iconFromType(type);
    const contrast = type === "smoke" ? 70 : 100;

    const classNameBuilder = useMemo(() => {
      const base = ["nade-type-btn", "icon"];

      if (currentType === type) {
        base.push("active");
      }
      return base.join(" ");
    }, [currentType, type]);

    function onClick() {
      onFilterByType(type);
    }

    return (
      <>
        {mobile && (
          <button className={classNameBuilder} onClick={onClick}>
            <div className="type-icon">
              {iconUrl && <img src={iconUrl} width="70%" />}
            </div>
          </button>
        )}
        {!mobile && (
          <button className={classNameBuilder} onClick={onClick}>
            <div className="type-icon">
              {iconUrl && <img src={iconUrl} width="100%" />}
            </div>
          </button>
        )}

        <style jsx>{`
          .nade-type-btn {
            cursor: pointer;
            border: none;
            background: transparent;
            outline: none;
            width: ${Dimensions.BUTTON_HEIGHT}px;
            height: ${Dimensions.BUTTON_HEIGHT}px;
            background: ${colors.primaryBtnBg};
            border-radius: 5px;
          }

          .nade-type-btn:last-child {
            margin-right: 0px;
          }

          .type-icon {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
          }

          .type-icon img {
            filter: brightness(${contrast}%);
          }

          .nade-type-btn:hover {
            background: ${colors.primaryBtnHover};
          }

          .active {
            background: ${colors.primaryBtnHover};
          }
        `}</style>
      </>
    );
  }
);
