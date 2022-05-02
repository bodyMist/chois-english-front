import React, { useEffect } from 'react';
import { useUserDispatch, useUserState } from '../UserContext';

function UserPage() {
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  useEffect(() => {
    if (userState.result === 0) {
      const data = JSON.parse(localStorage.getItem('userData'));
      userDispatch({ type: 'LOGIN', data });
    }
  }, []);

  return (
    <div>
      <h2>안녕하세요{userState.name} 님</h2>
      <p>보유중인 사진은 </p>
    </div>
  );
}

export default UserPage;
