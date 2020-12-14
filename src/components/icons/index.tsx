import React from "react";

export const LabelIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
  </svg>
);

export const NoteIcon = () => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
  </svg>
);


interface IColorPaletteIcon {
  bgColor?: string;
  checkMarkColor?: string;
  className?: string;
}
export const ColorPaletteIcon = (props: IColorPaletteIcon) => (
  <svg
  height="100%"
  width="100%"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 18 18"
>
  <path fill={props.bgColor} d="m0 0h18v18h-18z"></path>
</svg>
);


export const ColorPaletteIconChecked = (props: IColorPaletteIcon) => {
  return (
    <svg
      height="100%"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
    >
      <path fill={props.checkMarkColor}  d="m0 0h18v18h-18z"></path>
      <path
        className={props.className}
        d="m6.61 11.89l-3.11-3.11-1.06 1.06 4.17 4.16 8.95-8.95-1.06-1.05z"
      ></path>
    </svg>
  );
};

export const KeepIcon =  () => (<svg  height="40" width="40" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg"><g><path d="m284.053 317.287h193.747v127.279h-193.747z" fill="#fdde80" transform="matrix(.707 -.707 .707 .707 -157.785 380.926)"/><path d="m512 315c0 33.137-26.863 60-60 60h-77v77c0 33.137-26.863 60-60 60h-59l-111-256 111-256h256z" fill="#f8a808"/><path d="m0 0h256v512h-256z" fill="#fbbd00"/><path d="m256 75-10 15 10 15c58.448 0 106 47.551 106 106 0 43.576-26.135 82.21-66.582 98.426l-9.418 3.776v33.798h-30l-10 15 10 15h30v30h-30l-10 15 10 15h60v-103.922c20.87-10.254 38.728-25.656 52.054-44.992 15.666-22.731 23.946-49.386 23.946-77.086 0-74.991-61.01-136-136-136z" fill="#e3e7ea"/><path d="m226 407v-30h30v-30h-30v-33.798l-9.418-3.776c-40.447-16.216-66.582-54.85-66.582-98.426 0-58.449 47.552-106 106-106v-30c-74.99 0-136 61.009-136 136 0 27.7 8.28 54.355 23.946 77.086 13.326 19.335 31.184 34.738 52.054 44.992v103.922h60v-30z" fill="#fff"/></g></svg>);