import React, { useEffect } from 'react';
import { useAppDispatch, useUI } from '../../hooks/redux';
import { hideToast } from '../../store/slices/uiSlice';
import { ToastContainer, ToastContent, CloseButton } from './toast.style';

const Toast = () => {
    const dispatch = useAppDispatch();
    const { toast } = useUI();

    // Auto-hide toast after 5 seconds
    useEffect(() => {
        if (toast.isVisible) {
            const timer = setTimeout(() => {
                dispatch(hideToast());
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [toast.isVisible, dispatch]);

    if (!toast.isVisible) return null;

    return (
        <ToastContainer type={toast.type}>
            <ToastContent>
                {toast.message}
            </ToastContent>
            <CloseButton onClick={() => dispatch(hideToast())}>
                ×
            </CloseButton>
        </ToastContainer>
    );
};

export default Toast; 