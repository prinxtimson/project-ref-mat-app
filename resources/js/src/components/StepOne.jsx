import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { useState } from "react";

const StepOne = ({ data, handleOnChange, handleOnNext }) => {
    const phonePattern = /^[0-9]{10,}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [err, setErr] = useState({
        phone: false,
        email: false,
    });

    return (
        <div className="card">
            <form
                className="p-fluid"
                onSubmit={(e) => {
                    e.preventDefault();
                    let _phone = data.phone && !phonePattern.test(data.phone);
                    let _email = !emailPattern.test(data.email);

                    if (_email || _phone) {
                        setErr({
                            phone: _phone,
                            email: _email,
                        });
                        return;
                    }
                    handleOnNext();
                }}
            >
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
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
                    <label htmlFor="phone_number">Phone Number </label>
                    <InputText
                        name="phone"
                        value={data.phone}
                        onChange={handleOnChange}
                        placeholder="Enter Phone Number"
                        invalid={err.phone}
                    />
                    {err.phone && (
                        <small id="username-help" className="tw-text-red-500">
                            Please enter a valid phone number
                        </small>
                    )}
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1 tw-mb-6">
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

export default StepOne;
