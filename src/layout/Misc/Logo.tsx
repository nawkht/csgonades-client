import Link from "next/link";
import { FC } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const Logo: FC<Props> = ({}) => {
  const { theme } = useTheme();
  const logoUrl = theme === "light" ? "/logo.png" : "/logo-darkmode.png";

  return (
    <>
      <Link href="/" as="/">
        <a className="logo">
          <img src={logoUrl} alt="CSGO Nades logo" />
        </a>
      </Link>
      <style jsx>{`
        .logo img {
          max-height: 45px;
          display: inline-block;
        }
      `}</style>
    </>
  );
};
