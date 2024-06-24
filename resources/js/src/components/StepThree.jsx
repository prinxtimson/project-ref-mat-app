import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

const StepThree = ({
    data,
    handleOnChange,
    handleFileChange,
    handleSubmit,
}) => {
    const handleFileSelect = (e) => {
        handleFileChange(e.target.files[0]);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <div className="card">
            <form className="p-fluid" onSubmit={handleOnSubmit}>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                    <label htmlFor="recruiter_name">Recruiter Name *</label>
                    <InputText
                        name="recruiter_name"
                        value={data.recruiter_name}
                        onChange={handleOnChange}
                        placeholder="Enter Recruiter Name"
                        required
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                    <label htmlFor="recruiter_email">Recruiter Email *</label>
                    <InputText
                        name="recruiter_email"
                        value={data.recruiter_email}
                        onChange={handleOnChange}
                        placeholder="Enter Recruiter Email"
                        required
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                    <label htmlFor="position">Position Held *</label>
                    <InputText
                        name="position"
                        value={data.position}
                        onChange={handleOnChange}
                        placeholder="Enter Position Held"
                        required
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                    <label htmlFor="cv_upload">Please upload your CV</label>
                    <input
                        type="file"
                        name="cv"
                        accept=".docx,.csv,.pdf,.pages,.pptx,.ppt"
                        onChange={handleFileSelect}
                        value={data.cv}
                    />
                </div>

                <div className="tw-mb-4">
                    <div className="field-checked tw-text-gray-900 tw-items-center">
                        <Checkbox
                            name="consent"
                            value={consent}
                            onChange={handleOnChange}
                            checked={data.consent}
                            className="tw-mr-2"
                        />

                        <label htmlFor="accept" className="">
                            I agree to grant consent to Tritek to be in custody
                            of my personal data.
                        </label>
                    </div>
                </div>

                <div className="tw-mb-4">
                    <a href="http://lmstritek.co.uk/privacy-policy/">
                        Read Privacy Policy
                    </a>
                </div>

                <div className="tw-flex tw-items-center tw-justify-between">
                    <Button label="Submit" className="tw-w-52" />
                </div>
            </form>
        </div>
    );
};

export default StepThree;
