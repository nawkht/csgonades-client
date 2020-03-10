const isBrowser = typeof window !== "undefined";

export function ezoicInit(codes: number[]) {
  if (isBrowser && ezstandalone && !ezstandalone.enabled) {
    ezstandalone.DEBUG = true;
    ezstandalone.init();
    ezstandalone.define(...codes);
    ezstandalone.enable();
    ezstandalone.display();
    console.log("> ezstandalone enabled");
  } else if (isBrowser && ezstandalone && ezstandalone.enabled) {
    setTimeout(() => {
      // @ts-ignore
      ezstandalone.cmd.push(function() {
        ezstandalone.refresh();
        console.log("> ezstandalone refresh");
      });
    }, 1000);
  }
}
