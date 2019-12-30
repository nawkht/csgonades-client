import moment from "moment";

export function dateFromNow(date: Date) {
  return moment(date).fromNow();
}
