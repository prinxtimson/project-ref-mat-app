import { useState } from "react";
import { useSelector } from "react-redux";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const TwoFactorAuthDialog = ({ visible, handleOnHide, handleOnSubmit }) => {
    const [data, setData] = useState({
        code: "",
    });

    const { isLoading } = useSelector((state) => state.auth);

    const onSubmit = (e) => {
        e.preventDefault();
        handleOnSubmit(data);
    };

    const handleOnChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const handleOnClose = () => {
        setData({
            code: "",
        });
        handleOnHide();
    };

    return (
        <Dialog
            visible={visible}
            onHide={handleOnClose}
            closable={false}
            closeOnEscape={false}
            className=" "
            header=" Two-Factor Authentication"
        >
            <div className="">
                <form onSubmit={onSubmit} className="p-fluid">
                    <div className="field">
                        <span className="tw-flex tw-flex-col tw-items-center tw-gap-2">
                            <label htmlFor="code tw-text-center">
                                Enter Authentication Code
                            </label>
                            <InputText
                                name="code"
                                value={data.code}
                                autoComplete="new code"
                                onChange={handleOnChange}
                            />
                        </span>
                    </div>

                    <div className="field tw-flex tw-justify-center">
                        <Button
                            type="submit"
                            label="Confirm"
                            disabled={isLoading}
                            className="tw-w-40"
                        />
                        <Button
                            label="Cancel"
                            // pt={{
                            //     root: {
                            //         className: "tw-bg-[#1e3a63]",
                            //     },
                            // }}
                            onClick={handleOnClose}
                            type="button"
                        />
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default TwoFactorAuthDialog;
