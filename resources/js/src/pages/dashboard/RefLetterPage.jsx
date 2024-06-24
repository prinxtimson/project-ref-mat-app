import { useRef } from "react";
import AppContainer from "../../layouts/AppContainer";
//import ref_letter from "../../utils/reference_letter_template.html";

const RefLetterPage = () => {
    const toastRef = useRef();
    return (
        <AppContainer toast={toastRef}>
            {/* <div dangerouslySetInnerHTML={{ __html: ref_letter }}></div> */}
            {/* <iframe src={ref_letter}></iframe> */}
        </AppContainer>
    );
};

export default RefLetterPage;
