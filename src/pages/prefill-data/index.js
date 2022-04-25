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
const formInstance = formStore.getForm({ initialValues });
export default class MyRCFieldForm extends Component {
  render() {
    return (
      <div>
        <h3>prefill data</h3>
        <div>
          <ul>
            <li>
              Before B/C being changed manullay, changing A will change B/C
              automantically
            </li>
            <li>
              <code>
                {JSON.stringify([
                  { A: "a1", B: "b1", C: "C1" },
                  { A: "a2", B: "b2", C: "C2" },
                  { A: "a3", B: "b3", C: "C3" },
                ])}
              </code>
            </li>
            <li>
              {" => "}
              <code>
                {JSON.stringify({
                  a1: { B: "b1", C: "C1" },
                  a2: { B: "b2", C: "C2" },
                  a3: { B: "b3", C: "C3" },
                })}
              </code>
            </li>
          </ul>
        </div>

        <FieldContext.Provider value={formInstance}>
          <ComponentProxy {...processedSchema} />
        </FieldContext.Provider>
      </div>
    );
  }
}
