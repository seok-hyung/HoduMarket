import SellerNav from 'components/common/nav/SellerNav';
import TextEditor from 'components/common/textEditor/TextEditor';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const UploadProduct = () => {
  const [inputValue, setInputValue] = useState('');
  const maxLength = 20;

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  const handleBtnClick = (e: any) => {
    setActiveBtn(e.currentTarget.dataset.name);
  };

  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <SellerNav />
      <Wrapper>
        <main>
          <h1>상품 등록</h1>
          <section>
            <article className="precautionArticle">
              <h2>*상품 등록 주의사항</h2>
              <aside className="cautionsAside">
                <p>- 너무 귀여운 사진은 심장이 아파올 수 있습니다.</p>
                <p>
                  - 유소년에게서 천자만홍이 피고 이상이 온갖 들어 약동하다. 이상의 가지에
                  사랑의 있는가? 주며, 끓는 힘차게 얼음이 얼음 가치를 황금시대의
                  있음으로써 사라지지 것이다. 이 뜨거운지라, 이상의 속에서 이것은 피가
                  보배를 황금시대의 싹이 사막이다.{' '}
                </p>
                <p>
                  - 자신과 우는 옷을 지혜는 아니다. 더운지라 설레는 기쁘며, 위하여서,
                  평화스러운 광야에서 그리하였는가? 소담스러운 위하여 인도하겠다는 어디
                  무엇을 이상을 같지 따뜻한 청춘 칼이다.{' '}
                </p>
                <p>
                  - 가치를 그들을 예수는 찬미를 가슴이 과실이 이것이다. 희망의
                  것이다.보라, 풍부하게 이것은 황금시대를 얼마나 인간에 돋고, 이것이다.
                </p>
              </aside>
            </article>

            <div className="articleDiv">
              <article className="addArticle">
                <div className="imgDiv">
                  <span>상품 이미지</span>
                  <label className="imgLabel">
                    {previewImg ? (
                      <img
                        className="previewImg"
                        src={previewImg}
                        alt="상품 이미지 미리보기"
                      />
                    ) : (
                      <img
                        className="uploadImg"
                        src="/assets/icon-img.png"
                        alt="업로드 버튼 이미지"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif"
                      alt="업로드할 상품 이미지"
                      onChange={handleImgChange}
                    />
                  </label>
                </div>

                <div className="inputDiv">
                  <label className="productNameLabel">
                    <span>상품명</span>
                    <input
                      type="text"
                      className="productNameInput"
                      name="productName"
                      value={inputValue}
                      onChange={handleInputChange}
                      maxLength={maxLength}
                    />
                    <small>{`${inputValue.length}/${maxLength}`}</small>
                  </label>
                  <label>
                    <span>판매가</span>
                    <input type="text" name="price" />
                    <strong>원</strong>
                  </label>

                  <label>
                    <span>배송방법</span>
                    <div className="deliveryDiv">
                      <ShippingDiv
                        data-name="parcel"
                        onClick={handleBtnClick}
                        isActive={activeBtn === 'parcel'}
                      >
                        택배,소포,동기
                      </ShippingDiv>
                      <ShippingDiv
                        data-name="direct"
                        onClick={handleBtnClick}
                        isActive={activeBtn === 'direct'}
                      >
                        직접배송(화물배달)
                      </ShippingDiv>
                    </div>
                  </label>

                  <label>
                    <span>기본 배송비</span>
                    <input type="text" name="shippingFee" />
                    <strong>원</strong>
                  </label>
                  <label>
                    <span>재고</span>
                    <input type="text" name="stock" />
                    <strong>개</strong>
                  </label>
                </div>
              </article>
              <TextEditor />
            </div>
          </section>
        </main>
      </Wrapper>
    </>
  );
};

export default UploadProduct;

const Wrapper = styled.div`
  max-width: 90vw;
  margin: auto;
  h1 {
    margin: 44px 0;
    font-weight: bold;
    font-size: 48px;
    line-height: 44px;
  }
  section {
    display: flex;
    .precautionArticle {
      margin-right: 100px;
      h2 {
        color: #eb5757;
        font-size: 24px;
        line-height: 22px;
        margin-bottom: 15px;
      }
      .cautionsAside {
        background-color: #ffefe8;
        width: 480px;
        padding: 30px;
        p {
          font-size: 22px;
          line-height: 26px;
          margin-bottom: 30px;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
      }
    }
    .articleDiv {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 100px;
    }
    .addArticle {
      width: 100%;
      display: flex;
    }
    span {
      display: block;
      color: #767676;
      font-size: 24px;
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 20px;
    }
    .imgDiv {
      width: 45%;
      margin-right: 40px;
      .imgLabel {
        position: relative;
        background-color: #c4c4c4;
        width: 100%;
        height: calc(100% - 30px);
        border-radius: 10px;
        cursor: pointer;
        .previewImg {
          border-radius: 10px;
        }
        .uploadImg {
          width: 60px;
          height: 60px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      input[type='file'] {
        display: none;
      }
    }

    .inputDiv {
      width: 55%;
      position: relative;
      input {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border: 1px solid #c4c4c4;
        width: 200px;
        font-size: 20px;
        padding: 17px;
        outline: none;
      }

      .productNameInput {
        width: 100%;
        border-radius: 5px;
      }

      .deliveryDiv {
        display: flex;
        gap: 12px;
        text-align: center;
      }
      span {
        display: block;
        margin-bottom: 10px;
      }
      strong {
        color: #c4c4c4;
        font-size: 20px;
        line-height: 22px;
        background-color: #c4c4c4;
        padding: 17px 20px;
        color: white;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 1px solid #c4c4c4;
      }
      small {
        position: absolute;
        font-size: 20px;
        top: 54px;
        right: 20px;
        color: #c4c4c4;
      }
    }
  }
`;
const ShippingDiv = styled.div<{ isActive: boolean }>`
  width: 245px;
  font-size: 18px;
  padding: 17px;
  border-radius: 5px;
  border: 1px solid #c4c4c4;

  background-color: ${(props) => (props.isActive ? 'var(--main-color)' : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : 'initial')};
`;
