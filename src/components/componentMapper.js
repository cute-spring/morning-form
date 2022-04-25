import { v4 as uuidv4 } from "uuid";
import "./componentMapper.css";
import Input from "./Input";
import Form, { Field } from "./my-field-form";
import Select from "./Select";
import clsx from "clsx";

const wrapWithLabel = (Comp) => (props) => {
  const { label, meta, desc, ...restProps } = props;
  const id = restProps.id || uuidv4();
  const descProps = {};
  if (!!desc) {
    descProps["aria-describedby"] = id + "_describedby";
  }

  const hasError = meta && meta.touched && !!meta.errors[0];
  const fieldClzName = clsx("form-control", hasError && "is-invalid");
  return (
    <div class="mb-3">
      <label htmlFor={id} class="form-label">
        {label}
      </label>
      <Comp {...restProps} {...descProps} id={id} className={fieldClzName} />
      {!!desc && (
        <div id={descProps["aria-describedby"]} class="form-text">
          {desc}
        </div>
      )}

      {hasError ? <div className="invalid-feedback">{meta.errors}</div> : <></>}
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
  return (
    <button type="submit" class="btn btn-primary">
      Submit
    </button>
  );
}

const componentMapper = {
  Form: Form,
  FieldInput: FieldInput,
  Button: Button,
  FieldSelect: FieldSelect,
};
export default componentMapper;
