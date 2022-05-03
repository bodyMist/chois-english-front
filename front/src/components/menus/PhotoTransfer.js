import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Spin } from 'antd';
import { useTransferDispatch, useTransferState } from '../../TransferContext';
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

  console.log(image);
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

  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData();
      formData.append('file', image.image_file);
      console.log(formData.get('file'));
      await axios
        .post('http://210.91.148.88:3000/image/saveImage', formData)
        .then((res) => {
          // const data = res.data;
          // const blank = data.blank;
          // const caption = data.caption;
          // dispatch({ type: 'SENDTOSERVER', blank, caption });
          console.log(res);
        })
        .catch((error) => {
          throw new Error(error);
        });

      alert('서버에 등록이 완료되었습니다');
    } else {
      alert('사진을 등록하세요!');
    }
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
        <Button type="ghost" onClick={sendImageToServer}>
          이미지 업로드
        </Button>
      </div>
    </UploaderWrapper>
  );
};

export default React.memo(PhotoTransfer);
