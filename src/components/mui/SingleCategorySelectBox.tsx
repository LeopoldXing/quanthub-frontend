import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";
import { Category } from "@/types";
import { v4 as uuid } from 'uuid';

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
}

export default function SingleCategorySelectBox({
                                                  categoryList,
                                                  onUpdate,
                                                  height = "70px"
                                                }: SingleCategorySelectBoxProps) {
  const [selectedCategoryName, setSelectedCategoryName] = React.useState<string>("");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelectedCategoryName(value);
  };

  useEffect(() => {
    if (onUpdate) {
      onUpdate(selectedCategoryName);
    }
  }, [onUpdate, selectedCategoryName]);

  return (
      <FormControl sx={{ width: 1 }}>
        <Select
            id="demo-multiple-checkbox"
            value={selectedCategoryName}
            onChange={handleChange}
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
