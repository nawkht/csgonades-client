type AcceptedNadeNotification = {
  id: string;
  type: "accepted-nade";
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
  thumnailUrl?: string;
};

type DeclinedNadeNotification = {
  id: string;
  type: "declined-nade";
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
  thumnailUrl?: string;
};

export type FavoriteNotification = {
  id: string;
  type: "favorite";
  nadeId: string;
  nadeSlug?: string;
  bySteamId: string;
  byNickname: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
  thumnailUrl?: string;
};

type NewContactNotification = {
  id: string;
  type: "contact-msg";
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

type NewNadeNotification = {
  id: string;
  type: "new-nade";
  nadeId: string;
  nadeSlug?: string;
  subjectSteamId: string;
  viewed: boolean;
  createdAt: Date;
};

type NewCommentNotification = {
  id: string;
  type: "new-comment";
  nadeId: string;
  nadeSlug?: string;
  bySteamId: string;
  byNickname: string;
  subjectSteamId: string;
  thumnailUrl?: string;
  createdAt: Date;
  viewed: boolean;
};

export type FavoriteNotificationAgregate = {
  id: string;
  type: "favorite-agregate";
  nadeId: string;
  nadeSlug?: string;
  byNickname: string;
  count: number;
  viewed: boolean;
  createdAt: Date;
  thumnailUrl?: string;
};

export type Notification =
  | AcceptedNadeNotification
  | DeclinedNadeNotification
  | FavoriteNotification
  | FavoriteNotificationAgregate
  | NewContactNotification
  | NewNadeNotification
  | NewCommentNotification;
