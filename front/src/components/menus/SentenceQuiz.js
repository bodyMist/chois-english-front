import React from 'react';
import styled from 'styled-components';
import { useTransferDispatch, useTransferState } from '../../TransferContext';
import { QuizContainer } from '../Styles';
import PhotoTransfer from './PhotoTransfer';

const SolutionBox = styled.div`
  display: ${(props) => (props.isLoaded ? 'block' : 'none')};
`;
// 기능 전체적으로 화면구상 해야함
// 막막함..
function SentenceQuiz() {
  const sentence = useTransferState();
  const dispatch = useTransferDispatch();
  console.log(sentence.sentence);
  return (
    <QuizContainer>
      <PhotoTransfer />
      <SolutionBox isLoaded={sentence.loaded}>{sentence.sentence}</SolutionBox>
    </QuizContainer>
  );
}

export default React.memo(SentenceQuiz);
