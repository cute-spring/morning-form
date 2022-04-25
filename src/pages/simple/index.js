import { Component } from "react";
import {
  getComponentProxy,
  processSchema,
  componentMapper,
} from "../../components";
import schema from "./schema";
import { FormStore, FieldContext } from "../../components/my-field-form";
// https://blog.csdn.net/u012961419/article/details/117031963
// import { useFormik } from "formik";
import validationSchema from "./validationSchema";
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
const processedSchema = processSchema(schema);
const ComponentProxy = getComponentProxy({
  componentMapper,
});

const initialValues = {};
const formStore = new FormStore();
const formInstance = formStore.getForm({ initialValues, validationSchema });
export default class MyRCFieldForm extends Component {
  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <FieldContext.Provider value={formInstance}>
          <ComponentProxy {...processedSchema} />
        </FieldContext.Provider>
      </div>
    );
  }
}
