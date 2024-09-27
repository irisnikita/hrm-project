'use client';

import {
  Scrollbars as CustomScrollbars,
  ScrollbarProps as CustomScrollbarProps,
  positionValues,
} from 'react-custom-scrollbars';
import { cloneDeep } from 'lodash';

// Libraries
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

// Styled
import { HorizontalTrack, ThumbBar, VerticalTrack } from './styled';

export interface ScrollbarsProps extends CustomScrollbarProps {}

const THUMB_SIZE = 4;
const MARGIN = 3;

export const Scrollbars: React.FC<ScrollbarsProps> = forwardRef((props, refProp) => {
  // Props
  const { autoHide = true, autoHeightMax = 0, className, ...restProps } = props;

  // Refs
  const ref = useRef<CustomScrollbars>(null);

  useImperativeHandle(refProp, () => ref.current!, []);

  /**
   * Updates the size and position of the custom scrollbar thumbs based on the provided dimensions and scroll positions.
   *
   * @param {positionValues} values - An object containing the dimensions and scroll positions of the scrollable element:
   *  - {number} clientHeight - The visible height of the scrollable content area.
   *  - {number} clientWidth - The visible width of the scrollable content area.
   *  - {number} scrollHeight - The total height of the scrollable content.
   *  - {number} scrollWidth - The total width of the scrollable content.
   *  - {number} scrollLeft - The horizontal scroll position.
   *  - {number} scrollTop - The vertical scroll position.
   */
  const onUpdate = (values: positionValues) => {
    // Destructure the properties from the values object, using default values if undefined
    const { clientHeight, clientWidth, scrollWidth, scrollHeight, scrollLeft, scrollTop } =
      values || {};

    // Calculate the height of the vertical thumb, ensuring a minimum height of 30px
    const thumbHeight = Math.max(Math.floor(clientHeight * (clientHeight / scrollHeight)), 30);
    // Calculate the width of the horizontal thumb, ensuring a minimum width of 30px
    const thumbWidth = Math.max(Math.floor(clientWidth * (clientWidth / scrollWidth)), 30);

    // Calculate the vertical thumb's position based on the scrollTop value
    const thumbVerticalPosition =
      (scrollTop / (scrollHeight - clientHeight)) * (clientHeight - thumbHeight) - MARGIN;
    // Calculate the horizontal thumb's position based on the scrollLeft value
    const thumbHorizontalPosition =
      (scrollLeft / (scrollWidth - clientWidth)) * (clientWidth - thumbWidth) - MARGIN;

    // If the ref.current element is available, update the thumb styles
    if (ref.current) {
      (ref.current as any).thumbVertical.style.height = `${thumbHeight}px`;
      (ref.current as any).thumbVertical.style.transform = `translateY(${thumbVerticalPosition}px)`;

      (ref.current as any).thumbHorizontal.style.width = `${thumbWidth}px`;
      (ref.current as any).thumbHorizontal.style.transform =
        `translateX(${thumbHorizontalPosition}px)`;
    }

    // Handle show hide track bar
    (ref.current as any).trackVertical.style.visibility =
      scrollHeight <= clientHeight ? 'hidden' : 'visible';

    (ref.current as any).trackHorizontal.style.visibility =
      scrollWidth <= clientWidth ? 'hidden' : 'visible';
  };

  return (
    <CustomScrollbars
      className={`custom-scrollbars ${className || ''}`}
      autoHide={autoHide}
      autoHeightMax={autoHeightMax}
      renderThumbVertical={props => <ThumbBar className="thumb-vertical" {...props} />}
      renderThumbHorizontal={props => <ThumbBar className="thumb-horizontal" {...props} />}
      renderTrackVertical={({ style, ...restOfProps }) => (
        <VerticalTrack
          className="scrollbar-track"
          {...restOfProps}
          style={{ ...style, display: 'block' }}
        />
      )}
      renderTrackHorizontal={({ style, ...restOfProps }) => (
        <HorizontalTrack
          className="scrollbar-track"
          {...restOfProps}
          style={{ ...style, display: 'block' }}
        />
      )}
      renderView={props => {
        const { style } = props || {};
        const newStyle = cloneDeep(style);

        // Adjust the margins to account for the custom scrollbar size
        newStyle.marginBottom = -THUMB_SIZE;
        newStyle.marginRight = -THUMB_SIZE;
        // Set a minimum height for the view to ensure space for the scrollbar
        newStyle.minHeight = THUMB_SIZE;

        // If autoHeightMax is defined, adjust the maxHeight to include space for the scrollbar
        // if (autoHeightMax) {
        //   newStyle.maxHeight = parseInt(`${autoHeightMax}`) + THUMB_SIZE;
        // }

        // Return a div element with the adjusted styles and original props, applying a custom class for styling
        return <div className="scrollbar-view" {...props} style={newStyle} />;
      }}
      onUpdate={onUpdate}
      hideTracksWhenNotNeeded
      {...restProps}
      ref={ref}
    />
  );
});

Scrollbars.displayName = 'Scrollbars';
