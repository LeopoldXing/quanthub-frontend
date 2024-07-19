import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

type SortingPanelProps = {
  onChange: (value: {
    strategy: "recommended" | "publish_date" | "update_date",
    direction: "none" | "desc" | "asc"
  }) => void;
  onBlur?: () => void;
  value: { strategy: string, direction: string };
  loading?: boolean;
  viewerType?: "public" | "self";
}
const SortingPanel = ({
                        onChange,
                        value,
                        loading = false,
                        viewerType = "public"
                      }: SortingPanelProps) => {
  const directionChangeSequence = ["asc", "desc", "none"];
  const [publishSortDirectionPointer, setPublishSortDirectionPointer] = useState(2);
  const [updateSortDirectionPointer, setUpdateSortDirectionPointer] = useState(2);

  const [publishIcon, setPublishIcon] = useState<unknown>(undefined);
  const [updateIcon, setUpdateIcon] = useState<unknown>(undefined);

  useEffect(() => {
    if (publishSortDirectionPointer % 3 === 0) {
      setPublishIcon(<KeyboardArrowUpIcon/>);
    } else if (publishSortDirectionPointer % 3 === 1) {
      setPublishIcon(<KeyboardArrowDownIcon/>);
    } else {
      setPublishIcon(undefined);
    }
  }, [publishSortDirectionPointer]);

  useEffect(() => {
    if (updateSortDirectionPointer % 3 === 0) {
      setUpdateIcon(<KeyboardArrowUpIcon/>);
    } else if (updateSortDirectionPointer % 3 === 1) {
      setUpdateIcon(<KeyboardArrowDownIcon/>);
    } else {
      setUpdateIcon(undefined);
    }
  }, [updateSortDirectionPointer]);
  // @ts-ignore
  return (
      <div
          className="w-full flex justify-start items-center gap-5 border-b-[1px] border-gray-300">
        {/*  default - sort by popularity  */}
        <div className="py-2">
          <div className="h-8 py-0 pr-4 border-r-[1px] border-gray-300">
            <Button
                disabled={loading}
                sx={{
                  textWrap: "nowrap",
                  fontSize: "small",
                  color: "black",
                  fontWeight: `${value.strategy === "recommended" ? "bold" : ""}`
                }}
                onClick={() => {
                  onChange({ strategy: "recommended", direction: "none" });
                  setPublishSortDirectionPointer(2);
                  setUpdateSortDirectionPointer(2);
                }}
            >
              {viewerType === "public" ? "Recommended" : "Most Popular"}
            </Button>
          </div>
        </div>
        {/*  published date  */}
        <div>
          <div className="h-8 py-0 pr-4 border-r-[1px] border-gray-300">
            <Button
                disabled={loading}
                sx={{
                  textWrap: "nowrap",
                  fontSize: "small",
                  color: "black",
                  fontWeight: `${value.strategy === "publish_date" ? "bold" : ""}`
                }}
                endIcon={publishIcon}
                onClick={() => {
                  onChange({
                    strategy: "publish_date",
                    direction: directionChangeSequence[publishSortDirectionPointer === 0 ? 1 : 0]
                  });
                  setPublishSortDirectionPointer(prevState => prevState === 0 ? 1 : 0);
                  setUpdateSortDirectionPointer(2);
                }}
            >
              Published Date
            </Button>
          </div>
        </div>
        {/*  updated date  */}
        <div>
          <Button
              disabled={loading}
              sx={{
                textWrap: "nowrap",
                fontSize: "small",
                color: "black",
                fontWeight: `${value.strategy === "update_date" ? "bold" : ""}`
              }}
              endIcon={updateIcon}
              onClick={() => {
                onChange({
                  strategy: "update_date",
                  direction: directionChangeSequence[updateSortDirectionPointer === 0 ? 1 : 0]
                });
                setUpdateSortDirectionPointer(prevState => prevState === 0 ? 1 : 0);
                setPublishSortDirectionPointer(2);
              }}
          >
            Updated Date
          </Button>
        </div>
      </div>
  );
};

export default SortingPanel;
