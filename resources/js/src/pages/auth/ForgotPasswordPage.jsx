import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";

import AppContainer from "../../layouts/AppContainer";
import { forgotPass, reset } from "../../features/auth/authSlice";

const ForgotPasswordPage = () => {
    const toastRef = useRef(null);
    const [data, setData] = useState({
        email: "",
    });

    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError && message) {
            toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 3000,
            });
        }

        if (isSuccess && message) {
            toastRef.current.show({
                severity: "success",
                summary: "Success",
                detail: message,
                life: 3000,
            });
            setData({
                email: "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPass(data));
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-4 tw-flex tw-items-center tw-justify-center">
                <div className="card tw-rounded-lg tw-shadow-md md:tw-w-[35rem] tw-w-full tw-p-4 sm:tw-p-8 tw-bg-white">
                    <div className="tw-text-center tw-mb-5">
                        <h2 className="tw-text-3xl tw-font-bold">
                            Forgot Password?
                        </h2>
                        <p className="tw-text-xl tw-font-semibold">
                            Enter your registered email address to reset
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="p-fluid">
                        <div className="field">
                            <IconField
                                iconPosition="left"
                                className="p-float-label"
                            >
                                <InputIcon className="pi pi-envelope">
                                    {" "}
                                </InputIcon>
                                <InputText
                                    name="email"
                                    value={data.email}
                                    autoComplete="off"
                                    onChange={handleOnChange}
                                />
                                <label htmlFor="email">Email *</label>
                            </IconField>
                        </div>

                        <div className="field">
                            <Button
                                className="custom-btn"
                                type="submit"
                                label="Reset"
                                loading={isLoading}
                            />
                        </div>
                        <div className="">
                            <span className="">
                                Remember password?{" "}
                                <Link
                                    to="/login"
                                    className="tw-underline tw-text-blue-500 hover:tw-text-blue-800"
                                >
                                    Sign-in
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </AppContainer>
    );
};

export default ForgotPasswordPage;
