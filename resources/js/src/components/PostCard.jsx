import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip } from "primereact/tooltip";
import { Avatar } from "primereact/avatar";
import moment from "moment";
import { Button } from "primereact/button";
import { createPost, favoritePost, reset } from "../features/post/postSlice";
import { InputText } from "primereact/inputtext";

const PostCard = ({ post }) => {
    const menuRef = useRef(null);
    const [showReply, setShowReply] = useState(false);
    const [data, setData] = useState({
        body: "",
    });

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { isSuccess } = useSelector((state) => state.post);

    useEffect(() => {
        setData({
            body: "",
        });
        setShowReply(false);
        dispatch(reset());
    }, [isSuccess]);

    const menuItems = [
        {
            label: "Edit",
            //command: () => handlePostSelected(post),
        },
        // {
        //     label: posts.find((val) => val.id == post.id) ? "Remove" : "Save",
        //     // command: () =>
        //     //     posts.find((val) => val.id == post.id)
        //     //         ? handleRemoveMyPost(post)
        //     //         : handleSaveMyPost(post),
        // },
    ];

    const handleAddComment = (e) => {
        dispatch(createPost({ ...data, parent_id: post.id }));
    };

    return (
        <div className="tw-bg-white tw-p-4 tw-w-full tw-mb-2">
            <div className="tw-flex tw-gap-2 ">
                <div className="">
                    <Avatar
                        size="large"
                        shape="circle"
                        imageAlt={post.user?.name}
                        image={post.user?.avatar}
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-gap-2 tw-w-full">
                    <div className="tw-flex tw-flex-col tw-gap-1">
                        <div className="tw-flex tw-gap-2">
                            <div className=" tw-flex tw-items-center tw-gap-3">
                                <h5 className="tw-my-0">{post.user?.name}</h5>
                                <small className="tw-my-0 tw-text-gray-500">
                                    {moment(post.created_at).fromNow()}
                                </small>
                            </div>
                            {/* {isEditor && (
                            <div className="">
                                <Button
                                    text
                                    icon="pi pi-ellipsis-v"
                                    size="small"
                                    onClick={(e) => menuRef.current.toggle(e)}
                                />
                                <Menu popup ref={menuRef} model={menuItems} />
                            </div>
                        )} */}
                        </div>

                        <div className="">
                            <p className="tw-my-0">{post.body}</p>
                        </div>
                        <div className="tw-flex tw-items-center tw-justify-between">
                            <div className="tw-flex tw-gap-4 tw-items-center">
                                <Tooltip target=".like-icon" />
                                <i
                                    className={`tw-text-purple-500 tw-cursor-pointer tw-p-2 tw-text-md tw-rounded like-icon
                                        ${
                                            post.likes
                                                .map((val) => val.user_id)
                                                .includes(user.id)
                                                ? "pi pi-thumbs-up-fill"
                                                : "pi pi-thumbs-up"
                                        }`}
                                    onClick={() =>
                                        dispatch(favoritePost(post.id))
                                    }
                                    data-pr-tooltip="like message"
                                />
                                <small className="tw-text-gray-600">
                                    {post.likes.length}
                                </small>
                            </div>
                            <Tooltip target=".reply-icon" />
                            <i
                                className="pi pi-reply tw-text-purple-500 tw-cursor-pointer tw-p-0 reply-icon"
                                onClick={() => setShowReply(true)}
                                data-pr-tooltip="reply message"
                            />
                        </div>
                    </div>
                    <div className="">
                        {post.replies.map((item) => (
                            <div
                                className="tw-flex tw-gap-2 tw-mb-2"
                                key={item.id}
                            >
                                <Avatar
                                    size="small"
                                    shape="circle"
                                    imageAlt={item.user?.name}
                                    image={item.user?.avatar}
                                />
                                <div className="tw-flex tw-flex-col">
                                    <div className="tw-flex tw-gap-3">
                                        <p className="tw-font-semibold tw-my-0 tw-text-xs">
                                            {item.user?.name}
                                        </p>
                                        <small className="tw-my-0 tw-text-gray-500">
                                            {moment(post.created_at).fromNow()}
                                        </small>
                                    </div>

                                    <div className="tw-text-gray-500 tw-text-sm">
                                        {item.body}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showReply && (
                        <div className=" tw-flex tw-gap-2">
                            <InputText
                                value={data.body}
                                onChange={(e) =>
                                    setData({ ...data, body: e.target.value })
                                }
                                name="body"
                                placeholder="Add a comment"
                                className="tw-w-full"
                            />
                            <Button
                                label="Send"
                                text
                                size="small"
                                onClick={handleAddComment}
                            />
                            <Button
                                label="Cancel"
                                severity="warning"
                                text
                                size="small"
                                onClick={() => setShowReply(false)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostCard;
