import React, { ForwardedRef } from 'react';
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FilledInput } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 200;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300
    },
  },
};

type CategorySelectBoxProps = {
  onChange: (event: SelectChangeEvent<string[]>) => void;
  onBlur?: () => void;
  value: string[];
  categoryList: string[];
}
const CategoryMultiSelectBox = React.forwardRef(({
                                                   onChange,
                                                   onBlur,
                                                   value,
                                                   categoryList
                                                 }: CategorySelectBoxProps, ref: ForwardedRef<HTMLInputElement>) => {
          return (
              <FormControl sx={{ width: 1 }}>
                <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    ref={ref}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
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
                        <Checkbox checked={value.includes(category)}/>
                        <ListItemText primary={category}/>
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
          );
        }
    )
;

export default CategoryMultiSelectBox;
