import { useState} from 'react';
import { getToken } from '../utils/token';

const useLoggedInStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  
        const checkLoggedIn = async () => {
            try {
                const isLoggedIn = await fetch('/api/v1/auth/check-token', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/json' 
                    }
                });
                setIsLoggedIn(isLoggedIn.status === 200);
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        };


    return {isLoggedIn, checkLoggedIn};
};

export default useLoggedInStatus;
