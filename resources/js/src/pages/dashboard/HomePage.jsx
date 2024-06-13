import { useRef } from "react";
import { useSelector } from "react-redux";
import { Card } from "primereact/card";

import AppContainer from "../../layouts/AppContainer";

const HomePage = () => {
    const toastRef = useRef(null);

    const { user } = useSelector((state) => state.auth);

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                <div className=" md:tw-col-span-2">
                    <div className="card">
                        <Card title={`Welcome ${user?.name}`}>
                            <div className="tw-mb-2">
                                <p className="tw-m-0">
                                    We're thrilled to see you here again. As an
                                    integral part of our logistic company's
                                    team, your dedication and expertise play a
                                    vital role in ensuring smooth operations and
                                    exceptional service delivery.
                                </p>
                            </div>
                            <div className="tw-mb-2">
                                <p className="tw-m-0">
                                    Feel free to navigate through our
                                    user-friendly dashboard to access the tools
                                    and resources you need to streamline
                                    processes, manage logistics efficiently, and
                                    drive success.
                                </p>
                            </div>
                            <div className="tw-mb-2">
                                <p className="tw-m-0">
                                    If you have any questions or need
                                    assistance, don't hesitate to reach out.
                                    We're here to support you every step of the
                                    way
                                </p>
                            </div>
                            <div className="tw-mb-2">
                                <p className="tw-m-0">
                                    Thank you for your continued commitment and
                                    hard work!
                                </p>
                            </div>
                            <div className="tw-mb-2">
                                <p className="tw-m-0">Best regards,</p>
                                <p className="tw-m-0">
                                    Your CCT International Team
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="">
                    <div className="card">
                        <Card title="Our Mission">
                            <div className="tw-mb-2">
                                <p className="tw-m-0">
                                    The mission of our company is to streamline
                                    operations, enhance efficiency, and ensure
                                    seamless coordination of every aspect of our
                                    logistics processes. By leveraging
                                    cutting-edge technology and robust
                                    infrastructure, our system aims to optimize
                                    resource allocation, minimize delays, and
                                    maximize productivity. With a focus on
                                    accuracy, reliability, and scalability, we
                                    strive to provide a solid foundation that
                                    empowers our team to deliver exceptional
                                    service to our customers while driving
                                    continuous improvement and innovation in our
                                    logistics operations.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
                <div className="">
                    <div className="card md:tw-h-full">
                        <Card className="md:tw-h-full" title="Our Values">
                            <ul className="tw-list-none tw-m-0">
                                <li>
                                    <p className="tw-m-0">Accuracy</p>
                                </li>
                                <li>
                                    <p className="tw-m-0">Reliability</p>
                                </li>
                                <li>
                                    <p className="tw-m-0">Scalability</p>
                                </li>
                                <li>
                                    <p className="tw-m-0">
                                        Exceptional service to our customers
                                    </p>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default HomePage;
