import React, { useRef } from "react";
interface imgItem {
    imgIt:{
  it: string;
}}
const ImgComponent: React.FC<imgItem> = (imgItem) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const BigImg = () => {
    imgRef.current?.setAttribute('style', 'transform: scale(2); transform .2s');
  }
  const smallImg = () => {
    imgRef.current?.setAttribute('style', 'transform: scale(1); transform .2s');
  }
  return (<img
    src={imgItem.imgIt.it}
    ref={imgRef}
    onMouseEnter={BigImg}
    onMouseLeave={smallImg}
  />);
}
export default ImgComponent;



