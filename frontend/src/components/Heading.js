import React from 'react';
import PropTypes from 'prop-types';

function Heading({ title, level = 1, className = '', style = {} }) {
  const HeadingTag = `h${level}`; // Dynamic heading level

  return (
    <HeadingTag
      className={`text-center mx-auto mobile:text-2xl font-bold text-4xl ${className}`}
     
    >
      {title}
    </HeadingTag>
  );
}

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  level: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};



export default Heading;
