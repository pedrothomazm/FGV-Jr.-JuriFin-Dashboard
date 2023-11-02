import React, { useEffect, useRef } from "react";
import noUiSlider from "nouislider";
import 'nouislider/dist/nouislider.css'; // Import the CSS
// import noUiStyler from '../styles/nouislider.module.css' // import 

noUiSlider.cssClasses.target += ' slider-color';

const RangeSlider = ({items, onSet}) => {
  const sliderRef = useRef(null);

  const toItem = (value) => { return items[parseInt(value)] }
  const fromItem = (value) => { return items.indexOf(value) }
  const toFromItem = { to: toItem, from: fromItem }
  const listLastIndex = items.length - 1

  useEffect(() => {
    // Initialize the noUiSlider when the component mounts
    const slider = sliderRef.current;
    if (slider) {
      noUiSlider.create(slider, {
        start: [0, listLastIndex],
        step: 1,
        behaviour: "drag",
        connect: true,
        range: {
          min: 0,
          max: listLastIndex,
        },
        tooltips: [toFromItem, toFromItem],
      });

      slider.noUiSlider.on("set", onSet);

      // Add event listeners or other configuration here
    }

    return () => {
      // Destroy the noUiSlider when the component unmounts
      if (slider) {
        slider.noUiSlider.destroy();
      }
    };
  }, []);

  return <div ref={sliderRef}></div>;
};

export default RangeSlider;
