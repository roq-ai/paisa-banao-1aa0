import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createQuery } from 'apiSdk/queries';
import { Error } from 'components/error';
import { queryValidationSchema } from 'validationSchema/queries';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CustomerInterface } from 'interfaces/customer';
import { UserInterface } from 'interfaces/user';
import { getCustomers } from 'apiSdk/customers';
import { getUsers } from 'apiSdk/users';
import { QueryInterface } from 'interfaces/query';

function QueryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: QueryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createQuery(values);
      resetForm();
      router.push('/queries');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<QueryInterface>({
    initialValues: {
      question: '',
      response: '',
      customer_id: (router.query.customer_id as string) ?? null,
      support_id: (router.query.support_id as string) ?? null,
    },
    validationSchema: queryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Query
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="question" mb="4" isInvalid={!!formik.errors?.question}>
            <FormLabel>Question</FormLabel>
            <Input type="text" name="question" value={formik.values?.question} onChange={formik.handleChange} />
            {formik.errors.question && <FormErrorMessage>{formik.errors?.question}</FormErrorMessage>}
          </FormControl>
          <FormControl id="response" mb="4" isInvalid={!!formik.errors?.response}>
            <FormLabel>Response</FormLabel>
            <Input type="text" name="response" value={formik.values?.response} onChange={formik.handleChange} />
            {formik.errors.response && <FormErrorMessage>{formik.errors?.response}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<CustomerInterface>
            formik={formik}
            name={'customer_id'}
            label={'Select Customer'}
            placeholder={'Select Customer'}
            fetcher={getCustomers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'support_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'query',
    operation: AccessOperationEnum.CREATE,
  }),
)(QueryCreatePage);
