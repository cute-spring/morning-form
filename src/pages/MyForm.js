import { Component } from "react";
import { getComponentProxy, componentMapper } from "../components";
import schema from "./form-schema-sample";

const ComponentProxy = getComponentProxy({ schema, componentMapper });
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
