import axios from "axios";

const sendAccessTokenToBackend = async (code) => {
  try {
    
    const response = await axios.post(
      `${process.env.REACT_APP_HOST_URL}/auth/google`, 
      {code}
    );

    console.log("Login successful with server response:", response);

    if (response.data.token) {
      localStorage.setItem("accessToken", response.data.token);
      console.log("토큰 저장 완료!");
    }

    if (response.data.userrId) {
       localStorage.setItem("userId", response.data.userId);
      console.log("userId 저장 완료!");
    }

    if (response.data.user) {
       localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      console.log("사용자 정보 저장 완료!");
    }

    return response.data;
    
    
  } catch (error) {
    console.error("Login failed with error:", error);
    throw error;
  }
};

export default sendAccessTokenToBackend;
