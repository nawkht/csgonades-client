const isBrowser = typeof window !== "undefined";

export function ezoicInit(codes: number[]) {
  if (isBrowser && ezstandalone && !ezstandalone.enabled) {
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
  } else if (isBrowser && ezstandalone && ezstandalone.enabled) {
    setTimeout(() => {
      try {
        // @ts-ignore
        ezoic.cmd.push(function() {
          ezstandalone.refresh();
          console.log("> ezstandalone refresh");
        });
      } catch (error) {
        // no-op
      }
    }, 1000);
  }
}
