import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const LogoHorizontal: FC<Props> = ({}) => {
  const { colors } = useTheme();

  const primaryColor = colors.PRIMARY;
  const secondaryColor = "#d1d1d1";

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 970 172.21"
        width="100%"
        height="100%"
        preserveAspectRatio="true"
        style={{ display: "block" }}
      >
        <g id="Text">
          <text className="cls-1" transform="translate(0 143.65)">
            CSGO
            <tspan className="cls-2" x="399.15" y="0">
              {" "}
            </tspan>
            <tspan className="cls-3" x="438.08" y="0">
              {" "}
            </tspan>
            <tspan className="cls-4" x="475.31" y="0">
              NA
            </tspan>
            <tspan className="cls-5" x="686.11" y="0">
              D
            </tspan>
            <tspan className="cls-4" x="786.41" y="0">
              ES
            </tspan>
          </text>
        </g>
        <g id="Pin">
          <path
            className="cls-6"
            d="M386.94,67.87v56.26a28.13,28.13,0,0,0,0-56.26Z"
            transform="translate(0 -8.84)"
          />
          <path
            className="cls-4"
            d="M431.83,91.39a30.55,30.55,0,1,0,30.55,30.55A30.55,30.55,0,0,0,431.83,91.39Zm0,50.34a19.8,19.8,0,1,1,19.79-19.79A19.8,19.8,0,0,1,431.83,141.73Z"
            transform="translate(0 -8.84)"
          />
          <rect
            className="cls-7"
            x="400"
            y="90.34"
            width="25.53"
            height="14.54"
            rx="7.27"
            transform="translate(635.62 449.66) rotate(-135)"
          />
        </g>
      </svg>
      <style jsx>{`
        .cls-1 {
          font-size: 170px;
          font-family: D-DIN-Bold, D-DIN;
          font-weight: 700;
        }
        .cls-1,
        .cls-6,
        .cls-7 {
          fill: ${primaryColor};
        }
        .cls-2,
        .cls-3 {
          fill: ${secondaryColor};
        }
        .cls-3 {
          letter-spacing: -0.01em;
        }
        .cls-4,
        .cls-5 {
          fill: ${secondaryColor};
        }
        .cls-5 {
          letter-spacing: -0.01em;
        }
        .cls-7 {
          stroke: ${secondaryColor};
          stroke-miterlimit: 10;
          stroke-width: 3px;
        }
      `}</style>
    </>
  );
};
