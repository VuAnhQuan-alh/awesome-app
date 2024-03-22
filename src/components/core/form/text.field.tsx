import { GridCol, TextInput, TextInputProps } from "@mantine/core";
import { useFormContext } from "@zone/components/context/form.context";

interface IProps extends TextInputProps {
  name: string;
  span: number | "auto" | "content";
}

function TextField(props: IProps) {
  const { name, span, ...inputProps } = props;
  const form = useFormContext();

  return (
    <GridCol span={span}>
      <TextInput {...inputProps} {...form.getInputProps(name)} />
    </GridCol>
  );
}

export default TextField;
