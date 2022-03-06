import React from 'react';
import styled from 'styled-components';
import {
  Animator,
  batch,
  Fade,
  FadeIn,
  Move,
  MoveIn,
  MoveOut,
  ScrollContainer,
  ScrollPage,
  Sticky,
  StickyIn,
  Zoom,
  ZoomIn,
} from 'react-scroll-motion';

const ExpBlock = styled.div`
  /* margin-top: 10px;
  text-align: center;
  overflow: auto;
  h1 {
    margin: 0;
    font-size: 24px;
    color: #343a40;
  } */
  display: flex;
  overflow: auto;
  height: 512px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const Section3 = styled.div`
  background-color: #8f22d8;
  color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());

const FadeUp = batch(Fade(), Sticky(), Move());

function MainBoard() {
  return (
    <ScrollContainer>
      <ScrollPage page={0}>
        <Animator animation={batch(Fade(), MoveOut(0, 0))}>
          <h2>Let me show you scroll animation</h2>
        </Animator>
      </ScrollPage>

      <ScrollPage page={1}>
        <Animator animation={ZoomInScrollOut}>
          <h2>I'm, FadeUpScrollOut</h2>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
  );
}

export default MainBoard;
