/* eslint-disable react-hooks/set-state-in-effect */
    import { useEffect, useRef, useState } from 'react';
    import './Popup.css';

    export default function Popup({
    show,
    onClose,
    onSubmit,
    title = 'Enter a value',
    placeholder = 'Type something...',
    initialValue = '',
    }) {
    const [value, setValue] = useState(initialValue);
    const inputRef = useRef(null);

    // Reset the input and focus it whenever the popup opens
    useEffect(() => {
        if (show) {
        setValue(initialValue);
        const id = requestAnimationFrame(() => inputRef.current?.focus());
        return () => cancelAnimationFrame(id);
        }
    }, [show, initialValue]);

    // Close on Escape
    useEffect(() => {
        if (!show) return;
        const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [show, onClose]);

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(value);
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose?.();
    };

    return (
        <div className="popup-backdrop" onMouseDown={handleBackdropClick}>
        <div
            className="popup-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
        >
            <div className="popup-header">
            <h2 id="popup-title" className="popup-title">
                {title}
            </h2>
            <button
                type="button"
                onClick={onClose}
                className="popup-close-btn"
                aria-label="Close"
            >
                ×
            </button>
            </div>

            <form onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="popup-input"
            />

            <div className="popup-actions">
                <button type="button" onClick={onClose} className="popup-cancel-btn">
                Cancel
                </button>
                <button type="submit" className="popup-submit-btn">
                Add
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    }