import * as yup from 'yup';

export const reportValidationSchema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
  analyst_id: yup.string().nullable(),
});
