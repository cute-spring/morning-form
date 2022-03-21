const derivedProps = {
  args: [
    //type : Input|constant|asynfn
    {
      name: "country",
      type: "Input",
      path: "country",
      accessLevel: "private",
    },
    {
      name: "ageOfMajority",
      type: "constant",
      value: 18,
    },
    {
      name: "ageOfMajority",
      type: "constant",

      /* accessLevel : package|private <br>
       * private: the default value which is only visible by the element itself.<br>
       * package: visible by the element itself and the sub element under this element.
       */
      accessLevel: "package",

      // No limitation to the value

      value: 18,
    },
  ],
  // [key:string]:
  computed: {
    visible: "expr", //predicate expression
    readonly: "expr", //predicate expression
    mandatory: "expr", //predicate expression
    validation: [
      { rule: "expr", msg: "" },
      { rule: "expr", msg: "" },
    ],
    overwrite: {
      predicate: "expr",
      value: "expr",
    },
    default: {
      predicate: "expr",
      value: "expr",
    },
    customizedProps_xxx: {
      predicate: "expr",
      value: "expr",
    },
    customizedProps_yyy: {
      predicate: "expr",
      value: "expr", // boolean,number,array,json, expressionString,functionRef???
    },
  },
};
/**     */
const derivedPropsDef = {
  args: [
    //type : Input|constant|asynfn
    {
      name: "username",
      type: "Input",
      path: "person.username",
      accessLevel: "private",
    },
    {
      name: "ageOfMajority",
      type: "constant",
      value: 18,
    },
    {
      name: "ageOfMajority",
      type: "constant",
      //
      //   * accessLevel : package|private <br>
      //   * private: the default value which is only visible by the element itself.<br>
      //   * package: visible by the element itself and the sub element under this element.
      //
      accessLevel: "package",
      //
      //   No limitation to the value
      //
      value: 18,
    },
  ],
  // [key:string]:
  computed: {
    visible: "expr", //predicate expression
    readonly: "expr", //predicate expression
    mandatory: "expr", //predicate expression
    validation: [
      { rule: "expr", msg: "" },
      { rule: "expr", msg: "" },
    ],
    overwrite: {
      predicate: "expr",
      value: "expr",
    },
    default: {
      predicate: "expr",
      value: "expr",
    },
    customizedProps_xxx: {
      predicate: "expr",
      value: "expr",
    },
    customizedProps_yyy: {
      predicate: "expr",
      value: "expr", // boolean,number,array,json, expressionString,functionRef???
    },
  },
};
export default derivedPropsDef;
