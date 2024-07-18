import { Chip } from "@mui/material";

type SelectedTagPoolProps = {
  selectedTagList: string[];
  handleDeleteTag: (tagId: string) => void;
}

const SelectedTagPool = ({ selectedTagList, handleDeleteTag }: SelectedTagPoolProps) => {
  return (
      selectedTagList.length > 0 && (
          <div className="w-full flex items-center justify-start gap-2 flex-wrap">
            {selectedTagList.map((tag) => (
                <Chip key={tag} label={tag} onDelete={() => handleDeleteTag(tag)}/>
            ))}
            <button className="ml-3 text-nowrap text-[13px]" onClick={() => handleDeleteTag("-1")}>
              Cancel all
            </button>
          </div>
      )
  );
};

export default SelectedTagPool;
