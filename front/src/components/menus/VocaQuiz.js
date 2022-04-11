import React from 'react';
import styled from 'styled-components';
import { useTransferState } from '../../TransferContext';
import { QuizContainer } from '../Styles';
import PhotoTransfer from './PhotoTransfer';
const SolutionBox = styled.div`
  display: ${(props) => (props.isLoaded ? 'block' : 'none')};
`;
function VocaQuiz() {
  const sentence = useTransferState();
  return (
    <QuizContainer>
      <PhotoTransfer />
      <SolutionBox isLoaded={sentence.loaded}>{sentence.sentence}</SolutionBox>
    </QuizContainer>
  );
}

export default React.memo(VocaQuiz);
