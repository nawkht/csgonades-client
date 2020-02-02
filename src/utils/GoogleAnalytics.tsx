import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";
const IS_PROD = process.env.NODE_ENV === "production";

type EventOptions = {
  category: string;
  action: string;
  label?: string;
  value?: number;
  ignore?: boolean;
};

type PageViewOpts = {
  path: string;
  title?: string;
  ignore?: boolean;
};

interface TimingOpts extends ReactGA.TimingArgs {
  ignore?: boolean;
}

export class GoogleAnalytics {
  static event(opts: EventOptions) {
    if (opts.ignore || !IS_BROWSER) {
      return;
    }
    try {
      this.init();
      ReactGA.event(opts);
    } catch (error) {
      // no-op
    }
  }

  static timing(opts: TimingOpts) {
    if (opts.ignore || !IS_BROWSER) {
      return;
    }
    try {
      this.init();
      ReactGA.timing(opts);
    } catch (error) {
      // no-op
    }
  }

  static async pageView(opts: PageViewOpts) {
    if (opts.ignore || !IS_BROWSER) {
      return;
    }
    try {
      this.init();
      ReactGA.pageview(opts.path, undefined, opts.title);
    } catch (error) {
      // no-op
    }
  }

  private static init() {
    if (!IS_BROWSER || window.GA_INITIALIZED) {
      return;
    }
    ReactGA.initialize("UA-71896446-6", {
      testMode: IS_PROD ? false : true,
      debug: IS_PROD ? false : false
    });
    window.GA_INITIALIZED = true;
  }
}
