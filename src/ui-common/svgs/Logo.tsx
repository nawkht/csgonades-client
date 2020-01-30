import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const Logo: FC<Props> = ({}) => {
  const { theme, colors } = useTheme();

  const primaryColor = colors.PRIMARY;
  const secondaryColor = theme === "dark" ? "#d1d1d1" : colors.PRIMARY_BLACK;

  return (
    <>
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 471.44 302.71"
        width="100%"
        height="100%"
        preserveAspectRatio="true"
        style={{ display: "block" }}
      >
        <defs>
          <style></style>
        </defs>
        <title>logo</title>
        <path
          className="cls-1"
          d="M382.39,57.06v56.26a28.13,28.13,0,0,0,0-56.26Z"
        />
        <path
          className="cls-2"
          d="M427.28,80.58a30.55,30.55,0,1,0,30.55,30.55A30.56,30.56,0,0,0,427.28,80.58Zm0,50.34a19.8,19.8,0,1,1,19.79-19.79A19.8,19.8,0,0,1,427.28,130.92Z"
        />
        <rect
          className="cls-3"
          x="395.45"
          y="79.53"
          width="25.53"
          height="14.54"
          rx="7.27"
          transform="translate(635.5 436.83) rotate(-135)"
        />
        <text className="cls-4" transform="translate(0.01 144.13)">
          CS
          <tspan className="cls-5" x="195.81" y="0">
            G
          </tspan>
          <tspan x="291.33" y="0">
            O
          </tspan>
        </text>
        <text className="cls-6" transform="translate(0 275.3)">
          <tspan className="cls-7">N</tspan>
          <tspan x="100.16" y="0">
            A
          </tspan>
          <tspan className="cls-8" x="199.02" y="0">
            D
          </tspan>
          <tspan x="295.26" y="0">
            ES
          </tspan>
        </text>
      </svg>
      <style jsx>{`
        .cls-1,
        .cls-3,
        .cls-4 {
          fill: ${primaryColor};
        }
        .cls-2,
        .cls-6 {
          fill: ${secondaryColor};
        }
        .cls-3 {
          stroke: ${secondaryColor};
          stroke-miterlimit: 10;
          stroke-width: 3px;
        }
        .cls-4 {
          font-size: 170.57px;
        }
        .cls-4,
        .cls-6 {
          font-family: D-DIN-Bold, D-DIN;
          font-weight: 700;
        }
        .cls-5 {
          letter-spacing: -0.04em;
        }
        .cls-6 {
          font-size: 163.13px;
        }
        .cls-7 {
          letter-spacing: -0.02em;
        }
        .cls-8 {
          letter-spacing: -0.01em;
        }
      `}</style>
    </>
  );
};
