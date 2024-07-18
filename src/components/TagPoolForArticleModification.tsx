import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Chip, Input, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import { useNotification } from "@/contexts/NotificationContext.tsx";

export interface HandleSelectedTagData {
  getSelectedTagList: () => string[];
}

type TagPoolProps = {
  tagList: Array<string>;
  onUpdate?: (tagList: string[]) => void;
  initialTagNameList?: string[];
};

const TagPoolForArticleModification = forwardRef<HandleSelectedTagData, TagPoolProps>(({
                                                                                         initialTagNameList,
                                                                                         tagList,
                                                                                         onUpdate
                                                                                       }, ref) => {
  // make sure tagList has the value of initialTagNameList
  const [localTagList, setLocalTagList] = useState<string[]>(
      [...new Set([...tagList, ...initialTagNameList || []])]);
  const [selectedTagList, setSelectedTagList] = useState<Array<string>>(initialTagNameList || []);
  const [newTagList, setNewTagList] = useState<Array<string>>([]);
  const [newTagName, setNewTagName] = useState<string>("");
  // notification
  const { showNotification } = useNotification();

  /*  send selected tag list  */
  useImperativeHandle(ref, () => ({
    getSelectedTagList() {
      return selectedTagList;
    }
  }));

  useEffect(() => {
    if (onUpdate) {
      onUpdate(selectedTagList);
    }
  }, [onUpdate, selectedTagList]);


  /*  create tag  */
  const handleTagCreate = () => {
    if (!newTagName || newTagName.length === 0) return;
    if (newTagList.length < 10) {
      const newTagIndex = tagList.findIndex(tag => tag === newTagName);
      const selectedTagIndex = selectedTagList.findIndex(selectedTag => selectedTag === newTagName);
      if (newTagIndex === -1 && selectedTagIndex === -1) {
        setNewTagList(prevState => [...prevState, newTagName]);
        setSelectedTagList(prevState => [...prevState, newTagName]);
        setLocalTagList(prevState => [...prevState, newTagName]);
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
  const handleTagClick = (tag: string) => {
    const selectedTagIndex = selectedTagList.findIndex(prevTag => prevTag === tag);
    if (selectedTagIndex === -1) {
      setSelectedTagList(prevState => [...prevState, tag]);
    } else {
      setSelectedTagList(prevState => prevState.filter((_, index) => index !== selectedTagIndex));
      const newTagIndex = newTagList.findIndex(newTag => newTag === tag);
      const localTagIndex = localTagList.findIndex(localTag => localTag === tag);
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
              {localTagList.map((tag: string) => {
                const selected = selectedTagList.findIndex(selectedTag => selectedTag === tag) > -1;
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
              value={newTagName}
              onChange={e => setNewTagName(e.target.value)}
          />
          <Button variant="outlined" color="primary" size="small" onClick={handleTagCreate}>Create</Button>
        </div>
      </div>
  );
});

export default TagPoolForArticleModification;
