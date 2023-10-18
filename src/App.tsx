import { FC } from 'react';
import './App.css';
import { getApp } from 'firebase/app';
import { Main } from './components/main';

export const App: FC = () => {
    return (<div>
        <Main></Main>
    </div>);
}