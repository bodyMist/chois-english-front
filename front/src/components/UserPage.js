import axios from 'axios';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useUserDispatch, useUserState } from '../UserContext';
import { Link } from 'react-router-dom';
import { useTransferDispatch } from '../TransferContext';

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
function UserPage() {
  const url = '210.91.148.88';
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const imageDispatch = useTransferDispatch();
  const [images, setImages] = useState([]);
  let imageRef;
  useEffect(async () => {
    console.log(userState.result);
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
          console.log(data);
          setImages({ ...images, ...data });
        });
    }
  });
  const value = Object.values(images);
  const ToQuiz = (imageUrl, imageId) => {
    localStorage.setItem('imageId', imageId);
    const imf = 'serverCaption';
    const prv = imageUrl;
    imageDispatch({ type: 'SAVE', imf, prv });
    imageRef.click();
  };
  return (
    <Wrapper>
      <h2>안녕하세요 {userState.name} 님</h2>
      <p>
        보유중인 사진
        <GridContainer>
          {value.length > 0 ? (
            value.map((image, index) => {
              return (
                <>
                  <img
                    src={image.url}
                    key={index}
                    onClick={() => ToQuiz(image.url, image._id)}
                  ></img>
                  <Link
                    to={`/quiz`}
                    style={{ display: 'none' }}
                    ref={(refParam) => (imageRef = refParam)}
                  ></Link>
                </>
              );
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
