import { VARIANT } from '../../helper/enum';
import Button from '../button';
import React from 'react';

interface ConfirmationDialogProps {
    isOpen: boolean;
    message?: string;
    subMessage?: string;
    warningMessage?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    isOpen,
    message = 'Are you sure you want to delete?',
    warningMessage = 'This action will permanently delete the item and cannot be recovered.',
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <>
            <div
                className={`fixed inset-0 bg-gray-400/50 transition-opacity duration-300`}
            />
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white shadow-xl rounded-md p-6 w-96">
                    <div className="text-lg font-medium mb-2 text-center">{message}</div>
                    <div className="text-sm text-red-600 italic mb-4 text-center">
                        {warningMessage}
                    </div>

                    <div className="flex justify-around">
                        <Button variant={VARIANT.OUTLINED} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button onClick={onConfirm}>Delete</Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationDialog;
