import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

import AppContainer from "../../layouts/AppContainer";
import { cancelReference, reset } from "../../features/reference/refSlice";

const CancelReferencePage = () => {
    const toastRef = useRef(null);
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        date: "",
        reason: "",
        confirm_cancel: false,
    });

    const dispatch = useDispatch();

    const { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.ref
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
                firstname: "",
                lastname: "",
                date: "",
                reason: "",
                confirm_cancel: false,
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

        if (data.confirm_cancel) {
            dispatch(cancelReference(data));
        } else {
            toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: "Please confirm cancellation",
                life: 5000,
            });
        }
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-3 md:tw-p-6 tw-bg-white">
                <div className="tw-text-center tw-mb-6">
                    <h1 className="tw-my-0">
                        Cancel Candidate Reference Application
                    </h1>
                </div>

                <div className="card">
                    <form className="p-fluid" onSubmit={handleOnSubmit}>
                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                            <label
                                htmlFor="fullname"
                                className="tw-text-gray-900"
                            >
                                Candidate's Name *
                            </label>
                            <div className="tw-flex tw-gap-3">
                                <InputText
                                    name="firstname"
                                    value={data.firstname}
                                    onChange={handleOnChange}
                                    placeholder="First Name"
                                    required
                                />
                                <InputText
                                    name="lastname"
                                    value={data.lastname}
                                    onChange={handleOnChange}
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                            <label htmlFor="date" className="tw-text-gray-900">
                                Request Date *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={data.date}
                                onChange={handleOnChange}
                                placeholder="Select Date"
                                required
                                className="p-inputtext"
                            />
                            {/* <Calendar
                                name="date"
                                value={data.date}
                                onChange={handleOnChange}
                                showIcon
                                placeholder="Select Date"
                                required
                            /> */}
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                            <label
                                htmlFor="reason"
                                className="tw-text-gray-900"
                            >
                                Reason For Cancellation{" "}
                            </label>
                            <InputTextarea
                                name="reason"
                                value={data.reason}
                                onChange={handleOnChange}
                                placeholder="Enter reason for cancellation"
                                required
                                rows={4}
                            />
                        </div>

                        <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                            <div className="field-checked tw-text-gray-900 tw-items-center">
                                <label htmlFor="accept" className="tw-mr-2">
                                    Confirm Cancellation
                                </label>
                                <Checkbox
                                    name="confirm_cancel"
                                    value={data.confirm_cancel}
                                    onChange={handleOnChange}
                                    checked={data.confirm_cancel}
                                />
                            </div>
                            <small className="tw-m-0 tw-text-gray-900">
                                By ticking this box, your reference request will
                                be cancelled. This might impact any on-going
                                application
                            </small>
                        </div>

                        <div className="tw-flex tw-items-center tw-justify-between">
                            <Button
                                label="Ok"
                                className="tw-w-40"
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

export default CancelReferencePage;
