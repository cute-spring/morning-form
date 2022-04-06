import produce from "immer";
import { reach } from "yup";
const _ = require("lodash");
// store 状态管理库
export class FormStore {
  constructor() {
    this.storeRef = { ref: {} };

    // 开辟一个空间存储Fields
    this.fieldEntities = [];

    // 开辟一个空间存储callbacks
    this.callbacks = {};

    this.observers = [];

    this.derivedPropsByKey = {};
    this.metaByKey = {};
  }

  register = (observer) => {
    this.observers.push(observer);

    return () => {
      this.observers = this.observers.filter((item) => item !== observer);
    };
  };

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    };
  };

  // set
  // 订阅和取消订阅，监听和取消监听要成对出现
  setFieldEntities = (entity) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
    };
  };

  delFieldValue = (entity) => {
    const propName = entity.props.name;
    const prevState = this.storeRef.ref;
    const curState = produce(prevState, (draft) => {
      _.set(draft, propName, null);
    });
    this.storeRef.ref = curState;
    this.notify(propName);
  };

  getFieldsValue = () => {
    return this.storeRef.ref;
  };

  getFieldValue = (name) => {
    return _.get(this.storeRef.ref, name);
  };

  setFieldValue = (name, value) => {
    const prevState = this.storeRef.ref;
    const curState = produce(prevState, (draft) => {
      _.set(draft, name, value);
    });
    this.storeRef.ref = curState;
    if (prevState !== curState) {
      //TODO:
      this.notify(name);
    }
  };

  notify = (fieldName) => {
    this.fieldEntities.forEach((entity) => {
      entity.onStoreChange(fieldName);
    });
  };

  validate = () => {
    // 存储错误信息
    let err = [];

    // todo 校验

    return err;
  };

  submit = () => {
    let err = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length > 0) {
      // 出错了
      onFinishFailed(err, this.getFieldsValue());
    } else {
      // 校验通过
      onFinish(this.getFieldsValue());
    }
  };
  setDerivedProps = (__key__, state) => {
    this.derivedPropsByKey[__key__] = state;
  };
  getDerivedProps = (__key__) => {
    return this.derivedPropsByKey[__key__];
  };

  getMeta = (__key__) => {
    const meta = this.metaByKey[__key__] || {};
    this.metaByKey[__key__] = meta;
    return meta;
  };

  validateAt = async (__key__, path, value, handleError) => {
    let meta = this.getMeta(__key__);
    let nestValidationSchema = null;
    try {
      nestValidationSchema = reach(this.validationSchema, path);
    } catch (e) {
      //The schema does not contain the path:
      return;
    }
    try {
      await nestValidationSchema.validate(value);
      meta.errors = [];
      meta.touched = true;
      handleError(meta);
    } catch (e) {
      meta.errors = e.errors;
      meta.touched = true;
      handleError(meta);
    }
  };

  getForm = ({ initialValues, validationSchema }) => {
    this.validationSchema = validationSchema;
    return {
      setDerivedProps: this.setDerivedProps,
      getDerivedProps: this.getDerivedProps,
      delFieldValue: this.delFieldValue,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
      setFieldEntities: this.setFieldEntities,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
      validateOnBlur: true,
      validationSchema: this.validationSchema,
      validateAt: this.validateAt,
      getMeta: this.getMeta,
    };
  };
}
export default FormStore;
