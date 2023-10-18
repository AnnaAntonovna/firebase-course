import { FC } from 'react';
import './App.css';
import { getApp } from 'firebase/app';
import { Main } from './components/main';
import { UserProvider } from './userProvider';

export const App: FC = () => {
    return (
        <UserProvider>
            <Main/>
        </UserProvider>
    );
}