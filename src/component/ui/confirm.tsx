import React from 'react';

interface ConfirmModalProps {
    id: string;
    title: string;
    message: React.ReactNode;
    confirmText: string;
    cancelText: string;
    open: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    id,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    open = false,
    onConfirm,
    onCancel,
}) => {
    if (!open) return null;
    return (
        <div
            id={id}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto animate-in fade-in zoom-in duration-200">
                {/* Delete Header */}
                <div className="flex justify-between items-center px-6 py-3 rounded-t-lg bg-black text-white">
                    <h4 className="text-lg font-semibold m-0">{title}</h4>
                    <button
                        onClick={onCancel}
                        aria-label="Close"
                        className="text-white/80 hover:text-white text-xl leading-none cursor-pointer"
                    >
                        X
                    </button>
                </div>

                {/* Delete Details */}
                <div className="p-6 text-center font-bold">
                    <div className="flex font-semibold text-2xl items-center justify-center text-black mx-auto mb-3 ">
                        Delete
                    </div>
                    <p className="text-black">{message}</p>
                </div>

                {/* Cancel And Confirm Button */}
                <div className="flex justify-center gap-3 px-6 py-4 border-t border-gray-200 font-bold">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2 h-10 rounded-md border border-black bg-white text-black disabled:opacity-50 transition cursor-pointer"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="px-5 py-2 h-10 rounded-md bg-black text-white hover:bg-white hover:text-red-500 transition cursor-pointer flex items-center border-gray-300 border gap-2"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}