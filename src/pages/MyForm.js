import { Component } from "react";
import ComponentProxy, { addInternalKey } from "../components/ComponentProxy";
import schema from "./form-schema-sample";

addInternalKey("k", [schema]);
console.log(schema);

schema.children = [
  {
    type: "FieldInput",
    props: {
      name: "userName",
      label: "User Name",
      placeholder: "David Lee",
    },
  },
  ...schema.children,
];
addInternalKey("k", [schema]);
console.log(schema);
export default class MyRCFieldForm extends Component {
  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <ComponentProxy {...schema} />
      </div>
    );
  }
}
