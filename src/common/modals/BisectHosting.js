import React, { memo } from 'react';
import styled from 'styled-components';
// import { Button } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';
import BisectHostingLogo from '../../ui/BisectHosting';
// import ga from '../utils/analytics';

const BisectHosting = () => {
  return (
    <Modal
      css={`
        height: 600px;
        width: 900px;
        font-size: 10px;
        line-height: 1.8;
      `}
      title="FelNull Discord"
    >
      <Container>
        <BisectHostingLogo size={60} hover />
        {/* <h2 */}
        {/*   css={` */}
        {/*     margin-top: 20px; */}
        {/*   `} */}
        {/* > */}
        {/*   Grab a server from our official partner{' '} */}
        {/*   <span */}
        {/*     css={` */}
        {/*       font-weight: 800; */}
        {/*     `} */}
        {/*   > */}
        {/*     BisectHosting */}
        {/*   </span>{' '} */}
        {/*   <span>for effortless modded server installs and updates.</span> New */}
        {/*   customers can save{' '} */}
        {/*   <span */}
        {/*     css={` */}
        {/*       color: ${props => props.theme.palette.colors.green}; */}
        {/*     `} */}
        {/*   > */}
        {/*     25% */}
        {/*   </span>{' '} */}
        {/*   off their first month using the promo code{' '} */}
        {/*   <span */}
        {/*     css={` */}
        {/*       color: ${props => props.theme.palette.colors.green}; */}
        {/*     `} */}
        {/*   > */}
        {/*     GDL */}
        {/*   </span>{' '} */}
        {/*   at checkout. */}
        {/* </h2> */}
        {/* <a href="https://bisecthosting.com/gdl"> */}
        {/*   <Button */}
        {/*     type="primary" */}
        {/*     css={` */}
        {/*       margin-top: 25px; */}
        {/*     `} */}
        {/*     onClick={() => { */}
        {/*       ga.sendCustomEvent('BHClickAdLink'); */}
        {/*     }} */}
        {/*   > */}
        {/*     Go to BisectHosting.com &nbsp; */}
        {/*     <FontAwesomeIcon icon={faExternalLinkAlt} /> */}
        {/*   </Button> */}
        {/* </a> */}
        <h2
          css={`
            margin-top: 20px;
          `}
        >
          季節ごとの特別なModサーバー{' '}
          <span
            css={`
              font-weight: 800;
            `}
          >
            『Season Mod Server』
          </span>{' '}
          <span>を立てたりして楽しく遊んでいます。</span> FelNullが出してる{' '}
          <span
            css={`
              color: ${props => props.theme.palette.colors.green};
            `}
          >
            ModPack
          </span>{' '}
          などの質問は{' '}
          <span
            css={`
              color: ${props => props.theme.palette.colors.green};
            `}
          >
            Discord
          </span>{' '}
          でのみ受け付けております。
        </h2>
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe
          src="https://discordapp.com/widget?id=600929948529590272&theme=dark"
          width="800"
          height="380"
          allowTransparency="true"
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </Container>
    </Modal>
  );
};

export default memo(BisectHosting);

const Container = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${props => props.theme.palette.text.primary};
`;
