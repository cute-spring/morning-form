import { FormStore } from "../components/my-field-form";
import validationSchema from "./validationSchema";

const formStore = new FormStore();
const form = formStore.getForm();

const schema = {
  type: "Form",
  props: {
    form: form,
    validationSchema,
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
        name: "email",
        label: "Email",
        placeholder: "abc@xx.com",
      },
      validate: {},
    },
    {
      type: "FieldInput",
      props: {
        name: "age",
        label: "Age",
        placeholder: "18",
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
          { key: "20", text: "Australia" },
        ],
      },
    },
    {
      type: "FieldSelect",
      props: {
        name: "countryOfOnboarding",
        label: "Country/Region of Onboarding",
        options: [
          { key: "--", text: "Please select" },
          { key: "55", text: "China" },
          { key: "74", text: "Egypt" },
          { key: "84", text: "France" },
          { key: "20", text: "Australia" },
        ],
        derivedPropsDef: {
          args: [
            {
              name: "country",
              type: "Input",
              path: "country",
              accessLevel: "private",
            },
            {
              name: "titleId",
              type: "Input",
              path: "titleId",
              accessLevel: "private",
            },
          ],
          computed: {
            value: "titleId == '04' ? country : '20'",
          },
        },
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
          // array of rule or function
          validate: function (value) {
            const pass =
              /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(
                value
              );
            return pass ? [] : ["invalided password"];
          },
          // [
          //   {
          //     rule: "", //jexl
          //     message: "",
          //   },
          // ],
        },
      },
    },
    {
      type: "FieldInput",
      props: {
        name: "confirmPassword",
        label: "confirm password",
        placeholder: "password",
      },
    },
    {
      type: "FieldInput",
      props: {
        name: "username",
        label: "username",
        placeholder: "username",
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
      displayName: "SubmitButton",
      props: {
        name: "Submit",
      },
    },
  ],
};
export default schema;
