import { Chip, Input, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import { useWatch } from "react-hook-form";
import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext.tsx";

type TagPool4SelectAndCreateProps = {
  control: any,
  onChange: (tag: string[]) => void;
  onCreate: (tag: string) => void;
  onDelete: (tag: string) => void;
  value?: string[];
  initialData?: string[];
  availableTagList: string[];
}
const TagPool4SelectAndCreate = ({
                                   control,
                                   onChange,
                                   onCreate,
                                   onDelete,
                                   availableTagList = []
                                 }: TagPool4SelectAndCreateProps) => {
  const currentSelectedTags: string[] = useWatch({ control, name: 'tags' });
  const [newTagList, setNewTagList] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>("");
  // notification
  const { showNotification } = useNotification();


  /*  handle tag click  */
  const handleTagClick = (tag: string) => {
    const selected = currentSelectedTags.findIndex(selectedTag => selectedTag === tag) > -1;
    console.log("selected");
    console.log(selected);
    console.log(currentSelectedTags);
    if (selected) {
      onChange(currentSelectedTags.filter(selectedTag => selectedTag !== tag));
      if (newTagList.findIndex(newTag => newTag === tag) > -1) {
        // cancel newly created tag
        onDelete(tag);
        setNewTagList(prevState => prevState.filter(prevTag => prevTag !== tag));
      }
    } else {
      onChange([...currentSelectedTags, tag]);
    }
  }

  /*  create new tag  */
  const createNewTag = () => {
    /*  new tag is empty  */
    if (!newTag || newTag.length <= 0) {
      return;
    }

    if (newTagList.length < 10) {
      /*  new tag is less than 10  */
      if (availableTagList.findIndex(availableTag => availableTag === newTag) === -1) {
        // new tag doesn't exist yet
        onChange([...currentSelectedTags, newTag!]);
        onCreate(newTag!);
        setNewTagList([...newTagList, newTag!]);
        // reset new tag input
        setNewTag("");
        window.document.getElementById("new_tag_create_input")?.focus();
      } else {
        // new tag already exists
        onChange([...currentSelectedTags, newTag!]);
      }
    } else {
      /*  new tag exceeds limit  */
      setNewTag("");
      window.document.getElementById("new_tag_create_input")?.blur();
      showNotification({
        message: "You can only create 10 new tags. ",
        duration: 6000,
        horizontal: "right",
        vertical: "top",
        severity: "warning"
      });
    }
  }

  return (
      <div>
        {availableTagList && availableTagList.length > 0 && (
            <div className="w-full flex items-center justify-start gap-5 flex-wrap">
              {availableTagList.map((tag: string) => {
                console.log(currentSelectedTags)
                const selected = currentSelectedTags?.findIndex(selectedTag => selectedTag === tag) > -1;
                console.log("选中了？", selected);
                return (
                    <Chip
                        key={tag}
                        label={tag}
                        variant={selected ? "filled" : "outlined"}
                        onClick={() => handleTagClick(tag)}
                        color={selected ? "success" : "default"}
                    />
                )
              })}
            </div>
        )}
        {/*  add customized tags  */}
        <div className="mt-6 flex justify-start items-center gap-5">
          <Input
              id="new_tag_create_input"
              endAdornment={<InputAdornment position="end">{newTagList.length}/10</InputAdornment>}
              aria-describedby="create-tag-input"
              inputProps={{
                'aria-label': 'create tag',
              }}
              placeholder="create tag"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
          />
          <Button variant="outlined" color="primary" size="small" onClick={createNewTag}>Create</Button>
        </div>
      </div>
  );
};

export default TagPool4SelectAndCreate;
