import { useState } from "react";
export default function ShowComponent() {
  interface ShowProp {
    name: string;
  }
  return (
    <div>
      <p>Show</p>
      <input type="text" />
    </div>
  );
}
