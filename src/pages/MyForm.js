import { Component } from "react";
import { getComponentProxy, componentMapper } from "../components";
import schema from "./form-schema-sample";
// https://blog.csdn.net/u012961419/article/details/117031963
// import { useFormik } from "formik";
/**
 
  const formik = useFormik({
    initialValues: {
      name: '',
      profession : '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword:'',
      address:'',
      terms:false
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  })
Formik Validation:
touched – this object holds look over the various form fields which have been filled by the user or not.
validate – we pass the formValues object to this function, where you put validation of various fields, and populate the errors object accordingly.
errors – this object holds the error messages of various fields in value and message pair.
 */
const ComponentProxy = getComponentProxy({
  schema,
  componentMapper,
});
export default class MyRCFieldForm extends Component {
  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <ComponentProxy />
      </div>
    );
  }
}
