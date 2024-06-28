import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

const StepThree = ({
    data,
    handleOnChange,
    handleFileChange,
    handleSubmit,
    handlePrevious,
    isLoading,
}) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [err, setErr] = useState({
        phone: false,
        email: false,
    });

    const handleFileSelect = (e) => {
        handleFileChange(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let _email = !emailPattern.test(data.email);

        if (_email || !data.consent) {
            setErr({
                email: _email,
                consent: true,
            });
            return;
        }
        setErr({
            email: false,
            consent: false,
        });
        handleSubmit();
    };

    return (
        <div className="card">
            <form className="p-fluid" onSubmit={handleOnSubmit}>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="recruiter_name">Recruiter Name *</label>
                    <InputText
                        name="recruiter_name"
                        value={data.recruiter_name}
                        onChange={handleOnChange}
                        placeholder="Enter Recruiter Name"
                        required
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="recruiter_email">Recruiter Email *</label>
                    <InputText
                        name="recruiter_email"
                        value={data.recruiter_email}
                        onChange={handleOnChange}
                        placeholder="Enter Recruiter Email"
                        required
                        invalid={err.email}
                    />
                    {err.email && (
                        <small id="email-help" className="tw-text-red-500">
                            Please enter a valid email
                        </small>
                    )}
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="position">Position Held *</label>
                    <InputText
                        name="position"
                        value={data.position}
                        onChange={handleOnChange}
                        placeholder="Enter Position Held"
                        required
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="cv_upload">Please upload your CV</label>
                    <input
                        type="file"
                        name="cv"
                        accept=".docx,.csv,.pdf,.pages,.pptx,.ppt"
                        onChange={handleFileSelect}
                        //value={data.cv}
                    />
                </div>

                <div className="tw-mb-4">
                    <div className="field-checked tw-text-gray-900 tw-items-center">
                        <Checkbox
                            name="consent"
                            value={data.consent}
                            onChange={handleOnChange}
                            checked={data.consent}
                            className="tw-mr-2"
                            invalid={err.consent}
                        />

                        <label
                            htmlFor="accept"
                            className={err.consent ? "tw-text-red-500" : ""}
                        >
                            I agree to grant consent to Tritek to be in custody
                            of my personal data.
                        </label>
                    </div>
                </div>

                <div className="tw-mb-4">
                    <a
                        href="http://lmstritek.co.uk/privacy-policy/"
                        className="tw-underline tw-text-sm tw-p-2 tw-text-blue-500 hover:tw-text-blue-800"
                        target="_blank"
                    >
                        Read Privacy Policy
                    </a>
                </div>

                <div className="tw-flex tw-items-center tw-gap-6">
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
                        label="Submit"
                        className="tw-w-52"
                        pt={{
                            root: {
                                className:
                                    "tw-bg-[#293986] tw-border-[#293986]",
                            },
                        }}
                        loading={isLoading}
                    />
                </div>
            </form>
        </div>
    );
};

export default StepThree;
