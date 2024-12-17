import React, {ReactNode} from 'react';

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
    return (
        <>
            {/* Đặt các providers như Context API, Theme... ở đây */}
            {children}
        </>
    );
};
