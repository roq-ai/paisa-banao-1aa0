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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getQueryById, updateQueryById } from 'apiSdk/queries';
import { Error } from 'components/error';
import { queryValidationSchema } from 'validationSchema/queries';
import { QueryInterface } from 'interfaces/query';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { CustomerInterface } from 'interfaces/customer';
import { UserInterface } from 'interfaces/user';
import { getCustomers } from 'apiSdk/customers';
import { getUsers } from 'apiSdk/users';

function QueryEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<QueryInterface>(
    () => (id ? `/queries/${id}` : null),
    () => getQueryById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: QueryInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateQueryById(id, values);
      mutate(updated);
      resetForm();
      router.push('/queries');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<QueryInterface>({
    initialValues: data,
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
            Edit Query
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(QueryEditPage);
