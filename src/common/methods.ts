export const getAuthHeader = () => {
    const token: string | null = localStorage.getItem("tokenData");
    // const user = JSON.parse(localStorage.getItem("user"));
    const user = token ? JSON.parse(token) : null;
    if (user!=null) {
        // console.log("token header",user)
        return {
            Authorization: `Bearer ${user}`,
            'Content-Type': 'application/json',
        };
    } else {
        return {
            'Content-Type': 'application/json',
        };
    }
  };
