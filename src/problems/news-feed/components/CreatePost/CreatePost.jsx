import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import {
    CreatePostWrapper,
    CreatePostInput,
    CreatePostOptions,
    CreatePostOption,
    EditorWrapper,
    EditorToolbar,
    ToolbarButton,
    SubmitButton
} from "./createPost.style";

const CreatePost = ({ onSubmitPost, isLoading = false }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "What's on your mind?"
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'editor-image',
                },
            }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
        },
        editable: !isLoading && !isSubmitting,
    });

    const handleSubmit = async () => {
        if (!editor || isSubmitting || isLoading) return;

        const content = editor.getHTML();
        const textContent = editor.getText();

        if (!textContent.trim()) return;

        setIsSubmitting(true);

        try {
            // Create new post object
            const newPost = {
                userName: 'You', // Could be from user context
                content: content,
                hasImage: content.includes('<img'),
                imageUrl: null // Could extract from content if needed
            };

            // Call parent callback to add post
            if (onSubmitPost) {
                await onSubmitPost(newPost);
            }

            // Clear editor on success
            editor.commands.clearContent();
        } catch (error) {
            console.error('Error submitting post:', error);
            // Don't clear editor on error so user doesn't lose content
        } finally {
            setIsSubmitting(false);
        }
    };

    const addImage = () => {
        if (isLoading || isSubmitting) return;

        const url = prompt('Enter image URL:');
        if (url && editor) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const insertEmoji = () => {
        if (isLoading || isSubmitting) return;

        editor?.chain().focus().insertContent('😊').run();
    };

    if (!editor) {
        return null;
    }

    const isDisabled = isLoading || isSubmitting;

    return (
        <CreatePostWrapper className={isDisabled ? 'loading' : ''}>
            <CreatePostInput>
                <div className="profile-pic"></div>
                <EditorWrapper>
                    <EditorToolbar>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'active' : ''}
                            disabled={isDisabled}
                        >
                            <strong>B</strong>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('italic') ? 'active' : ''}
                            disabled={isDisabled}
                        >
                            <em>I</em>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'active' : ''}
                            disabled={isDisabled}
                        >
                            • List
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive('orderedList') ? 'active' : ''}
                            disabled={isDisabled}
                        >
                            1. List
                        </ToolbarButton>
                        <ToolbarButton onClick={addImage} disabled={isDisabled}>
                            🖼️ Image
                        </ToolbarButton>
                    </EditorToolbar>
                    <EditorContent editor={editor} />
                </EditorWrapper>
            </CreatePostInput>

            <CreatePostOptions>
                <CreatePostOption onClick={addImage} style={{ opacity: isDisabled ? 0.6 : 1 }}>
                    <span>📸</span>
                    <span>Photo/Video</span>
                </CreatePostOption>
                <CreatePostOption onClick={insertEmoji} style={{ opacity: isDisabled ? 0.6 : 1 }}>
                    <span>😊</span>
                    <span>Feeling/Activity</span>
                </CreatePostOption>
                <CreatePostOption style={{ opacity: isDisabled ? 0.6 : 1 }}>
                    <span>📍</span>
                    <span>Check In</span>
                </CreatePostOption>
                <SubmitButton onClick={handleSubmit} disabled={isDisabled}>
                    {isSubmitting || isLoading ? 'Posting...' : 'Post'}
                </SubmitButton>
            </CreatePostOptions>
        </CreatePostWrapper>
    );
};

export default CreatePost;