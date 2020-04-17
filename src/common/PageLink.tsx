import { forwardRef } from "react";
import Link from "next/link";
import { useClientConfig } from "../store/GlobalStore/GlobalHooks";

export const PageLink = forwardRef<Link, any>(
  ({ children, href, as, ...rest }, ref) => {
    const {  } = useClientConfig();

    if (true) {
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
