import produce from "immer";
const jexl = require("jexl");

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

function DerivedPropsResolver({
  getFieldValue,
  getDerivedProps,
  setDerivedProps,
}) {
  return {
    synDerivedProps: (props) => {
      const { derivedPropsDef, name, __key__ } = props;
      let prevState = getDerivedProps(__key__);
      if (prevState === undefined) {
        prevState = {};
        setDerivedProps(__key__, prevState);
      }
      let curState = prevState;
      let hasDiff = false;
      if (derivedPropsDef !== undefined) {
        curState = getCurState(prevState, derivedPropsDef, getFieldValue);
        hasDiff = prevState !== curState;
        if (hasDiff) {
          setDerivedProps(__key__, curState);
          console.group("derivedPropsDef - [%s] - [%s]", name, __key__);
          console.log({ curState, prevState, hasDiff });
          console.groupEnd("derivedPropsDef - [%s] - [%s]", name, __key__);
        }
      }
      return { curState, prevState, hasDiff };
    },
    getCurrentDerivedProps: (__key__) => getDerivedProps(__key__),
  };
}
export default DerivedPropsResolver;
