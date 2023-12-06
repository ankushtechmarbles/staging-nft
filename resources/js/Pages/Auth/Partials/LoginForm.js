import {Button, FormControl, FormErrorMessage, Input} from "@chakra-ui/react";
import {Field, Formik} from "formik";
import React from 'react';

const LoginForm = ({switchForm}) => {
    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            onSubmit={values => {
                console.log(values);
            }}
        >
            {({handleSubmit, errors, touched}) => (
                <form>
                    <FormControl>
                        <Field
                            as={Input}
                            id='username'
                            name='username'
                            type='text'
                            placeholder='Username'
                        />
                    </FormControl>
                    <FormControl isInvalid={!!errors.password && touched.password}>
                        <Field
                            as={Input}
                            id={'password'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Password'}
                            validate={(value) => {
                                let error;

                                if (value.length < 6) {
                                    error = "Password must contain at least 6 characters";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>

                    <Button variant={'light'} textTransform={'uppercase'}>Login</Button>
                    <Button onClick={switchForm} variant={'dark'} textTransform={'uppercase'}>Signup</Button>
                </form>
            )}

        </Formik>
    );
};

export default LoginForm;
