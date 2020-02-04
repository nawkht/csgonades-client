import ReactGA from "react-ga";
import { Dispatch, Middleware } from "redux";
import { AppState } from "..";
import { AnalyticsEvent } from "./AnalyticsActions";

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

export type Meta = {
  gaEvent?: {
    label?: string;
    value?: number;
  };
  gaPageView?: {
    path: string;
    title: string;
  };
};

class GoogleAnalytics {
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

export const analyticsMiddleware: Middleware<any, AppState, Dispatch> = ({
  getState
}) => next => action => {
  if (action.type === "@@analytics/EVENT") {
    const analyticsAction = action as AnalyticsEvent;
    GoogleAnalytics.event({
      category: analyticsAction.category,
      action: analyticsAction.action,
      label: analyticsAction.label
    });
  } else {
    next(action);
  }

  const meta: Meta = action.meta;
  if (action.meta && meta.gaEvent) {
    const { gaEvent } = meta;
    const state = getState();
    const ignoreEvent = state.authStore.user?.role === "administrator";

    const [gaCategory, gaAction] = action.type.split("/");

    const cleanCategory = gaCategory.replace(/@/g, "");

    const event = {
      category: cleanCategory,
      action: gaAction,
      label: gaEvent.label,
      value: gaEvent.value,
      ignore: ignoreEvent
    };

    GoogleAnalytics.event(event);
  }
  if (meta && meta.gaPageView) {
    const state = getState();
    const ignoreEvent = state.authStore.user?.role === "administrator";

    const pageView = {
      path: meta.gaPageView.path,
      title: meta.gaPageView.title,
      ignore: ignoreEvent
    };

    GoogleAnalytics.pageView(pageView);
  }
};
