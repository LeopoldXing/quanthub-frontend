import { forwardRef, useImperativeHandle, useState } from "react";
import { Chip, Input, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from 'uuid';
import { Tag } from "@/types.ts";
import { useNotification } from "@/contexts/NotificationContext.tsx";

export interface HandleSelectedTagData {
  getSelectedTagList: () => Tag[];
}

type TagPoolProps = {
  tagList: Array<Tag>;
  onSelect?: (tag: Tag) => void;
};

const TagPoolForArticleModification = forwardRef<HandleSelectedTagData, TagPoolProps>(({
                                                                                         tagList,
                                                                                         onSelect
                                                                                       }, ref) => {
  const [localTagList, setLocalTagList] = useState<Tag[]>(tagList);
  const [selectedTagList, setSelectedTagList] = useState<Array<Tag>>([]);
  const [newTagList, setNewTagList] = useState<Array<Tag>>([]);
  const [newTagName, setNewTagName] = useState<string>("");
  // notification
  const { showNotification } = useNotification();

  /*  send selected tag list  */
  useImperativeHandle(ref, () => ({
    getSelectedTagList() {
      return selectedTagList;
    }
  }));


  /*  create tag  */
  const handleTagCreate = () => {
    if (!newTagName || newTagName.length === 0) return;
    if (newTagList.length < 10) {
      const newTagIndex = tagList.findIndex(tag => tag.name === newTagName);
      const selectedTagIndex = selectedTagList.findIndex(selectedTag => selectedTag.name === newTagName);
      if (newTagIndex === -1 && selectedTagIndex === -1) {
        const newTag = { id: uuidv4(), name: newTagName };
        setNewTagList(prevState => [...prevState, newTag]);
        setSelectedTagList(prevState => [...prevState, newTag]);
        setLocalTagList(prevState => [...prevState, newTag]);
      }
      setNewTagName("");
    } else {
      showNotification({
        message: "You can only create 10 new tags. ",
        duration: 6000,
        horizontal: "right",
        vertical: "top",
        severity: "warning"
      })
    }
    window.document.getElementById("new_tag_create_input")?.focus();
  }

  /*  handle tag click  */
  const handleTagClick = (tag: Tag) => {
    const selectedTagIndex = selectedTagList.findIndex(prevTag => prevTag.id === tag.id);
    if (selectedTagIndex === -1) {
      setSelectedTagList(prevState => [...prevState, tag]);
      onSelect && onSelect(tag);
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
              id="new_tag_create_input"
              endAdornment={<InputAdornment position="end">{newTagList.length}/10</InputAdornment>}
              aria-describedby="create-tag-input"
              inputProps={{
                'aria-label': 'create tag',
              }}
              placeholder="create tag"
              value={newTagName}
              onChange={e => setNewTagName(e.target.value)}
          />
          <Button variant="outlined" color="primary" size="small" onClick={handleTagCreate}>Create</Button>
        </div>
      </div>
  );
});

export default TagPoolForArticleModification;
