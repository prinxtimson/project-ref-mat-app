import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";

import { login, reset } from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";

const LoginPage = () => {
    const toastRef = useRef(null);
    const [data, setData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const { email, password, remember } = data;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, type, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    // useEffect(() => {
    //     setData({
    //         email: localStorage.getItem("cct_user_email") || "",
    //         password: localStorage.getItem("cct_user_pass") || "",
    //     });
    // }, []);

    useEffect(() => {
        if (isError && message) {
            toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 5000,
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, navigate, dispatch]);

    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // if (remember) {
        //     localStorage.setItem("cct_user_email", email);
        //     localStorage.setItem("cct_user_pass", password);
        // }
        dispatch(login(data));
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-4 tw-flex tw-items-center tw-justify-center">
                <div className="card tw-rounded-lg tw-shadow-md md:tw-w-[35rem] tw-w-full tw-p-4 sm:tw-p-8 tw-bg-white">
                    <div className="tw-text-center tw-mb-4">
                        <h2 className="tw-text-3xl tw-font-bold tw-my-0">
                            Login
                        </h2>
                        <p className="tw-text-xl tw-font-semibold">
                            Sign In to your account
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="p-fluid">
                        <div className="field">
                            <IconField
                                iconPosition="left"
                                className="p-float-label"
                            >
                                <InputIcon className="pi pi-envelope"></InputIcon>
                                <InputText
                                    name="email"
                                    value={email}
                                    autoComplete="off"
                                    onChange={handleOnChange}
                                />
                                <label htmlFor="email">Email *</label>
                            </IconField>
                        </div>
                        <div className="field">
                            <IconField
                                iconPosition="left"
                                className="p-float-label"
                            >
                                {/* <InputIcon className="pi pi-lock tw-z-10"></InputIcon> */}
                                <Password
                                    name="password"
                                    toggleMask
                                    value={password}
                                    autoComplete="off"
                                    feedback={false}
                                    onChange={handleOnChange}
                                />

                                <label htmlFor="password">Password *</label>
                            </IconField>
                        </div>
                        <div className="field tw-flex tw-items-center tw-justify-between">
                            <div className="field-checked tw-text-gray-900 tw-items-center">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    value={remember}
                                    onChange={handleOnChange}
                                    checked={data.remember}
                                    className="tw-mr-2"
                                />

                                <label htmlFor="accept" className="">
                                    Remember me
                                </label>
                            </div>
                            <Link
                                to="/password/forgot"
                                className="tw-underline tw-text-sm tw-text-blue-500 hover:tw-text-blue-800"
                            >
                                Forgotten password?
                            </Link>
                        </div>
                        <div className="">
                            <Button
                                type="submit"
                                label="Login"
                                loading={isLoading}
                                pt={{
                                    root: {
                                        className:
                                            "tw-bg-[#293986] tw-border-[#293986]",
                                    },
                                }}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </AppContainer>
    );
};

export default LoginPage;
