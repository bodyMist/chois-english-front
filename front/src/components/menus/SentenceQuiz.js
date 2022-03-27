import React from 'react';
import { QuizContainer } from '../Styles';
import PhotoTransfer from './PhotoTransfer';

function SentenceQuiz() {
  return (
    <QuizContainer>
      <h2>문장 퀴즈</h2>
      <PhotoTransfer />
    </QuizContainer>
  );
}

export default SentenceQuiz;
