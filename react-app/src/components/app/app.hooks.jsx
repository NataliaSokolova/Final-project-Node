import { useState, useEffect, useCallback } from 'react';
import { getToken} from '../utils/token';





const useLoggedInStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  
        const checkLoggedIn = useCallback(async () => {

            const token = getToken(); 
            if (!token) {
                setIsLoggedIn(false); 
                return;
            }

            try {
                const response = await fetch('/api/v1/auth/check-token', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${getToken()}`,
                        'Content-Type': 'application/json' 
                    }
                });
                setIsLoggedIn(response.status === 200);
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        },[]);
        
        useEffect(() => {
            checkLoggedIn();
        }, [checkLoggedIn]);

    return {isLoggedIn, checkLoggedIn};
};





  

export default useLoggedInStatus;
