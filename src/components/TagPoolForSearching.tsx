import { useImperativeHandle, useState, forwardRef } from "react";
import { Chip } from "@mui/material";
import { Tag } from "@/types.ts";

type TagPoolProps = {
  tagList: Array<Tag>;
  onSelect: (tag: Tag) => void;
};

export interface HandleSelectedTagChange {
  changeSelectedTags: (updatedSelectedTagList: Array<Tag>) => void;
}

const TagPoolForSearching = forwardRef<HandleSelectedTagChange, TagPoolProps>(({ tagList, onSelect }, ref) => {
  const [selectedTagList, setSelectedTagList] = useState<Array<Tag>>([]);

  useImperativeHandle(ref, () => ({
    changeSelectedTags(updatedSelectedTagList: Array<Tag>) {
      setSelectedTagList(updatedSelectedTagList);
    }
  }));

  return (
      tagList && tagList.length > 0 && (
          <div className="w-full flex items-center justify-start gap-5 flex-wrap">
            {tagList.map((tag: Tag) => (
                <Chip
                    key={tag.id}
                    label={tag.name}
                    disabled={selectedTagList.findIndex(selectedTag => selectedTag.id === tag.id) > -1}
                    onClick={() => {
                      if (selectedTagList.findIndex(prevTag => prevTag.id === tag.id) === -1) {
                        setSelectedTagList(prevState => [...prevState, tag]);
                        onSelect(tag);
                      }
                    }}
                />
            ))}
          </div>
      )
  );
});

export default TagPoolForSearching;
