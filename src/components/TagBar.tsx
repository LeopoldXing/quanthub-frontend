import { Chip } from "@mui/material";

type TagBarProps = {
  tagList: string[];
  multiLine?: boolean;
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
  gap?: number;
}

const TagBar = ({ tagList, multiLine = false, size = "small", variant = "outlined", gap = 2 }: TagBarProps) => {
  return (
      tagList && tagList.length > 0 && (
          <div
              className={`w-full flex items-center justify-start gap-${gap} ${multiLine ? 'flex-nowrap overflow-hidden' : 'flex-wrap'}`}>
            {tagList.map((tag: string) => (
                <Chip key={tag} label={tag} variant={variant} size={size}/>
            ))}
          </div>
      )
  );
};

export default TagBar;
