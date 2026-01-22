import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TestPage = () => {
  const [authResult, setAuthResult] = useState("인증 확인 중...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        
        const token = localStorage.getItem("accessToken"); 
        
        console.log("저장된 토큰:", token ? "있음" : "없음");
        if (!token) {
          setAuthResult("토큰이 없습니다. 로그인이 필요합니다.");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          return;
        }
    
    
        const response = await axios.get( 
          `${process.env.REACT_APP_HOST_URL}/test`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        

        console.log("서버 응답:", response.data);

   
        if (response.data === 1) {
          setAuthResult("인증 성공!");
          

          const userInfo = localStorage.getItem("userInfo");
          if (userInfo) {
            const user = JSON.parse(userInfo);
            setAuthResult(`인증 성공! 환영합니다, ${user.name}님! 이메일: ${user.email}`);
          }
        } else {
          setAuthResult("인증 실패 (서버에서 0 반환)");
          console.log("인증 실패 - 토큰 삭제 및 로그인 페이지로 이동");
          

      localStorage.removeItem("accessToken");
 localStorage.removeItem("userInfo");
  localStorage.removeItem("memberId");
          /*실패시 코드 세개 삭제!*/
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
   
        setAuthResult("인증 실패 (에러 발생)");
        console.error("Error during authentication:", error);
        

        
      localStorage.removeItem("accessToken");
 localStorage.removeItem("userInfo");
  localStorage.removeItem("memberId");
                
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    };

    fetchAuthStatus();
  }, [navigate]);
  return (
    <div style={{ padding: "2rem" }}>
      <h2>JWT 인증 테스트</h2>
      <p style={{ whiteSpace: "pre-line", fontSize: "18px" }}>
        결과: {authResult}
      </p>
      
      {authResult.includes("실패") && (
        <p style={{ color: "#666", fontSize: "14px", marginTop: "1rem" }}>
          2초 후 로그인 페이지로 이동합니다...
        </p>
      )}
    </div>
  );
};

export default TestPage;