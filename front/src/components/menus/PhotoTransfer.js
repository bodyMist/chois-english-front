import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../Modal';
import { Button, Form, Spin } from 'antd';
import { useTransferDispatch, useTransferState } from '../../TransferContext';
import { useMenuState } from '../../MenuContext';
import { useUserDispatch, useUserState } from '../../UserContext';
import { TextInput } from '../Styles';
import MenuList from '../Nav/MenuList';
// import 'antd/dist/antd.css';

// 렌더링 여러번 되는 문제 해결 필요함.
const UploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
  margin: auto;
  .img-wrapper {
    margin: 50px 2 20px 0;
    img {
      width: 400px;
      height: 400px;
      object-fit: contain;
    }
    .img-spinner {
      margin-top: 200px;
      width: 400px;
      height: 200px;
    }
  }
  .upload-button {
    margin-top: 10px;
    button {
      margin: 0 5px;
    }
  }
`;
const AnswerBox = styled.div`
  margin-top: 0.3rem;
  display: ${(props) => (props.captioned ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  .word {
    display: ${(props) => (props.type === 'word' ? 'block' : 'none')};
  }
  .sentence {
    display: ${(props) => (props.type === 'sentence' ? 'block' : 'none')};
  }
`;
const Blank = styled.input`
  width: ${(props) => props.width * 10 + 'px'};
  margin-right: 0.4rem;
  margin-left: 0.4rem;
  height: 1rem;
  border: none;
  text-align: center;
  &:focus {
    outline: none;
    border-color: #9ecaed;
    box-shadow: 0 0 5px #9ecaed;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
const Word = styled.span`
  margin-right: 0.2rem;
  margin-left: 0.2rem;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin-left: auto;
`;
const url = '210.91.148.88';
//210.91.148.88
const PhotoTransfer = () => {
  const image = useTransferState();
  const dispatch = useTransferDispatch();
  const user = useUserState();
  const userDispatch = useUserDispatch();
  const [modalOepn, setModalOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const menuState = useMenuState();

  const enterLoading = () => {
    setLoading((prevLoading) => {
      let newLoading = prevLoading;
      newLoading = true;
      return newLoading;
    });
  };
  const endLoading = () => {
    setLoading((prevLoading) => {
      let newLoading = prevLoading;
      newLoading = false;
      return newLoading;
    });
  };
  useEffect(() => {
    menuState.map((menu) => {
      if (menu.focused == true) setType(menu.type);
    });
  }, [menuState, type]);

  const setUserAnswer = (e) => {
    setAnswer(e.target.value);
  };
  const openModal = () => {
    if (image.image_file === '') {
      alert('이미지를 업로드 해주세요!');
    } else setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const closeModalYes = useCallback(async () => {
    setModalOpen(false);
    enterLoading();
    const formData = new FormData();
    formData.append('file', image.image_file);
    formData.append('memberId', user.id);
    await axios
      .post(`http://${url}:3000/image/saveImage`, formData)
      .then((res) => {
        const data = res.data;
        localStorage.setItem('userData', JSON.stringify(data));
        userDispatch({ type: 'LOGIN', data });
      })
      .catch((error) => {
        throw new Error(error);
      });

    const imageId = localStorage.getItem('imageId');
    console.log(imageId);
    // localStorage.removeItem('imageId');
    if (imageId != null) {
      await serverCaption(imageId);
    } else {
      await localCaption();
    }
  }, [image]);
  const closeModalNo = useCallback(async () => {
    setModalOpen(false);
    enterLoading();
    const imageId = localStorage.getItem('imageId');
    // localStorage.removeItem('imageId');
    if (imageId != null) {
      console.log('서버캡션');
      await serverCaption(imageId);
    } else {
      console.log('로컬캡션');
      await localCaption();
    }
    console.log('이미지를 저장하지 않습니다.');
  }, [image]);
  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      dispatch({ type: 'LOADING' });
      fileReader.readAsDataURL(e.target.files[0]);
    }

    fileReader.onload = () => {
      const imf = e.target.files[0];
      const prv = fileReader.result;
      dispatch({ type: 'SAVE', imf, prv });
      e.target.value = '';
    };
  };

  const deleteImage = () => {
    localStorage.removeItem('imageId');
    dispatch({ type: 'DELETE' });
  };

  const localCaption = useCallback(async () => {
    const formData = new FormData();
    formData.append('file', image.image_file);
    console.log(image.image_file);
    await axios
      .post(`http://${url}:3000/image/localCaption`, formData)
      .then((res) => {
        console.log(res);
        const blank = res.data.blank;
        const caption = res.data.caption;
        dispatch({ type: 'RESULTSET', blank, caption });
      });
    endLoading();
    console.log('문제 생성 완료');
  });

  const serverCaption = useCallback(async (imgaeId) => {
    await axios
      .post(`http://${url}:3000/image/serverCaption`, {
        id: imgaeId,
      })
      .then((res) => {
        console.log(res);
        const blank = res.data.blank;
        const caption = res.data.caption;
        dispatch({ type: 'RESULTSET', blank, caption });
      });
    endLoading();
  });
  const submitAnswer = async () => {
    await axios
      .post(`http://${url}:3000/image/answer/${type}`, {
        user_input: answer,
        answer: image.caption,
        blank: image.blank,
      })
      .then((res) => {
        console.log(res);
      });
  };
  const test = () => {
    console.log(image.image_file);
  };
  return (
    <UploaderWrapper>
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: 'none' }}
      />
      <div className="img-wrapper">
        {image.loaded === false || image.loaded === true ? (
          <img src={image.preview_URL} alt="" />
        ) : (
          <Spin className="img-spinner" tip="이미지 불러오는중" />
        )}
      </div>

      <div className="upload-button">
        <Button type="primary" onClick={() => inputRef.click()}>
          이미지 선택
        </Button>
        <Button type="primary" onClick={deleteImage} danger>
          이미지 삭제
        </Button>
        <Button type="ghost" onClick={openModal} loading={loading}>
          문제 생성
        </Button>
      </div>
      <Modal open={modalOepn} close={closeModal} header="알람">
        <p>이미지를 서버에 저장하시겠습니까?</p>
        <ButtonBox>
          <button style={{ marginRight: '10px' }} onClick={closeModalYes}>
            예
          </button>
          <button onClick={closeModalNo}>아니오</button>
        </ButtonBox>
      </Modal>
      <MenuList></MenuList>
      <AnswerBox captioned={image.captioned} type={type}>
        <div className="word">
          {image.caption
            .split(' ')
            .map((str, index) =>
              str == image.blank ? (
                <Blank
                  key={str + index}
                  width={str.length}
                  placeholder="?"
                  onChange={setUserAnswer}
                ></Blank>
              ) : (
                <Word>{str}</Word>
              )
            )}
        </div>
        <div className="sentence">
          <Blank
            width={image.caption.length}
            placeholder="?"
            onChange={setUserAnswer}
          ></Blank>
        </div>
        <Button type="ghost" onClick={submitAnswer}>
          정답 제출
        </Button>
      </AnswerBox>
    </UploaderWrapper>
  );
};

export default React.memo(PhotoTransfer);
