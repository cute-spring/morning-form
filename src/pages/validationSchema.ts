// import * as yup from "yup";
import {
  date,
  object,
  string,
  array,
  mixed,
  ref,
  number,
  boolean,
  reach,
  StringSchema,
} from "yup";

const validationSchema = object().shape({
  company: object().shape({
    address: string().min(4).required(),
    phone: string().min(4).required(),
    email: string().email().required(),
  }),
  children: array()
    .of(
      object({
        firstName: string().min(4).required(),
        nickName: string().max(6).nullable(),
        sex: mixed().oneOf(["male", "female"]).required(),
        email: string().nullable().email(),
        birthDate: date().min(new Date(1900, 0, 1)).required(),
      })
    )
    .min(3)
    .required(),
  username: string().min(4).required(),
  password: string()
    .required("Password is required")
    .min(6, "Password is too short - should be 6 chars minimum"),
  confirmPassword: string().oneOf(
    [ref("person.password")],
    "Passwords must match"
  ),
  email: string().email().required(),
  age: number().min(15, "You need to be older than 15 to register").required(),
});

const validate = async () => {
  try {
    await validationSchema.validate(
      {
        username: "gavin",
        age: 2,
        email: "sdf",
        password: "111111",
        confirmPassword: "123",
        children: [
          {
            firstName: "Cute",
            nickName: "Spring",
            sex: "male",
            email: "wrong-email",
          },
          {
            nickName: "super-man",
          },
        ],
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
};
validate();

const validate2 = async () => {
  try {
    const nestValidationSchema = reach(validationSchema, "company.email");
    await nestValidationSchema.validate("asdf@sdf.com");
    const confirmPassword = reach(validationSchema, "confirmPassword");
    let schema = object({
      password: string(),
      isBig: boolean(),
      count: number()
        .when("isBig", {
          is: true, // alternatively: (val) => val == true
          then: (schema: StringSchema) => schema.min(5),
          otherwise: (schema: StringSchema) => schema.min(0),
        })
        .when("$other", ([other], schema) =>
          other === 4 ? schema.max(6) : schema
        ),

      ta: object({
        startDate: date().required(),
        endDate: date().required(),
      }),
      birthDate: date()
        .min(ref("ta.startDate"))
        .max(ref("ta.endDate"))
        .required(),
    });
    const birthDateSchema = reach(schema, "birthDate");
    console.log(birthDateSchema);
    // debugger;
  } catch (err) {
    // err.name; // => 'ValidationError'
    // err.errors; // => ['Deve ser maior que 18']
    console.error(err);
  }
};
validate2();
export default validationSchema;
