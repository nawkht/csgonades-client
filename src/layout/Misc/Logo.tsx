import Link from "next/link";
import { FC, memo, useMemo } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const Logo: FC<Props> = memo(({}) => {
  const { theme } = useTheme();

  const logoUrl = useMemo(() => {
    return theme === "light" ? "/logo.png" : "/logo-darkmode.png";
  }, [theme]);

  return (
    <>
      <Link href="/" as="/">
        <a className="logo">
          <img key={logoUrl} src={logoUrl} alt="CSGO Nades logo" />
        </a>
      </Link>
      <style jsx>{`
        .logo img {
          max-height: 45px;
          display: block;
        }
      `}</style>
    </>
  );
});
