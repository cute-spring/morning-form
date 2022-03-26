import { FormStore } from "../components/my-field-form";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Field is required"),
  username: yup
    .string()
    .min(4, "Must be at least 4 characters")
    .required("Field is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  age: yup
    .number()
    .min(15, "You need to be older than 15 to register")
    .required(),
});

const formStore = new FormStore();
const form = formStore.getForm();

const schema = {
  type: "Form",
  props: {
    form: form,
    validationSchema,
    // ref：this.formRef,
    onFinish: async (val) => {
      console.log("onFinish", val, null, "\t"); //sy-log
      try {
        await validationSchema.validate(
          {
            username: "gavin",
            age: 2,
            email: "sdf",
            password: "111111",
            confirmPassword: "123",
          },
          {
            abortEarly: false,
          }
        );
      } catch (err) {
        // err.name; // => 'ValidationError'
        // err.errors; // => ['Deve ser maior que 18']
        console.error(err);
      }
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
