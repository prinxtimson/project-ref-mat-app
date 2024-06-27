import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProgressBar } from "primereact/progressbar";

import AppContainer from "../../layouts/AppContainer";
import StepOne from "../../components/StepOne";
import StepTwo from "../../components/StepTwo";
import StepThree from "../../components/StepThree";
import {
    requestReference,
    reset,
    clear,
} from "../../features/reference/refSlice";

const RequestReferencePage = () => {
    const toastRef = useRef(null);
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        date_joined: "",
        cv: "",
        recruiter_name: "",
        recruiter_email: "",
        position: "",
        success_story: "",
        project_name: "",
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
                email: "",
                phone_number: "",
                date_joined: "",
                cv: null,
                recruiter_name: "",
                recruiter_email: "",
                position: "",
                success_story: "",
                project_name: "",
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

    const handleFileChange = (param) => setData({ ...data, cv: param });

    const handleOnSuccessStoryUpload = (param) => {
        setData({ ...data, success_story: param });
    };

    const handleOnNext = () => setStep(step + 1);

    const handleSubmit = () => {
        let formData = new FormData();

        formData.append("_method", "post");
        for (const key in data) {
            formData.append(`${key}`, data[key]);
        }

        dispatch(requestReference(formData));
    };

    const handleGetStep = (param) => {
        switch (param) {
            case 1:
                return (
                    <StepOne
                        data={data}
                        handleOnChange={handleOnChange}
                        handleOnNext={handleOnNext}
                    />
                );
            case 2:
                return (
                    <StepTwo
                        data={data}
                        toast={toastRef}
                        handleOnChange={handleOnChange}
                        handleOnNext={handleOnNext}
                        handleOnSuccessStoryUpload={handleOnSuccessStoryUpload}
                    />
                );
            case 3:
                return (
                    <StepThree
                        data={data}
                        handleOnChange={handleOnChange}
                        handleFileChange={handleFileChange}
                        handleSubmit={handleSubmit}
                    />
                );
            default:
                break;
        }
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-3 md:tw-p-6 tw-bg-white">
                <div className="tw-text-center tw-mb-6">
                    <h1 className="tw-my-0">Candidate Reference Application</h1>
                    <p className="tw-my-1 tw-font-semibold"></p>
                </div>

                <div className="">
                    <div className="tw-flex tw-flex-col tw-gap-2 tw-mb-4">
                        <p className="tw-text-xl tw-text-gray-500 tw-my-0">{`${step} of 3`}</p>
                        <ProgressBar
                            value={Math.round(33.33 * step)}
                            color="#293986"
                        ></ProgressBar>
                        <h2 className="tw-m-0">{`Step ${step}`}</h2>
                    </div>

                    <div className="">{handleGetStep(step)}</div>
                </div>
            </div>
        </AppContainer>
    );
};

export default RequestReferencePage;
