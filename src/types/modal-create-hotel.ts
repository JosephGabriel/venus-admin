import { GridSize } from "@material-ui/core";

export type StepFormProps = {
  formik: any;
  inputs: inputType[];
  onChange: () => void;
};

export type inputType = {
  name: string;
  label: string;
  columns: GridSize;
};

export type stepType = {
  label: string;
  inputs: inputType[];
};

export interface keyType {
  name: string;
  summary: string;
  description: string;
  address: string;
  zipCode: string;
}

export type ModalProps = {
  refetch: () => void;
  onClose: () => void;
};
