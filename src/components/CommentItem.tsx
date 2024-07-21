import React, { useEffect, useState } from "react";
import { ArticleComment, CurrentUserInfo } from "@/types.ts";
import { Avatar, Menu, MenuItem, IconButton, ListItemIcon } from "@mui/material";
import defaultAvatar from "@/assets/default_avarta.png";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ListItemText from "@mui/material/ListItemText";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import CommentInputBox from "@/components/CommentInputBox.tsx";
import ConfirmBox from "@/components/ConfirmBox.tsx";
import Cookies from "js-cookie";
import ReportIcon from '@mui/icons-material/Report';

type CommentItemProps = {
  comment: ArticleComment;
  onEdit?: (comment: ArticleComment) => Promise<void>;
  onDelete?: (comment: ArticleComment) => Promise<void>;
}

const CommentItem = ({ comment, onEdit, onDelete }: CommentItemProps) => {
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
  const handleEdit = async (content: string) => {
    try {
      handleMenuClose();
      onEdit && await onEdit({ ...comment, content: content });
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
  };

  const [currentUser, setCurrentUser] = useState<CurrentUserInfo | null>(null);
  useEffect(() => {
    const checkCookie = async () => {
      const cookie = Cookies.get("quanthub-user");
      if (cookie) {
        try {
          const parsedCookie = JSON.parse(cookie);
          setCurrentUser(parsedCookie);
        } catch (error) {
          console.error("Error parsing cookie:", error);
          setCurrentUser(null);
        }
      }
    };

    setTimeout(checkCookie, 1000);
  }, []);

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
                {currentUser && (currentUser.user.role.toLocaleLowerCase() === 'admin' || currentUser.user.id === comment.user.id) ? (
                    /*  current user is admin or the owner of this comment  */
                    <div>
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
                      <MenuItem sx={{ padding: '4px 8px' }}>
                        <ListItemIcon sx={{ minWidth: '30px' }}>
                          <ReportIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ variant: 'body2' }}>Report</ListItemText>
                      </MenuItem>
                    </div>
                ) : (
                    /*  current user is not logged in or doesn't have the authorization to modify this comment  */
                    <MenuItem sx={{ padding: '4px 8px' }}>
                      <ListItemIcon sx={{ minWidth: '30px' }}>
                        <ReportIcon fontSize="small"/>
                      </ListItemIcon>
                      <ListItemText primaryTypographyProps={{ variant: 'body2' }}>Report</ListItemText>
                    </MenuItem>
                )}
              </Menu>
            </div>
        ) : (
            <CommentInputBox onSubmit={handleEdit} mode="edit" initialContent={comment.content} onDeActivate={() => {
              setIsEditing(false);
              handleMenuClose();
            }}/>
        )}
        <ConfirmBox open={confirmBoxOpen} handleClose={() => setConfirmBoxOpen(false)} config={{
          title: 'Delete this comment?',
          description: `This comment will be deleted permanently, no way to undo.`,
          option1Color: 'primary',
          option1Text: 'Cancel',
          option1Variant: 'text',
          option1Action: handleMenuClose,
          option3Color: 'primary',
          option3Text: 'Delete',
          option3Variant: 'text',
          option3LoadingPosition: 'center',
          option3Action: async () => await handleDelete()
        }}/>
      </>
  );
};

export default CommentItem;
