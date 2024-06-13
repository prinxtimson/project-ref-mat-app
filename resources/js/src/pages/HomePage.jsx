import { useEffect, useRef } from "react";

import AppContainer from "../layouts/AppContainer";
import Carousel from "../components/Carousel";

const HomePage = () => {
    const toastRef = useRef(null);

    return (
        <AppContainer toast={toastRef}>
            <div className="">
                <Carousel />
            </div>
        </AppContainer>
    );
};

export default HomePage;
