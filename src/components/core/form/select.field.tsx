import { GridCol, Select, SelectProps } from "@mantine/core";
import { FieldComponent } from "@tanstack/react-form";

interface IProps<TFilter> extends SelectProps {
  Control: FieldComponent<TFilter, undefined>;
  name: string;
  span: number | "auto" | "content";
}

function SelectField<T = unknown>(props: IProps<T>) {
  const { Control, name, span, ...fieldProps } = props;
  return (
    <GridCol span={span}>
      <Control
        // @ts-ignore
        name={name}
      >
        {(control) => (
          <Select
            // @ts-ignore
            name={control.name}
            value={control.state.value}
            onBlur={control.handleBlur}
            // @ts-ignore
            onChange={control.handleChange}
            {...fieldProps}
          />
        )}
      </Control>
    </GridCol>
  );
}

export default SelectField;
