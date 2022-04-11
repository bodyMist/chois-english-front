import { Form } from 'antd';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { SubmitBtn, TextInput } from '../../Styles';

const RegistForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  background-color: #eeeff1;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  border: none;
`;

const FormBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  .message {
    font-weight: 500;
    font-size: 10px;
    line-height: 24px;
    letter-spacing: -1px;
    position: absolute;
    bottom: -15px;
    left: 0;
    &.success {
      color: #1bbc9b;
    }
    &.error {
      color: #ff2727;
    }
  }
  .submitBtn {
    &.success {
      background-color: #1bbc9b;
    }
    &.error {
      background-color: red;
    }
  }
`;

function Register() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setpasswordConfirmMessage] = useState('');

  const [isName, setIsName] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangeName = useCallback((e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsName(false);
    } else {
      setNameMessage('올바른 이름 형식입니다');
      setIsName(true);
    }
  }, []);
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);
    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('올바르지 않은 이메일 형식입니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식입니다.');
      setIsEmail(true);
    }
  }, []);
  const onChangePassword = useCallback((e) => {
    const passwrodRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwrodCurrent = e.target.value;
    setPassword(passwrodCurrent);
    if (!passwrodRegex.test(passwrodCurrent)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.');
      setIsPassword(true);
    }
  });
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);
      if (password === passwordConfirmCurrent) {
        setpasswordConfirmMessage('비밀번호가 일치합니다.');
        setIsPasswordConfirm(true);
      } else {
        setpasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );
  const onSubmitRegist = useCallback(async () => {});
  return (
    <RegistForm>
      <h2>회원가입</h2>
      <FormBox>
        <TextInput
          type="text"
          name="account"
          placeholder="아이디"
          onChange={onChangeId}
        />
      </FormBox>
      <FormBox>
        <TextInput
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
          style={{ border: `1px solid ${id.color}` }}
        />
        {password.length > 0 && (
          <span className={`message ${isPassword ? 'success' : 'error'}`}>
            {passwordMessage}
          </span>
        )}
      </FormBox>
      <FormBox>
        <TextInput
          type="password"
          name="password"
          placeholder="비밀번호 확인"
          onChange={onChangePasswordConfirm}
        />
        {passwordConfirm.length > 0 && (
          <span
            className={`message ${isPasswordConfirm ? 'success' : 'error'}`}
          >
            {passwordConfirmMessage}
          </span>
        )}
      </FormBox>
      <FormBox>
        <TextInput
          type="text"
          name="name"
          placeholder="이름"
          onChange={onChangeName}
        />
        {name.length > 0 && (
          <span className={`message ${isName ? 'success' : 'error'}`}>
            {nameMessage}
          </span>
        )}
      </FormBox>

      <FormBox>
        <TextInput
          type="email"
          name="email"
          placeholder="e-mail"
          onChange={onChangeEmail}
        />
        {email.length > 0 && (
          <span className={`message ${isEmail ? 'success' : 'error'}`}>
            {emailMessage}
          </span>
        )}
      </FormBox>
      <FormBox>
        <SubmitBtn
          type="submit"
          value="REGIST"
          disabled={!(isName && isEmail && isPassword && isPasswordConfirm)}
          className={`submitBtn ${
            !(isName && isEmail && isPassword && isPasswordConfirm)
              ? 'error'
              : 'success'
          }`}
          onClick={onSubmitRegist}
        />
      </FormBox>
    </RegistForm>
  );
}

export default React.memo(Register);
