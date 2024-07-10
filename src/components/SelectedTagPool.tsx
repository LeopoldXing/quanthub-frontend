import { Chip } from "@mui/material";

type SelectedTagPoolProps = {
  selectedTagList: Array<Tag>;
  handleDeleteTag: (tagId: string) => void;
}

const SelectedTagPool = ({ selectedTagList, handleDeleteTag }: SelectedTagPoolProps) => {
  return (
      selectedTagList.length > 0 && (
          <div className="w-full flex items-center justify-start gap-2">
            {selectedTagList.map((tag) => (
                <Chip key={tag.id} label={tag.name} onDelete={() => handleDeleteTag(tag.id)}/>
            ))}
            <button className="ml-3 text-nowrap text-[13px]" onClick={() => handleDeleteTag("all")}>
              Cancel all
            </button>
          </div>
      )
  );
};

export default SelectedTagPool;
