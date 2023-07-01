import * as yup from 'yup';

export const queryValidationSchema = yup.object().shape({
  question: yup.string().required(),
  response: yup.string(),
  customer_id: yup.string().nullable(),
  support_id: yup.string().nullable(),
});
