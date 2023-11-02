import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <Page404Wrapper>
      <img src="/assets/icon-404.svg" alt="페이지404 이미지" />
      <div className="rightDiv">
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
          <br />웹 주소가 올바른지 확인해주세요
        </p>
        <div className="btnDiv">
          <button className="main-btn" onClick={() => navigate('/')}>
            메인으로
          </button>
          <button className="prev-btn" onClick={() => navigate(-1)}>
            이전페이지
          </button>
        </div>
      </div>
    </Page404Wrapper>
  );
};

export default Page404;

const Page404Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1500px;
  display: flex;
  gap: 60px;
  img {
    flex-basis: 40%;
  }

  .rightDiv {
    flex-basis: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 80px;

    h2 {
      font-size: 5rem;
    }
    p {
      font-size: 2rem;
    }
    .btnDiv {
      display: flex;
      gap: 20px;

      button {
        padding: 25px 35px;
        font-size: 28px;
        border-radius: 5px;
      }
      .main-btn {
        background-color: var(--main-color);
        color: white;
        width: 50%;
      }
      .prev-btn {
        border: 1px solid var(--sub-text-color);
        width: 50%;
      }
    }
  }
`;
