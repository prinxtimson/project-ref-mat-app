import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";

import AppContainer from "../../layouts/AppContainer";
import axios from "axios";
import { Toast } from "primereact/toast";

const RefLetterPage = () => {
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(true);
    const [sendMailLoading, setSendMailLoading] = useState(false);

    const navigate = useNavigate();

    const { ref } = useSelector((state) => state.ref);

    useEffect(() => {
        if (ref) {
            fetch(`/reference-template/${ref.id}`)
                .then((res) => {
                    setIsLoading(false);
                    return res.text();
                })
                .then((text) =>
                    new DOMParser().parseFromString(text, "text/html")
                )
                .then((dom) => dom.getElementById("ref_template"))
                .then((doc) => {
                    document.getElementById("ref_image").appendChild(doc);
                });
        } else {
            navigate("/request-reference");
        }
    }, [ref]);

    const handleSendReference = () => {
        setSendMailLoading(true);
        axios
            .get(`/api/reference/send/${ref.id}`)
            .then((res) => {
                setSendMailLoading(false);
                toastRef.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Reference letter sent successful",
                    life: 5000,
                });
            })
            .catch((error) => {
                console.error("Sending failed:", error.message);
                setSendMailLoading(false);
                toastRef.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to send reference letter",
                    life: 5000,
                });
            });
    };

    return (
        <AppContainer>
            <Toast
                ref={toastRef}
                onHide={() => {
                    navigate("/request-reference");
                }}
            />
            {isLoading ? (
                <div className="tw-grow tw-p-3 md:tw-p-6 tw-bg-white tw-flex tw-flex-col tw-items-center">
                    <div className="tw-grow tw-w-full tw-max-w-[730px]">
                        <div className="tw-flex tw-justify-center tw-mb-8">
                            <Skeleton width="20rem" height="4rem"></Skeleton>
                        </div>
                        <div className="tw-mb-8">
                            <Skeleton width="10rem" height="2rem"></Skeleton>
                        </div>
                        <div className="tw-flex tw-justify-center tw-mb-4">
                            <Skeleton width="20rem" height="2rem"></Skeleton>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-4">
                            <Skeleton width="100%" height="4rem"></Skeleton>
                            <Skeleton width="100%" height="4rem"></Skeleton>
                            <Skeleton width="100%" height="4rem"></Skeleton>
                            <Skeleton width="100%" height="4rem"></Skeleton>
                            <Skeleton width="100%" height="4rem"></Skeleton>
                        </div>
                        <div className=" tw-mt-4">
                            <Skeleton width="20rem" height="6rem"></Skeleton>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="tw-grow tw-p-3 md:tw-p-6 tw-bg-white">
                    <div id="ref_image"></div>
                    <div className="tw-my-4 tw-flex tw-items-center tw-justify-center">
                        <Button
                            label="Ok"
                            className="tw-w-40"
                            pt={{
                                root: {
                                    className:
                                        "tw-bg-[#293986] tw-border-[#293986]",
                                },
                            }}
                            onClick={handleSendReference}
                            loading={sendMailLoading}
                        />
                    </div>
                </div>
            )}
        </AppContainer>
    );
};

export default RefLetterPage;
