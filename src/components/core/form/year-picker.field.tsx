import { GridCol } from "@mantine/core";
import { YearPickerInput, YearPickerInputProps } from "@mantine/dates";
import { FieldComponent } from "@tanstack/react-form";

interface IProps<TFilter> extends YearPickerInputProps {
  Control: FieldComponent<TFilter, undefined>;
  name: string;
  span: number | "auto" | "content";
}

function YearPickerField<T = unknown>(props: IProps<T>) {
  const { Control, name, span, ...fieldProps } = props;
  return (
    <GridCol span={span}>
      <Control
        // @ts-ignore
        name={name}
      >
        {(control) => (
          <YearPickerInput
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

export default YearPickerField;
