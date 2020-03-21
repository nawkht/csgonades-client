import { FC, memo } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { PageLink } from "../../common/PageLink";

export const SiteNav: FC = memo(({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="site-nav">
        <PageLink href="/blog" as="/blog">
          <span className="nav-item">Blog</span>
        </PageLink>
        <PageLink href="/about" as="/about">
          <span className="nav-item">About</span>
        </PageLink>
      </div>
      <style jsx>{`
        .site-nav {
          margin-left: 30px;
        }

        .nav-item {
          margin-right: 30px;
          padding: 10px;
          border-radius: 15px;
          color: ${colors.TEXT};
          font-size: 16px;
          cursor: pointer;
        }

        .nav-item:hover {
          background: ${colors.PRIMARY_10};
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
