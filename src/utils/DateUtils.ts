import moment from "moment";

export function dateFromNow(date: Date | string) {
  return moment(date).fromNow();
}
