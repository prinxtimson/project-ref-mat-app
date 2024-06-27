import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changePass, reset } from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";

const ChangePasswordPage = () => {
    const passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const toastRef = useRef(null);
    const [data, setData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.auth
    );

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
                current_password: "",
                password: "",
                password_confirmation: "",
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        dispatch(changePass(data));
    };
    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-4 tw-flex tw-items-center tw-justify-center">
                <div className="card tw-rounded-lg tw-shadow-md md:tw-w-[35rem] tw-w-full tw-p-4 sm:tw-p-8 tw-bg-white">
                    <div className="tw-text-center tw-mb-6">
                        <h2 className="tw-text-xl tw-font-semibold tw-my-0">
                            Change Password
                        </h2>
                    </div>

                    <form className="p-fluid" onSubmit={submit}>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <Password
                                    name="current_password"
                                    className="tw-w-full "
                                    toggleMask
                                    value={data.current_password}
                                    onChange={handleOnChange}
                                    autoComplete="off"
                                    autoFocus
                                    required
                                />
                                <label htmlFor="current_password" className="">
                                    Current Password *
                                </label>
                            </span>
                        </div>
                        <div className="field tw-mb-6">
                            <span className="p-float-label ">
                                <Password
                                    name="password"
                                    toggleMask
                                    value={data.password}
                                    onChange={handleOnChange}
                                    feedback={false}
                                    className={
                                        data.password &&
                                        !passwordValidation.test(data.password)
                                            ? "p-invalid"
                                            : ""
                                    }
                                    required
                                />
                                <label htmlFor="password" className="">
                                    New Password *
                                </label>
                            </span>
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
                        <div className="field tw-mb-6">
                            <span className="p-float-label">
                                <Password
                                    name="password_confirmation"
                                    toggleMask
                                    value={data.password_confirmation}
                                    onChange={handleOnChange}
                                    required
                                    feedback={false}
                                    className={
                                        data.password_confirmation &&
                                        data.password !==
                                            data.password_confirmation
                                            ? "p-invalid"
                                            : ""
                                    }
                                />
                                <label
                                    htmlFor="password_confirmation"
                                    className=""
                                >
                                    Confirm Password *
                                </label>
                            </span>
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

                        <div className="tw-flex tw-items-center tw-justify-between">
                            <Button
                                type="button"
                                disabled={isLoading}
                                label="Cancel"
                                className="tw-w-fit"
                                outlined
                                onClick={() => navigate(-1)}
                                pt={{
                                    root: {
                                        className:
                                            "tw-text-[#293986] tw-border-[#293986]",
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                disabled={isLoading}
                                label="Update"
                                className="tw-w-fit"
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

export default ChangePasswordPage;
