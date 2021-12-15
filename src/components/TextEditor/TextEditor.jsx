import { useRef, useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './TextEditor.css';
import { Form } from '../../react-bootstrap';

export default function TextEditor() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const selectHeaderRef = useRef();

    function toggleBold() {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    }

    function toggleItalic() {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
    }

    function toggleUnderline() {
        setEditorState(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
    }

    function toggleHeader() {
        setEditorState(
            RichUtils.toggleBlockType(
                editorState,
                selectHeaderRef.current.value
            )
        );
    }

    function toggleUnorderedList() {
        setEditorState(
            RichUtils.toggleBlockType(editorState, 'unordered-list-item')
        );
    }
    function toggleOrderedList() {
        setEditorState(
            RichUtils.toggleBlockType(editorState, 'ordered-list-item')
        );
    }

    return (
        <>
            <div className='text-editor-container'>
                <div className='controls'>
                    <button onClick={toggleBold}>Bold</button>
                    <button onClick={toggleItalic}>Italic</button>
                    <button onMouseDown={toggleUnderline}>Underline</button>
                    <button onClick={toggleUnorderedList}>UL</button>
                    <button onClick={toggleOrderedList}>OL</button>

                    <Form.Select
                        ref={selectHeaderRef}
                        onChange={toggleHeader}
                        className='select-header'
                    >
                        <option value='header-one'>H1</option>
                        <option value='header-two'>H2</option>
                        <option value='header-three'>H3</option>
                        <option value='header-four'>H4</option>
                        <option value='header-five'>H5</option>
                        <option value='header-six'>H6</option>
                    </Form.Select>
                </div>
                <Editor editorState={editorState} onChange={setEditorState} />
            </div>
        </>
    );
}
