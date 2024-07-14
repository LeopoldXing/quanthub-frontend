import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { OutlinedInput } from "@mui/material";
import { useEffect } from "react";
import { Category } from "@/types";

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300
    },
  },
};

interface SingleCategorySelectBoxProps {
  categoryList: Array<Category>;
  onUpdate?: (data: string) => void;
  height?: string;
  initialCategoryName?: string;
}

export default function SingleCategorySelectBox({
                                                  initialCategoryName,
                                                  categoryList,
                                                  onUpdate,
                                                  height = "70px"
                                                }: SingleCategorySelectBoxProps) {
  const [selectedCategoryName, setSelectedCategoryName] = React.useState<string>(initialCategoryName || "");

  useEffect(() => {
    if (onUpdate && selectedCategoryName !== "") {
      onUpdate(selectedCategoryName);
    }
  }, [selectedCategoryName]);

  return (
      <FormControl sx={{ width: 1 }}>
        <Select
            id="demo-multiple-checkbox"
            defaultValue={initialCategoryName || ""}
            onChange={(e) => setSelectedCategoryName(e.target.value)}
            input={<OutlinedInput/>}
            sx={{
              fontSize: 18,
              height: height
            }}
            MenuProps={MenuProps}
        >
          {categoryList && categoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                <ListItemText primary={category.name}/>
              </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
