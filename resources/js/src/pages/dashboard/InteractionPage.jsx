import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import AppContainer from "../../layouts/AppContainer";

const InteractionPage = () => {
    const toastRef = useRef(null);

    const navigate = useNavigate();

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-bg-white tw-p-3 md:tw-p-6 tw-flex tw-items-center tw-justify-center">
                <div className="tw-flex tw-flex-col tw-gap-5 tw-items-center">
                    <div className="tw-flex tw-flex-col tw-justify-center sm:tw-flex-row tw-gap-5">
                        <div
                            className="tw-shadow tw-text-white tw-rounded-md tw-p-3 tw-flex tw-gap-4 tw-items-center tw-justify-center tw-flex-col tw-cursor-pointer tw-bg-[#293986] tw-min-h-44 tw-w-80"
                            onClick={() => navigate("messaging")}
                        >
                            <h2 className="tw-m-0 tw-text-center">
                                MESSAGING (REPORT A PROBLEM)
                            </h2>
                            <i
                                className="pi pi-envelope"
                                style={{ fontSize: "3rem" }}
                            ></i>
                        </div>

                        <div
                            className="tw-shadow tw-text-white tw-rounded-md tw-p-3 tw-flex tw-gap-4 tw-items-center tw-justify-center tw-flex-col tw-cursor-pointer tw-bg-[#293986] tw-min-h-44 tw-w-80"
                            onClick={() => navigate("comments")}
                        >
                            <h2 className="tw-m-0 tw-text-center">
                                COMMENT SECTION
                            </h2>
                            <i
                                className="pi pi-question-circle"
                                style={{ fontSize: "3rem" }}
                            ></i>
                        </div>

                        {/* <div className="tw-shadow tw-text-white tw-rounded-md tw-p-3 tw-flex tw-gap-4 tw-items-center tw-justify-center tw-flex-col tw-cursor-pointer tw-bg-indigo-800 tw-min-h-44 tw-w-80">
                            <h2 className="tw-m-0 tw-text-center">
                                REFEREE FEEDBACK
                            </h2>
                            <i
                                className="pi pi-comment"
                                style={{ fontSize: "3rem" }}
                            ></i>
                        </div> */}
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default InteractionPage;
