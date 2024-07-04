import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

const TransferData = ({
    handleOnChange,
    data,
    handleOnSubmit,
    err,
    isLoading,
}) => {
    return (
        <div className="card tw-rounded-lg tw-w-full tw-p-3 sm:tw-p-6 tw-bg-white">
            <form className="p-fluid" onSubmit={handleOnSubmit}>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="fullname">Full Name *</label>
                    <InputText
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                        placeholder="Full Name"
                        required
                    />
                </div>

                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="email">Email *</label>
                    <InputText
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        placeholder="Enter Email"
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
                    <label htmlFor="contact_number">Contact Number</label>
                    <InputText
                        name="phone"
                        value={data.phone}
                        onChange={handleOnChange}
                        placeholder="Enter Contact Number"
                        required
                        invalid={err.phone}
                    />
                    {err.phone && (
                        <small id="username-help" className="tw-text-red-500">
                            Please enter a valid phone number
                        </small>
                    )}
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="description">
                        Description of Data to be Transferred
                    </label>
                    <InputTextarea
                        name="description"
                        value={data.description}
                        onChange={handleOnChange}
                        placeholder="Enter description of data to be transferred"
                        rows={4}
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="recipient_name">
                        Recipient Organisation Name
                    </label>
                    <InputText
                        name="recipient_name"
                        value={data.recipient_name}
                        onChange={handleOnChange}
                        placeholder="Enter Recipient Organisation Name"
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <label htmlFor="recipient_email">
                        Recipient Organisation Email Address to be transferred
                    </label>
                    <InputText
                        name="recipient_email"
                        type="email"
                        value={data.recipient_email}
                        onChange={handleOnChange}
                        placeholder="Enter Recipient Organisation Email"
                        invalid={err.recipient_email}
                    />
                    {err.recipient_email && (
                        <small id="email-help" className="tw-text-red-500">
                            Please enter a valid email
                        </small>
                    )}
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
                    <div className="field-checked tw-flex tw-items-center tw-text-gray-900 ">
                        <Checkbox
                            name="consent"
                            value={data.consent}
                            onChange={handleOnChange}
                            checked={data.consent}
                            className="tw-mr-2"
                            invalid={err.consent}
                        />
                        <label
                            htmlFor="1"
                            className={err.consent ? "tw-text-red-500" : ""}
                        >
                            I hereby request the transfer of my personal data to
                            the above named organisation.
                        </label>
                    </div>
                </div>

                <div className="tw-flex tw-items-center tw-justify-center">
                    <Button
                        label="Ok"
                        className="tw-w-40"
                        loading={isLoading}
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

export default TransferData;
