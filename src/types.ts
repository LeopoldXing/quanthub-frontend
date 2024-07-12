import React from "react";

export type Category = {
  id: string;
  name: string;
}

export type Tag = {
  id: string;
  name: string;
}

export type User = {
  id: string;
  username: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  role: string;
}

export type ArticleComment = {
  id: string;
  content: string;
  user: User;
  publishDatetime: Date;
  articleId: string;
  status: string;
}

export type ArticleOverviewInfo = {
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

export type ArticleInfo = {
  id: string;
  title: string;
  subtitle?: string;
  tags: Tag[];
  category: Category;
  contentHtml: string;
  contentText?: string;
  contentJson?: string;
  coverImageLink?: string;
}

export type ArticleSearchParamType = {
  keyword: string;
  selectedCategoryList: Array<Category>;
  selectedTagList: Array<Tag>;
  sortStrategy: "publish_date" | "update_date" | "recommended";
  sortDirection: "asc" | "desc" | "none";
}

export type ArticleModificationFormData = {
  title: string;
  subtitle?: string;
  contentHtml: string;
  contentText?: string;
  contentJson?: string;
  category?: Category;
  pictureLinkList?: string[];
  attachmentLink?: string;
  selectedTagList?: Tag[];
  coverImageLink?: string;
}

export type ButtonStyleType = {
  title: string;
  description: string;
  cancelOptionText: string;
  confirmOptionText: string;
  option3Text?:string;
  cancelOptionVariant: 'text' | 'outlined' | 'contained';
  confirmOptionVariant: 'text' | 'outlined' | 'contained';
  option3Variant?: 'text' | 'outlined' | 'contained';
  cancelOptionColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  confirmOptionColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  option3Color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  cancelOptionStartIcon?: React.ReactNode;
  confirmOptionStartIcon?: React.ReactNode;
  option3StartIcon?: React.ReactNode;
  confirmOptionEndIcon?: React.ReactNode;
  cancelOptionEndIcon?: React.ReactNode;
  option3EndIcon?: React.ReactNode;
  option3Action?: () => Promise<void>
};

export type NotificationProps = {
  duration?: number;
  vertical?: "bottom" | "top";
  horizontal?: "left" | "right" | "center";
  message?: string;
  severity?: "success" | "warning" | "error" | "info";
  variant?: 'standard' | 'filled' | 'outlined';
}
