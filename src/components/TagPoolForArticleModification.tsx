import { forwardRef, useImperativeHandle, useState } from "react";
import { Chip, Input, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from 'uuid';

type TagPoolProps = {
  tagList: Array<Tag>;
  onSelect: (tag: Tag) => void;
};

export interface HandleSelectedTagChange {
  changeSelectedTags: (updatedSelectedTagList: Array<Tag>) => void;
}

const TagPoolForArticleModification = forwardRef<HandleSelectedTagChange, TagPoolProps>(({
                                                                                           tagList,
                                                                                           onSelect
                                                                                         }, ref) => {
  const [localTagList, setLocalTagList] = useState<Tag[]>(tagList);
  const [selectedTagList, setSelectedTagList] = useState<Array<Tag>>([]);
  const [newTagList, setNewTagList] = useState<Array<Tag>>([]);
  const [newTagInput, setNewTagInput] = useState<string>("");

  useImperativeHandle(ref, () => ({
    changeSelectedTags(updatedSelectedTagList: Array<Tag>) {
      setSelectedTagList(updatedSelectedTagList);
    }
  }));

  /*  create tag  */
  const handleTagCreate = () => {
    const newTagIndex = tagList.findIndex(tag => tag.name === newTagInput);
    const selectedTagIndex = selectedTagList.findIndex(selectedTag => selectedTag.name === newTagInput);
    if (newTagIndex === -1 && selectedTagIndex === -1) {
      const newTag = { id: uuidv4(), name: newTagInput };
      setNewTagList(prevState => [...prevState, newTag]);
      setSelectedTagList(prevState => [...prevState, newTag]);
      setLocalTagList(prevState => [...prevState, newTag]);
    }
    setNewTagInput("");
  }

  /*  handle tag click  */
  const handleTagClick = (tag: Tag) => {
    const selectedTagIndex = selectedTagList.findIndex(prevTag => prevTag.id === tag.id);
    if (selectedTagIndex === -1) {
      setSelectedTagList(prevState => [...prevState, tag]);
      onSelect(tag);
    } else {
      setSelectedTagList(prevState => prevState.filter((_, index) => index !== selectedTagIndex));
      const newTagIndex = newTagList.findIndex(newTag => newTag.name === tag.name);
      const localTagIndex = localTagList.findIndex(localTag => localTag.name === tag.name);
      if (newTagIndex > -1) {
        setNewTagList(prevState => prevState.filter((_, index) => index !== newTagIndex));
        setLocalTagList(prevState => prevState.filter((_, index) => index !== localTagIndex));
      }
    }
  }

  return (
      <div>
        {localTagList && localTagList.length > 0 && (
            <div className="w-full flex items-center justify-start gap-5 flex-wrap">
              {localTagList.map((tag: Tag) => {
                const selected = selectedTagList.findIndex(selectedTag => selectedTag.name === tag.name) > -1;
                return (
                    <Chip
                        key={tag.id}
                        label={tag.name}
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
              endAdornment={<InputAdornment position="end">{newTagList.length}/10</InputAdornment>}
              aria-describedby="create-tag-input"
              inputProps={{
                'aria-label': 'create tag',
              }}
              placeholder="create tag"
              value={newTagInput}
              onChange={e => setNewTagInput(e.target.value)}
          />
          <Button variant="outlined" color="primary" size="small" onClick={handleTagCreate}>Create</Button>
        </div>
      </div>
  );
});

export default TagPoolForArticleModification;
