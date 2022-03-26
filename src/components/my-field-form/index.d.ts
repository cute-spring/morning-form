export type NamePath = string;
export type StoreValue = any;
export interface Store {
  [name: string]: StoreValue;
}

export interface Meta {
  touched: boolean;
  validating: boolean;
  errors: string[];
  name: NamePath;
}

export interface FieldData extends Meta {
  value: StoreValue;
}
export type DerivedProps = any;
export interface FormInstance {
  getFieldValue: (name: NamePath) => StoreValue;
  delFieldValue: (name: NamePath) => void;
  //   getFieldsValue: this.getFieldsValue,
  setFieldsValue: (value: Store) => void;
  //   setFieldEntities: this.setFieldEntities,
  //   setCallbacks: this.setCallbacks,
  //   submit: this.submit,
  setDerivedProps: (key: string, derivedProps: DerivedProps) => void;
  getDerivedProps: (key: string) => DerivedProps;
  getMeta: (key: string) => Meta;
}

/**
 * 
 
 export interface FieldEntity {
   onStoreChange: (
     store: Store,
     namePathList: NamePath[] | null,
     info: ValuedNotifyInfo
   ) => void;
   isFieldTouched: () => boolean;
   isFieldDirty: () => boolean;
   isFieldValidating: () => boolean;
   validateRules: (options?: ValidateOptions) => Promise<string[]>;
   getMeta: () => Meta;
   getNamePath: () => NamePath;
   getErrors: () => string[];
   props: {
     name?: NamePath;
     rules?: Rule[];
     dependencies?: NamePath[];
     initialValue?: any;
   };
 }
 interface FieldInputProps<FieldValue, T extends HTMLElement = HTMLElement>
  extends AnyObject {
  name: string;
  onBlur: (event?: React.FocusEvent<T>) => void;
  onChange: (event: React.ChangeEvent<T> | any) => void;
  onFocus: (event?: React.FocusEvent<T>) => void;
  type?: string;
  value: FieldValue;
  checked?: boolean;
  multiple?: boolean;
}

// export default { FormStore };
export interface FormInstance {
  // Origin Form API
  getFieldValue: (name: NamePath) => StoreValue;
  getFieldsValue: (
    nameList?: NamePath[] | true,
    filterFunc?: (meta: Meta) => boolean
  ) => Store;
  getFieldError: (name: NamePath) => string[];
  getFieldsError: (nameList?: NamePath[]) => FieldError[];
  isFieldsTouched(nameList?: NamePath[], allFieldsTouched?: boolean): boolean;
  isFieldsTouched(allFieldsTouched?: boolean): boolean;
  isFieldTouched: (name: NamePath) => boolean;
  isFieldValidating: (name: NamePath) => boolean;
  isFieldsValidating: (nameList: NamePath[]) => boolean;
  resetFields: (fields?: NamePath[]) => void;
  setFields: (fields: FieldData[]) => void;
  setFieldsValue: (value: Store) => void;
  validateFields: ValidateFields;

  // New API
  submit: () => void;
}
 */
