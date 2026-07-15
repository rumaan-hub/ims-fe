import Image from "next/image";
import React from "react";

type props = {
  title?: string;
  width?: string;
  bgColor?: string;
  font?: string;
  icon?: any;
  alt?: any;
  borderColor?: string;
  borderWidth?: string;
  color?: string;
  height?: string;
  disabled?: boolean;
  loaderColor?: string;
  loading?: boolean;
  flexDirection?: any;
  cartIcon?: Boolean;
  borderRadius?: string;
  className?: any;
  onClick?: (e: React.FormEvent) => void;
};

const GlobalButton = ({ width, flexDirection = 'row', disabled = false, className, borderColor, borderWidth, bgColor = "#33C92D", title, font = "semibold", icon, alt, color = "white", height = "37px", onClick, cartIcon = false, borderRadius = '5px' }: props) => {
  return (
    <div onClick={onClick} style={{
      pointerEvents: disabled ? 'none' : 'auto',
      opacity: disabled ? '0.5' : '1',
      width: width, backgroundColor: bgColor, fontWeight: font, color: color, border: `${borderWidth} solid ${borderColor}`, flexDirection: flexDirection, height: height, borderRadius: borderRadius, userSelect: 'none'
    }}
      className={`gap-2 ${className} flex justify-center items-center text-[13px] max-[768px]:text-[12px] leading-[22px] tracking-[0.1px] cursor-pointer`}>

      {cartIcon && <Image src={icon} alt={"icon"} />}
      {title}

    </div>
  );
};

export default GlobalButton;