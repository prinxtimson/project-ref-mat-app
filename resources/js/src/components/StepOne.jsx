import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
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
                    <div className="tw-flex tw-gap-4">
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

                <div className="tw-flex tw-gap-3 tw-mb-6">
                    <label htmlFor="gender">Gender</label>
                    <div className="tw-flex tw-flex-wrap tw-gap-2">
                        <div className="tw-flex tw-items-center">
                            <RadioButton
                                inputId="male"
                                name="gender"
                                value="male"
                                onChange={handleOnChange}
                                checked={data.gender === "male"}
                            />
                            <label htmlFor="male" className="tw-ml-2">
                                Male
                            </label>
                        </div>
                        <div className="tw-flex tw-items-center">
                            <RadioButton
                                inputId="female"
                                name="gender"
                                value="female"
                                onChange={handleOnChange}
                                checked={data.gender === "female"}
                            />
                            <label htmlFor="no" className="tw-ml-2">
                                Female
                            </label>
                        </div>

                        <div className="tw-flex tw-items-center">
                            <RadioButton
                                inputId="others"
                                name="gender"
                                value="others"
                                onChange={handleOnChange}
                                checked={data.gender === "others"}
                            />
                            <label htmlFor="no" className="tw-ml-2">
                                Others
                            </label>
                        </div>
                    </div>
                </div>

                <div className="tw-flex tw-items-center tw-gap-4 tw-mb-6">
                    <div className="tw-grow tw-flex tw-flex-col tw-gap-1">
                        <label htmlFor="date_joined">Date Joined *</label>
                        <input
                            type="date"
                            name="date_joined"
                            value={data.date_joined}
                            onChange={handleOnChange}
                            placeholder="Select Date"
                            required
                            className="p-inputtext "
                        />
                    </div>
                    <div className="tw-grow tw-flex tw-flex-col tw-gap-1">
                        <label htmlFor="date_left">Date Left *</label>
                        <input
                            type="date"
                            name="date_left"
                            value={data.date_left}
                            onChange={handleOnChange}
                            placeholder="Select Date"
                            required
                            className="p-inputtext"
                        />
                    </div>
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
