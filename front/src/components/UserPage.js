import axios from 'axios';
import React, { useEffect } from 'react';
import { useUserDispatch, useUserState } from '../UserContext';

function UserPage() {
  const url = '210.91.148.88';
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  useEffect(async () => {
    if (userState.result === 0) {
      const data = JSON.parse(localStorage.getItem('userData'));
      userDispatch({ type: 'LOGIN', data });
    }
    await axios
      .get(`http://${url}:3000/member/mypage/${userState.id}`)
      .then((res) => {
        console.log(res.data.member);
        // const data = res.data
        // userDispatch({ type: 'LOGIN', data });
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [userState]);

  return (
    <div>
      <h2>안녕하세요{userState.name} 님</h2>
      <p>보유중인 사진은 </p>
    </div>
  );
}

export default UserPage;
