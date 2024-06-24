import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

import AppContainer from "../../layouts/AppContainer";
import {
    getPosts,
    clear,
    createPost,
    reset,
} from "../../features/post/postSlice";
import PostCard from "../../components/PostCard";

const CommentsPage = () => {
    const toastRef = useRef(null);
    const [data, setData] = useState({
        body: "",
    });

    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { posts, isLoading, isSuccess, isError, type, message } = useSelector(
        (state) => state.post
    );

    useEffect(() => {
        dispatch(getPosts());

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

        if (isSuccess && message) {
            setData({
                body: "",
            });
            toastRef.current.show({
                severity: "success",
                summary: "Success",
                detail: message,
                life: 5000,
            });
        }

        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleOnSend = () => {
        dispatch(createPost(data));
    };

    return (
        <AppContainer toast={toastRef}>
            <div className="tw-grow tw-bg-white tw-p-3 tw-flex tw-flex-col tw-items-center">
                <div
                    className="tw-w-full md:tw-w-[40rem] tw-shadow-md tw-rounded"
                    style={{ backgroundColor: "#e1e9f4" }}
                >
                    <div className="tw-h-[50vh] tw-overflow-auto">
                        <div className="tw-p-3">
                            {posts.map((post) => (
                                <PostCard
                                    post={post}
                                    key={post.id}
                                    user={user}
                                    isEditor={post.user_id == user.id}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="tw-shadow tw-flex tw-gap-4 tw-p-2">
                        <div className="tw-grow">
                            <InputTextarea
                                value={data.body}
                                onChange={handleOnChange}
                                name="body"
                                placeholder="Enter your text here...."
                                className="tw-w-full"
                            />
                        </div>
                        <div className="">
                            <Button
                                label="Send"
                                severity="success"
                                //icon="pi pi-send"
                                onClick={handleOnSend}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    );
};

export default CommentsPage;
