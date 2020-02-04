import { useDispatch } from "react-redux";

type GaEvent = {
  category: string;
  action: string;
  label?: string;
};

export type AnalyticsEvent = {
  type: "@@analytics/EVENT";
  category: string;
  action: string;
  label?: string;
};

export const analyticsEventAction = (event: GaEvent): AnalyticsEvent => ({
  type: "@@analytics/EVENT",
  category: event.category,
  action: event.action,
  label: event.label
});

export const useAnalyticsEvent = () => {
  const dispatch = useDispatch();

  function analyticsEvent(event: GaEvent) {
    dispatch(analyticsEventAction(event));
  }

  return analyticsEvent;
};

export type AnalyticsActions = AnalyticsEvent;
