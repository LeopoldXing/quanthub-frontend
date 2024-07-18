import { useImperativeHandle, useState, forwardRef } from "react";
import { Chip, Skeleton } from "@mui/material";

type TagPoolProps = {
  tagList?: string[];
  onSelect: (tag: string) => void;
  loading?: boolean
};

export interface HandleSelectedTagChange {
  changeSelectedTags: (updatedSelectedTagList: string[]) => void;
}

const TagPoolForSearching = forwardRef<HandleSelectedTagChange, TagPoolProps>(({ tagList, onSelect, loading }, ref) => {
  const [selectedTagList, setSelectedTagList] = useState<string[]>([]);

  useImperativeHandle(ref, () => ({
    changeSelectedTags(updatedSelectedTagList: Array<string>) {
      setSelectedTagList(updatedSelectedTagList);
    }
  }));

  return (
      <div className="w-full flex items-center justify-start gap-5 flex-wrap">
        {(!loading && tagList) ? tagList.map((tag: string) => (
            <Chip
                key={tag}
                label={tag}
                disabled={selectedTagList.findIndex(selectedTag => selectedTag === tag) > -1}
                onClick={() => {
                  if (selectedTagList.findIndex(selectedTag => selectedTag === tag) === -1) {
                    setSelectedTagList(prevState => [...prevState, tag]);
                    onSelect(tag);
                  }
                }}
            />
        )) : (
            <div className="w-full flex items-center justify-start gap-5 flex-wrap">
              {/*  line 1  */}
              <Skeleton variant="rounded" width="60%" height={38}/>
              <Skeleton variant="rounded" width="25%" height={38}/>
              {/*  line 2  */}
              <Skeleton variant="rounded" width="40%" height={38}/>
              <Skeleton variant="rounded" width="25%" height={38}/>
              <Skeleton variant="rounded" width="20%" height={38}/>
              {/*  line 3  */}
              <Skeleton variant="rounded" width="20%" height={38}/>
              <Skeleton variant="rounded" width="70%" height={38}/>
              {/*  line 4  */}
              <Skeleton variant="rounded" width="60%" height={38}/>
              <Skeleton variant="rounded" width="25%" height={38}/>
              {/*  line 5  */}
              <Skeleton variant="rounded" width="20%" height={38}/>
              <Skeleton variant="rounded" width="70%" height={38}/>
              {/*  line 6  */}
              <Skeleton variant="rounded" width="40%" height={38}/>
              <Skeleton variant="rounded" width="25%" height={38}/>
              <Skeleton variant="rounded" width="20%" height={38}/>
            </div>
        )}
      </div>
  );
});

export default TagPoolForSearching;
