import { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";
import { useSpeechRecognition } from "react-speech-kit";

const SearchForm = ({
    handleOnSubmit,
    data,
    handleOnChange,
    advanceSearch,
    toggleAdvanceSearch,
    myClass = "tw-text-white",
}) => {
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (query) => {
            handleOnChange({
                target: {
                    name: "query",
                    value: query,
                },
            });
        },
    });

    const salaryTypeItems = [
        { name: "All", value: "" },
        { name: "Annual", value: "annual" },
        { name: "Daily", value: "daily" },
        { name: "Hourly", value: "hourly" },
    ];
    const jobTypeItems = [
        { name: "All", value: "" },
        { name: "Permanent", value: "permanent" },
        { name: "Contract", value: "contract" },
        { name: "Part Time", value: "part time" },
    ];

    useEffect(() => {
        if (listening) {
            const listenTimeout = setTimeout(() => {
                stop();
                clearTimeout(listenTimeout);
            }, 5000);
        }
    }, [listening]);

    return (
        <form className="tw-w-full" onSubmit={handleOnSubmit}>
            <div className="tw-grid tw-grid-cols-1 tw-gap-6">
                <div className="tw-grid tw-grid-cols-1 md:tw-flex tw-items-center tw-gap-2 ">
                    <div className="tw-grow">
                        <span className="p-input-icon-right p-input-icon-left tw-w-full">
                            <i className="pi pi-search" />
                            <i
                                className={`pi pi-microphone tw-cursor-pointer ${
                                    listening ? "tw-text-red-800" : ""
                                }`}
                                onClick={listen}
                            />
                            <InputText
                                name="query"
                                value={data.query}
                                className="tw-w-full tw-border"
                                placeholder="What"
                                onChange={handleOnChange}
                                style={{ borderColor: "#6366f1" }}
                            />
                        </span>
                    </div>
                    <div className="tw-grow">
                        <span className="p-input-icon-left tw-w-full">
                            <i className="pi pi-map-marker" />
                            <InputText
                                name="location"
                                value={data.location}
                                className="tw-w-full tw-border"
                                placeholder="Where"
                                onChange={handleOnChange}
                                style={{ borderColor: "#6366f1" }}
                            />
                        </span>
                    </div>
                    {!advanceSearch && (
                        <div className="tw-w-full md:tw-w-[15rem]">
                            <Button
                                className="tw-w-full"
                                label="Find Job"
                                type="submit"
                            />
                        </div>
                    )}
                </div>

                {advanceSearch && (
                    <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-5 tw-gap-4">
                        <div className="lg:tw-col-span-2 tw-mx-auto md:tw-mx-0">
                            <h3
                                className={
                                    "tw-mt-0 tw-mb-1 tw-text-center md:tw-text-justify " +
                                    myClass
                                }
                            >
                                Salary Type
                            </h3>
                            <SelectButton
                                value={data.salaryType}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        salaryType: e.value,
                                    })
                                }
                                optionLabel="name"
                                options={salaryTypeItems}
                            />
                        </div>

                        <div className="tw-mx-auto md:tw-mx-0">
                            <h3
                                className={
                                    "tw-mt-0 tw-mb-1 tw-text-center md:tw-text-justify " +
                                    myClass
                                }
                            >
                                Salary Range
                            </h3>
                            <div className="tw-flex tw-gap-2">
                                <InputNumber
                                    name="minSalary"
                                    value={data.minSalary}
                                    placeholder="Min Salary"
                                    onValueChange={handleOnChange}
                                />
                                <InputNumber
                                    name="maxSalary"
                                    value={data.maxSalary}
                                    placeholder="Max Salary"
                                    onValueChange={handleOnChange}
                                />
                            </div>
                        </div>

                        <div className="lg:tw-col-span-2 tw-mx-auto md:tw-mx-0 lg:tw-justify-self-end">
                            <h3
                                className={
                                    "tw-mt-0 tw-mb-1 tw-text-center md:tw-text-justify " +
                                    myClass
                                }
                            >
                                Job Type
                            </h3>
                            <SelectButton
                                value={data.jobType}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        jobType: e.value,
                                    })
                                }
                                optionLabel="name"
                                options={jobTypeItems}
                                className=""
                            />
                        </div>
                    </div>
                )}

                <div className="tw-flex tw-justify-between">
                    <Button
                        label={
                            advanceSearch
                                ? "Fewer Search Option"
                                : "Advance Search"
                        }
                        icon={
                            advanceSearch
                                ? "pi pi-chevron-circle-up"
                                : "pi pi-chevron-circle-down"
                        }
                        onClick={toggleAdvanceSearch}
                        type="button"
                    />
                    {advanceSearch && (
                        <Button
                            className="tw-w-[15rem]"
                            label="Find Job"
                            type="submit"
                        />
                    )}
                </div>
            </div>
        </form>
    );
};

export default SearchForm;
