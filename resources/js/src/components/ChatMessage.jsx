import { useRef, useEffect, useState } from "react";
import moment from "moment";
import { Image } from "primereact/image";
import { Avatar } from "primereact/avatar";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

const ChatMessage = ({
    isSender,
    message,
    handleEditMessage,
    handleDeleteMessage,
}) => {
    const menuRef = useRef(null);
    const ref = useRef(null);
    const [menuItems, setMenuItems] = useState([]);
    const fileExt = message.media?.split(".").pop() || "";

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
        let _menuItems = [];
        let msgD = moment(message.created_at);
        let d = moment();

        if (d.diff(msgD, "minutes") < 15) {
            _menuItems.push({
                label: "Edit",
                command: () => handleEditMessage(message),
            });
        }

        if (d.diff(msgD, "days") < 2) {
            _menuItems.push({
                label: "Delete",
                command: () => handleDeleteMessage(message),
            });
        }

        setMenuItems(_menuItems);
    }, [message]);

    return (
        <div
            className={`tw-flex tw-mb-4 tw-gap-2 ${
                isSender ? "tw-flex-row-reverse" : ""
            }`}
            ref={ref}
        >
            <div
                className={`tw-flex tw-flex-col ${
                    isSender ? "tw-items-end" : ""
                } `}
            >
                <Avatar
                    image={message.user?.avatar}
                    imageAlt={message.user?.name || ""}
                    shape="circle"
                    size="large"
                />
            </div>

            <div
                className={`tw-py-1 tw-px-2 tw-w-fit tw-max-w-[80%] tw-flex tw-flex-col ${
                    isSender
                        ? "tw-items-end tw-rounded-tl-lg tw-bg-indigo-500 tw-text-white "
                        : "tw-bg-white tw-rounded-tr-lg"
                }  tw-rounded-bl-lg tw-rounded-br-lg`}
            >
                <div className="tw-font-bold tw-text-sm">
                    {message.user?.name}
                </div>
                {message.media && (
                    <a
                        href={message.media}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={true}
                    >
                        <Image
                            src={
                                IMGTYPES.includes(fileExt)
                                    ? message.media
                                    : PDFTYPES.includes(fileExt)
                                    ? "/images/pdf.png"
                                    : XLSXTYPES.includes(fileExt)
                                    ? "/images/xlsx.png"
                                    : PPTTYPES.includes(fileExt)
                                    ? "/images/ppt.png"
                                    : "/images/docs.png"
                            }
                            imageClassName={`${
                                isSender
                                    ? "tw-rounded-tl-lg tw-text-white"
                                    : " tw-rounded-tr-lg"
                            }  tw-rounded-bl-lg tw-rounded-br-lg ${
                                message.media ? "" : "tw-hidden"
                            }`}
                            width={IMGTYPES.includes(fileExt) ? "200" : "100"}
                        />
                    </a>
                )}

                <p className={` tw-my-0 `}>{message.body}</p>
                <small
                    className={`tw-text-xs ${
                        isSender ? "" : "tw-text-gray-400"
                    }`}
                >
                    {`${moment(message.updated_at).format("LT")} ${
                        message.edited_at ? "edited" : ""
                    }`}
                </small>
            </div>
            {/* {isSender && menuItems.length > 0 && (
                <>
                    <Button
                        text
                        rounded
                        size="small"
                        icon="pi pi-ellipsis-v"
                        onClick={(e) => menuRef.current.toggle(e)}
                    />
                    <Menu
                        popup
                        ref={menuRef}
                        model={menuItems}
                        popupAlignment="left"
                    />
                </>
            )} */}
        </div>
    );
};

export default ChatMessage;

const IMGTYPES = ["jpeg", "png", "gif", "svg"];
const PDFTYPES = ["pdf"];
const XLSXTYPES = ["csv", "xlsx", "xls"];
const PPTTYPES = ["ppt"];
