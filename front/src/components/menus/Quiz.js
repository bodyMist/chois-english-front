import React from 'react';
import styled from 'styled-components';

import axios from 'axios';
import PhotoTransfer from './PhotoTransfer';
import MenuList from '../Nav/MenuList';
import { useMenuState } from '../../MenuContext';
import { useTransferState } from '../../TransferContext';

const Quiz = () => {
  const quizType = useMenuState();
  const isLoaded = useTransferState();
  return (
    <div>
      <MenuList></MenuList>
      <PhotoTransfer></PhotoTransfer>
    </div>
  );
};

export default Quiz;
