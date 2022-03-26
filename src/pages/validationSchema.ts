// import * as yup from "yup";
import { date, object, string, array, mixed, ref, number } from "yup";

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
  confirmPassword: string().oneOf([ref("password")], "Passwords must match"),
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
export default validationSchema;
