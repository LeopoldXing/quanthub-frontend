import React, { useState } from "react";
import { ArticleComment } from "@/types.ts";
import { Avatar, Menu, MenuItem, IconButton, ListItemIcon } from "@mui/material";
import defaultAvatar from "@/assets/default_avarta.png";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemText from "@mui/material/ListItemText";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import CommentInputBox from "@/components/CommentInputBox.tsx";
import { sleep } from "@/utils/GlobalUtils.ts";
import MuiConfirmBox from "@/components/mui/MuiConfirmBox.tsx";
import { useNotification } from "@/contexts/NotificationContext.tsx";

type CommentItemProps = {
  comment: ArticleComment;
  onEdit?: (comment: ArticleComment) => Promise<void>;
  onDelete?: (comment: ArticleComment) => Promise<void>;
}

const CommentItem = ({ comment, onEdit, onDelete }: CommentItemProps) => {
  /*  notification  */
  const { showNotification } = useNotification();
  /*  dialog  */
  const [confirmBoxOpen, setConfirmBoxOpen] = useState<boolean>(false);
  /*  emoji  */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = async () => {
    try {
      handleMenuClose();
      onEdit && await onEdit(comment);
      await sleep(1000);
    } finally {
      setIsEditing(false);
    }
  };

  const openDeleteDialog = () => {
    setConfirmBoxOpen(true);
  }
  const handleDelete = async () => {
    handleMenuClose();
    onDelete && await onDelete(comment);
    showNotification({
      message: "Comment deleted",
      severity: "info",
      horizontal: "right",
      vertical: "top"
    });
  };

  return (
      <>
        {!isEditing ? (
            <div className="w-full flex flex-wrap justify-between items-start">
              <Avatar alt={comment.user.username} src={comment.user.avatarLink || defaultAvatar}
                      sx={{ height: "40px", width: "40px" }}/>
              <div className="w-0 flex-grow ml-5 flex flex-col justify-start items-start">
                <div className="w-full flex justify-between">
                  <div className="max-w-full flex justify-start items-center gap-2">
                    {/*  username  */}
                    <span className="text-xs font-bold">@{comment.user.username}</span>
                    {/*  publish date  */}
                    <span className="text-xs text-[#606060]">{comment.publishTillToday}</span>
                  </div>
                </div>
                {/*  content  */}
                <span className="max-w-full mt-1 pr-5 text-sm break-words">{comment.content}</span>
              </div>
              {/*  more  */}
              <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon fontSize="small"/>
              </IconButton>
              <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  sx={{
                    marginTop: 1,
                    '& .MuiPaper-root': {
                      minWidth: '120px',
                    },
                  }}
              >
                <MenuItem onClick={() => setIsEditing(true)} sx={{ padding: '4px 8px' }}>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <EditIcon fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ variant: 'body2' }}>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={openDeleteDialog} sx={{ padding: '4px 8px' }}>
                  <ListItemIcon sx={{ minWidth: '30px' }}>
                    <DeleteIcon fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ variant: 'body2' }}>Delete</ListItemText>
                </MenuItem>
              </Menu>
            </div>
        ) : (
            <CommentInputBox onSubmitted={handleEdit} mode="edit" initialContent={comment.content} onDeActivate={() => {
              setIsEditing(false);
              handleMenuClose();
            }}/>
        )}
        <MuiConfirmBox open={confirmBoxOpen} handleClose={() => setConfirmBoxOpen(false)}
                       onConfirm={async () => await handleDelete()} onCancel={handleMenuClose} buttonStyle={{
          title: "Delete comment?",
          description: "Delete your comment permanently?",
          cancelOptionColor: "primary",
          confirmOptionText: "Delete",
          confirmOptionColor: "primary",
          confirmOptionVariant: "text",
          confirmOptionStartIcon: undefined,
          confirmOptionEndIcon: undefined,
          cancelOptionText: "Cancel",
          cancelOptionVariant: "text",
          cancelOptionStartIcon: undefined,
          cancelOptionEndIcon: undefined,
          confirmOptionLoadingPosition: "center"
        }}/>
      </>
  );
};

export default CommentItem;
