import React, { Fragment, memo } from 'react';
import { ArrowButton, MediaButton } from '../Button/Button';
import PropTypes from 'prop-types';
import { isEqualProps } from '../utils/utils';

export const ArrowButtons = memo((props) => {
  if (props.disabled) return null;

  return (
    <Fragment>
      <ArrowButton direction='left' clickCallback={props.onClickLeft} />
      <ArrowButton direction='right' clickCallback={props.onClickRight} />
    </Fragment>
  );
}, isEqualProps);

ArrowButtons.propTypes = {
  disabled: PropTypes.bool,
  onClickLeft: PropTypes.func.isRequired,
  onClickRight: PropTypes.func.isRequired
};

export const MediaButtons = (props) => {
  if (props.disabled) return null;

  return (
    <MediaButton
      isPlaying={props.isPlaying}
      clickCallback={props.clickCallback}
    />
  );
};

MediaButtons.propTypes = {
  disabled: PropTypes.bool,
  isPlaying: PropTypes.bool.isRequired,
  clickCallback: PropTypes.func.isRequired
};
