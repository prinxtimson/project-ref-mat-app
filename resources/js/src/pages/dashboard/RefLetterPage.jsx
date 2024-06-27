import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

import AppContainer from "../../layouts/AppContainer";
import html2canvas from "html2canvas";
import { clear } from "../../features/reference/refSlice";
import axios from "axios";

const RefLetterPage = () => {
    const toastRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { ref } = useSelector((state) => state.ref);

    useEffect(() => {
        if (ref) {
            fetch(`/reference-template/${ref.id}`)
                .then((res) => res.text())
                .then((text) =>
                    new DOMParser().parseFromString(text, "text/html")
                )
                .then((dom) => dom.getElementById("ref_template"))
                .then((doc) => {
                    document.getElementById("ref_image").appendChild(doc);
                    // html2canvas(doc)
                    //     .then(function (canvas) {
                    //         document
                    //             .getElementById("ref_image")
                    //             .appendChild(canvas);
                    //     })
                    //     .catch((err) => console.log(err));
                });
        } else {
            navigate("/request-reference");
        }
    }, [ref]);

    const handleSendReference = () => {
        axios
            .get(`/api/reference/send/${ref.id}`)
            .then((res) => {
                toastRef.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "Reference letter sent successful",
                    life: 5000,
                });
            })
            .catch((error) => {
                console.error("Sending failed:", error);
                toastRef.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "Failed to send reference letter",
                    life: 5000,
                });
            });
    };

    return (
        <AppContainer toast={toastRef}>
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
                    />
                </div>
            </div>
        </AppContainer>
    );
};

export default RefLetterPage;
