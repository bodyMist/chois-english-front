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
  font-size: 1.2rem;
  color: red;
  width: ${(props) => props.width * 14 + 'px'};
  margin-right: 0.4rem;
  margin-left: 0.4rem;
  height: 1.4rem;
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
const HintContainer = styled.div`
  width: ${(props) => props.width * 14 + 'px'};
  height: 25px;
  margin: auto;
  position: relative;
  text-align: center;
  cursor: pointer;
  perspective: 100rem;
  .front {
    width: ${(props) => props.width * 14 + 'px'};
    position: absolute;
    background: white;
    transform: rotateY(0deg);
  }
  .back {
    width: ${(props) => props.width * 14 + 'px'};
    background: #1890ff;
    color: white;
    transform: rotateY(-180deg);
  }
  &:hover .front {
    transform: rotateY(180deg);
  }
  &:hover .back {
    transform: rotateY(0deg);
  }
`;
const Hint = styled.div`
  width: 200px;
  height: 25px;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-perspective: 0;
  -webkit-transition: 1s;
  backface-visibility: hidden;
  visibility: visible;
  transition: 1s;
`;
const Word = styled.span`
  font-size: 1.2rem;
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
  const [loading, setLoading] = useState([]);
  const [hint, setHint] = useState('');
  const menuState = useMenuState();

  const enterLoading = (index) => {
    setLoading((prevLoading) => {
      let newLoading = [...prevLoading];
      newLoading[index] = true;
      return newLoading;
    });
  };
  const endLoading = (index) => {
    setLoading((prevLoading) => {
      let newLoading = [prevLoading];
      newLoading[index] = false;
      return newLoading;
    });
  };
  useEffect(() => {
    menuState.map((menu) => {
      if (menu.focused == true) setType(menu.type);
    });
    const hintparse = type === 'word' ? image.blank : image.caption;
    setHint(hintparse);
    dispatch({ type: 'HINTSET', hint });
  }, [menuState, type, hint]);

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
    // localStorage.removeItem('imageId');
    if (imageId != null) {
      await serverCaption(imageId);
    } else {
      await localCaption();
    }
  }, [image]);
  const closeModalNo = useCallback(async () => {
    setModalOpen(false);
    const imageId = localStorage.getItem('imageId');
    // localStorage.removeItem('imageId');
    if (imageId != null) {
      await serverCaption(imageId);
    } else {
      await localCaption();
    }
  }, [image]);
  let inputRef;
  const notLogin = useCallback(async () => {
    const imageId = localStorage.getItem('imageId');
    if (imageId != null) {
      await serverCaption(imageId);
    } else {
      await localCaption();
    }
  });
  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
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
    enterLoading(1);
    const formData = new FormData();
    formData.append('file', image.image_file);
    await axios
      .post(`http://${url}:3000/image/localCaption`, formData)
      .then((res) => {
        const blank = res.data.blank;
        const caption = res.data.caption;
        const hint = type === 'word' ? blank : caption;
        dispatch({ type: 'RESULTSET', blank, caption, hint });
      });
    endLoading(1);
  });

  const serverCaption = useCallback(async (imgaeId) => {
    enterLoading(1);
    await axios
      .post(`http://${url}:3000/image/serverCaption`, {
        id: imgaeId,
      })
      .then((res) => {
        const blank = res.data.blank;
        const caption = res.data.caption;
        const hint = type === 'word' ? blank : caption;
        dispatch({ type: 'RESULTSET', blank, caption, hint });
      });
    endLoading(1);
  });
  const randomQuiz = useCallback(async () => {
    enterLoading(2);
    await axios.get(`http://${url}:3000/image/random`).then((res) => {
      console.log(res);
      const data = res.data;
      const blank = data.blank;
      const caption = data.caption;
      const imf = data.image.imageName;
      const prv = data.image.url;
      const hint = type === 'word' ? blank : caption;
      dispatch({ type: 'SAVE', imf, prv });
      dispatch({ type: 'RESULTSET', blank, caption, hint });
    });
    endLoading(2);
  });
  const submitAnswer = async () => {
    const blank = type === 'sentence' ? image.caption : image.blank;
    await axios
      .post(`http://${url}:3000/image/answer/${type}`, {
        user_input: answer,
        answer: image.caption,
        blank: blank,
      })
      .then((res) => {
        const word_similarity = res.data.word_similarity;
        const sentence_similarity = res.data.sentence_similarity;
        dispatch({ type: 'SCORESET', word_similarity, sentence_similarity });
      });
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
        <Button
          type="ghost"
          onClick={user.result ? openModal : notLogin}
          loading={loading[1]}
        >
          문제 생성
        </Button>
        <Button type="ghost" onClick={randomQuiz} loading={loading[2]}>
          랜덤 문제 생성
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
        <Button
          type="ghost"
          onClick={submitAnswer}
          style={{ marginTop: '10px' }}
        >
          정답 제출
        </Button>
        <div
          style={{
            marginTop: '10px',
            display: `${type === 'sentence' ? 'block' : 'none'}`,
          }}
        >
          {image.sentence_similarity >= 0 &&
          image.sentence_similarity < 0.32 ? (
            <p>'?' 를 클릭하고 정답을 입력해주세요!</p>
          ) : image.sentence_similarity > 0.32 &&
            image.sentence_similarity < 0.62 ? (
            <p>틀렸어요</p>
          ) : image.sentence_similarity > 0.62 &&
            image.sentence_similarity < 0.71 ? (
            <p>아쉬워요!</p>
          ) : image.sentence_similarity > 0.71 &&
            image.sentence_similarity < 0.9 ? (
            <p>단어를 조금만 바꿔볼까요?</p>
          ) : image.sentence_similarity > 0.9 &&
            image.sentence_similarity < 0.96 ? (
            <p>거의 다 왔어요!</p>
          ) : (
            <p>정답이에요!</p>
          )}
        </div>
        <div
          style={{
            marginTop: '10px',
            display: `${type === 'word' ? 'block' : 'none'}`,
          }}
        >
          {image.word_similarity >= 0 &&
          image.word_similarity < 0.32 &&
          image.sentence_similarity >= 0 &&
          image.sentence_similarity < 0.32 ? (
            <p>'?' 를 클릭하고 정답을 입력해주세요!</p>
          ) : image.word_similarity > 0.32 &&
            image.word_similarity < 0.62 &&
            image.sentence_similarity > 0.32 &&
            image.sentence_similarity < 0.62 ? (
            <p>틀렸어요</p>
          ) : image.word_similarity > 0.32 &&
            image.word_similarity < 0.62 &&
            image.sentence_similarity > 0.62 &&
            image.sentence_similarity < 0.71 ? (
            <p>단어를 조금만 바꿔볼까요?</p>
          ) : image.word_similarity > 0.62 &&
            image.word_similarity < 0.71 &&
            image.sentence_similarity > 0.32 &&
            image.sentence_similarity < 0.62 ? (
            <p>문장과는 어울리지 않는 단어에요</p>
          ) : image.word_similarity > 0.62 &&
            image.word_similarity < 0.71 &&
            image.sentence_similarity > 0.62 &&
            image.sentence_similarity < 0.71 ? (
            <p>아쉬워요</p>
          ) : image.word_similarity > 0.71 &&
            image.word_similarity < 0.9 &&
            image.sentence_similarity > 0.32 &&
            image.sentence_similarity < 0.62 ? (
            <p>문장과는 어울리지 않는 단어에요</p>
          ) : image.word_similarity > 0.71 &&
            image.word_similarity < 0.9 &&
            image.sentence_similarity > 0.62 &&
            image.sentence_similarity < 0.71 ? (
            <p>단어롤 조금만 바꿔볼까요?</p>
          ) : (
            <p>정답이에요!</p>
          )}
        </div>
        <HintContainer width={image.hint.length}>
          <Hint className="front">
            <p>Hint</p>
          </Hint>
          <Hint className="back">
            <p>{image.hint}</p>
          </Hint>
        </HintContainer>
      </AnswerBox>
    </UploaderWrapper>
  );
};

export default React.memo(PhotoTransfer);
