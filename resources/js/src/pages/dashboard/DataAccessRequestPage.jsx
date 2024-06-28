import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";

import AppContainer from "../../layouts/AppContainer";
import axios from "axios";

const DataAccessRequestPage = () => {
    const toastRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        type: "",
        authorization: "",
    });

    const navigate = useNavigate();

    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]:
                event.target.type === "checkbox"
                    ? event.target.checked
                    : event.target.value,
        });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (data.authorization == "0") {
            navigate("/");
        } else {
            setIsLoading(true);
            axios
                .post("/api/data-access", data)
                .then((res) => {
                    setIsLoading(false);
                    toastRef.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: res.data.message,
                        life: 5000,
                    });
                })
                .catch((err) => {
                    setIsLoading(false);
                    const msg =
                        (err.response &&
                            err.response.data &&
                            err.response.data.message) ||
                        err.message ||
                        err.toString();
                    toastRef.current.show({
                        severity: "error",
                        summary: "Error",
                        detail: msg,
                        life: 5000,
                    });
                });
        }
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-3 md:tw-p-6 tw-bg-white tw-flex tw-flex-col tw-items-center">
                <div className="tw-text-center ">
                    <h1 className="tw-my-0">Data Subject Access Request</h1>
                </div>

                <div className="card tw-rounded-lg tw-w-full tw-p-3 sm:tw-p-6 tw-bg-white">
                    <form className="p-fluid" onSubmit={handleOnSubmit}>
                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                            <label htmlFor="fullname">Full Name *</label>
                            <InputText
                                name="name"
                                value={data.name}
                                onChange={handleOnChange}
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                            <label htmlFor="email">Email *</label>
                            <InputText
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                                placeholder="Enter Email"
                                required
                            />
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                            <label htmlFor="type">Type of Request *</label>
                            <Dropdown
                                name="type"
                                value={data.type}
                                options={ACCESSOPTIONS}
                                onChange={handleOnChange}
                                placeholder="Select Option"
                                optionLabel="label"
                                optionValue="value"
                            />
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                            <div className="field-checked tw-flex tw-gap-4 tw-items-start tw-text-gray-900 ">
                                <label htmlFor="accept" className="tw-mr-2">
                                    Authorization
                                </label>

                                <div className="tw-flex  tw-flex-wrap tw-gap-3">
                                    <div className="tw-flex tw-items-center">
                                        <RadioButton
                                            inputId="1"
                                            name="authorization"
                                            value="1"
                                            onChange={handleOnChange}
                                            checked={data.authorization === "1"}
                                        />
                                        <label htmlFor="1" className="tw-ml-1">
                                            I Agree
                                        </label>
                                    </div>
                                    <div className="tw-flex tw-items-center">
                                        <RadioButton
                                            inputId="0"
                                            name="authorization"
                                            value="0"
                                            onChange={handleOnChange}
                                            checked={data.authorization === "0"}
                                        />
                                        <label htmlFor="0" className="tw-ml-1">
                                            I Disagree
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tw-flex tw-items-center tw-justify-center">
                            <Button
                                label="Ok"
                                className="tw-w-40"
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

export default DataAccessRequestPage;

const ACCESSOPTIONS = [
    { label: "Access to Personal Data", value: "1" },
    { label: "Rectification", value: "2" },
    { label: "Restriction of Processing", value: "3" },
    { label: "Transfer of Data to other Organisation", value: "4" },
    { label: "Withdrawal of Consent", value: "5" },
];
