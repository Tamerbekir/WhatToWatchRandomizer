import { useState } from "react";
export default function MovieComponent() {
  interface MovieProp {
    name: string;
  }
  return (
    <div>
      <p>Movie</p>
      <input type="text" />
    </div>
  );
}
