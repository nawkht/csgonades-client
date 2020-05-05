import { forwardRef } from "react";
import Link from "next/link";

export const PageLink = forwardRef<Link, any>(
  ({ children, href, as, ...rest }, ref) => {
    return (
      <Link href={href} as={as}>
        <a style={{ display: "block" }} ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  }
);
