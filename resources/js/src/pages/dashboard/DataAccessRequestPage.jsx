import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TabMenu } from "primereact/tabmenu";

import AppContainer from "../../layouts/AppContainer";
import axios from "axios";
import PersonalData from "../../components/PersonalData";
import Rectification from "../../components/Rectification";
import Restriction from "../../components/Restriction";
import TransferData from "../../components/TransferData";
import WithdrawConsent from "../../components/WithdrawConsent";

const DataAccessRequestPage = () => {
    const toastRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const phonePattern = /^[0-9]{10,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [err, setErr] = useState({
        phone: false,
        email: false,
    });
    const [data, setData] = useState({
        name: "",
        email: "",
        type: "",
        consent: "",
        description: "",
        reason: "",
        recipient_name: "",
        recipient_email: "",
        correction: "",
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
        let _phone = data.phone && !phonePattern.test(data.phone);
        let _recipient_email =
            data.recipient_email && !emailPattern.test(data.recipient_email);
        let _email = !emailPattern.test(data.email);

        if (_email || _phone || _recipient_email || !data.consent) {
            setErr({
                phone: _phone,
                email: _email,
                recipient_email: _recipient_email,
                consent: !data.consent,
            });
            return;
        }

        setIsLoading(true);
        axios
            .post("/api/data-access", { ...data, type: activeIndex + 1 })
            .then((res) => {
                setIsLoading(false);
                toastRef.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: res.data.message,
                    life: 5000,
                });
                setData({
                    name: "",
                    email: "",
                    type: "",
                    consent: "",
                    description: "",
                    reason: "",
                    recipient_name: "",
                    recipient_email: "",
                    correction: "",
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
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-3 md:tw-p-6 tw-bg-white tw-flex tw-flex-col tw-items-center">
                <div className="tw-text-center ">
                    <h1 className="tw-my-0">Data Subject Access Request</h1>
                </div>

                <div className="tw-p-4 tw-w-full">
                    <TabMenu
                        model={ACCESSOPTIONS}
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                        pt={{
                            root: {
                                className: "tw-text-[#293986]",
                            },
                        }}
                    />

                    <div className="tw-mt-6 tw-text-center">
                        <h3 className="tw-m-0">
                            {ACCESSOPTIONS[activeIndex].label}
                        </h3>
                    </div>

                    <div className="">
                        {activeIndex == 0 ? (
                            <PersonalData
                                handleOnChange={handleOnChange}
                                data={data}
                                handleOnSubmit={handleOnSubmit}
                                err={err}
                                isLoading={isLoading}
                            />
                        ) : activeIndex == 1 ? (
                            <Rectification
                                handleOnChange={handleOnChange}
                                data={data}
                                handleOnSubmit={handleOnSubmit}
                                err={err}
                                isLoading={isLoading}
                            />
                        ) : activeIndex == 2 ? (
                            <Restriction
                                handleOnChange={handleOnChange}
                                data={data}
                                handleOnSubmit={handleOnSubmit}
                                err={err}
                                isLoading={isLoading}
                            />
                        ) : activeIndex == 3 ? (
                            <TransferData
                                handleOnChange={handleOnChange}
                                data={data}
                                handleOnSubmit={handleOnSubmit}
                                err={err}
                                isLoading={isLoading}
                            />
                        ) : (
                            <WithdrawConsent
                                handleOnChange={handleOnChange}
                                data={data}
                                handleOnSubmit={handleOnSubmit}
                                err={err}
                                isLoading={isLoading}
                            />
                        )}
                    </div>
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
