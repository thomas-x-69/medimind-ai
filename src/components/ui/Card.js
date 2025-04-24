import React from "react";

const Card = ({
  children,
  title,
  background = "bg-white",
  rounded = "rounded-[20px]",
  shadow = "shadow-sm",
  className = "",
  padding = "p-0",
  height,
  action,
  ...props
}) => {
  return (
    <div
      className={`${background} ${rounded} ${shadow} overflow-hidden ${className} ${
        height ? `h-${height}` : ""
      }`}
      {...props}
    >
      {title && (
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={padding || "p-0"}>{children}</div>
    </div>
  );
};

export default Card;
