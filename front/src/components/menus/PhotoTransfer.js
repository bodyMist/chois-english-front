import React, { useCallback, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from '../Modal';
import { Button, Form, Spin } from 'antd';
import { useTransferDispatch, useTransferState } from '../../TransferContext';
import { useMenuState } from '../../MenuContext';
// import 'antd/dist/antd.css';

// 렌더링 여러번 되는 문제 해결 필요함.
const UploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
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

const PhotoTransfer = () => {
  const image = useTransferState();
  const dispatch = useTransferDispatch();
  const [modalOepn, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const closeModalYes = useCallback(async () => {
    setModalOpen(false);
    const formData = new FormData();
    formData.append('file', image.image_file);
    // await axios
    //   .post('http://210.91.148.88:3000/image/saveImage', formData)
    //   .then((res) => {})
    //   .catch((error) => {
    //     throw new Error(error);
    //   });

    console.log('이미지를 저장합니다.');
    await localCaption();
  }, [image]);
  const closeModalNo = useCallback(async () => {
    setModalOpen(false);
    console.log('이미지를 저장하지 않습니다.');
    await localCaption();
  }, []);
  let inputRef;

  const saveImage = (e) => {
    console.log(image);
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
    dispatch({ type: 'DELETE' });
  };

  const localCaption = useCallback(async () => {
    console.log('문제 생성 완료');
    // await axios.post('http://210.91.148.88:3000/image/localCaption');
  });

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
        <Button type="ghost" onClick={openModal}>
          문제 생성
        </Button>
      </div>
      <Modal
        open={modalOepn}
        close={closeModal}
        closeYes={closeModalYes}
        closeNo={closeModalNo}
        header="알람"
      >
        이미지를 서버에 저장하시겠습니까?
      </Modal>
    </UploaderWrapper>
  );
};

export default React.memo(PhotoTransfer);
