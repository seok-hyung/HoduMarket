import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <Page404Wrapper>
      <img src="/assets/icon-404.svg" alt="페이지404 이미지" />
      <div className="r-div">
        <h2>페이지를 찾을 수 없습니다.</h2>
        <p>
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
          <br />웹 주소가 올바른지 확인해주세요
        </p>
        <div className="btn-div">
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
  width: 800px;
  display: flex;
  img {
    width: 276px;
  }

  .r-div {
    margin-left: 50px;
    h2 {
      font-size: 40px;
      line-height: 44px;
      font-weight: 700;
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 40px;
      font-size: 20px;
      line-height: 25px;
    }
    .btn-div {
      display: flex;
      gap: 20px;
      button {
        font-size: 18px;
        width: 200px;
        height: 60px;
        border-radius: 5px;
      }
      .main-btn {
        background-color: var(--main-color);
        color: white;
      }
      .prev-btn {
        border: 1px solid var(--sub-text-color);
      }
    }
  }
`;
