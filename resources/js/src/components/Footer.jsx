import TritekFullLogo from "./TritekFullLogo";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="tw-p-2 md:tw-p-5 tw-bg-yellow-400 tw-text-indigo-700 tw-flex tw-flex-col tw-items-center tw-justify-center">
            <div className=" tw-max-w-[1024px] tw-w-full tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-5">
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <div className="tw-p-3 tw-bg-white tw-w-fit">
                        <TritekFullLogo />
                    </div>
                    <div className="">
                        <p className="tw-my-0">
                            An award winning mentoring company focusing on the
                            core soft skills and experience needed in helping
                            you achieve your dream job.
                        </p>
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-2">
                    <div className="">
                        <h4 className="tw-my-0">EXPLORE TRITEK</h4>
                    </div>
                    <div className="">
                        <nav>
                            <ul className="tw-list-none tw-pl-2">
                                {EXPLORETRITEK.map((item) => (
                                    <li key={item.id}>
                                        <Link to={item.url}>{item.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-4">
                    <div className="">
                        <h4 className="tw-my-0">GET IN TOUCH</h4>
                    </div>
                    <div className="tw-flex tw-gap-3">
                        <Link
                            to="https://www.instagram.com/tritekconsultingltd/"
                            target="blank"
                        >
                            <i
                                className="pi pi-instagram"
                                style={{ fontSize: "2rem" }}
                            ></i>
                        </Link>
                        <Link
                            to="https://twitter.com/Tritek_Consult"
                            target="blank"
                        >
                            <i
                                className="pi pi-twitter"
                                style={{ fontSize: "2rem" }}
                            ></i>
                        </Link>
                        <Link
                            to="https://web.facebook.com/tritekconsultingltd?_rdc=1&_rdr"
                            target="blank"
                        >
                            <i
                                className="pi pi-facebook"
                                style={{ fontSize: "2rem" }}
                            ></i>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="tw-mt-4 tw-self-center">
                <small className="tw-text-center tw-text-stone-500 tw-w-fit">
                    Copyright &copy;{new Date().getFullYear()}{" "}
                    <a href="https://tritekconsulting.co.uk">
                        Tritek Consulting Limited
                    </a>
                </small>
            </div>
        </div>
    );
};

export default Footer;

const EXPLORETRITEK = [
    {
        id: "1",
        label: "About Us",
        url: "https://lmstritek.co.uk/about-us/",
    },
    {
        id: "2",
        label: "Success Stories",
        url: "https://lmstritek.co.uk/success-stories/",
    },
    {
        id: "3",
        label: "Contact Us",
        url: "https://lmstritek.co.uk/contact-us/",
    },
    {
        id: "4",
        label: "Privacy Policy",
        url: "https://lmstritek.co.uk/privacy-policy/",
    },
    {
        id: "5",
        label: "Terms & Condititon",
        url: "https://lmstritek.co.uk/terms-and-conditions/",
    },
];

const QUICKLINKS = [
    {
        id: "1",
        label: "Browse Jobs",
        url: "/jobs",
    },
    {
        id: "2",
        label: "CV management",
        url: "/cv-management",
    },
    {
        id: "3",
        label: "Company Review",
        url: "/reviews",
    },
    {
        id: "4",
        label: "Help",
        url: "/help",
    },
    {
        id: "5",
        label: "Interview Mentoring",
        url: "/interview-mentoring",
    },
    // {
    //     id: "6",
    //     label: "Career Support",
    //     url: "",
    // },
];
