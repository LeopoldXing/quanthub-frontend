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
  attachmentLink?: string;
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

export type ConfirmBoxConfig = {
  title: string;
  description: string;
  option1Text?: string;
  option2Text?: string;
  option3Text?: string;
  option1Variant: 'text' | 'outlined' | 'contained';
  option2Variant: 'text' | 'outlined' | 'contained';
  option3Variant: 'text' | 'outlined' | 'contained';
  option1Color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  option2Color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  option3Color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  option1StartIcon?: React.ReactNode;
  option2StartIcon?: React.ReactNode;
  option3StartIcon?: React.ReactNode;
  option1EndIcon?: React.ReactNode;
  option2EndIcon?: React.ReactNode;
  option3EndIcon?: React.ReactNode;
  option1Action?: () => Promise<void>;
  option2Action?: () => Promise<void>;
  option3Action?: () => Promise<void>;
  option1LoadingPosition?: 'start' | 'end' | 'center';
  option2LoadingPosition?: 'start' | 'end' | 'center';
  option3LoadingPosition?: 'start' | 'end' | 'center';
}

export const confirmBoxDefaultConfig: ConfirmBoxConfig = {
  title: '',
  description: '',
  option1Text: 'cancel',
  option2Text: undefined,
  option3Text: 'confirm',
  option1Variant: 'text',
  option2Variant: 'outlined',
  option3Variant: 'contained',
  option1Color: 'error',
  option2Color: 'info',
  option3Color: 'success',
  option1StartIcon: undefined,
  option2StartIcon: undefined,
  option3StartIcon: undefined,
  option1EndIcon: undefined,
  option2EndIcon: undefined,
  option3EndIcon: undefined,
  option1LoadingPosition: 'center',
  option2LoadingPosition: 'center',
  option3LoadingPosition: 'center',
}

export type ContentModificationFormDataType = {
  authorId: string;
  title: string;
  subTitle?: string;
  content: {
    contentHtml: string;
    contentText: string;
  }
  coverImageLink?: string;
  category?: string;
  tags?: string[];
  attachmentLink?: string;
  type: "article" | "announcement" | "draft";
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
