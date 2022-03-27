import React from 'react';
import styled from 'styled-components';
import { QuizContainer } from '../Styles';
import PhotoTransfer from './PhotoTransfer';

function VocaQuiz() {
  return (
    <QuizContainer>
      <h2>단어 퀴즈</h2>
      <PhotoTransfer />
    </QuizContainer>
  );
}

export default VocaQuiz;
