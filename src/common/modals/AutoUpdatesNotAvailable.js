import React, { memo } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';

const AutoUpdatesNotAvailable = () => {
  return (
    <Modal
      css={`
        height: 200px;
        width: 400px;
      `}
      title="Auto Updates Not Available"
    >
      <Container>
        <div>自動アップデートはこのOSには導入されていません</div>
        <div
          css={`
            margin-top: 20px;
          `}
        >
          ランチャーを更新してください
          <a href="https://github.com/TeamFelnull/FelNullGDLauncher/releases">
            ここをクリック！
          </a>
        </div>
      </Container>
    </Modal>
  );
};

export default memo(AutoUpdatesNotAvailable);

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${props => props.theme.palette.text.primary};
`;
