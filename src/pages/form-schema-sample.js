import { FormStore } from "../components/my-field-form";
const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

const formStore = new FormStore();
const form = formStore.getForm();

const schema = {
  type: "Form",
  props: {
    form: form,
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
        name: "custName",
        label: "Customer Name",
        placeholder: "Customer Name",
      },
    },
    {
      type: "FieldSelect",
      props: {
        name: "country",
        label: "Country/Region",
        options: [
          { key: "--", text: "Please select" },
          { key: "55", text: "China" },
          { key: "74", text: "Egypt" },
          { key: "84", text: "France" },
        ],
      },
    },
    {
      type: "FieldSelect",
      props: {
        name: "titleId",
        label: "Title",
        options: [
          { key: "--", text: "Please select" },
          { key: "01", text: "Mr" },
          { key: "02", text: "Mrs" },
          { key: "03", text: "Ms" },
          { key: "04", text: "Miss" },
          { key: "05", text: "Mx" },
          { key: "06", text: "Others" },
        ],
      },
    },
    {
      type: "FieldSelect",
      props: {
        name: "documentTypeId",
        label: "Document Type",
        options: [
          { key: "--", text: "Please select" },
          { key: "4896", text: "Corporate Registry Extract" },
          { key: "4897", text: "Certificate of Incorporation" },
          { key: "4898", text: "Bussiness Registration Certificate" },
          { key: "4899", text: "Evidence of listing" },
          { key: "4900", text: "Evidence of regulation" },
        ],
      },
    },
    {
      type: "FieldInput",
      props: {
        name: "password",
        label: "password",
        placeholder: "password",
        rules: [passworRules],
        derivedPropsDef: {
          args: [
            {
              name: "username",
              type: "Input",
              path: "username",
              accessLevel: "private",
            },
            {
              name: "expectedUserName",
              type: "constant",
              value: "hacker",
            },
          ],
          computed: {
            renderIf: "username == expectedUserName",
          },
        },
      },
    },
    {
      type: "FieldInput",
      props: {
        name: "username",
        label: "username",
        placeholder: "username",
        rules: [nameRules],
        derivedPropsDef: {
          args: [
            {
              name: "documentType",
              type: "Input",
              path: "documentTypeId",
              accessLevel: "private",
            },
            {
              name: "expectedDocumentTypes",
              type: "constant",
              value: ["4899", "4900"],
            },
          ],
          computed: {
            renderIf: "documentType in expectedDocumentTypes",
          },
        },
      },
    },
    {
      type: "Button",
      props: {
        name: "Submit",
      },
    },
  ],
};
export default schema;
