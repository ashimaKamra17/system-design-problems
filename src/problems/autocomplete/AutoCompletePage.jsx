import React from 'react';
import NotebookLayout from '../../components/NotebookLayout/NotebookLayout';
import AutoComplete from './AutoComplete';
import AutoCompleteNotes from './AutoCompleteNotes';

function AutoCompletePage() {
    return (
        <NotebookLayout
            problemTitle="AutoComplete System"
            notesContent={<AutoCompleteNotes />}
        >
            <AutoComplete />
        </NotebookLayout>
    );
}

export default AutoCompletePage; 