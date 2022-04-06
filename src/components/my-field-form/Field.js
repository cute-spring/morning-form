import React, { Component } from "react";
import DerivedPropsResolver from "./DerivedPropsResolver";
import FieldContext from "./FieldContext";

class Field extends Component {
  static contextType = FieldContext;

  derivedPropsResolver = null;

  componentDidMount() {
    this.derivedPropsResolver = new DerivedPropsResolver(this.context);
    this.unregister = this.context.setFieldEntities(this);
    this.onStoreChange(this.props.name);
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
    const { __key__, name, rule, children, derivedPropsDef, ...restProps } =
      this.props;
    const {
      getFieldValue,
      setFieldValue,
      validateOnBlur,
      // validationSchema,
      validateAt,
      getMeta,
    } = this.context;
    const meta = getMeta(__key__);
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newVal = e.target.value;
        // store set（name）
        setFieldValue(name, newVal);
      },
      onBlur: (e) => {
        if (validateOnBlur) {
          if (derivedPropsDef && derivedPropsDef.validate) {
            const newVal = e.target.value;
            const errors = derivedPropsDef.validate(newVal);
            console.info("validateOnBlur : %s", validateOnBlur);
            console.info("errors : %s", errors);
          } else {
            // need to consider the data structure of array
            validateAt(__key__, name, e.target.value, (errorMsg) => {
              console.error(errorMsg);
              this.forceUpdate();
            });
          }
        }
      },
      meta,
      __key__,
      ...restProps,
    };
  };

  render() {
    const { name, children, derivedPropsDef } = this.props;
    let updatedProps = this.getControlled();
    if (derivedPropsDef !== undefined) {
      const derivedProps = this.getDerivedProps();
      if (derivedProps === undefined) {
        // The derivedPropsResolver is required to be initlized during the
        // componentDidMount phase after the first render.
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
      updatedProps = { ...updatedProps, ...restDerivedProps };
    }
    const returnChildNode = React.cloneElement(children, updatedProps);
    return returnChildNode;
  }
}
export default Field;
