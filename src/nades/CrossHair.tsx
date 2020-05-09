import { FC } from "react";

type Props = {};

export const CrossHair: FC<Props> = ({}) => {
  return (
    <>
      <svg viewBox="0 0 600 600">
        <style>
          {
            ".prefix__st0{fill:#7ddd00;stroke:#000;stroke-width:.25;stroke-miterlimit:10}.prefix__st1{opacity:.5;fill:#eaeaea}"
          }
        </style>
        <path
          className="prefix__st0"
          d="M299 303h2v9h-2zM312 299v2h-9v-2zM297 299v2h-9v-2zM299 288h2v9h-2z"
        />
        <path
          className="prefix__st1"
          d="M299.5 316h1v284h-1zM299.5 0h1v284h-1zM316 300.5v-1h284v1zM0 300.5v-1h284v1z"
        />
      </svg>
      <style jsx>{``}</style>
    </>
  );
};
