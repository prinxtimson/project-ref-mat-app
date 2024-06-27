import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import AppContainer from "../../layouts/AppContainer";
import { reset, resetPass } from "../../features/auth/authSlice";

const ResetPasswordPage = () => {
    const passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const { token } = useParams();
    const search = new URLSearchParams(useLocation().search);
    const toastRef = useRef(null);
    const [data, setData] = useState({
        token: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoading, type, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        setData({ ...data, token, email: search.get("email") });
    }, []);

    useEffect(() => {
        if (isError && message) {
            toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 5000,
            });
        }

        if (isSuccess && message) {
            toastRef.current.show({
                severity: "success",
                summary: "Success",
                detail: message,
                life: 5000,
            });
            setData({
                token: "",
                email: "",
                password: "",
                password_confirmation: "",
            });
            if (type == "auth/reset-password/fulfilled") {
                dispatch(reset());
                navigate("/");
            }
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPass(data));
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-4 tw-flex tw-items-center tw-justify-center">
                <div className="card tw-rounded-lg tw-shadow-md md:tw-w-[35rem] tw-w-full tw-p-4 sm:tw-p-8 tw-bg-white">
                    <div className="tw-mb-5 tw-text-center">
                        <h2 className="tw-text-3xl tw-font-bold tw-my-0">
                            Reset Password
                        </h2>
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
                                    readOnly
                                    className=" tw-border"
                                />
                                <label
                                    htmlFor="email"
                                    className="tw-text-white"
                                >
                                    Email
                                </label>
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
                                    value={data.password}
                                    toggleMask
                                    autoComplete="new password"
                                    className={
                                        data.password &&
                                        !passwordValidation.test(data.password)
                                            ? "p-invalid"
                                            : ""
                                    }
                                    onChange={handleOnChange}
                                    required
                                />

                                <label htmlFor="password">New Password *</label>
                            </IconField>
                            {data.password &&
                                !passwordValidation.test(data.password) && (
                                    <small
                                        id="password-help"
                                        className="p-error block"
                                    >
                                        Must contain at least one of each sets
                                        A-Z, a-z, 0-9 and minimum of 8
                                        characters.
                                    </small>
                                )}
                        </div>
                        <div className="field">
                            <IconField
                                iconPosition="left"
                                className="p-float-label"
                            >
                                {/* <InputIcon className="pi pi-lock tw-z-10"></InputIcon> */}
                                <Password
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={handleOnChange}
                                    toggleMask
                                    className={
                                        data.password_confirmation &&
                                        data.password !==
                                            data.password_confirmation
                                            ? "p-invalid"
                                            : ""
                                    }
                                    required
                                />

                                <label htmlFor="password_confirmation">
                                    Re-enter New Password
                                </label>
                            </IconField>
                            {data.password_confirmation &&
                                data.password !==
                                    data.password_confirmation && (
                                    <small
                                        id="password-help"
                                        className="p-error block"
                                    >
                                        Password do not match
                                    </small>
                                )}
                        </div>
                        <div className="">
                            <Button
                                type="submit"
                                label="Change Password"
                                loading={isLoading}
                                className="custom-btn "
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

export default ResetPasswordPage;
