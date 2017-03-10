import React from 'react';
/**
 * This is basically a presentational component
 * @param{Object} props - props of this component passed down
 * from it's parent
 * @return{Object} Circular preloader DOM component to be rendered
 */
const CircularPreloader = () =>
  (
    <div className="spinner-layer spinner-green">
      <div className="circle-clipper left">
        <div className="circle" />
      </div>
      <div className="gap-patch">
        <div className="circle" />
      </div>
      <div className="circle-clipper right">
        <div className="circle" />
      </div>
    </div>
  );

export default CircularPreloader;
