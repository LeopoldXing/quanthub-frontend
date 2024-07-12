import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material/SvgIcon/SvgIcon";
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
  option1Text: string;
  option2Text: string;
  option1Variant: 'text' | 'outlined' | 'contained';
  option2Variant: 'text' | 'outlined' | 'contained';
  option1Color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  option2Color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  option1StartIcon?: React.ReactNode;
  option2StartIcon?: React.ReactNode;
  option1EndIcon?: React.ReactNode;
  option2EndIcon?: React.ReactNode;
};

export type NotificationProps = {
  duration?: number;
  vertical?: "bottom" | "top";
  horizontal?: "left" | "right" | "center";
  message?: string;
  severity?: "success" | "warning" | "error" | "info";
  variant?: 'standard' | 'filled' | 'outlined';
}
