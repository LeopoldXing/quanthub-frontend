import { Chip } from "@mui/material";

type TagBarProps = {
  tagList: Tag[];
}

const TagBar = ({tagList}: TagBarProps) => {
  return (
      tagList && tagList.length > 0 && (
          <div className="w-full flex items-center justify-start gap-2 flex-nowrap overflow-hidden">
            {tagList.map((tag: Tag) => (
                <Chip key={tag.id} label={tag.name} variant="outlined" size="small" />
            ))}
          </div>
      )
  );
};

export default TagBar;
