import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import AppContainer from "../../layouts/AppContainer";
import moment from "moment";
import {
    getMyReferences,
    reset,
    clear,
} from "../../features/reference/refSlice";

const ReferenceTrackingPage = () => {
    const toastRef = useRef(null);

    const dispatch = useDispatch();

    const { refs, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.ref
    );

    useEffect(() => {
        dispatch(getMyReferences());

        return () => dispatch(clear());
    }, []);

    useEffect(() => {
        if (isError && message) {
            toastRef.current.show({
                severity: "error",
                summary: "Error",
                detail: message,
                life: 5000,
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const statusBodyTemplate = (rowData) => (
        <div className="">
            {rowData.status == 0
                ? "under review by Admin"
                : rowData.status == 1
                ? "In Progress"
                : rowData.status == 2
                ? "Request Completed"
                : rowData.status == 3
                ? "Request Declined"
                : "Delayed as a result of technical gliches"}
        </div>
    );

    const dateBodyTemplate = (rowData) => (
        <div className="">{moment(rowData.created_at).format("ll")}</div>
    );

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-p-3 md:tw-p-6 tw-bg-white">
                <div className="tw-text-center tw-mb-6">
                    <h1 className="tw-my-0">Track Reference</h1>
                </div>

                <div className="tw-rounded-lg tw-shadow-md">
                    <DataTable
                        value={refs}
                        paginator
                        rows={25}
                        totalRecords={refs.length}
                        breakpoint="0px"
                        tableStyle={{ minWidth: "50rem" }}
                        dataKey="id"
                        stripedRows
                        loading={isLoading}
                        // header={header}
                    >
                        <Column field="id" header="ID"></Column>
                        <Column field="name" header="Candidate Name"></Column>
                        <Column
                            field="status"
                            header="Status"
                            body={statusBodyTemplate}
                        ></Column>
                        <Column
                            field="created_at"
                            header="Date Requested"
                            body={dateBodyTemplate}
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </AppContainer>
    );
};

export default ReferenceTrackingPage;
