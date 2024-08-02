import Lock from "@mui/icons-material/Lock";
import LockOpen from "@mui/icons-material/LockOpen";
import TextFields from "@mui/icons-material/TextFields";
import { Box, Stack } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import DraftsIcon from '@mui/icons-material/Drafts';
import type { EditorOptions } from "@tiptap/core";
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import useExtensions from "./useExtensions";
import {
  insertImages,
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  type RichTextEditorRef,
  TableBubbleMenu,
} from "mui-tiptap";
import { uploadPicture } from "@/utils/S3BucketUtil.ts";

function fileListToImageFiles(fileList: FileList): File[] {
  // You may want to use a package like attr-accept
  // (https://www.npmjs.com/package/attr-accept) to restrict to certain file
  // types.
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

export interface handleRichTextEditorData {
  getHtml: () => string;
  getText: () => string;
  getJson: () => string;
  /*getFileList: () => File[];*/
  getImageList: () => void;
}

type MuiRichTextEditorProps = {
  variant?: "standard" | "outlined";
  renderControls?: () => import("react/jsx-runtime").JSX.Element;
  onSaveDraft?: () => void;
  onCancel?: () => void;
  isSavingDraft?: boolean;
  mode?: "edit" | "display";
  onChange?: (content: { contentText: string, contentHtml: string }) => void;
  value: string;
}

const MuiRichTextEditor = forwardRef<handleRichTextEditorData, MuiRichTextEditorProps>(({
                                                                                          mode = "edit",
                                                                                          variant = "standard",
                                                                                          renderControls,
                                                                                          onSaveDraft,
                                                                                          isSavingDraft = false,
                                                                                          onChange,
                                                                                          value
                                                                                        }, ref) => {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);

  // send text editor data
  useImperativeHandle(ref, () => ({
    getHtml() {
      return rteRef.current?.editor?.getHTML() ?? "";
    },
    getText() {
      return rteRef.current?.editor?.getText() ?? "";
    },
    getJson() {
      return JSON.parse(JSON.stringify(rteRef.current?.editor?.getJSON())) ?? "";
    },
    getImageList() {
      console.log();
    }
  }))

  const handleNewImageFiles = useCallback(
      async (files: File[], insertPosition?: number) => {
        if (!rteRef.current?.editor) {
          return;
        }

        const attributesForImageFiles = [];
        for (let i = 0; i < files.length; i++) {
          const url = await uploadPicture({ file: files[i], onProgressUpdate: progress => console.log(progress) });
          attributesForImageFiles.push({
            src: url,
            alt: files[i].name
          })
        }

        insertImages({
          images: attributesForImageFiles,
          editor: rteRef.current.editor,
          position: insertPosition,
        });
      },
      []
  );

  // Allow for dropping images into the editor
  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
      useCallback(
          (view, event, _slice, _moved) => {
            if (!(event instanceof DragEvent) || !event.dataTransfer) {
              return false;
            }

            const imageFiles = fileListToImageFiles(event.dataTransfer.files);
            if (imageFiles.length > 0) {
              const insertPosition = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              })?.pos;

              handleNewImageFiles(imageFiles, insertPosition);

              // Return true to treat the event as handled. We call preventDefault
              // ourselves for good measure.
              event.preventDefault();
              return true;
            }

            return false;
          },
          [handleNewImageFiles]
      );

  // Allow for pasting images
  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
      useCallback(
          (_view, event, _slice) => {
            if (!event.clipboardData) {
              return false;
            }

            const pastedImageFiles = fileListToImageFiles(
                event.clipboardData.files
            );
            if (pastedImageFiles.length > 0) {
              handleNewImageFiles(pastedImageFiles);
              // Return true to mark the paste event as handled. This can for
              // instance prevent redundant copies of the same image showing up,
              // like if you right-click and copy an image from within the editor
              // (in which case it will be added to the clipboard both as a file and
              // as HTML, which Tiptap would otherwise separately parse.)
              return true;
            }

            // We return false here to allow the standard paste-handler to run.
            return false;
          },
          [handleNewImageFiles]
      );

  return (
      <Box
          sx={{
            // An example of how editor styles can be overridden. In this case,
            // setting where the scroll anchors to when jumping to headings. The
            // scroll margin isn't built in since it will likely vary depending on
            // where the editor itself is rendered (e.g. if there's a sticky nav
            // bar on your site).
            "& .ProseMirror": {
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                scrollMarginTop: showMenuBar ? 50 : 0,
              },
            },
            width: "100%"
          }}
      >
        <RichTextEditor
            ref={rteRef}
            extensions={extensions}
            content={value}
            editable={mode === "edit" ? isEditable : false}
            onUpdate={(e) => {
              onChange && onChange({
                contentText: e.editor.getText(),
                contentHtml: e.editor.getHTML(),
              })
            }}
            editorProps={{
              handleDrop: handleDrop,
              handlePaste: handlePaste
            }}
            renderControls={renderControls}
            RichTextFieldProps={mode === "edit" ? (
                {
                  // The "outlined" variant is the default (shown here only as
                  // example), but can be changed to "standard" to remove the outlined
                  // field border from the editor
                  variant: variant,
                  MenuBarProps: {
                    hide: !showMenuBar
                  },
                  // Below is an example of adding a toggle within the outlined field
                  // for showing/hiding the editor menu bar, and a "submit" button for
                  // saving/viewing the HTML content
                  footer: (
                      <Stack
                          direction="row"
                          spacing={2}
                          sx={{
                            borderTopStyle: "solid",
                            borderTopWidth: 1,
                            borderTopColor: (theme) => theme.palette.divider,
                            py: 1,
                            px: 1.5,
                          }}>
                        <MenuButton
                            value="formatting"
                            tooltipLabel={
                              showMenuBar ? "Hide formatting" : "Show formatting"
                            }
                            size="small"
                            onClick={() =>
                                setShowMenuBar((currentState) => !currentState)
                            }
                            selected={showMenuBar}
                            IconComponent={TextFields}
                        />

                        <MenuButton
                            value="formatting"
                            tooltipLabel={
                              isEditable
                                  ? "Prevent edits (use read-only mode)"
                                  : "Allow edits"
                            }
                            size="small"
                            onClick={() => setIsEditable((currentState) => !currentState)}
                            selected={!isEditable}
                            IconComponent={isEditable ? LockOpen : Lock}
                        />

                        <div className="hidden md:block">
                          <LoadingButton
                              variant="contained"
                              size="small"
                              startIcon={<DraftsIcon fontSize="small"/>}
                              loadingPosition="start"
                              loading={isSavingDraft}
                              onClick={onSaveDraft}>
                            <span className="text-[12px]">Save draft</span>
                          </LoadingButton>
                        </div>
                        <div className="md:hidden">
                          <LoadingButton
                              variant="contained"
                              size="small"
                              loading={isSavingDraft}
                              onClick={onSaveDraft}>
                            <DraftsIcon fontSize="small"/>
                          </LoadingButton>
                        </div>
                      </Stack>
                  ),
                  RichTextContentProps: {
                    className: "min-h-[600px] w-full"
                  }
                }
            ) : (
                {
                  // The "outlined" variant is the default (shown here only as
                  // example), but can be changed to "standard" to remove the outlined
                  // field border from the editor
                  variant: "standard",
                  MenuBarProps: {
                    hide: true
                  },
                  // Below is an example of adding a toggle within the outlined field
                  // for showing/hiding the editor menu bar, and a "submit" button for
                  // saving/viewing the HTML content
                  RichTextContentProps: {
                    className: "min-h-[600px] w-full"
                  }
                }
            )}>
          {() => (
              <>
                <LinkBubbleMenu/>
                <TableBubbleMenu/>
              </>
          )}
        </RichTextEditor>
      </Box>
  );
});

export default MuiRichTextEditor;
