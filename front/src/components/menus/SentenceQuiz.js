import React from 'react';
import { QuizContainer } from '../Styles';
import PhotoTransfer from './PhotoTransfer';

// 기능 전체적으로 화면구상 해야함
// 막막함..
function SentenceQuiz() {
  return (
    <QuizContainer>
      <h2>문장 퀴즈</h2>
      <PhotoTransfer />
    </QuizContainer>
  );
}

export default SentenceQuiz;
