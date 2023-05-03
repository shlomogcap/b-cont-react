import { StyledFooter } from './Footer.styled';

const APP_VERSION = '0.0.beta-0';

export const Footer = () => {
  return (
    <StyledFooter>
      <p className='copy'>
        {`${String.fromCharCode(169)} כל הזכויות שמורות לביקונט בע"מ 2020`}
      </p>
      <p>[Version : {APP_VERSION}]</p>
    </StyledFooter>
  );
};
