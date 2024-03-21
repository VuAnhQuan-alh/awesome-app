import { GridCol, TextInput, TextInputProps } from "@mantine/core";
import { FieldComponent } from "@tanstack/react-form";

interface IProps<TFilter> extends TextInputProps {
  Control: FieldComponent<TFilter, undefined>;
  name: string;
  span: number | "auto" | "content";
}

function TextField<T = unknown>(props: IProps<T>) {
  const { Control, name, span, ...fieldProps } = props;
  return (
    <GridCol span={span}>
      <Control
        // @ts-ignore
        name={name}
      >
        {(control) => (
          <TextInput
            // @ts-ignore
            name={control.name}
            value={control.state.value}
            onBlur={control.handleBlur}
            // @ts-ignore
            onChange={(e) => control.handleChange(e.target.value)}
            {...fieldProps}
          />
        )}
      </Control>
    </GridCol>
  );
}

export default TextField;
