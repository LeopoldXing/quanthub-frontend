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
  auth0Id?: string;
  username: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  description?: string;
  role: "Admin" | "Registered User";
  avatarLink?: string;
  joinedDatetime?: Date;
}

export type ArticleComment = {
  id: string;
  articleId: string;
  content: string;
  user: User;
  publishDatetime: Date;
  publishTillToday?: string;
  status?: "normal" | "hide" | "deleted";
}

export type ArticleOverviewInfo = {
  id: string;
  title: string;
  subtitle?: string;
  tags: string[];
  category: string;
  description: string;
  author: {
    id: string;
    username: string;
    role: string;
  };
  coverImageLink?: string;
  rate: number;
  type: 'article' | 'announcement' | 'draft';
  commentsCount: number;
  likes: string;
  views: string;
  publishTimestamp: bigint;
  updateTimestamp: bigint;
  publishTillToday: string;
  updateTillToday: string;
}

export type CompleteArticleData = {
  id: string;
  title: string;
  subtitle?: string;
  tags: string[];
  category: string;
  type: "article" | "announcement" | "draft";
  contentHtml: string;
  contentText?: string;
  contentJson?: string;
  coverImageLink?: string;
  rate: number;
  comments: ArticleComment[],
  likes: string;
  isLiking?: boolean;
  views: string;
  author: {
    id: string;
    username: string;
    role: string;
    avatarLink?: string;
  };
  publishTimestamp: bigint;
  updateTimestamp: bigint;
  publishTillToday: string;
  updateTillToday: string;
}

export type ArticleSearchParamType = {
  keyword: string;
  selectedCategoryList: Array<string>;
  selectedTagList: string[];
  sortStrategy: "publish_date" | "update_date" | "recommended";
  sortDirection: "asc" | "desc" | "none";
}

export type NewArticleSearchParamType = {
  keyword: string;
  categoryList: string[];
  tagList: string[];
  sort: {
    strategy: "publish_date" | "update_date" | "recommended";
    direction: "desc" | "asc" | "none";
  }
  type: 'article' | 'announcement' | 'draft';
}

export type ArticleModificationFormData = {
  title: string;
  subtitle?: string;
  contentHtml: string;
  contentText?: string;
  contentJson?: string;
  category?: string;
  pictureLinkList?: string[];
  attachmentLink?: string;
  selectedTagList?: string[];
  coverImageLink?: string;
}

export type ButtonStyleType = {
  title: string;
  description: string;
  cancelOptionText: string;
  confirmOptionText: string;
  option3Text?: string;
  cancelOptionVariant: 'text' | 'outlined' | 'contained';
  confirmOptionVariant: 'text' | 'outlined' | 'contained';
  option3Variant?: 'text' | 'outlined' | 'contained';
  cancelOptionColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  confirmOptionColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  option3Color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  cancelOptionStartIcon?: React.ReactNode;
  confirmOptionStartIcon?: React.ReactNode;
  option3StartIcon?: React.ReactNode;
  cancelOptionEndIcon?: React.ReactNode;
  confirmOptionEndIcon?: React.ReactNode;
  option3EndIcon?: React.ReactNode;
  option3Action?: () => Promise<void>;
  confirmOptionLoadingPosition?: 'start' | 'end' | 'center'
};

export type NotificationProps = {
  duration?: number;
  vertical?: "bottom" | "top";
  horizontal?: "left" | "right" | "center";
  message?: string;
  severity?: "success" | "warning" | "error" | "info";
  variant?: 'standard' | 'filled' | 'outlined';
}

export type CurrentUserInfo = {
  token: string;
  user: User;
} | null
