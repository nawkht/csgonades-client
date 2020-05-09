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
          d="M299.25 303h1.5v8h-1.5zM311 299.25v1.5h-8v-1.5zM297 299.3v1.4h-8v-1.4zM299.3 289h1.4v8h-1.4z"
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
