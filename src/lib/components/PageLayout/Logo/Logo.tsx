import Image from 'next/image';
import { CSSProperties } from 'react';

type LogoProps = {
  style?: CSSProperties;
  className?: string;
};

export const Logo = ({ style, className }: LogoProps) => {
  return (
    <Image
      style={style}
      className={className}
      width={65}
      height={65}
      src={'/logo.png'}
      alt='b-cont'
    />
  );
};
