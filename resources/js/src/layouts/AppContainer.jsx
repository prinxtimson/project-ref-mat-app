import { Toast } from "primereact/toast";

import Footer from "../components/Footer";
import Header from "../components/Header";

const AppContainer = ({ children, toast }) => {
    return (
        <div className="tw-min-h-screen tw-w-full tw-flex tw-flex-col tw-grow">
            <Header />
            <Toast ref={toast} />
            <div className="tw-grow tw-flex tw-flex-col">{children}</div>
            <Footer />
        </div>
    );
};

export default AppContainer;
