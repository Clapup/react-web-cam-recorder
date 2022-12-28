import React from "react";
import VideoRecord from "./Components/VideoRecord";
// For nextjs app
// import dynamic from 'next/dynamic';

// const VideoRecord = dynamic(() => import('./Components/VideoRecord'), {
//   ssr: false,
// });

export default (App) => {
  return (
    <React.Fragment>
      <VideoRecord />
    </React.Fragment>
  );
};
