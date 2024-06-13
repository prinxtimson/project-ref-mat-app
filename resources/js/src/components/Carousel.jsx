import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "primereact/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import "../../../css/carousel.css";

import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

const Carousel = () => {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    return (
        <div className="carousel">
            <Swiper
                className="myswiper"
                modules={[Pagination, EffectCoverflow, Autoplay]}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                pagination={{ clickable: true }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
            >
                <SwiperSlide
                    style={{ backgroundImage: "url(/images/slide_img_1.jpg)" }}
                    className="myswiper-slider"
                >
                    <div className="">
                        {user ? (
                            <div className="tw-grow tw-flex tw-flex-col tw-justify-evenly tw-items-end tw-px-6">
                                <Button
                                    label="Request Reference"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Click here to initiate a reference request"
                                    tooltipOptions={{ position: "left" }}
                                />
                                <Button
                                    label="Cancel Reference"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Click here to proceed with cancellation"
                                    tooltipOptions={{ position: "left" }}
                                />
                                <Button
                                    label="Track Reference"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Track the status of your reference requests here!"
                                    tooltipOptions={{ position: "left" }}
                                />
                                <Button
                                    label="Data Deletion Request"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Click here to submit a data deletion request and learn more about our data deletion policy"
                                    tooltipOptions={{ position: "left" }}
                                />
                                <Button
                                    label="Data Subject Access Request"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Click here to request access to your personal data stored on our platform"
                                    tooltipOptions={{ position: "left" }}
                                />
                            </div>
                        ) : (
                            <div className=" tw-grow tw-flex tw-flex-col tw-justify-end tw-items-center tw-p-5 sm:tw-p-10 tw-text-white">
                                {/* <h1 className="tw-text-xl sm:tw-text-3xl md:tw-text-5xl  tw-my-0">
                                Are you worried about getting a Job?
                            </h1>
                            <h3 className="tw-text-lg sm:tw-text-xl md:tw-text-2xl tw-my-2">
                                You do not need to worry.
                            </h3>
                            <h3 className="tw-text-lg sm:tw-text-xl md:tw-text-2xl tw-my-2">
                                Click the button to search for jobs
                            </h3> */}

                                <Button
                                    label="Login"
                                    className="tw-w-48 tw-my-5"
                                    onClick={() => navigate("/login")}
                                />
                            </div>
                        )}
                    </div>
                </SwiperSlide>
                <SwiperSlide
                    style={{ backgroundImage: "url(/images/slide_img_2.jpg)" }}
                    className="myswiper-slider"
                >
                    <div className="">
                        {user ? (
                            <div className="tw-grow tw-flex tw-flex-col tw-justify-evenly tw-items-end tw-px-6">
                                <Button
                                    label="Request Reference"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Click here to initiate a reference request"
                                    tooltipOptions={{ position: "left" }}
                                />
                                <Button
                                    label="Cancel Reference"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Click here to proceed with cancellation"
                                    tooltipOptions={{ position: "left" }}
                                />
                                <Button
                                    label="Track Reference"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Track the status of your reference requests here!"
                                    tooltipOptions={{ position: "left" }}
                                />
                                <Button
                                    label="Data Deletion Request"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Click here to submit a data deletion request and learn more about our data deletion policy"
                                    tooltipOptions={{ position: "left" }}
                                />
                                <Button
                                    label="Data Subject Access Request"
                                    className="tw-w-64"
                                    // onClick={() => navigate("/login")}
                                    tooltip="Click here to request access to your personal data stored on our platform"
                                    tooltipOptions={{ position: "left" }}
                                />
                            </div>
                        ) : (
                            <div className=" tw-grow tw-flex tw-flex-col tw-justify-end tw-items-center tw-p-5 sm:tw-p-10 tw-text-white">
                                {/* <h1 className="tw-text-xl sm:tw-text-3xl md:tw-text-5xl  tw-my-0">
                                Are you worried about getting a Job?
                            </h1>
                            <h3 className="tw-text-lg sm:tw-text-xl md:tw-text-2xl tw-my-2">
                                You do not need to worry.
                            </h3>
                            <h3 className="tw-text-lg sm:tw-text-xl md:tw-text-2xl tw-my-2">
                                Click the button to search for jobs
                            </h3> */}

                                <Button
                                    label="Login"
                                    className="tw-w-48 tw-my-5"
                                    onClick={() => navigate("/login")}
                                />
                            </div>
                        )}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Carousel;
