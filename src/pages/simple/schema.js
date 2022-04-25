const schema = {
  type: "Form",
  props: {
    // form: form,
    // ref：this.formRef,
    onFinish: (val) => {
      console.log("onFinish", val, null, "\t"); //sy-log
    },
    onFinishFailed: (val) => {
      console.log("onFinishFailed", val); //sy-log
    },
  },
  children: [
    {
      type: "FieldInput",
      props: {
        name: "firstName",
        label: "First name",
        placeholder: "",
      },
    },
    {
      type: "FieldInput",
      props: {
        name: "lastName",
        label: "Last name",
        placeholder: "",
      },
    },
    {
      type: "FieldInput",
      props: {
        name: "telephone",
        label: "Telephone",
        placeholder: "",
      },
    },
    {
      type: "Button",
      displayName: "SubmitButton",
      props: {
        name: "Submit",
      },
    },
  ],
};
export default schema;
