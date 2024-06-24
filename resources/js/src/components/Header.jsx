import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

import TritekFullLogo from "./TritekFullLogo";

import { logout, reset } from "../features/auth/authSlice";
import { markNotification } from "../features/notification/notificationSlice";

const Header = () => {
    const menu = useRef(null);
    const notificationRef = useRef(null);

    const { user } = useSelector((state) => state.auth);
    const { notifications } = useSelector((state) => state.notification);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    };

    let items = [
        {
            label: "Profile",
            icon: "pi pi-fw pi-user",
            command: () => navigate("/profile"),
        },
        {
            label: "Change Password",
            icon: "pi pi-fw pi-lock",
            command: () => navigate("/change-password"),
        },
        {
            label: "Logout",
            icon: "pi pi-fw pi-sign-out",
            command: onLogout,
        },
    ];

    const menuItems = [
        // {
        //     label: "Home",
        //     command: () => navigate("/"),
        // },
        {
            label: "About Us",
            command: () =>
                (window.location = "https://lmstritek.co.uk/about-us/"),
            className: "tw-font-semibold",
        },
        {
            label: "Success Stories",
            command: () =>
                (window.location = "https://lmstritek.co.uk/success-stories/"),
            className: "tw-font-semibold",
        },
        {
            label: "Contact Us",
            command: () =>
                (window.location = "https://lmstritek.co.uk/contact-us/"),
            className: "tw-font-semibold",
        },
        {
            label: "Interaction",
            command: () => navigate("/interaction"),
            className: "tw-font-semibold",
        },
    ];

    return (
        <div className="tw-z-50 tw-sticky tw-top-0 tw-w-full tw-bg-white tw-border-b">
            <Menubar
                className="tw-bg-white tw-h-20 tw-text-indigo-700"
                model={menuItems}
                start={
                    <div className="tw-mx-3 md:tw-mx-5">
                        <Link to="/">
                            <TritekFullLogo />
                        </Link>
                    </div>
                }
                end={
                    <div className="tw-mx-2 md:tw-mx-4 tw-flex tw-gap-1">
                        <div className="tw-flex tw-items-center tw-gap-3">
                            <Link
                                to="https://www.instagram.com/tritekconsultingltd/"
                                target="blank"
                            >
                                <i
                                    className="pi pi-instagram"
                                    style={{ fontSize: "1.5rem" }}
                                ></i>
                            </Link>
                            <Link
                                to="https://twitter.com/Tritek_Consult"
                                target="blank"
                            >
                                <i
                                    className="pi pi-twitter"
                                    style={{ fontSize: "1.5rem" }}
                                ></i>
                            </Link>
                            <Link
                                to="https://web.facebook.com/tritekconsultingltd?_rdc=1&_rdr"
                                target="blank"
                            >
                                <i
                                    className="pi pi-facebook"
                                    style={{ fontSize: "1.5rem" }}
                                ></i>
                            </Link>
                            <div className="">
                                <Button
                                    icon="pi pi-search"
                                    size="small"
                                    label="Search"
                                    onClick={() => navigate("/search")}
                                />
                            </div>
                        </div>

                        {user && (
                            <div className="tw-flex tw-items-center sm:tw-mx-2 tw-pl-4 tw-gap-3">
                                <div className="">
                                    <i
                                        className="pi pi-bell p-overlay-badge"
                                        style={{
                                            fontSize: "1.5rem",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) =>
                                            notificationRef.current?.toggle(e)
                                        }
                                    >
                                        {notifications &&
                                        notifications.count > 0 ? (
                                            <Badge
                                                value={
                                                    notifications.count > 9
                                                        ? "9+"
                                                        : notifications.count
                                                }
                                                severity="danger"
                                            ></Badge>
                                        ) : null}
                                    </i>
                                    <Menu
                                        model={
                                            notifications
                                                ? notifications.data
                                                      .slice(0, 9)
                                                      .map((val) =>
                                                          val.type ==
                                                          "App\\Notifications\\JobApplication"
                                                              ? {
                                                                    label: `Your ${
                                                                        val.data
                                                                            .payload
                                                                            .job_post
                                                                            .title
                                                                    } job application is at ${
                                                                        val.data
                                                                            .payload
                                                                            .status ==
                                                                        0
                                                                            ? "Processing"
                                                                            : "Offer"
                                                                    } stage`,
                                                                }
                                                              : {}
                                                      )
                                                : [
                                                      {
                                                          label: "No Notification found",
                                                      },
                                                  ]
                                        }
                                        popup
                                        ref={notificationRef}
                                        onShow={() =>
                                            dispatch(markNotification())
                                        }
                                        style={{ width: 340 }}
                                    />
                                </div>
                                <div className="">
                                    <Avatar
                                        image={`${
                                            user?.avatar
                                        }?${new Date().getTime()}`}
                                        shape="circle"
                                        onClick={(event) =>
                                            menu.current.toggle(event)
                                        }
                                        imageAlt={user?.name}
                                        className="tw-w-[2.5rem] tw-h-[2.5rem]"
                                    />
                                    <Menu model={items} popup ref={menu} />
                                </div>
                            </div>
                        )}
                    </div>
                }
            />
        </div>
    );
};

export default Header;
