import { FC } from 'react';
import { useUserContext } from '../../userProvider';
import { Logout } from '../auth/logout';
import { TaskList } from './taskList';
import { TaskCreator } from './taskCreator';

export const User: FC = () => {
    const [user] = useUserContext();
    
    return (
        <div className='contentFlexVertical'>
            {user?.displayName}
            <TaskList/>
            <TaskCreator />
            <Logout/>
        </div>
    )
}