import { v4 as uuidv4 } from "uuid";
import Input from "./Input";
import Form, { Field } from "./my-field-form";
import Select from "./Select";
import "./componentMapper.css";

const wrapWithLabel = (Comp) => (props) => {
  const { label, meta, ...restProps } = props;
  const id = restProps.id || uuidv4();
  const hasError = meta && meta.touched && !!meta.errors[0];
  const wrapperClzName = `input-group ${hasError ? "error" : ""}`;
  return (
    <div style={{ padding: "10px" }} className={wrapperClzName}>
      <label htmlFor={id}>{label} : </label>
      <Comp {...restProps} id={id} />
      {hasError ? <div className="error-message">{meta.errors}</div> : <></>}
    </div>
  );
};

const wrapWithField = (Comp) => (props) => {
  return (
    <Field {...props}>
      <Comp />
    </Field>
  );
};

const LabelInput = (props) => wrapWithLabel(Input)(props);
const FieldInput = (props) => wrapWithField(LabelInput)(props);

const LabelSelect = (props) => wrapWithLabel(Select)(props);
const FieldSelect = (props) => wrapWithField(LabelSelect)(props);

function Button() {
  return <button>Submit</button>;
}

const componentMapper = {
  Form: Form,
  FieldInput: FieldInput,
  Button: Button,
  FieldSelect: FieldSelect,
};
export default componentMapper;
