import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

const StepOne = ({ data, handleOnChange, handleOnNext }) => {
    return (
        <div className="card">
            <form
                className="p-fluid"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleOnNext();
                }}
            >
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                    <label htmlFor="fullname">Full Name *</label>
                    <div className="tw-flex tw-gap-3">
                        <InputText
                            name="firstname"
                            value={data.firstname}
                            onChange={handleOnChange}
                            placeholder="First Name"
                            required
                        />
                        <InputText
                            name="lastname"
                            value={data.lastname}
                            onChange={handleOnChange}
                            placeholder="Last Name"
                            required
                        />
                    </div>
                </div>

                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                    <label htmlFor="email">Email *</label>
                    <InputText
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        placeholder="Enter Email"
                        required
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                    <label htmlFor="phone_number">Phone Number *</label>
                    <InputText
                        name="phone"
                        value={data.phone}
                        onChange={handleOnChange}
                        placeholder="Enter Phone Number"
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-4">
                    <label htmlFor="date_joined">Date Joined *</label>
                    <input
                        type="date"
                        name="date_joined"
                        value={data.date_joined}
                        onChange={handleOnChange}
                        placeholder="Select Date"
                        required
                        className="p-inputtext"
                    />
                    {/* <Calendar
                        name="date_joined"
                        value={data.date_joined}
                        onChange={handleOnChange}
                        showIcon
                        placeholder="Select Date"
                        required
                    /> */}
                </div>
                <div className="tw-flex tw-items-center tw-justify-between">
                    <Button label="Ok" className="tw-w-40" />
                </div>
            </form>
        </div>
    );
};

export default StepOne;
