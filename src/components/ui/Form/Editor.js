import React from 'react';
import {EditorState, ContentState} from 'draft-js';
import {convertToHTML} from 'draft-convert';
import htmlToDraft from 'html-to-draftjs';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import options from './editor.options';

export default class ControlledEditor extends React.Component {
    constructor(props) {
        super(props);

        const blocksFromHtml = htmlToDraft(this.props.value);
        const {contentBlocks, entityMap} = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

        this.state = {
            editorState: EditorState.createWithContent(contentState)
        };
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState
        });
        if (this.props.onChange) this.props.onChange(
            convertToHTML(editorState.getCurrentContent())
        );
    }

    render() {
        const {editorState} = this.state;

        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange.bind(this)}
                toolbar={options}
            />
        );
    }
}


// Import React from 'react';
// import ReactDOM from 'react-dom';
// import {Editor, EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';

// export default class WYSIWYGEditor extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {editorState: EditorState.createEmpty()};
//         this.onChange = editorState => {
//             console.log(editorState);
//             this.setState({editorState});
//         }
//     }
//     render() {
//         return (
//             <Editor editorState={this.state.editorState} onChange={this.onChange} />
//         );
//     }
// }
