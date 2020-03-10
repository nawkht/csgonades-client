const isBrowser = typeof window !== "undefined";

const hasEzoic = typeof ezstandalone !== "undefined";
export function ezoicInit(codes: number[]) {
  if (isBrowser && hasEzoic && !ezstandalone.enabled) {
    try {
      ezstandalone.DEBUG = true;
      ezstandalone.init();
      ezstandalone.define(...codes);
      ezstandalone.enable();
      ezstandalone.display();
    } catch (error) {
      // no-op
    }

    console.log("> ezstandalone enabled");
  } else if (isBrowser && hasEzoic && ezstandalone.enabled) {
    setTimeout(() => {
      try {
        // @ts-ignore
        ezoic.cmd.push(function() {
          ezstandalone.define(...codes);
          ezstandalone.refresh();
          console.log("> ezstandalone refresh");
        });
      } catch (error) {
        // no-op
      }
    }, 1000);
  }
}
