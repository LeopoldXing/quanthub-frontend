import { Chip } from "@mui/material";

type TagPoolProps = {
  tagList: Array<Tag>;
  onSelect: (tag: Tag) => void;
}

const TagPool = ({ tagList, onSelect }: TagPoolProps) => {
  return (
      tagList && tagList.length > 0 && (
          <div className="w-full flex items-center justify-start gap-3">
            {tagList.map((tag) => (
                <Chip key={tag.id} label={tag.name} onClick={() => onSelect(tag)}/>
            ))}
          </div>
      )
  );
};

export default TagPool;
