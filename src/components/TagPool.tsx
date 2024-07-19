import { Chip } from "@mui/material";
import { useWatch } from "react-hook-form";

type TagPoolProps = {
  control: any,
  onChange: (data: string[]) => void;
  onDelete?: (tag: string) => void;
  onDeleteAll?: () => void;
}

const TagPool = ({ control, onChange, onDelete, onDeleteAll }: TagPoolProps) => {
  const currentTagList: string[] = useWatch({ control, name: 'tagList' });

  return (
      currentTagList.length > 0 && (
          <div className={`mt-6 w-full flex items-center justify-start gap-2 flex-wrap`}>
            {currentTagList.map((tag) => (
                <Chip key={tag} label={tag} onDelete={() => {
                  onDelete && onDelete(tag);
                  onChange(currentTagList.filter(selectedTag => selectedTag !== tag));
                }}/>
            ))}
            {currentTagList.length > 0 && (
                <button className="ml-3 text-nowrap text-[13px]" onClick={() => {
                  onDeleteAll && onDeleteAll();
                  onChange([]);
                }}>
                  Cancel all
                </button>
            )}
          </div>
      )

  );
};

export default TagPool;
