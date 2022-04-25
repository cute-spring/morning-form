import React from "react";
import _Form from "./Form";
import Field from "./Field";
import useForm from "./useForm";
import FormStore from "./FormStore";
import FieldContext from "./FieldContext";

const Form = React.forwardRef(_Form);
Form.Field = Field;
Form.useForm = useForm;

export { Field, useForm, FormStore, FieldContext };
export default Form;
