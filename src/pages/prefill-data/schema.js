const schema = {
  type: "Form",
  props: {
    onFinish: (val) => {
      console.log("onFinish", val, null, "\t"); //sy-log
    },
    onFinishFailed: (val) => {
      console.log("onFinishFailed", val); //sy-log
    },
  },
  children: [
    {
      type: "FieldSelect",
      props: {
        name: "A",
        label: "A",
        options: [
          { key: "--", text: "Please select" },
          { key: "a1", text: "a1" },
          { key: "a2", text: "a2" },
          { key: "a3", text: "a3" },
        ],
      },
    },
    {
      type: "FieldSelect",
      props: {
        name: "B",
        label: "B",
        options: [
          { key: "--", text: "Please select" },
          { key: "b1", text: "b1" },
          { key: "b2", text: "b2" },
          { key: "b3", text: "b3" },
        ],
      },
    },
    {
      type: "FieldInput",
      props: {
        name: "C",
        label: "C",
        placeholder: "C",
        derivedPropsDef: {
          args: [
            {
              name: "A",
              type: "Input",
              path: "A",
              accessLevel: "private",
            },
          ],
          computed: {
            value: "A",
            //renderIf: "username == expectedUserName",
          },
        },
      },
    },
  ],
};
export default schema;
