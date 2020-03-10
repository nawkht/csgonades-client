const isBrowser = typeof window !== "undefined";

export function ezoicInit(codes: number[]) {
  if (isBrowser && ezstandalone && !ezstandalone.enabled) {
    console.log("> Ezoic enable");
    ezstandalone.define(...codes);
    ezstandalone.enable();
    ezstandalone.display();
  } else if (isBrowser && ezstandalone && ezstandalone.enabled) {
    console.log("> Ezoic refresh");
    ezstandalone.destroy();
    ezstandalone.define(...codes);
    ezstandalone.display();
    ezstandalone.refresh();
  }
}
