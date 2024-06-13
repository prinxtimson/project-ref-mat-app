import { useState, useEffect, useRef } from "react";
import { Calendar } from "primereact/calendar";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import AppContainer from "../../layouts/AppContainer";
import { markNotification } from "../../features/notification/notificationSlice";
import moment from "moment";

const NotificationPage = () => {
    const toastRef = useRef(null);
    const [filter, setFilter] = useState(null);
    const [groupNotification, setGroupNotification] = useState({});

    const { notifications } = useSelector((state) => state.notification);

    const dispatch = useDispatch();

    useEffect(() => {
        let _timeout = setTimeout(() => {
            dispatch(markNotification());
        }, 3000);

        return () => clearTimeout(_timeout);
    }, []);

    useEffect(() => {
        let _notify = _.groupBy(
            notifications?.data,
            (val) => val.created_at.split("T")[0]
        );

        setGroupNotification(_notify);
    }, [notifications]);

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-shadow tw-rounded tw-bg-white tw-p-6 tw-min-h-[40rem]">
                <div className="tw-flex tw-justify-between tw-mb-5">
                    <h1 className="tw-m-0">Notifications & Alert</h1>
                    <div className="">
                        <Calendar
                            name="date"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className=""
                            placeholder="Filter by: Date"
                        />
                    </div>
                </div>

                <div className="">
                    {Object.keys(groupNotification).map((key, index) => (
                        <div className="" key={index}>
                            <h4 className="tw-my-2">
                                {moment(key).calendar({
                                    sameDay: "[Today]",
                                    lastWeek: "DD/MM/YYYY",
                                    lastDay: "[Yesterday]",
                                    sameElse: "DD/MM/YYYY",
                                })}
                            </h4>
                            <div className="tw-flex tw-flex-col tw-gap-3">
                                {groupNotification[key].map((notify) =>
                                    notify.type ==
                                    "App\\Notifications\\DeliveryTaskAssign" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
                                            John Doe
                                        </div> */}
                                            <div className="tw-grow">
                                                {`Delivery task ${notify.data.order.tracking_id} has been assigned to you`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\DeliveryTaskCancel" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
                                    John Doe
                                </div> */}
                                            <div className="tw-grow">
                                                {`Delivery task ${notify.data.order.tracking_id} has been cancelled`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\DeliveryTaskCompleted" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
                            John Doe
                        </div> */}
                                            <div className="tw-grow">
                                                {`Delivery task ${notify.data.order.tracking_id} has been completed`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\DeliveryTaskEdited" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
                    John Doe
                </div> */}
                                            <div className="tw-grow">
                                                {`Delivery task ${notify.data.order.tracking_id} has been edited`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\DeliveryTaskOnHold" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
            John Doe
        </div> */}
                                            <div className="tw-grow">
                                                {`Delivery task ${notify.data.order.tracking_id} is on hold`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\DeliveryTaskPickup" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`Delivery task ${notify.data.order.tracking_id} is ready for pickup`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\DeliveryTaskReturn" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`Delivery task ${notify.data.order.tracking_id} has been return`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\DeliveryTaskStarted" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`Delivery task ${notify.data.order.tracking_id} has started`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\NewDeliveryTask" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`Delivery task ${notify.data.order.tracking_id} has been created`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\NewTicket" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`Ticket ${notify.data.ticket.reg_no} has been raised`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\TicketReply" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`You have a new reply to ticket ${notify.data.ticket.reg_no}`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\TicketStatus" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`Ticket ${notify.data.ticket.reg_no} has been ${notify.data.ticket.status}`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\RoleAdded" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`Role ${notify.data.role.name} has been created`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\RoleDeleted" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`Role ${notify.data.role.name} has been deleted`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\RoleEdited" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
    John Doe
</div> */}
                                            <div className="tw-grow">
                                                {`Role ${notify.data.role.name} has been edited`}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\UserCreated" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
                                            John Doe
                                        </div> */}
                                            <div className="tw-grow">
                                                {`User ${notify.data.user.name} has been created `}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\UserDeactivated" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
                                    John Doe
                                </div> */}
                                            <div className="tw-grow">
                                                {`User ${notify.data.user.name} has been deactivated `}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\UserDeleted" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
                            John Doe
                        </div> */}
                                            <div className="tw-grow">
                                                {`User ${notify.data.user.name} has been deleted `}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : notify.type ==
                                      "App\\Notifications\\UserEdited" ? (
                                        <div
                                            className="tw-border-t tw-flex tw-gap-4"
                                            key={notify.id}
                                        >
                                            {/* <div className="tw-flex tw-gap-2">
                    John Doe
                </div> */}
                                            <div className="tw-grow">
                                                {`User ${notify.data.user.name} has been edited `}
                                            </div>
                                            <div className="">
                                                {moment(
                                                    notify.created_at
                                                ).format("LT")}
                                            </div>
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppContainer>
    );
};

export default NotificationPage;
