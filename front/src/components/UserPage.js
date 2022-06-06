import axios from 'axios';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useUserDispatch, useUserState } from '../UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTransferDispatch } from '../TransferContext';
import { Button } from 'antd';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 700px;
  margin: auto;
`;
const GridContainer = styled.div`
  width: 700px;
  display: grid;
  justify-items: center;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  img {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }
`;
const ButtonBox = styled.div`
  position: absolute;
  top: 5.6rem;
  left: 1.2rem;
  color: #1890ff;
`;
function Image({ image, deleteImage }) {
  const url = '210.91.148.88';
  let imageRef;
  const imageDispatch = useTransferDispatch();
  const ToQuiz = (imageUrl, imageId) => {
    localStorage.setItem('imageId', imageId);
    const imf = 'serverCaption';
    const prv = imageUrl;
    imageDispatch({ type: 'SAVE', imf, prv });
    imageRef.click();
  };

  const [hide, setHide] = useState(true);
  return (
    <>
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => {
          setHide(false);
        }}
        onMouseLeave={() => {
          setHide(true);
        }}
      >
        <img src={image.url} key={image._id}></img>
        <ButtonBox style={{ display: `${hide ? 'none' : 'block'}` }}>
          <Button
            style={{ marginRight: '10px' }}
            onClick={() => ToQuiz(image.url, image._id)}
          >
            문제풀기
          </Button>
          <Button onClick={() => deleteImage(image._id)} type="primary" danger>
            삭제
          </Button>
        </ButtonBox>
      </div>
      <Link
        to={`/quiz`}
        style={{ display: 'none' }}
        ref={(refParam) => (imageRef = refParam)}
      ></Link>
    </>
  );
}

function UserPage() {
  const url = '210.91.148.88';
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const [images, setImages] = useState([]);
  useEffect(async () => {
    if (typeof window !== 'undefined' && userState.result === 0) {
      const data = JSON.parse(localStorage.getItem('userData'));
      userDispatch({ type: 'LOGIN', data });
    }
    await getImage();
  }, [userState, userDispatch]);

  const getImage = useCallback(async () => {
    if (userState.result !== 0) {
      const queryParams = userState.images
        .map((image) => 'id=' + image)
        .join('&');
      await axios
        .get(`http://${url}:3000/image/getMemberImages?${queryParams}`)
        .then((res) => {
          const data = res.data.images;
          setImages({ ...images, ...data });
        });
    }
  }, [userState]);
  const deleteImage = useCallback(
    async (imageId) => {
      await axios
        .delete(
          `http://${url}:3000/image/deleteImage?memberId=${userState.id}&imageId=${imageId}`
        )
        .then((res) => {
          window.location.replace('/userPage');
        });
    },
    [userState]
  );
  const value = Object.values(images);
  return (
    <Wrapper>
      <h2>안녕하세요 {userState.name} 님</h2>
      <p>
        보유중인 사진
        <GridContainer>
          {value.length > 0 ? (
            value.map((image) => {
              return <Image image={image} deleteImage={deleteImage}></Image>;
            })
          ) : (
            <p style={{ marginTop: '30px' }}>보유중인 사진이 없습니다.</p>
          )}
        </GridContainer>
      </p>
    </Wrapper>
  );
}

export default UserPage;
