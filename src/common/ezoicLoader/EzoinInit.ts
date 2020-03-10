const isBrowser = typeof window !== "undefined";

export function ezoicInit(codes: number[]) {
  if (isBrowser && ezstandalone) {
    console.log("> Ezoic enable");
    ezstandalone.init();
    ezstandalone.define(...codes);
    if (!ezstandalone.enabled) {
      ezstandalone.enable();
    }
    ezstandalone.display();
  } /*else if (isBrowser && ezstandalone && ezstandalone.enabled) {
    console.log("> Ezoic refresh");
    ezstandalone.destroy();
    ezstandalone.refresh();
  }*/
}
