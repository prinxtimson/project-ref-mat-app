import { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import { Tag } from "primereact/tag";

const StepTwo = ({
    data,
    projects,
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
                console.error("File upload failed:", error.message);
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
                    {/* <img
                        alt={file.name}
                        role="presentation"
                        src={file.objectURL}
                        width={100}
                    /> */}
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
                        props.onRemove();
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
                    <label htmlFor="project">Project Name *</label>
                    <Dropdown
                        name="project"
                        value={data.project}
                        onChange={handleOnChange}
                        placeholder="Select Project"
                        options={projects}
                        optionLabel="name"
                        filter
                        required
                        virtualScrollerOptions={{ itemSize: 50 }}
                    />
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
                    <Dropdown
                        name="project_role"
                        value={data.project_role}
                        options={ROLES}
                        onChange={handleOnChange}
                        placeholder="Select Project Role"
                    />
                </div>

                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="date_joined">
                        Please upload your success story (audio format). File
                        type: audio, .mp3, mpeg3.
                    </label>

                    <FileUpload
                        name="file"
                        ref={fileUploadRef}
                        accept=".mp3,.mp4,audio/*"
                        emptyTemplate={emptyTemplate}
                        headerTemplate={headerTemplate}
                        itemTemplate={itemTemplate}
                        chooseLabel="Browse"
                        auto
                        customUpload
                        uploadHandler={handleFileUpload}
                        chooseOptions={{
                            className: "tw-bg-[#293986] tw-border-[#293986]",
                        }}
                    />
                    {/* <div className="tw-flex tw-gap-4 tw-items-center">
                        <small>{file?.name}</small>
                        {progress > 0 && (
                            <ProgressBar value={progress}></ProgressBar>
                        )}
                    </div> */}

                    <small className="tw-m-0">Max. file size: 6 GB.</small>
                </div>
                <div className="tw-flex tw-items-center tw-gap-6">
                    <Button
                        label="Previous"
                        outlined
                        className="tw-w-40"
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

const ROLES = [
    "Lead Business Analyst",
    "Deputy Business Analyst",
    "Project Manager",
    "Deputy Project Manager",
    "PMO Lead",
    "Deputy PMO lead",
    "PMO",
    "Project Planner",
    "Business Analyst",
];
