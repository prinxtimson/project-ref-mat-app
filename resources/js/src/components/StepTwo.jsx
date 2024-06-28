import { useRef, useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import { Tag } from "primereact/tag";

const StepTwo = ({
    data,
    handleOnChange,
    handleOnNext,
    handleOnSuccessStoryUpload,
    handlePrevious,
    toast,
}) => {
    const fileUploadRef = useRef(null);
    const [status, setStatus] = useState("pending");
    const [progress, setProgress] = useState(0);

    const emptyTemplate = () => {
        return (
            <div className="tw-flex tw-items-center tw-flex-col">
                <i
                    className="pi pi-image tw-mt-3 tw-p-5"
                    style={{
                        fontSize: "5em",
                        borderRadius: "50%",
                        backgroundColor: "var(--surface-b)",
                        color: "var(--surface-d)",
                    }}
                ></i>
                <span
                    style={{
                        fontSize: "1.2em",
                        color: "var(--text-color-secondary)",
                    }}
                    className="tw-my-5"
                >
                    Browse File/Drag and Drop
                </span>
            </div>
        );
    };

    const handleFileUpload = (e) => {
        console.log("uploading");

        const formData = new FormData();
        formData.append("_method", "post");
        formData.append("file", e.files[0]);
        // Make a file upload request
        axios
            .post("/api/reference/upload", formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100
                    );
                    setProgress(progress);
                },
            })
            .then((res) => {
                setStatus("completed");
                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "File upload successful",
                    life: 5000,
                });
                handleOnSuccessStoryUpload(res.data.path);
            })
            .catch((error) => {
                setStatus("error");
                console.error("File upload failed:", error);
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "File upload failed",
                    life: 5000,
                });
            });
    };

    const headerTemplate = (options) => {
        const { className, chooseButton } = options;

        return (
            <div
                className={className}
                style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {chooseButton}
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="tw-flex tw-items-center tw-flex-wrap">
                <div
                    className="tw-flex tw-items-center"
                    style={{ width: "40%" }}
                >
                    <img
                        alt={file.name}
                        role="presentation"
                        src={file.objectURL}
                        width={100}
                    />
                    <span className="tw-flex tw-flex-col tw-text-left tw-ml-3">
                        {file.name}
                        <small>{props.formatSize}</small>
                    </span>
                </div>
                <Tag
                    value={status}
                    severity={
                        status == "pending"
                            ? "warning"
                            : status == "completed"
                            ? "success"
                            : "danger"
                    }
                    className="tw-px-3 tw-py-2"
                />
                <Button
                    type="button"
                    icon="pi pi-times"
                    rounded
                    className="p-button-outlined p-button-danger tw-p-4 tw-ml-auto"
                    onClick={() => {
                        onTemplateRemove(file, props.onRemove);
                        handleOnSuccessStoryUpload("");
                    }}
                />
            </div>
        );
    };

    return (
        <div className="card">
            <form
                className="p-fluid"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleOnNext();
                }}
            >
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="project_name">Project Name *</label>
                    <InputText
                        name="project_name"
                        value={data.project_name}
                        onChange={handleOnChange}
                        placeholder="Enter Project Name"
                        required
                    />
                </div>

                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="check_ins_url">Check-ins Url *</label>
                    <InputText
                        name="check_ins_url"
                        value={data.check_ins_url}
                        onChange={handleOnChange}
                        placeholder="Enter Check-ins Url"
                        required
                    />
                    <small>copy your check-ins url and paste here</small>
                </div>

                <div className="tw-flex tw-gap-3 tw-mb-6">
                    <label htmlFor="email">Is project completed ?</label>
                    <div className="tw-flex tw-flex-wrap tw-gap-2">
                        <div className="tw-flex tw-items-center">
                            <RadioButton
                                inputId="yes"
                                name="is_project_completed"
                                value="1"
                                onChange={handleOnChange}
                                checked={data.is_project_completed === "1"}
                            />
                            <label htmlFor="yes" className="tw-ml-2">
                                Yes
                            </label>
                        </div>
                        <div className="tw-flex tw-items-center">
                            <RadioButton
                                inputId="no"
                                name="is_project_completed"
                                value="0"
                                onChange={handleOnChange}
                                checked={data.is_project_completed === "0"}
                            />
                            <label htmlFor="no" className="tw-ml-2">
                                No
                            </label>
                        </div>
                    </div>
                </div>

                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="project_role">Select Project Role *</label>

                    <div className="tw-flex tw-flex-col tw-flex-wrap tw-gap-2">
                        <div className="tw-flex tw-items-center">
                            <RadioButton
                                inputId="pm"
                                name="project_role"
                                value="PM"
                                onChange={handleOnChange}
                                checked={data.project_role === "PM"}
                            />
                            <label htmlFor="pm" className="tw-ml-2">
                                PM
                            </label>
                        </div>
                        <div className="tw-flex tw-items-center">
                            <RadioButton
                                inputId="ba"
                                name="project_role"
                                value="BA"
                                onChange={handleOnChange}
                                checked={data.project_role === "BA"}
                            />
                            <label htmlFor="ba" className="tw-ml-2">
                                BA
                            </label>
                        </div>
                        <div className="tw-flex tw-items-center">
                            <RadioButton
                                inputId="pmo"
                                name="project_role"
                                value="PMO"
                                onChange={handleOnChange}
                                checked={data.project_role === "PMO"}
                            />
                            <label htmlFor="pmo" className="tw-ml-2">
                                PMO
                            </label>
                        </div>
                        <div className="tw-flex tw-items-center">
                            <RadioButton
                                inputId="hybrid"
                                name="project_role"
                                value="HYBRID"
                                onChange={handleOnChange}
                                checked={data.project_role === "HYBRID"}
                            />
                            <label htmlFor="hybrid" className="tw-ml-2">
                                HYBRID
                            </label>
                        </div>
                    </div>
                </div>

                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="date_joined">
                        Please upload your success story (audio format). File
                        type: audio, .mp3, mpeg3.
                    </label>

                    <FileUpload
                        name="file"
                        ref={fileUploadRef}
                        accept=".mp3,audio/*"
                        emptyTemplate={emptyTemplate}
                        headerTemplate={headerTemplate}
                        itemTemplate={itemTemplate}
                        chooseLabel="Browse"
                        auto
                        customUpload
                        uploadHandler={handleFileUpload}
                        chooseOptions={{ className: "tw-bg-[#293986]" }}
                    />
                    {/* <div className="tw-flex tw-gap-4 tw-items-center">
                        <small>{file?.name}</small>
                        {progress > 0 && (
                            <ProgressBar value={progress}></ProgressBar>
                        )}
                    </div> */}

                    <small className="tw-m-0">Max. file size: 6 GB.</small>
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                    <Button
                        label="Previous"
                        outlined
                        onClick={handlePrevious}
                        pt={{
                            root: {
                                className:
                                    "tw-text-[#ccae2c] tw-border-[#ccae2c]",
                            },
                        }}
                    />
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
    );
};

export default StepTwo;
