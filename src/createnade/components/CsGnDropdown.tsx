import { useState } from "react";
import { DropdownProps, Dropdown } from "semantic-ui-react";

type Props<T> = {
  onChange: (newValue: T) => void;
  options: any;
};

export function CsGnDropdown<T>(props: Props<T>) {
  const [value, setValue] = useState();

  function onChange(_: any, data: DropdownProps) {
    const value = data.value as any;
    setValue(value);
    props.onChange(value);
  }

  return (
    <>
      <Dropdown
        fluid
        selection
        placeholder="Select..."
        value={value}
        onChange={onChange}
        options={props.options}
      />
    </>
  );
}
