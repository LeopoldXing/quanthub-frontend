type Category = {
  id: string;
  name: string;
}

type Tag = {
  id: string;
  name: string;
}

type User = {
  id: string;
  username: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  role: string;
}

type ArticleComment = {
  id: string;
  content: string;
  user: User;
  publishDatetime: Date;
  articleId: string;
  status: string;
}

type ArticleOverviewInfo = {
  id: string;
  title: string;
  subtitle?: string;
  tags: Tag[];
  category: Category;
  description: string;
  author: {
    id: string;
    username: string;
    role: string;
  };
  coverImageLink?: string;
  rate: number;
  commentsCount: number;
  likes: number;
  views: number;
  publishTimestamp: bigint;
  updateTimestamp: bigint;
  publishTillToday: string;
  updateTillToday: string;
}

type ArticleInfo = {
  id: string;
  title: string;
  subtitle?: string;
  tags: Tag[];
  category: Category;
  content: string;
  coverImageLink?: string;
}

type ArticleModificationFormData = {
  title: string;
  subtitle?: string;
  content: string;
  category?: Category;
  pictureLinkList?: string[];
  attachmentLink?: string;
  selectedTagList?: Tag[];
  coverImageLink?: string;
}
