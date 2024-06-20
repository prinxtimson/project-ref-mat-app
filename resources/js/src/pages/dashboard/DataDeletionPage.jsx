import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import AppContainer from "../../layouts/AppContainer";
import { dataDelete, reset } from "../../features/auth/authSlice";
import { RadioButton } from "primereact/radiobutton";

const DataDeletionPage = () => {
    const toastRef = useRef(null);
    const [data, setData] = useState({
        name: "",
        email: "",
        type: "",
        confirm_delete: false,
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
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

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
        if (data.confirm_delete) {
            dispatch(dataDelete(data));
        } else {
            toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: "Please confirm data delete",
                life: 5000,
            });
        }
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-3 md:tw-p-6 tw-bg-white tw-flex tw-flex-col tw-items-center">
                <div className="tw-text-center">
                    <h1 className="tw-my-0">Data Deletion Request</h1>
                </div>

                <div className="card tw-rounded-lg  tw-w-full tw-p-3 sm:tw-p-6 tw-bg-white">
                    <form className="p-fluid" onSubmit={handleOnSubmit}>
                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                            <label htmlFor="fullname">Full Name *</label>
                            <InputText
                                name="name"
                                value={data.name}
                                onChange={handleOnChange}
                                placeholder="Full Name"
                                required
                            />
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                            <label htmlFor="email">Email *</label>
                            <InputText
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                                placeholder="Enter Email"
                                required
                            />
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                            <label htmlFor="type">
                                Specify Data Deletion *
                            </label>
                            <Dropdown
                                name="type"
                                value={data.type}
                                options={DATADELETIONOPTIONS}
                                onChange={handleOnChange}
                                placeholder="Select Option"
                            />
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                            <div className="field-checked tw-text-gray-900 tw-flex tw-gap-4 tw-items-center">
                                <label htmlFor="accept" className="tw-mr-2">
                                    Confirm Deletion
                                </label>
                                <div className="tw-flex tw-flex-wrap tw-gap-3">
                                    <div className="tw-flex tw-items-center">
                                        <RadioButton
                                            inputId="1"
                                            name="confirm_delete"
                                            value="1"
                                            onChange={handleOnChange}
                                            checked={
                                                data.confirm_delete === "1"
                                            }
                                        />
                                        <label htmlFor="1" className="tw-ml-1">
                                            I Agree
                                        </label>
                                    </div>
                                    <div className="tw-flex tw-items-center">
                                        <RadioButton
                                            inputId="0"
                                            name="confirm_delete"
                                            value="0"
                                            onChange={handleOnChange}
                                            checked={
                                                data.confirm_delete === "0"
                                            }
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
                                loading={isLoading}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </AppContainer>
    );
};

export default DataDeletionPage;

const DATADELETIONOPTIONS = [
    "No longer using the platform",
    "Concerned about data privacy",
    "Duplicate account",
];
