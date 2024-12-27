import React, { useEffect } from "react";

const Assistant = () => {
  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      data-fillout-id="b3k1Xnzr43us"
      data-fillout-embed-type="popup"
      data-fillout-button-text="AI Call Assistant"
      data-fillout-dynamic-resize
      data-fillout-button-float="bottom-right"
      data-fillout-inherit-parameters
      data-fillout-popup-size="medium"
    ></div>
  );
};

export default Assistant;
