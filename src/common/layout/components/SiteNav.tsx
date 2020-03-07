import Link from "next/link";
import { FC } from "react";
import { Dimensions } from "../../../constants/Constants";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";

type Props = {};

export const SiteNav: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="site-nav">
        {false && (
          <Link href="/blog">
            <a className="nav-item">Blog</a>
          </Link>
        )}

        <Link href="/about">
          <a className="nav-item">About</a>
        </Link>
      </div>
      <style jsx>{`
        .nav-item {
          margin-right: 20px;
          padding: 10px;
          border-radius: 5px;
          color: ${colors.TEXT};
          font-size: 16px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .site-nav {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
