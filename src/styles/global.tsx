import React from "react";

export function GlobalStyle() {
  return (
    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: Poppins, sans-serif;
      }
      * {
        box-sizing: border-box;
      }
    `}</style>
  );
}
