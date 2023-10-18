import { FC } from 'react';
import { useUserContext } from '../../userProvider';
import { Logout } from '../auth/logout';

export const User: FC = () => {
    const [user] = useUserContext();
    
    return (
        <div className='contentFlexVertical'>
            {user?.displayName}
            <Logout/>
        </div>
    )
}