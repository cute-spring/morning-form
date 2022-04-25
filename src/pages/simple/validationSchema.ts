// import * as yup from "yup";
import { object, string } from "yup";

const validationSchema = object().shape({
  firstName: string().required(),
  lastName: string().required(),
  telephone: string().optional().min(10),
});

export default validationSchema;
