import { ReactNode } from "react";

import { createFormContext, UseFormReturnType } from "@mantine/form";

const [FormProvider, useFormContext, useContextForm] = createFormContext();

type IProps = {
  form: UseFormReturnType<unknown, (values: unknown) => unknown>;
  children: ReactNode;
};

function FormContext(props: IProps) {
  return <FormProvider form={props.form}>{props.children}</FormProvider>;
}

export { FormContext, useFormContext, useContextForm };
