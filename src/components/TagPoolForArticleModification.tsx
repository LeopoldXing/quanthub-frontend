import { useRef, useState } from "react";
import { Chip, Input, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from 'uuid';
import Notification, { HandleNotificationOpen } from "@/components/mui/Notification.tsx";

type TagPoolProps = {
  tagList: Array<Tag>;
  onSelect: (tag: Tag) => void;
};

const TagPoolForArticleModification = ({
                                         tagList,
                                         onSelect
                                       }: TagPoolProps) => {
  const [localTagList, setLocalTagList] = useState<Tag[]>(tagList);
  const [selectedTagList, setSelectedTagList] = useState<Array<Tag>>([]);
  const [newTagList, setNewTagList] = useState<Array<Tag>>([]);
  const [newTagName, setNewTagName] = useState<string>("");
  // notificationRef
  const notificationRef = useRef<HandleNotificationOpen>(null);


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
      if (notificationRef.current) {
        notificationRef.current.openNotification(true);
      }
    }
    window.document.getElementById("new_tag_create_input")?.focus();
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
          <Notification ref={notificationRef} message="only 10 new tags allowed!" duration={6000} horizontal="right"
                        vertical="top" serverity="warning"/>
        </div>
      </div>
  );
};

export default TagPoolForArticleModification;
