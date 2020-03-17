const isBrowser = typeof window !== "undefined";

const hasEzoic = typeof ezstandalone !== "undefined";

export function ezoicInit(codes: number[]) {
  if (!codes.length) {
    return;
  }

  if (isBrowser && hasEzoic && !ezstandalone.enabled) {
    try {
      ezstandalone.init();
      console.log("ezstandalone.init()");

      const codesToString = codes.join(",");
      ezstandalone.cmd.push(function() {
        ezstandalone.define(...codes);
        console.log(`ezstandalone.define(${codesToString})`);
        ezstandalone.enable();
        console.log(`ezstandalone.enable()`);
        ezstandalone.display();
        console.log(`ezstandalone.display()`);
      });
    } catch (error) {
      // no-op
    }
  } else if (isBrowser && hasEzoic && ezstandalone.enabled) {
    try {
      ezstandalone.cmd.push(function() {
        const codesToString = codes.join(",");
        ezstandalone.define(...codes);
        console.log(`ezstandalone.define(${codesToString})`);
        ezstandalone.refresh();
        console.log(`ezstandalone.refresh()`);
      });
    } catch (error) {
      // no-op
    }
  }
}
