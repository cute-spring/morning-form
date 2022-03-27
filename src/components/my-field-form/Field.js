import React, { Component } from "react";
import FieldContext from "./FieldContext";
import DerivedPropsResolver from "./DerivedPropsResolver";
var _ = require("lodash");
// const jexl = require("jexl");

class Field extends Component {
  static contextType = FieldContext;

  derivedPropsResolver = null;
  // constructor(props) {
  //   super(props);
  // To avoid being rendered first time (Mount) and then being hidden immediately caused by the derived props.
  // }

  componentDidMount() {
    this.derivedPropsResolver = new DerivedPropsResolver(this.context);
    this.unregister = this.context.setFieldEntities(this);
    this.onStoreChange([this.props.name]);
  }

  componentWillUnmount() {
    if (this.unregister) {
      this.context.delFieldValue(this);
      this.unregister();
    }
  }

  onStoreChange = (keys) => {
    const { name } = this.props;
    const { getFieldValue, delFieldValue, setFieldsValue } = this.context;

    let isRequiredToUpdate = false;
    if (_.includes(keys, name)) {
      isRequiredToUpdate = true;
    }

    const { curState, hasDiff } = this.derivedPropsResolver.synDerivedProps(
      this.props
    );
    const currentComputedValue = curState?.value;
    if (
      currentComputedValue !== undefined &&
      currentComputedValue !== getFieldValue(name)
    ) {
      setFieldsValue({
        [name]: currentComputedValue,
      });
      return;
    }

    isRequiredToUpdate = isRequiredToUpdate || hasDiff;

    if (isRequiredToUpdate === false) {
      return;
    }
    /**
     * clean up input value
     */
    const fieldValue = getFieldValue(name);
    const isRequiredToRender = curState?.renderIf;
    if (fieldValue !== undefined && isRequiredToRender === false) {
      delFieldValue(this);
    }

    if (isRequiredToUpdate) {
      this.forceUpdate();
    }
  };

  getDerivedProps = () =>
    this.derivedPropsResolver?.getCurrentDerivedProps(this.props.__key__) ||
    null;

  getControlled = () => {
    const { name, rule, children, derivedPropsDef, ...restProps } = this.props;
    const { getFieldValue, setFieldsValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newVal = e.target.value;
        // store set（name）
        setFieldsValue({
          [name]: newVal,
        });
      },
      ...restProps,
    };
  };

  render() {
    const derivedProps = this.getDerivedProps();
    if (derivedProps == null) {
      //for the first time, that the derivedPropsResolver has been initialized.
      console.log("render null for '%s'", this.props.name);
      return null;
    }
    const { renderIf, ...restDerivedProps } = derivedProps;
    if (renderIf === false) {
      console.log("render null for '%s'", this.props.name);
      //doesn't render only when renderIf is false exactly, otherwise, if it's true or undefined, go ahead to render.
      return null;
    }
    console.log("[re-]render '%s'", this.props.name);
    const updatedProps = { ...this.getControlled(), ...restDerivedProps };
    const { children } = this.props;
    const returnChildNode = React.cloneElement(children, updatedProps);
    return returnChildNode;
  }
}
export default Field;
