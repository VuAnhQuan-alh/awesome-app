import { GridCol } from "@mantine/core";
import { YearPickerInput, YearPickerInputProps } from "@mantine/dates";
import { useFormContext } from "@zone/components/context/form.context";

interface IProps extends YearPickerInputProps {
  name: string;
  span: number | "auto" | "content";
}

function YearPickerField(props: IProps) {
  const { name, span, ...inputProps } = props;
  const form = useFormContext();
  return (
    <GridCol span={span}>
      <YearPickerInput {...inputProps} {...form.getInputProps(name)} />
    </GridCol>
  );
}

export default YearPickerField;
