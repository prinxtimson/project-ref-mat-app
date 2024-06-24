import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Image } from "primereact/image";
import moment from "moment";

import AppContainer from "../../layouts/AppContainer";
import ChatMessage from "../../components/ChatMessage";
import {
    clear,
    deleteChat,
    getChats,
    sendMessage,
} from "../../features/chat/chatSlice";
import _ from "lodash";

const MessagingPage = () => {
    const toastRef = useRef(null);
    const imgRef = useRef(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState({
        body: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const [groupMessages, setGroupMessages] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { chat_messages, isLoading, isSuccess, isError, type } = useSelector(
        (state) => state.chat
    );
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getChats());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        let _m = _.groupBy(chat_messages, (m) => m.created_at.split("T")[0]);

        setGroupMessages(_m);
    }, [chat_messages]);

    const handleSendMessage = () => {
        let formData = new FormData();

        formData.append("_method", "post");
        for (const key in data) {
            formData.append(`${key}`, data[key]);
        }
        if (file) {
            formData.append("media", file);
        }
        dispatch(sendMessage(formData));
        setData({ user_id: data.user_id, body: "" });
        setFile(null);
        setIsEdit(false);
    };

    const handleEditMessage = (payload) => {
        setData(payload);
        setIsEdit(true);
    };

    const handleCancelEdit = () => {
        setData({ user_id: data.user_id, body: "" });
        setIsEdit(false);
    };

    const handleDeleteMessage = (payload) => {
        dispatch(deleteChat(payload.id));
    };

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    const addEmoji = (e) => {
        setData({ ...data, body: data.body + e.native });
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-bg-white tw-p-3 md:tw-p-6 tw-flex tw-flex-col">
                <div className="tw-h-[57vh] tw-shadow tw-rounded tw-flex tw-flex-col tw-border tw-bg-white">
                    <div
                        className={` tw-grow tw-p-5 tw-overflow-y-auto tw-bg-gray-100 tw-gap-5`}
                    >
                        {Object.keys(groupMessages).map((key, index) => (
                            <div className="tw-my-5" key={index}>
                                <p className="tw-text-center tw-text-gray-400">
                                    {moment(key).calendar({
                                        sameDay: "[Today]",
                                        lastWeek: "DD/MM/YYYY",
                                        lastDay: "[Yesterday]",
                                        sameElse: "DD/MM/YYYY",
                                    })}
                                </p>
                                <div className="">
                                    {groupMessages[key].map((msg) => (
                                        <ChatMessage
                                            key={msg.id}
                                            message={msg}
                                            isSender={msg.user_id == user.id}
                                            handleEditMessage={
                                                handleEditMessage
                                            }
                                            handleDeleteMessage={
                                                handleDeleteMessage
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="tw-shadow-md tw-border tw-px-3 tw-py-5">
                        {file && (
                            <div className="tw-relative tw-w-fit">
                                <Image
                                    src={
                                        IMGTYPES.includes(file.type)
                                            ? URL.createObjectURL(file)
                                            : PDFTYPES.includes(file.type)
                                            ? "/images/pdf.png"
                                            : XLSXTYPES.includes(file.type)
                                            ? "/images/xlsx.png"
                                            : PPTTYPES.includes(file.type)
                                            ? "/images/ppt.png"
                                            : "/images/docs.png"
                                    }
                                    width="80"
                                    indicatorIcon={
                                        <i className="pi pi-times"></i>
                                    }
                                />
                                <i
                                    className="pi pi-trash tw-p-1 tw-cursor-pointer tw-absolute tw-top-0 tw-right-0 tw-text-sm tw-text-red-500"
                                    onClick={() => setFile(null)}
                                ></i>
                            </div>
                        )}
                        <div className="tw-flex tw-mt-2 tw-gap-3 tw-items-start">
                            {/* <div className="">
                                <input
                                    type="file"
                                    hidden
                                    ref={imgRef}
                                    onChange={handleFileSelect}
                                    accept=".gif,.jpg,.jpeg,.png,.docx,.csv,.pdf,.xlsx,.xls,.pages,.svg,.pptx,.ppt"
                                />
                                <Button
                                    size="small"
                                    icon="pi pi-paperclip"
                                    rounded
                                    text
                                    onClick={() => imgRef.current.click()}
                                />
                            </div> */}
                            <div className="tw-grow tw-relative">
                                <InputTextarea
                                    value={data.body}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            body: e.target.value,
                                        })
                                    }
                                    name="body"
                                    rows={2}
                                    placeholder="Type something ......"
                                    className="tw-w-full"
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            {isEdit && (
                                <div>
                                    <Button
                                        size="small"
                                        icon="pi pi-times"
                                        rounded
                                        text
                                        onClick={handleCancelEdit}
                                    />
                                </div>
                            )}
                            <div className="tw-flex tw-gap-2">
                                <Button
                                    label="Send"
                                    severity="success"
                                    //icon="pi pi-send"
                                    onClick={handleSendMessage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default MessagingPage;

const IMGTYPES = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
const PDFTYPES = ["application/pdf"];
const XLSXTYPES = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
];
const PPTTYPES = [
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];
