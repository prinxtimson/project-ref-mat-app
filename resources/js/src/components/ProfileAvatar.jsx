export default function ProfileAvatar({
    source,
    handleOnClick = () => {},
    isEdit = false,
}) {
    return (
        <div
            className={`tw-relative tw-w-fit ${
                isEdit && "tw-cursor-pointer hover:tw-opacity-80"
            }`}
        >
            <img
                src={source || "/images/no_img.png"}
                className={`tw-rounded-lg tw-w-52 tw-h-52 `}
                onClick={handleOnClick}
            />
        </div>
    );
}
