import { FC, memo, useMemo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { PageLink } from "../../common/PageLink";

type Props = {};

export const Logo: FC<Props> = memo(({}) => {
  const { theme } = useTheme();

  const logoUrl = useMemo(() => {
    return theme === "light" ? "/logo.png" : "/logo-darkmode.png";
  }, [theme]);

  return (
    <>
      <PageLink href="/" as="/">
        <span className="logo">
          <img key={logoUrl} src={logoUrl} alt="CSGO Nades" />
        </span>
      </PageLink>
      <style jsx>{`
        .logo {
          display: block;
        }

        .logo img {
          max-height: 40px;
          display: block;
        }
      `}</style>
    </>
  );
});
