import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import ProfileAvatar from "../../components/ProfileAvatar";
import { InputTextarea } from "primereact/inputtextarea";
import { updateUser, reset } from "../../features/auth/authSlice";
import AppContainer from "../../layouts/AppContainer";

const ProfilePage = () => {
    const toastRef = useRef(null);
    const [inputRef, setInputRef] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        bio: "",
        avatar: "",
        phone_number: "",
    });

    const dispatch = useDispatch();

    const { user, isLoading, isSuccess, type, isError, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user) {
            setData({
                firstname: user.profile.firstname || "",
                lastname: user.profile.lastname || "",
                bio: user.profile.bio || "",
                bob: user.profile.bob || "",
                email: user.email,
                username: user.username,
                phone_number: user.profile.phone_number || "",
            });
        }
    }, [user]);

    useEffect(() => {
        if (isError && message) {
            toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 3000,
            });
        }

        if (isSuccess && message) {
            toastRef.current.show({
                severity: "success",
                summary: "Success",
                detail: message,
                life: 3000,
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    };

    const submit = async (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append("_method", "post");
        for (const key in data) {
            formData.append(`${key}`, data[key]);
        }
        if (file) {
            formData.append("avatar", file);
        }

        dispatch(updateUser(formData));
    };

    const handleOnClick = () => {
        inputRef.click();
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-4 tw-flex tw-items-center tw-justify-center">
                <div className="card tw-rounded-lg tw-shadow-md md:tw-w-[35rem] tw-w-full tw-p-4 sm:tw-p-8 tw-bg-white">
                    <div className="tw-text-center tw-mb-5">
                        <h2 className="tw-text-3xl tw-font-bold tw-my-0">
                            Profile
                        </h2>
                    </div>
                    <div className=" tw-mb-8 tw-flex tw-justify-center">
                        <ProfileAvatar
                            handleOnClick={handleOnClick}
                            source={
                                file
                                    ? URL.createObjectURL(file)
                                    : `${user?.avatar}?${new Date().getTime()}`
                            }
                            isEdit={true}
                        />
                        <input
                            type="file"
                            onChange={handleFileSelect}
                            hidden
                            accept=".gif,.jpg,.jpeg,.png"
                            ref={(ref) => setInputRef(ref)}
                        />
                    </div>

                    <div className="form-demo tw-my-5">
                        <form className="p-fluid">
                            {/* <div className="field tw-mb-8">
                                    <span className="p-float-label ">
                                        <InputText
                                            name="username"
                                            type="text"
                                            value={data.username}
                                            onChange={handleOnChange}
                                            required
                                        />
                                        <label htmlFor="username" className="">
                                            Username *
                                        </label>
                                    </span>
                                </div> */}
                            <div className="field tw-mb-8 tw-flex tw-flex-col tw-gap-2">
                                <span className="tw-ml-2 tw-flex tw-gap-2">
                                    <i className="pi pi-user" />

                                    <label htmlFor="firstname" className="">
                                        First Name *
                                    </label>
                                </span>

                                <InputText
                                    name="firstname"
                                    type="text"
                                    value={data.firstname}
                                    onChange={handleOnChange}
                                    className="tw-border"
                                    required
                                />
                            </div>
                            <div className="field tw-mb-8 tw-flex tw-flex-col tw-gap-2">
                                <span className="tw-ml-2 tw-flex tw-gap-2">
                                    <i className="pi pi-user" />

                                    <label htmlFor="lastname" className="">
                                        Last Name *
                                    </label>
                                </span>
                                <InputText
                                    name="lastname"
                                    type="text"
                                    value={data.lastname}
                                    onChange={handleOnChange}
                                    className="tw-border"
                                    required
                                />
                            </div>

                            <div className="field tw-mb-8">
                                <span className="p-float-label ">
                                    <InputText
                                        name="phone"
                                        type="text"
                                        value={data.phone}
                                        onChange={handleOnChange}
                                        required
                                    />
                                    <label htmlFor="phone" className="">
                                        Phone Number
                                    </label>
                                </span>
                            </div>
                            <div className="field tw-mb-8">
                                <span className="p-float-label ">
                                    <InputTextarea
                                        name="bio"
                                        type="text"
                                        value={data.bio}
                                        onChange={handleOnChange}
                                        className="tw-w-full tw-border-0"
                                        rows={4}
                                    />
                                    <label htmlFor="bio" className="">
                                        Bio *
                                    </label>
                                </span>
                            </div>
                            <div className="tw-my-5 tw-flex tw-items-center tw-justify-center">
                                <Button
                                    className="tw-w-80"
                                    severity="success"
                                    label="Submit"
                                    onClick={submit}
                                    loading={isLoading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default ProfilePage;
