import Head from "next/head";
import { FC, memo } from "react";

type Props = {
  codes: number[];
};

export const EzoicHead: FC<Props> = memo(({ codes }) => {
  const codeString = codes.join(",");

  if (!codes.length) {
    return null;
  }

  console.log("> Setting ezoic head");

  return (
    <>
      <Head>
        <script
          key="ezoic-init"
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
            var ezstandalone = ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
            ezstandalone.cmd.push(function() {
              ezstandalone.setHasBadWords(false);
              ezstandalone.setABTest("mod33");
              ezstandalone.define(${codeString});
              ezstandalone.enable();
              ezstandalone.display();
              console.log("> Ez showing ads")
            });
            `,
          }}
        />
        <script
          key="ezoic-script"
          src="//www.ezojs.com/ezoic/sa.min.js"
          defer
          async
        />
      </Head>
    </>
  );
});
