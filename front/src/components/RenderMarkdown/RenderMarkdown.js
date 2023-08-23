import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import css from './RenderMarkdown.module.scss';

function ImageRenderer({ src, alt }) {
  return <img src={src} alt={alt} />;
}
ImageRenderer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

function RenderMarkdown({ body }) {
  return (
    <div className={css.RenderMarkdown}>
      <ReactMarkdown renderers={{ image: ImageRenderer }}>{body}</ReactMarkdown>
    </div>
  );
}
RenderMarkdown.propTypes = {
  body: PropTypes.string.isRequired,
};

export default RenderMarkdown;
