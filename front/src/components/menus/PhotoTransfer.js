import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Spin } from 'antd';
import { useTransferDispatch, useTransferState } from '../../TransferContext';

// 렌더링 여러번 되는 문제 해결 필요함.
const UploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: auto;
  .img-wrapper {
    margin: 50px 2 20px 0;
    img {
      width: 500px;
      height: 500px;
      object-fit: contain;
    }
    .img-spinner {
      width: 500px;
      height: 500px;
    }
  }
  .upload-button {
    button {
      margin: 0 5px;
    }
  }
`;

const PhotoTransfer = (props) => {
  const image = useTransferState();
  const dispatch = useTransferDispatch();
  // console.log(image);
  // console.log(props);

  // const [image, setImage] = useState({
  //   image_file: '',
  //   preview_URL: 'img/default_image.png',
  // });

  // const [loaded, setLoaded] = useState(false);

  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files[0]) {
      fileReader.readAsDataURL(e.target.files[0]);
    }
    fileReader.onload = () => {
      // setImage({
      //   image_file: e.target.files[0],
      //   preview_URL: fileReader.result,
      // });
      const imf = e.target.files[0];
      const prv = fileReader.result;
      console.log(imf);
      console.log(prv); //base64 code
      dispatch({ type: 'SAVE', imf, prv });
    };
  };

  const deleteImage = () => {
    // setImage({
    //   image_file: '',
    //   preview_URL: 'img/default_image.png',
    // });
    dispatch({ type: 'DELETE' });
  };

  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData();
      formData.append('file', image.image_file);
      await axios.post('/api/image/upload', formData);
      alert('서버에 등록이 완료되었습니다');
      // setImage({
      //   image_file: '',
      //   preview_URL: 'img/default_image.png',
      // });
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
          <img src={image.preview_URL} />
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
