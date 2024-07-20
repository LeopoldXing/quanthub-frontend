import Select from "@mui/material/Select";
import { OutlinedInput } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";


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


type CategorySingleSelectBoxProps = {
  initialData?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  onBlur: () => void;
  availableCategoryList: string[];
}
const CategorySingleSelectBox = ({
                                   initialData,
                                   value = "",
                                   onChange,
                                   onBlur,
                                   availableCategoryList
                                 }: CategorySingleSelectBoxProps) => {
  return (
      <FormControl sx={{ width: 1 }}>
        <Select
            id="demo-multiple-checkbox"
            defaultValue={initialData || ""}
            onChange={e => onChange(e.target.value)}
            input={<OutlinedInput/>}
            sx={{
              fontSize: 18,
              height: '70px'
            }}
            onBlur={onBlur}
            value={value}
            MenuProps={MenuProps}
        >
          {availableCategoryList && availableCategoryList.map((category) => (
              <MenuItem key={category} value={category}>
                <ListItemText primary={category}/>
              </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default CategorySingleSelectBox;
