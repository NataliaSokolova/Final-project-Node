import { useState} from 'react';
import { getToken} from '../utils/token';





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




// const useLoggedInStatus = async (event) => {
//     // event.preventDefault();
  
//     // Ensure `email` and `password` are captured from form inputs
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
  
//     try {
//       const response = await fetch("/api/v1/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       if (!response.ok) {
//         throw new Error("Ошибка авторизации");
//       }
  
//       const data = await response.json();
//       const token = data.token;
  
//       // Store the token in localStorage
//       setToken(token);
  
//       console.log("Токен сохранен:", token);
  
//       // Redirect to the exercise page or another location
//       window.location.href = "/exercise";
//     } catch (error) {
//       console.error("Ошибка при логине:", error);
//     }
//   };
  

export default useLoggedInStatus;
