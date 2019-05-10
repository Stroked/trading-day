import React, { useRef, useState, useEffect } from "react";

const ScrollArea = ({ topBuffer, areaHeight, children }) => {
  const [scrollRatio, setScrollRatio] = useState(null);

  const containerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      //console.log(topBuffer, areaHeight);
      const boundingBox = containerRef.current.getBoundingClientRect();
      //console.log("boundingBox" + boundingBox.top);

      const distanceToTop = boundingBox.top - topBuffer;
      const pixelsScrolled = areaHeight - distanceToTop;
      //console.log(pixelsScrolled);
      let newScrollRatio = pixelsScrolled / areaHeight;
      //console.log(newScrollRatio);

      newScrollRatio = clamp(newScrollRatio, 0, 1);
      if (scrollRatio !== newScrollRatio) setScrollRatio(newScrollRatio);
    };
    window.addEventListener("scroll", handleScroll);
    // clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topBuffer, areaHeight, scrollRatio]);

  return <div style={{height:'50vh',width:'100vw'}} ref={containerRef}>{children({ scrollRatio })}</div>;
};

/**
 * This is a simple Bézier curve presentational component.
 */
const BezierCurve = ({
  viewBoxWidth,
  viewBoxHeight,
  startPoint,
  firstControlPoint,
  secondControlPoint,
  endPoint,
  fill = "hotpink"
}) => {
  return (
    <svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}>
      <path
        d={`
          M ${startPoint}
          C ${firstControlPoint}
            ${secondControlPoint}
            ${endPoint}
          L ${viewBoxWidth},${viewBoxHeight}
          L 0,${viewBoxHeight}
        `}
        fill={fill}
      />
    </svg>
  );
};
/**
 * `getInterpolatedValue` provides a midpoint value
 * between y1 and y2, based on the ratio provided.
 *
 * @param {number} y1 - the value when our curve is
 *                      totally curvy
 * @param {number} y2 - the value when our curve is
 *                      totally flat
 * @param {number} x  - a value from 0 to 1 that
 *                      represents the ratio of curvy
 *                      to flat (0 = totally curvy,
 *                      1 = totally flat).
 */
const getInterpolatedValue = (y1, y2, x) => {
  // The slope of a line can be calculated as Δy / Δx.
  //
  // In this case, the domain of our function (AKA the
  // possible X values) are from 0 (x1) to 1 (x2).
  // Δx is therefore just equal to 1 (since 1 - 0 = 1).
  //
  // Because dividing by 1 has no effect, our slope in
  // this case can just be Δy.
  const a = y2 - y1;

  // Next, we know that y = ax + b.
  //
  // `b` is the Y-axis intercept, which we know is `y1`,
  // since `y1` is the `y` value when `x` is 0.
  return a * x + y1;
};

/**
 * The two components above are the building blocks
 * for the effect we want to build. This last component
 * assembles them.
 *
 * It takes the `headerHeight` as a prop, so that we
 * can flatten it at the right moment.
 */
const ScrollBasedBezier = ({ headerHeight }) => (
  <ScrollArea
    topBuffer={headerHeight}
    areaHeight={
      // By setting a relatively small ScrollArea height,
      // we get to see the fully-curved version for a bit
      // before the flattening starts :D
      window.innerHeight*.5
    }>
    {({ scrollRatio }) => {
      // Hardcoding these values since this component
      // isn't meant to be reusable.
      const viewBoxWidth = window.innerWidth;
      const viewBoxHeight = window.innerHeight*0.5;

      const startPointY = getInterpolatedValue(
        viewBoxHeight,
        0,
        scrollRatio
      );

      const firstControlPointY = getInterpolatedValue(
        viewBoxHeight*1.5,
        0,
        scrollRatio
      );

      const secondControlPointY = getInterpolatedValue(
        -viewBoxHeight*.5,
        0,
        scrollRatio
      );

      const endPointY = 0;

      return (
        <BezierCurve
          viewBoxWidth={viewBoxWidth}
          viewBoxHeight={viewBoxHeight}
          startPoint={[0, startPointY]}
          firstControlPoint={[window.innerWidth / 3, firstControlPointY]}
          secondControlPoint={[2*window.innerWidth/3, secondControlPointY]}
          endPoint={[window.innerWidth, endPointY]}
        />
      );
    }}
  </ScrollArea>
);

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
export default ScrollBasedBezier;
