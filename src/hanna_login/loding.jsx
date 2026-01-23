import React, { useEffect } from "react";
import sendAccessTokenToBackend from "./access";//엑세스 폴더로 경로 변경
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/*
사용자의 authorization code를 받는 페이지

OAuth 2.0 플로우:
1. 구글 로그인 성공 → 구글이 authorization code를 URL에 담아 리다이렉트
2. URLSearchParams로 URL에서 authorization code 추출
3. axios로 authorization code를 백엔드에 전송
4. 백엔드가 구글에 code를 검증하고 access token 발급
5. 백엔드에서 받은 access token을 localStorage에 저장
6. 성공 시 → 테스트 페이지로 이동
7. 실패 시 → 로그인 페이지로 이동
*/
const LoginLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-top: 100px;
`;

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // URL에서 authorization code 추출
        const parsedQuery = new URLSearchParams(window.location.search);
        const code = parsedQuery.get("code");

        console.log("Authorization code:", code);

        // code가 없으면 에러 처리
        if (!code) {
          console.error("Authorization code가 URL에 없습니다.");
          // alert("로그인에 실패했습니다. 다시 시도해주세요.");
          navigate("/");
          return;
        }

        // 백엔드로 authorization code 전송
        await sendAccessTokenToBackend(code);
        
        // 성공 시 테스트 페이지로 이동
        navigate("/");
        
      } catch (error) {
        console.error("로그인 과정에서 에러가 발생했습니다.", error);
        
        // alert("로그인에 실패했습니다. 다시 시도해주세요.");
        navigate("/");
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <LoginLoading>로그인 중입니다...</LoginLoading>
    </div>
  );
};

export default Loading;

