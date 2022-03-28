import React, { Component } from "react";
import FieldContext from "./FieldContext";
import DerivedPropsResolver from "./DerivedPropsResolver";
const _ = require("lodash");
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

  onStoreChange = (nameOfChangedField) => {
    const { name, derivedPropsDef } = this.props;
    const { getFieldValue, delFieldValue, setFieldValue } = this.context;

    let isRequiredToUpdate = false;
    if (nameOfChangedField === name) {
      isRequiredToUpdate = true;
    }

    if (!!derivedPropsDef) {
      const { curState, hasDiff } = this.derivedPropsResolver.synDerivedProps(
        this.props
      );
      const currentComputedValue = curState?.value;
      if (
        currentComputedValue !== undefined &&
        currentComputedValue !== getFieldValue(name)
      ) {
        setFieldValue(name, currentComputedValue);
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
    }
    if (isRequiredToUpdate) {
      this.forceUpdate();
    }
  };

  getDerivedProps = () =>
    this.derivedPropsResolver?.getCurrentDerivedProps(this.props.__key__);

  getControlled = () => {
    const { name, rule, children, derivedPropsDef, ...restProps } = this.props;
    const { getFieldValue, setFieldValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newVal = e.target.value;
        // store set（name）
        setFieldValue(name, newVal);
      },
      ...restProps,
    };
  };

  render() {
    const { name, children, derivedPropsDef } = this.props;
    let updatedProps = this.getControlled();
    if (derivedPropsDef === undefined) {
      updatedProps = this.getControlled();
    } else {
      const derivedProps = this.getDerivedProps();
      if (derivedProps === undefined) {
        //for the first time, that the derivedPropsResolver has been initialized.
        console.log("render null for '%s'", name);
        return null;
      }
      const { renderIf, ...restDerivedProps } = derivedProps;
      if (renderIf === false) {
        console.log("render null for '%s'", name);
        //doesn't render only when renderIf is false exactly, otherwise, if it's true or undefined, go ahead to render.
        return null;
      }
      console.log("[re-]render '%s'", name);
      updatedProps = { ...this.getControlled(), ...restDerivedProps };
    }
    const returnChildNode = React.cloneElement(children, updatedProps);
    return returnChildNode;
  }
}
export default Field;
