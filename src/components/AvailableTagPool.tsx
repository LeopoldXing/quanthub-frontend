import { Chip, Skeleton } from "@mui/material";
import { useWatch } from "react-hook-form";

type AvailableTagPoolProps = {
  control: any,
  value: string[],
  onChange: (tagList: string[]) => void;
  onBlur?: () => void;
  availableTagList: string[];
  isFetchingTags?: boolean;
}

const AvailableTagPool = ({
                            value,
                            control,
                            onChange,
                            availableTagList,
                            isFetchingTags = false
                          }: AvailableTagPoolProps) => {
  const currentTagList: string[] = useWatch({ control, name: 'tagList' });
  return (
      <div className="w-full flex items-center justify-start gap-5 flex-wrap">
        {(!isFetchingTags && availableTagList) ? availableTagList.map((tag: string) => (
            <Chip
                key={tag}
                label={tag}
                disabled={value.length > 0 && value.findIndex(selectedTag => selectedTag === tag) > -1}
                onClick={() => {
                  if (currentTagList.findIndex(selectedTag => selectedTag === tag) === -1) {
                    onChange([...currentTagList, tag]);
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
};

export default AvailableTagPool;
