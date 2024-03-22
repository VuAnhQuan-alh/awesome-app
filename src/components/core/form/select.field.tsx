import { GridCol, Select, SelectProps } from "@mantine/core";
import { useFormContext } from "@zone/components/context/form.context";

interface IProps extends SelectProps {
  name: string;
  span: number | "auto" | "content";
}

function SelectField(props: IProps) {
  const { name, span, ...selectProps } = props;
  const form = useFormContext();

  return (
    <GridCol span={span}>
      <Select {...selectProps} {...form.getInputProps(name)} />
    </GridCol>
  );
}

export default SelectField;
