import {
    Button,
    FormControl,
    FormErrorMessage,
    Input,
    HStack,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import CircleSpinnerIcon from "../../../SVGs/CircleSpinnerIcon";
import { useAppContext } from "../../../Context/AppContext";

const LoginForm = ({ switchForm }) => {
    const { dispatch } = useAppContext();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={async (values, formikHelpers) => {
                try {
                    setLoading(true);
                    const { data } = await axios.post("/api/login", values);

                    // set user
                    dispatch({
                        type: "SET_USER",
                        payload: {
                            username: data.user.name,
                            email: data.user.email,
                        },
                    });

                    // set RPM
                    dispatch({
                        type: "SET_RPM_USER_DATA",
                        payload: {
                            user_id: data.user.rpm_user_id,
                            token: data.user.rpm_user_token,
                            avatar_id: data.user.rpm_avatar_id,
                            imageUrl: data.user.rpm_image_url,
                            assets: JSON.parse(data.user.rpm_assets),
                            bodyType: data.user.rpm_body_type,
                            glbFile: data.user.rpm_glb_file,
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
                            className={"form-control"}
                            as={Input}
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email"
                        />
                    </FormControl>
                    <FormControl
                        mt={5}
                        isInvalid={!!errors.password && touched.password}
                    >
                        <Field
                            className={"form-control"}
                            as={Input}
                            id={"password"}
                            name={"password"}
                            type={"password"}
                            placeholder={"Password"}
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

                    <HStack spacing={2} mt={8}>
                        <Button
                            type={"submit"}
                            w={"full"}
                            variant={"light"}
                            textTransform={"uppercase"}
                        >
                            Login
                        </Button>
                        <Button
                            w={"full"}
                            onClick={switchForm}
                            variant={"dark"}
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

export default LoginForm;
