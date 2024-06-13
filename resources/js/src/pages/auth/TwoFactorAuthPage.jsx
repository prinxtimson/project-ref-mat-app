import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import AppContainer from "../../layouts/AppContainer";
import {
    confirm2fa,
    reset,
    resend2fa,
    getCurrentUser,
    clearUser,
} from "../../features/auth/authSlice";

const TwoFactorAuthPage = () => {
    const toastRef = useRef(null);
    const [data, setData] = useState({
        code: "",
    });

    const { code } = data;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        user,
        isAuthenticated,
        isLoading,
        type,
        isSuccess,
        isError,
        message,
    } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
        if (user) {
            navigate("/");
        }
    }, [user]);

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
                code: "",
            });
        }

        if (type == "auth/confirm-2fa/fulfilled") {
            dispatch(getCurrentUser());
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(confirm2fa(data));
    };

    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const onResendCode = () => {
        dispatch(resend2fa());
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-4 tw-flex tw-items-center tw-justify-center">
                <div className="card tw-rounded-lg tw-shadow-md md:tw-w-[35rem] tw-w-full tw-p-4 sm:tw-p-8 tw-bg-white">
                    <div className="tw-text-center tw-mb-5">
                        <h2 className="tw-text-3xl tw-font-bold tw-my-0">
                            Two-Factor Authentication
                        </h2>
                        <p className="tw-text-lg">
                            To complete the login process, please check your
                            email inbox for the Two-Factor Authentication code.
                            Once you have retrieved the code, return to this
                            page and enter it in the designated field to
                            proceed.If you haven't received the code yet, please
                            wait a moment and refresh your email inbox.
                        </p>
                    </div>
                    <form onSubmit={onSubmit} className="p-fluid">
                        <div className="field">
                            <span className="tw-flex tw-flex-col tw-items-center tw-gap-2">
                                <label htmlFor="code tw-text-center">
                                    Enter Authentication Code
                                </label>
                                <Password
                                    name="code"
                                    toggleMask
                                    value={code}
                                    autoComplete="new code"
                                    feedback={false}
                                    onChange={handleOnChange}
                                    className=""
                                />
                            </span>
                        </div>

                        <div className="field tw-flex tw-justify-center">
                            <Button
                                type="submit"
                                label="Confirm"
                                disabled={isLoading}
                                className="tw-w-40"
                            />
                        </div>
                        <div className=" tw-flex tw-items-center tw-justify-between">
                            <span className="tw-flex tw-items-center tw-gap-2">
                                Code not received?{" "}
                                <Button
                                    type="button"
                                    text
                                    label="Resend Code"
                                    disabled={isLoading}
                                    className="tw-w-fit"
                                    onClick={onResendCode}
                                />
                            </span>

                            <Button
                                label="Back to Login"
                                onClick={(e) => {
                                    dispatch(clearUser());
                                    navigate("/");
                                }}
                                className="tw-w-fit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </AppContainer>
    );
};

export default TwoFactorAuthPage;
