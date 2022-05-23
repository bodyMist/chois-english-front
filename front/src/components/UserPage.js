import axios from 'axios';
import styled from 'styled-components';
import React, { useCallback, useEffect, useState } from 'react';
import { useUserDispatch, useUserState } from '../UserContext';

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
  const [images, setImages] = useState([]);

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
          setImages({ ...images, ...data });
        });
    }
  });

  const value = Object.values(images);
  return (
    <Wrapper>
      <h2>안녕하세요 {userState.name} 님</h2>
      <p>
        보유중인 사진
        <GridContainer>
          {value.length > 0 &&
            value.map((image) => {
              return <img src={image.url} key={image.id}></img>;
            })}
        </GridContainer>
      </p>
    </Wrapper>
  );
}

export default UserPage;
