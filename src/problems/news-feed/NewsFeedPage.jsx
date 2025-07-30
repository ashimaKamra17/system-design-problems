import React from 'react';
import NotebookLayout from '../../components/NotebookLayout/NotebookLayout';
import NewsFeed from './NewsFeed';
import NewsFeedNotes from './NewsFeedNotes';

function NewsFeedPage() {
    return (
        <NotebookLayout
            problemTitle="News Feed System"
            notesContent={<NewsFeedNotes />}
        >
            <NewsFeed />
        </NotebookLayout>
    );
}

export default NewsFeedPage; 