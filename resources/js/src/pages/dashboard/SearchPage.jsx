import { useRef, useState } from "react";
import { Button } from "primereact/button";

import AppContainer from "../../layouts/AppContainer";

const SearchPage = () => {
    const toastRef = useRef(null);
    const [selectedSearch, setSelectedSearch] = useState(null);

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-bg-white tw-p-3 md:tw-p-6 tw-flex tw-items-center tw-justify-center">
                {selectedSearch ? (
                    <div className="tw-rounded-lg tw-shado-md md:tw-w-[35rem] tw-w-full tw-p-4 sm:tw-p-8 tw-bg-white tw-flex tw-flex-col tw-gap-5">
                        <div className="tw-text-center">
                            <h2 className=" tw-my-0">{selectedSearch.title}</h2>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-3">
                            {selectedSearch.details.map((val) => (
                                <p className="tw-text-2xl tw-m-0" key={val}>
                                    {val}
                                </p>
                            ))}
                        </div>
                        <Button
                            label="Ok"
                            className="tw-self-center tw-w-40"
                            onClick={() => setSelectedSearch(null)}
                        />
                    </div>
                ) : (
                    <div className="tw-grid tw-gap-5 tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3">
                        {SEARCHITEMS.map((item, index) => (
                            <div
                                className="tw-shadow tw-text-white tw-rounded-md tw-p-4 tw-flex tw-gap-4 tw-items-center tw-cursor-pointer tw-bg-indigo-800 tw-min-h-44"
                                key={index}
                                onClick={() => setSelectedSearch(item)}
                            >
                                <i
                                    className={item.icon}
                                    style={{ fontSize: "3rem" }}
                                ></i>
                                <h2 className="tw-m-0">{item.value}</h2>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppContainer>
    );
};

export default SearchPage;

const SEARCHITEMS = [
    {
        value: "TROUBLESHOOTING",
        icon: "pi pi-exclamation-triangle",
        title: "SUGGESTED STEPS TO RESOLVE TROUBLE SHOOTING",
        details: [
            "Log out and log back in",
            "Clear browser cache",
            "Check internet connection",
        ],
    },
    {
        value: "UNABLE TO UPLOAD DOCUMENTS",
        title: "RECOMMENDED STEPS FOR RESOLVING UPLOAD ISSUES",
        icon: "pi pi-cloud-upload",
        details: [
            "Check file format and size",
            "Clear browser cache",
            "Update Software",
        ],
    },
    {
        value: "ERROR SUBMITTING REQUEST",
        title: "RECOMMENDED STEPS FOR ERROR SUBMITTING REQUEST",
        icon: "pi pi-question-circle",
        details: [
            "Check all required fields",
            "Clear browser cache",
            "Verify internet connections",
            "Try a different browser or device",
            "Contact Support",
        ],
    },
    {
        value: "REFERENCE LETTER DECLINED",
        icon: "pi pi-file",
        title: "RECOMMENDED STEPS FOR REFERENCE LETTER DECLINED",
        details: ["Confirm Reasons", "Contact Admin", "Correct and Resubmit"],
    },
    {
        value: "UPDATE EMPLOYER'S EMAIL",
        icon: "pi pi-envelope",
        title: "RECOMMENDED STEPS TO UPDATE EMPLOYER'S EMAIL",
        details: ["Contact Support"],
    },
    {
        value: "DELAYED NOTIFICATION OF REFERENCE SENT TO EMPLOYER",
        icon: "pi pi-bell",
        title: "RECOMMENDED STEPS FOR DELAYED NOTIFICATION OF REFERENCE SENT TO EMPLOYER",
        details: ["Track Request", "Check Spam/Junk Folder", "Contact Support"],
    },
];
