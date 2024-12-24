import React from 'react';

interface LogoProps {
  src?: string; 
  alt?: string; 
  width?: string;
  height?: string; 
}

const Logo: React.FC<LogoProps> = ({ 
  src = "/fitnotes2.svg", 
  alt = "Logo", 
  width = "100%", 
  height = "auto" 
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img 
        src={src} 
        alt={alt} 
        style={{ width: width, height: height }} 
      />
    </div>
  );
};

export default Logo;
