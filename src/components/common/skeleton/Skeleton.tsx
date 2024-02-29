import React from 'react';
import styled, { keyframes } from 'styled-components';

type skCount = {
  count: number;
};

const Skeleton = ({ count }: skCount) => {
  return (
    <SkeletonWrapper>
      <ul className="productUl">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index}>
            <img className="productImg" />
            <div className="productInfo">
              <p className="skStoreName" />
              <h2 className="skProductName" />
              <p className="skPrice" />
            </div>
          </li>
        ))}
      </ul>
    </SkeletonWrapper>
  );
};

export default Skeleton;

// 스켈레톤 UI CSS에 애니메이션 효과를 주거나 이미지로 대체하는 경우가 있다
// 호두마켓의 경우 초기 렌더링 시간이 짧기 때문에 loading 애니메이션까지는 안해도 좋을 것 같다.
// css 애니메이션을 주면 성능이 떨어지기 때문이다.
// const loading = keyframes`
//   0% {background-position: -200% 0}
//   100% {background-position: 200% 0}
// `;
const SkeletonWrapper = styled.div`
  margin-top: 50px;
  width: 100%;

  .productUl {
    max-width: 1300px;
    display: flex;
    gap: 40px;
    justify-content: space-between;
    margin: auto;
    flex-wrap: wrap;
    border-radius: 10px;
    /* & > * {
      background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
      background-size: 200%;
      animation: loading 1.5s infinite;
    } */
    li {
      flex-basis: calc(33% - 42px);
      border-radius: 10px;
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

      .productImg {
        width: 100%;
        height: 300px;
        background-color: #eee;
        border-radius: 10px;
        border: none;
      }
      .productInfo {
        padding: 10px;
        .skStoreName {
          width: 40%;
          height: 20px;
          background-color: #eee;
          margin-bottom: 10px;
        }
        .skProductName {
          width: 60%;
          height: 20px;
          background-color: #eee;
          margin-bottom: 10px;
        }
        .skPrice {
          width: 40%;
          height: 20px;
          background-color: #eee;
        }
      }
    }
  }
`;
