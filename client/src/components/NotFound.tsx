import React from 'react';
import styled from 'styled-components';
import notFoundImage from '../oops-explosion.avif';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #F9F9F9;
`;

const Title = styled.h1`
  font-size: 4rem;
  color: #222;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Image = styled.img`
  max-width: 40%;
  height: auto;
`;

const NotFound: React.FC = () => {
    return (
        <Wrapper>
            <Subtitle>We couldn't find the page you're looking for.</Subtitle>
            <Image src={notFoundImage} alt="404 Error" />
        </Wrapper>
    );
};

export default NotFound;
