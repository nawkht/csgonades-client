import { forwardRef } from "react";
import Link from "next/link";
import { useClientConfig } from "../store/SettingsStore/hooks/useClientConfig";

export const PageLink = forwardRef<Link, any>(
  ({ children, href, as, ...rest }, ref) => {
    const { useHardLinks } = useClientConfig();

    if (useHardLinks) {
      return <a href={as}>{children}</a>;
    }

    return (
      <Link href={href} as={as}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
);
