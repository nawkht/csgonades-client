const isBrowser = typeof window !== "undefined";

export function ezoicInit(codes: number[]) {
  if (isBrowser && ezstandalone && !ezstandalone.enabled) {
    console.log("> Ezoic enable");
    ezstandalone.define(...codes);
    ezstandalone.enable();
    ezstandalone.display();
  } else if (isBrowser && ezstandalone && ezstandalone.enabled) {
    setTimeout(() => {
      // @ts-ignore
      ezstandalone.cmd.push(function() {
        console.log("Placeholder", ezstandalone.getPlaceholderElems());
        console.log("> Executing refresh");
        ezstandalone.init();
        ezstandalone.refresh();
      });
    }, 2000);
  }
}
