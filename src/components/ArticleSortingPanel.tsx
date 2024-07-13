import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";

type ArticleSortingPanelProps = {
  onSort: (sortStrategy: "publish_date" | "update_date" | "recommended", sortDirection: "asc" | "desc" | "none") => void;
  mode?: "public" | "user" | "admin";
  loading?: boolean;
}

const ArticleSortingPanel = ({ onSort, mode = "public", loading = false }: ArticleSortingPanelProps) => {
  const directionChangeSequence = ["asc", "desc", "none"];
  const [publishSortDirectionPointer, setPublishSortDirectionPointer] = useState(2);
  const [updateSortDirectionPointer, setUpdateSortDirectionPointer] = useState(2);
  const [strategy, setStrategy] = useState("recommended")

  const [publishIcon, setPublishIcon] = useState(undefined);
  const [updateIcon, setUpdateIcon] = useState(undefined);

  useEffect(() => {
    if (publishSortDirectionPointer % 3 === 0) {
      // @ts-ignore
      setPublishIcon(<KeyboardArrowUpIcon/>);
    } else if (publishSortDirectionPointer % 3 === 1) {
      // @ts-ignore
      setPublishIcon(<KeyboardArrowDownIcon/>);
    } else {
      setPublishIcon(undefined);
    }
  }, [publishSortDirectionPointer]);

  useEffect(() => {
    if (updateSortDirectionPointer % 3 === 0) {
      // @ts-ignore
      setUpdateIcon(<KeyboardArrowUpIcon/>);
    } else if (updateSortDirectionPointer % 3 === 1) {
      // @ts-ignore
      setUpdateIcon(<KeyboardArrowDownIcon/>);
    } else {
      setUpdateIcon(undefined);
    }
  }, [updateSortDirectionPointer]);

  return (
      <div
          className="w-full flex justify-start items-center gap-5 border-b-[1px] border-gray-300">
        {/*  default - sort popularity  */}
        <div className="py-2">
          <div className="h-8 py-0 pr-4 border-r-[1px] border-gray-300">
            <Button
                disabled={loading}
                sx={{
                  textWrap: "nowrap",
                  fontSize: "small",
                  color: "black",
                  fontWeight: `${strategy === "recommended" ? "bold" : ""}`
                }}
                onClick={() => {
                  onSort("recommended", "none");
                  setStrategy("recommended");
                  setPublishSortDirectionPointer(2);
                  setUpdateSortDirectionPointer(2);
                }}
            >
              {mode === "public" ? "Recommended" : "Most Popular"}
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
                  fontWeight: `${strategy === "publish_date" ? "bold" : ""}`
                }}
                endIcon={publishIcon}
                onClick={() => {
                  // @ts-ignore
                  onSort("publish_date", directionChangeSequence[publishSortDirectionPointer === 0 ? 1 : 0]);
                  setStrategy("publish_date");
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
                fontWeight: `${strategy === "update_date" ? "bold" : ""}`
              }}
              endIcon={updateIcon}
              onClick={() => {
                // @ts-ignore
                onSort("update_date", directionChangeSequence[updateSortDirectionPointer === 0 ? 1 : 0]);
                setStrategy("update_date");
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

export default ArticleSortingPanel;
