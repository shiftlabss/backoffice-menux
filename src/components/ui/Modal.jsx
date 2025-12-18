import React, { useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Modal({ isOpen, onClose, title, children, className }) {
    const modalRef = useRef(null);
    const previousActiveElement = useRef(null);

    // Handle ESC key press
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    // Focus management and event listeners
    useEffect(() => {
        if (isOpen) {
            // Store the currently focused element
            previousActiveElement.current = document.activeElement;

            // Add event listener for ESC key
            document.addEventListener('keydown', handleKeyDown);

            // Focus the modal
            if (modalRef.current) {
                modalRef.current.focus();
            }

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';

            // Restore focus to previous element
            if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
                previousActiveElement.current.focus();
            }
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    // Handle overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={handleOverlayClick}
            role="presentation"
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                tabIndex={-1}
                className={cn(
                    "bg-card rounded-t-2xl sm:rounded-xl shadow-modal w-full max-w-2xl overflow-hidden animate-slideUp max-h-[85vh] sm:max-h-[85vh] flex flex-col outline-none",
                    className
                )}
            >
                <div className="flex items-center justify-between p-6 border-b border-border">
                    <h3 id="modal-title" className="text-xl font-bold text-text-primary tracking-tight">
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="h-9 w-9 rounded-full bg-background flex items-center justify-center text-text-secondary hover:bg-border hover:text-text-primary transition-all duration-200 hover:rotate-90"
                        aria-label="Fechar modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}
