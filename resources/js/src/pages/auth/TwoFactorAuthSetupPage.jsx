import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";

import AppContainer from "../../layouts/AppContainer";
import axios from "axios";
import { getCurrentUser } from "../../features/auth/authSlice";

const TwoFactorAuthSetupPage = () => {
    const toastRef = useRef(null);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOnChecked = (e) => {
        setChecked(e.value);
        setLoading(true);
        axios
            .get("/api/two-factor-auth/setup")
            .then(() => navigate("/2fa"))
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-4 tw-flex tw-items-center tw-justify-center">
                <div className="card tw-rounded-lg tw-shadow-md md:tw-w-[35rem] tw-w-full tw-p-4 sm:tw-p-8 tw-bg-white">
                    <div className="tw-text-center tw-mb-5">
                        <h2 className="tw-text-3xl tw-font-bold tw-my-0">
                            Enable Two-Factor Authentication
                        </h2>
                    </div>
                    <div className="p-fluid">
                        <div className="field">
                            <span className="tw-flex tw-flex-col tw-items-center tw-gap-2">
                                <label htmlFor="code tw-text-center">
                                    Enable 2FA
                                </label>
                                <InputSwitch
                                    checked={checked}
                                    onChange={handleOnChecked}
                                />
                            </span>
                        </div>

                        <div className="field tw-flex tw-justify-center">
                            <Button
                                label="Skip"
                                className="tw-w-40"
                                onClick={() => {
                                    dispatch(getCurrentUser());
                                    navigate("/");
                                }}
                                pt={{
                                    root: {
                                        className:
                                            "tw-bg-[#293986] tw-border-[#293986]",
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default TwoFactorAuthSetupPage;
