import { MESSAGE_TYPE, Variant } from '../../helper/enum';

import React from 'react';
import { Button } from '../button';

interface ShowConfirmationProps {
    isOpen: boolean;
    message?: string;
    subMessage?: string;
    warningMessage?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ShowConfirmation: React.FC<ShowConfirmationProps> = ({
    isOpen,
    message = MESSAGE_TYPE.DELETE_CONFIRMATION,
    warningMessage =MESSAGE_TYPE.DELETE_WARNING,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null;

    return (
        <>
            <div
                className={`fixed inset-0 bg-gray-400/50 transition-opacity duration-300`}
            />
            <div className="fixed inset-0 flex items-center justify-center z-10">
                <div className="bg-white shadow-xl rounded-md p-6 w-96">
                    <div className="text-lg font-medium mb-2 text-center">{message}</div>
                    <div className="text-sm text-red-600 italic mb-4 text-center">
                        {warningMessage}
                    </div>

                    <div className="flex justify-around">
                        <Button type={'button'} variant={Variant.Bordered} onClick={onCancel}>
                            <p>Cancel</p>
                        </Button>
                        <Button type={'button'} className='hover:cursor-pointer' onClick={onConfirm}  > <p>Delete </p> </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowConfirmation;
