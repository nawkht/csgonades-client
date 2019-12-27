export type Favorite = {
  id: string;
  nadeId: string;
  userId: string;
  createdAt: Date;
};

export type FavoriteCreateDTO = Omit<Favorite, "createdAt" | "id">;
