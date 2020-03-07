type BlogPostStatus = "draft" | "published" | "unpublished";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: BlogPostStatus;
  images: {
    thumbnailUrl: string;
    largeUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type BlogPostLight = {
  id: string;
  title: string;
  slug: string;
  status: BlogPostStatus;
  images: {
    thumbnailUrl: string;
    largeUrl: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

export type BlogPostCreateDto = {
  title: string;
  thumbnailImagelUrl: string;
  largeImageUrl: string;
  body: string;
};

export type BlogPostUpdateDto = {
  title?: string;
  body?: string;
  status?: BlogPostStatus;
  thumbnailImagelUrl?: string;
  largeImageUrl?: string;
};
