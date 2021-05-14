import React, { useState } from "react";
import Base64 from './components/EncodeBase64';
import { makeServer } from './Server'

if (process.env.NODE_ENV === "development") {
    if (window.server) {
    window.server.shutdown();
  }
  window.server = makeServer();
}
export default function  App(){

  return (
    <div>
      <Base64/>
    </div>
  );
};