export type NotificationType =
  | "accepted-nade"
  | "favorited-nade"
  | "declined-nade";

export type Notification = {
  id: string;
  steamId: string;
  type: NotificationType;
  entityId: string;
  hasBeenViewed: boolean;
  createdAt: Date;
};
