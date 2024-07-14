import { Avatar, TextField } from "@mui/material";
import avatar from "@/assets/default_avarta.png";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import Button from "@mui/material/Button";
import { useEffect, useRef, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

type CommentInputSectionProps = {
  onSubmitted: (content: string) => Promise<void>;
  onDeActivate?: () => void;
  mode?: "create" | "edit";
  initialContent?: string;
}

const CommentInputBox = ({
                           onDeActivate,
                           onSubmitted,
                           mode = "create",
                           initialContent = ""
                         }: CommentInputSectionProps) => {
  const [isInputActive, setIsInputActive] = useState<boolean>(mode === "edit");
  const [input, setInput] = useState(initialContent);
  const [loading, setLoading] = useState(false);
  const [submissionDisabled, setSubmissionDisabled] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleCommentSubmission = async () => {
    try {
      setLoading(true);
      await onSubmitted(input);
    } finally {
      setLoading(false);
      setInput("");
      handleInputDeactivation();
    }
  }

  const handleInputDeactivation = () => {
    setIsInputActive(false);
    setLoading(false);
    setInput("");
    onDeActivate && onDeActivate();
  }

  const handleEmojiSelect = (emoji: any) => {
    const cursorPosition = inputRef.current?.selectionStart || 0;
    const newText = input.slice(0, cursorPosition) + emoji.native + input.slice(cursorPosition);
    setInput(newText);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(cursorPosition + emoji.native.length, cursorPosition + emoji.native.length);
        inputRef.current.focus();
      }
    }, 0);

    setShowEmojiPicker(false);
  };

  useEffect(() => {
    setSubmissionDisabled(!input || input.length === 0);
  }, [input]);

  const calculateEmojiPickerPosition = () => {
    if (emojiButtonRef.current && emojiPickerRef.current) {
      const emojiButtonRect = emojiButtonRef.current.getBoundingClientRect();
      const emojiPickerHeight = emojiPickerRef.current.clientHeight;
      const spaceBelow = window.innerHeight - emojiButtonRect.bottom;
      if (spaceBelow < emojiPickerHeight) {
        emojiPickerRef.current.style.top = `-${emojiPickerHeight}px`;
      } else {
        emojiPickerRef.current.style.top = "auto";
      }
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      calculateEmojiPickerPosition();
    }
  }, [showEmojiPicker]);

  useEffect(() => {
    // edit mode will auto direct cursor to the end of the text
    if (mode === "edit" && inputRef.current) {
      inputRef.current.focus();
      const length = input.length;
      inputRef.current.setSelectionRange(length, length);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node) &&
          emojiButtonRef.current && !emojiButtonRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
      <div className="w-full flex justify-start items-start gap-5">
        <Avatar alt="user avatar" src={avatar}
                sx={{ marginTop: `${mode === 'edit' ? '10px' : '26px'}`, height: "40px", width: "40px" }}/>
        <div className="w-full flex flex-col justify-start items-center gap-1">
          <TextField
              id="comment_input_textfield"
              onFocus={() => setIsInputActive(true)}
              value={input}
              onChange={e => setInput(e.target.value)}
              inputRef={inputRef}
              label={mode === "create" ? "Add a comment..." : undefined}
              multiline
              autoFocus={mode === "edit"}
              variant="standard"
              fullWidth
              InputProps={{
                style: {
                  fontFamily: '"Segoe UI Emoji", "Segoe UI Symbol", "Segoe UI", "Apple Color Emoji", "Twemoji Mozilla", "Noto Color Emoji", "Android Emoji"'
                }
              }}
          />
          {isInputActive ? (
              <div className="w-full mt-1 flex justify-between items-center relative">
                <div className="relative">
                  <button ref={emojiButtonRef} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                    <EmojiEmotionsOutlinedIcon sx={{ color: "black" }}/>
                  </button>
                  {showEmojiPicker && (
                      <div className="absolute z-10" ref={emojiPickerRef}>
                        <Picker data={data} onEmojiSelect={handleEmojiSelect}/>
                      </div>
                  )}
                </div>
                <div className="flex justify-center items-center gap-4">
                  <Button
                      sx={{ textTransform: "none", paddingX: 3, fontWeight: "bold", borderRadius: "40px", marginY: 1 }}
                      variant="text" size="small" onClick={handleInputDeactivation}>
                    <span className="text-sm text-gray-500">Cancel</span>
                  </Button>
                  <LoadingButton sx={{ textTransform: "none", fontWeight: "bold", borderRadius: "40px", marginY: 1 }}
                                 size="small"
                                 variant="contained" color="primary" onClick={handleCommentSubmission}
                                 loading={loading} disabled={submissionDisabled}>
                    <span className="text-sm">{mode === "edit" ? "Save" : "Comment"}</span>
                  </LoadingButton>
                </div>
              </div>
          ) : (
              <div className="w-full h-10 mt-1"/>
          )}
        </div>
      </div>
  );
};

export default CommentInputBox;
