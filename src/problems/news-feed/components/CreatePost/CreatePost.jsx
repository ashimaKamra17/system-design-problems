import { CreatePostWrapper, CreatePostInput, CreatePostInputText, CreatePostOptions, CreatePostOption } from "./createPost.style";

const CreatePost = () => {
    return (
        <CreatePostWrapper>
            <CreatePostInput>
                <div className="profile-pic"></div>
                <CreatePostInputText placeholder="What's on your mind?" rows="1"></CreatePostInputText>
            </CreatePostInput>
            <CreatePostOptions>
                <CreatePostOption>
                    <span>📸</span>
                    <span>Photo/Video</span>
                </CreatePostOption>
                <CreatePostOption>
                    <span>😊</span>
                    <span>Feeling/Activity</span>
                </CreatePostOption>
                <CreatePostOption>
                    <span>📍</span>
                    <span>Check In</span>
                </CreatePostOption>
            </CreatePostOptions>
        </CreatePostWrapper>
    );
};

export default CreatePost;