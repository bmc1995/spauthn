import { Option } from "@mui/joy";
import { SelectableCountries } from "./enums";

export const generateOptionsFromEnum = () => {
  const opts = [];
  const c = Object.values(SelectableCountries);
  for (const iterator in SelectableCountries) {
    opts.push(
      <Option value={iterator} key={iterator}>
        {c.shift()}
      </Option>
    );
  }
  return opts;
};
//TODO D.R.Y
import { FieldValues } from "react-hook-form";
export const generateOptionsFromEnumRHF = (fieldValues?: FieldValues) => {
  const opts = [];
  const c = Object.values(SelectableCountries);
  for (const iterator in SelectableCountries) {
    opts.push(
      <Option {...fieldValues} value={iterator} key={iterator}>
        {c.shift()}
      </Option>
    );
  }
  return opts;
};
