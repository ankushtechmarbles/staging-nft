import {
    Button,
    FormControl,
    FormErrorMessage,
    HStack,
    Input,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
import { CountryDropdown } from "react-country-region-selector";
import { useNavigate } from "react-router-dom";
import CircleSpinnerIcon from "../../../SVGs/CircleSpinnerIcon";
import { useAppContext } from "../../../Context/AppContext";

const RegisterForm = ({ switchForm }) => {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    return (
        <Formik
            initialValues={{
                username: "",
                password: "",
                region: "",
                email: "",
            }}
            onSubmit={async (values, formikHelpers) => {
                try {
                    setLoading(true);
                    const {
                        data: {
                            user: {
                                name,
                                email,
                                rpm_user_id,
                                rpm_user_token,
                                rpm_avatar_id,
                                rpm_assets,
                                rpm_body_type,
                                rpm_glb_file,
                                rpm_image_url,
                            },
                        },
                    } = await axios.post("/api/register", {
                        password: values.password,
                        email: values.email,
                        region: values.region,
                        name: values.username,
                        password_confirmation: values.password,
                    });

                    dispatch({
                        type: "SET_USER",
                        payload: {
                            name,
                            email,
                        },
                    });

                    dispatch({
                        type: "SET_RPM_USER_DATA",
                        payload: {
                            user_id: rpm_user_id,
                            token: rpm_user_token,
                            imageUrl: rpm_image_url,
                            assets: JSON.parse(rpm_assets),
                            bodyType: rpm_body_type,
                            avatar_id: rpm_avatar_id,
                            glbFile: rpm_glb_file,
                        },
                    });

                    setLoading(false);
                    formikHelpers.resetForm();
                    navigate("/creation");
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                    formikHelpers.resetForm();
                }
            }}
        >
            {({ handleSubmit, errors, touched }) => (
                <form style={{ width: "75%" }} onSubmit={handleSubmit}>
                    {loading && <CircleSpinnerIcon />}
                    <FormControl>
                        <Field
                            as={Input}
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Username"
                            className={"form-control"}
                        />
                    </FormControl>
                    <FormControl
                        mt={5}
                        isInvalid={!!errors.password && touched.password}
                    >
                        <Field
                            as={Input}
                            id={"password"}
                            name={"password"}
                            type={"password"}
                            placeholder={"Password"}
                            className={"form-control"}
                            validate={(value) => {
                                let error;

                                if (value.length < 6) {
                                    error =
                                        "Password must contain at least 6 characters";
                                }

                                return error;
                            }}
                        />
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                    </FormControl>
                    <FormControl mt={5}>
                        <Field
                            as={CountryDropdown}
                            id="region"
                            name="region"
                            type="text"
                            placeholder="region"
                            className={"form-control-select"}
                        />
                    </FormControl>
                    <FormControl mt={5}>
                        <Field
                            as={Input}
                            id="email"
                            name="email"
                            type="text"
                            placeholder="email"
                            className={"form-control"}
                        />
                    </FormControl>

                    <HStack spacing={2} mt={4}>
                        <Button
                            w={"full"}
                            variant={"dark"}
                            onClick={switchForm}
                            textTransform={"uppercase"}
                        >
                            Login
                        </Button>
                        <Button
                            type={"submit"}
                            w={"full"}
                            variant={"light"}
                            textTransform={"uppercase"}
                        >
                            Signup
                        </Button>
                    </HStack>
                </form>
            )}
        </Formik>
    );
};

export default RegisterForm;
