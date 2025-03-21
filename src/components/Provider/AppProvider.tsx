"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const queryclient = new QueryClient()
const AppProvider = ({children}:{children : ReactNode}) => {
    return (
        <div>
            <QueryClientProvider client={queryclient}>
                {children}
            </QueryClientProvider>
        </div>
    );
};

export default AppProvider;