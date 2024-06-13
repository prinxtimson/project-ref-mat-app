import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { Image } from "primereact/image";
import emojiData from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import _ from "lodash";

import AppContainer from "../../layouts/AppContainer";
import Chat from "../../components/Chat";
import ChatMessage from "../../components/ChatMessage";
import {
    clear,
    deleteChat,
    deleteMessage,
    getMyChats,
    getMessages,
    searchMessages,
    sendMessage,
    selectChat,
} from "../../features/chat/chatSlice";
import { getUsers } from "../../features/user/userSlice";
import moment from "moment";

const ChatPage = () => {
    const toastRef = useRef(null);
    const menuRef = useRef(null);
    const chatMenuRef = useRef(null);
    const imgRef = useRef(null);
    const [file, setFile] = useState(null);
    const [filterChats, setFilterChats] = useState([]);
    const search = new URLSearchParams(useLocation().search);
    const [data, setData] = useState({
        text: "",
    });
    const [searchText, setSearchText] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [chatSearch, setChatSearch] = useState("");
    const [showEmojis, setShowEmojis] = useState(false);
    const [groupMessages, setGroupMessages] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { chats, chat, messages, type } = useSelector((state) => state.chat);
    const { user } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.user);

    useEffect(() => {
        if (
            !user.roles[0].permissions
                .map((val) => val.name)
                .includes("Account Management")
        ) {
            toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: "Not permitted to access route",
                life: 3000,
            });
            navigate("/dashboard");
        }
    }, []);

    useEffect(() => {
        dispatch(getMyChats());
        dispatch(getUsers());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        let _m = _.groupBy(messages, (m) => m.created_at.split("T")[0]);

        setGroupMessages(_m);
        if (messages.length > 0) {
            setData({ ...data, chat_id: messages[0].chat_id });
        }
    }, [messages]);

    useEffect(() => {
        if (searchText) {
            let _filter = chats.filter((val) =>
                val.participants
                    ?.find((p) => p.id != user.id)
                    ?.name.toLowerCase()
                    .includes(searchText.toLowerCase())
            );

            setFilterChats(_filter);
        } else {
            setFilterChats(chats);
        }
    }, [searchText, chats]);

    useEffect(() => {
        if (type == "chat/delete/fulfilled") {
            setSelectedUser(null);
            setData({ text: "" });
        }
    }, [type]);

    useEffect(() => {
        let chat_id = search.get("chat_id");
        if (chat_id) {
            let _chat = chats.find((val) => val.id == chat_id);
            let _user = _chat.participants.find((val) => val.id != user.id);
            setSelectedUser(_user);

            dispatch(getMessages(chat_id));
        }
    }, []);

    // useEffect(() => {
    //     if (chatSearch) {
    //         let _data = { id: data.chat_id, query: chatSearch };
    //         dispatch(searchMessages(_data));
    //     }
    // }, [chatSearch]);

    const handleSelectUser = (payload) => {
        setSelectedUser(payload);
        let _d = { user_id: payload.id };
        for (let index = 0; index < chats.length; index++) {
            const participants = chats[index].participants;
            if (participants.find((val) => val.id == payload.id)) {
                dispatch(getMessages(chats[index].id));
            }
        }
        setData({ text: "", ..._d });
        setFile(null);
    };

    const handleSelectChat = (payload) => {
        let _user = payload.participants.find((val) => val.id != user.id);
        setSelectedUser(_user);
        dispatch(getMessages(payload.id));
        setData({ text: "", user_id: _user.id, chat_id: payload.id });
        setFile(null);
    };

    const handlDeleteChat = () => {
        if (
            window.confirm(`You are about to delete this chat, are you sure?`)
        ) {
            dispatch(deleteChat(data.chat_id));
        }
    };

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
        setData({ ...data, text: "" });
        setFile(null);
    };

    const handleEditMessage = (payload) => {
        setData(payload);
    };

    const handleCancelEdit = () => {
        setData({ ...data, text: "" });
        setIsEdit(false);
    };

    const handleDeleteMessage = (payload) => {
        dispatch(deleteMessage(payload.id));
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
        setData({ ...data, text: data.text + e.native });
    };

    const menuItems =
        users?.data
            .filter((i) => i.id != user.id && i.roles[0].name != "driver")
            .map((val) => ({
                command: () => handleSelectUser(val),
                template: (item, options) => {
                    return (
                        <button
                            onClick={(e) => options.onClick(e)}
                            className={`${options.className}
                        tw-w-full p-link tw-flex tw-items-center tw-p-2 tw-pl-4 tw-text-color hover:tw-bg-gray-200 tw-border-0
                    `}
                        >
                            <Avatar
                                image={val.avatar}
                                className="tw-mr-2"
                                shape="circle"
                            />
                            <div className="tw-flex tw-flex-col">
                                <span className="tw-font-bold">
                                    {val.name || val.username}
                                </span>
                                <span className="tw-text-sm">
                                    {val.roles[0]?.name}
                                </span>
                            </div>
                        </button>
                    );
                },
            })) || [];

    const chatMenuItems = [
        {
            label: "Delete Chat",
            command: () => handlDeleteChat(),
        },
        {
            label: "Close Chat",
            command: () => {
                setSelectedUser(null);
                setData({ text: "" });
            },
        },
    ];

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-p-4 tw-flex ">
                <div className="tw-w-[25rem]  tw-h-[75vh] tw-flex tw-flex-col tw-shadow-md tw-bg-stone-100 tw-p-4">
                    <div className="tw-p-2 tw-flex tw-justify-end">
                        <Button
                            text
                            label="New Chat"
                            onClick={(e) => menuRef.current.toggle(e)}
                            pt={{
                                root: {
                                    className: "tw-text-[#cc5500]",
                                },
                            }}
                        />
                        <Menu
                            popup
                            ref={menuRef}
                            model={menuItems}
                            className="tw-max-h-[35rem] tw-overflow-auto"
                            popupAlignment="right"
                        />
                    </div>
                    <div className="tw-mb-5">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"></InputIcon>
                            <InputText
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search"
                                className="tw-w-full"
                            />
                        </IconField>
                    </div>

                    <div className="tw-my-4 tw-flex tw-flex-col tw-overflow-auto tw-gap-2">
                        {filterChats.map((item) => (
                            <Chat
                                key={item.id}
                                chat={item}
                                user={user}
                                handleSelectChat={handleSelectChat}
                            />
                        ))}
                        {filterChats == 0 && (
                            <p className="tw-m-0">No search result found</p>
                        )}
                    </div>
                </div>
                {selectedUser ? (
                    <div className="tw-grow tw-h-[75vh] tw-flex tw-flex-col tw-border tw-bg-white">
                        <div className="tw-grow tw-flex tw-flex-col">
                            <div className="tw-shadow-md tw-py-2 tw-px-4">
                                <div className="tw-flex tw-justify-between">
                                    <div className="tw-flex tw-gap-3 tw-items-center">
                                        <Avatar
                                            shape="circle"
                                            size="large"
                                            imageAlt={selectedUser.name}
                                            image={selectedUser.avatar}
                                        />
                                        <div className="tw-grow">
                                            <h5 className="tw-my-0">
                                                {selectedUser.name ||
                                                    selectedUser.username}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Button
                                            text
                                            icon="pi pi-ellipsis-v"
                                            size="small"
                                            rounded
                                            onClick={(e) =>
                                                chatMenuRef.current.toggle(e)
                                            }
                                        />

                                        <Menu
                                            popup
                                            ref={chatMenuRef}
                                            model={chatMenuItems}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                className={`${
                                    file ? "tw-max-h-[46vh]" : "tw-max-h-[57vh]"
                                } tw-h-full tw-p-5 tw-overflow-auto tw-bg-indigo-50 tw-gap-5`}
                            >
                                {Object.keys(groupMessages).map(
                                    (key, index) => (
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
                                                {groupMessages[key].map(
                                                    (msg) => (
                                                        <ChatMessage
                                                            key={msg.id}
                                                            message={msg}
                                                            isSender={
                                                                msg.user_id ==
                                                                user.id
                                                            }
                                                            handleEditMessage={
                                                                handleEditMessage
                                                            }
                                                            handleDeleteMessage={
                                                                handleDeleteMessage
                                                            }
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="tw-shadow-md tw-border tw-px-3 tw-py-5">
                            {file && (
                                <div className="tw-relative tw-w-fit">
                                    <Image
                                        src={URL.createObjectURL(file)}
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
                            <div className="tw-flex tw-mt-2 tw-gap-4">
                                <div className="">
                                    <input
                                        type="file"
                                        hidden
                                        ref={imgRef}
                                        onChange={handleFileSelect}
                                    />
                                    <Button
                                        size="small"
                                        icon="pi pi-paperclip"
                                        rounded
                                        text
                                        onClick={() => imgRef.current.click()}
                                    />
                                </div>
                                <div className="tw-grow tw-relative">
                                    {showEmojis && (
                                        <div className="tw-fixed tw-bottom-28 tw-right-28">
                                            <Picker
                                                data={emojiData}
                                                onEmojiSelect={addEmoji}
                                                className="tw-fixed"
                                                // onClickOutside={() =>
                                                //     setShowEmojis(!showEmojis)
                                                // }
                                                theme="light"
                                            />
                                        </div>
                                    )}
                                    <InputText
                                        value={data.text}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                text: e.target.value,
                                            })
                                        }
                                        name="text"
                                        placeholder="Type something ......"
                                        className="tw-w-full"
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="tw-flex tw-gap-2">
                                    <button
                                        style={{
                                            background: "transparent",
                                            outline: "none",
                                            border: "none",
                                        }}
                                        onClick={() =>
                                            setShowEmojis(!showEmojis)
                                        }
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ height: 20, width: 20 }}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </button>
                                    <Button
                                        text
                                        severity="success"
                                        className=""
                                        rounded
                                        icon="pi pi-send"
                                        onClick={handleSendMessage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="tw-flex tw-grow tw-justify-center tw-items-center tw-bg-white">
                        <h1 className="tw-text-4xl tw-text-gray-400">
                            Select conversation . . . .{" "}
                        </h1>
                    </div>
                )}
            </div>
        </AppContainer>
    );
};

export default ChatPage;

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
