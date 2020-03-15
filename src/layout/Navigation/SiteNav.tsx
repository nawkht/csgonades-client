import Link from "next/link";
import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const SiteNav: FC = memo(({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="site-nav">
        <Link href="/blog" prefetch={false}>
          <a className="nav-item">Blog</a>
        </Link>
        <Link href="/about" prefetch={false}>
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
});
