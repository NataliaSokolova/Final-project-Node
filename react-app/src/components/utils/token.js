export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const setToken = (token) => {
    return localStorage.setItem("token", token);
  };
  
// const handleLogin = async (event, email, password, navigate, setInputEnabled) => {
//     event.preventDefault();
//     setInputEnabled(false);
  
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
  
//       // Сохранение токена в localStorage
//       if (token) {
//         localStorage.setItem("token", token);
  
//         // Перенаправление пользователя
//         navigate("/exercise");
//       } else {
//         console.error("Токен отсутствует в ответе");
//       }
//     } catch (error) {
//       console.error("Ошибка при логине:", error);
//     } finally {
//       setInputEnabled(true);
//     }
//   };
  
//   export default handleLogin;
  