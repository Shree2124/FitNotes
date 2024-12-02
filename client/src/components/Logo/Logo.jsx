import PropTypes from 'prop-types';

const Logo = ({ src, alt = "Logo", width = "100%", height = "auto" }) => {
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

Logo.propTypes = {
  src: PropTypes.string.isRequired, 
  alt: PropTypes.string, 
  width: PropTypes.string, 
  height: PropTypes.string,
};

export default Logo;
