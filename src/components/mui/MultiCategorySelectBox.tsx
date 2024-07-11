import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FilledInput } from "@mui/material";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300
    },
  },
};

interface MultiCategorySelectBoxProps {
  categoryList: Array<Category>;
  onUpdate: (data: Array<Category>) => void;
}

export default function MultiCategorySelectBox({ categoryList, onUpdate }: MultiCategorySelectBoxProps) {
  const [selectedCategoryNameList, setSelectedCategoryNameList] = React.useState<Array<string>>([]);
  const [selectedCategoryList, setSelectedCategoryList] = useState<Array<Category>>([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelectedCategoryNameList(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    setSelectedCategoryList(selectedCategoryNameList
        .map(selectedName => categoryList.find(category => category.name === selectedName)!));
  }, [selectedCategoryNameList]);

  useEffect(() => {
    onUpdate(selectedCategoryList);
  }, [selectedCategoryList]);

  return (
      <FormControl sx={{ width: 1 }}>
        <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
        <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedCategoryNameList}
            onChange={handleChange}
            input={<FilledInput/>}
            renderValue={(selected) => selected.join(', ')}
            sx={{
              fontSize: 18
            }}
            size="small"
            MenuProps={MenuProps}
        >
          {categoryList && categoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                <Checkbox checked={selectedCategoryNameList.includes(category.name)}/>
                <ListItemText primary={category.name}/>
              </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
