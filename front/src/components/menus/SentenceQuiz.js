import { Button } from 'antd';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useTransferState } from '../../TransferContext';
import { QuizContainer, TextInput } from '../Styles';
import PhotoTransfer from './PhotoTransfer';

const SolutionBox = styled.div`
  display: ${(props) => (props.isLoaded === true ? 'block' : 'none')};
  height: 50px;
  width: 500px;
  text-align: center;
  padding-top: 10px;
  font-size: 25px;
`;
// 기능 전체적으로 화면구상 해야함
// 막막함..
function SentenceQuiz() {
  const [answer, setAnswer] = useState({
    userInput: '',
    blank: '',
    answer: '',
  });
  const [similarity, setSimilaity] = useState({
    wordSimilarity: '',
    sentenceSimilarity: '',
  });
  const onChange = useCallback(
    (e) => {
      setAnswer({
        ...answer,
        [e.target.name]: e.target.value,
      });
    },
    [answer]
  );
  const submitAnswer = useCallback(async () => {
    await axios
      .post('http://210.91.148.88:3000/image/answer/sentence', {
        user_input: answer.userInput,
        answer: answer.answer,
        blank: answer.blank,
      })
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setSimilaity({
          ...similarity,
          wordSimilarity: data.word_similarity,
          sentenceSimilarity: data.sentence_similarity,
        });
      });
  }, [answer, similarity]);
  const sentence = useTransferState();
  console.log(sentence.caption);
  return (
    <QuizContainer>
      <PhotoTransfer />
      <SolutionBox isLoaded={sentence.loaded}>
        {/* <div>answer: {sentence.caption}</div>
        <div>
          your answer: <input style={{ border: 'none' }}></input>
        </div> */}
        <TextInput
          type="text"
          name="userInput"
          placeholder="userInput"
          autoComplete="off"
          onChange={onChange}
        ></TextInput>
        <TextInput
          type="text"
          name="answer"
          placeholder="answer"
          autoComplete="off"
          onChange={onChange}
        ></TextInput>
        <TextInput
          type="text"
          name="blank"
          placeholder="blank"
          autoComplete="off"
          onChange={onChange}
        ></TextInput>
        <Button
          type="primary"
          style={{ marginTop: '10px' }}
          onClick={submitAnswer}
        >
          정답제출
        </Button>
        <div>wordSimilarity: {similarity.wordSimilarity}</div>
        <div>sentenceSimilarity: {similarity.sentenceSimilarity}</div>
      </SolutionBox>
    </QuizContainer>
  );
}

export default React.memo(SentenceQuiz);
