type Category = {
  id: string;
  name: string;
}

type Tag = {
  id: string;
  name: string;
}

type ArticleOverviewInfo = {
  id: string;
  title: string;
  subtitle: string;
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
