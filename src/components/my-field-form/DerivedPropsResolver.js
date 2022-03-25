import produce from "immer";
const jexl = require("jexl");

const derivedPropsByKey = {};

const generateArgsContext = (args = [], getFieldValue) => {
  const argsCtx = {};
  args.forEach((item) => {
    const { type, name, path, value } = item;
    if (type === "Input") {
      const fieldValue = getFieldValue(path);
      argsCtx[name] = fieldValue;
    } else if (type === "constant") {
      argsCtx[name] = value;
    }
  });
  return argsCtx;
};
function getCurState(prevState, derivedPropsDef, getFieldValue) {
  return produce(prevState, (draft) => {
    const { args, computed = {} } = derivedPropsDef;
    if (args) {
      const argsCtx = generateArgsContext(args, getFieldValue);
      Object.keys(computed).forEach((key) => {
        const expressionRule = computed[key];
        const res = jexl.evalSync(expressionRule, argsCtx);
        console.log("argsCtx : %o", argsCtx);
        console.log("expression rule : '%s'", expressionRule);
        console.log("%s : %s", key, res);
        draft[key] = res;
      });
    }
  });
}
function DerivedPropsResolver({ getFieldValue }) {
  return {
    synDerivedProps: (props) => {
      const { derivedPropsDef, name, __key__ } = props;
      derivedPropsByKey[__key__] = derivedPropsByKey[__key__] || {};
      const prevState = derivedPropsByKey[__key__];
      let curState = prevState;
      let hasDiff = false;
      if (derivedPropsDef !== undefined) {
        console.group("derivedPropsDef - [%s] - [%s]", name, __key__);
        curState = getCurState(prevState, derivedPropsDef, getFieldValue);
        hasDiff = prevState !== curState;
        derivedPropsByKey[__key__] = curState;
        console.log({ curState, prevState, hasDiff });
        console.groupEnd("derivedPropsDef - [%s] - [%s]", name, __key__);
      }
      return { curState, prevState, hasDiff };
    },
    getDerivedProps: (__key__) => {
      return derivedPropsByKey[__key__];
    },
  };
}
export default DerivedPropsResolver;
