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
  categoryList: Array<string>;
  onUpdate: (data: Array<string>) => void;
}

export default function MultiCategorySelectBox({ categoryList, onUpdate }: MultiCategorySelectBoxProps) {
  const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelectedCategoryList(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
    );
  };

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
            value={selectedCategoryList}
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
              <MenuItem key={category} value={category}>
                <Checkbox checked={selectedCategoryList.includes(category)}/>
                <ListItemText primary={category}/>
              </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
