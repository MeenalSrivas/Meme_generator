import React, {useRef, useState, useEffect} from "react";
import Draggable from "react-draggable";

const Text = () =>{
    const nodeRef = useRef(null);
    const [editMode, setEditMode] = useState(false);
    const [val, setValue] = useState("Write your text here");
    const [fontSize, setFontSize] = useState(21); // px, initial font size
    const textareaRef = useRef(null);
    const lastFontSizeRef = useRef(fontSize);

    const handleEnableEdit = () => {
        setFontSize(lastFontSizeRef.current); // Restore last used font size
        setEditMode(true);
    };

    const handleDisableView = () => {
        lastFontSizeRef.current = fontSize; // Save the font size used during editing
        setEditMode(false);
    };

    // Dynamically adjust font size based on textarea size
    const handleResize = () => {
        if (textareaRef.current) {
            const width = textareaRef.current.offsetWidth;
            const height = textareaRef.current.offsetHeight;
            // Clamp font size between 12px and 32px
            let newFontSize = Math.max(12, Math.min(32, Math.min(width, height) / 2.5));
            setFontSize(newFontSize);
            lastFontSizeRef.current = newFontSize;
        }
    };

    // Attach resize observer to textarea
    useEffect(() => {
        if (!editMode || !textareaRef.current) return;
        handleResize(); // Initial
        const ro = new window.ResizeObserver(handleResize);
        ro.observe(textareaRef.current);
        return () => ro.disconnect();
    }, [editMode]);

    // Also update font size when text changes (in case wrapping changes the height)
    useEffect(() => {
        if (editMode && textareaRef.current) {
            handleResize();
        }
    }, [val, editMode]);

    return (
        <Draggable nodeRef={nodeRef}>
            {
                editMode ? (
                    <textarea
                        ref={el => {
                            textareaRef.current = el;
                            nodeRef.current = el;
                        }}
                        style={{
                            resize: 'both',
                            minWidth: '120px',
                            minHeight: '36px',
                            fontSize: `${fontSize}px`,
                            fontWeight: 700,
                            color: '#1e293b',
                            background: 'rgba(236, 253, 245, 0.85)',
                            border: '2px solid #6366f1',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            marginBottom: '8px',
                            marginTop: '8px',
                            boxShadow: '0 1px 4px rgba(56, 189, 248, 0.10)',
                            transition: 'border 0.2s, box-shadow 0.2s, font-size 0.15s',
                        }}
                        onBlur={handleDisableView}
                        value={val}
                        onChange={e => setValue(e.target.value)}
                        onDoubleClick={handleDisableView}
                        rows={2}
                    />
                ) : (
                    <h1 ref={nodeRef} onDoubleClick={handleEnableEdit}>{val}</h1>
                )
            }
        </Draggable>
    )
}

export default Text;