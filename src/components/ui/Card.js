import React from "react";

const Card = ({
  children,
  title,
  background = "bg-white",
  rounded = "rounded-4xl",
  shadow = "shadow-sm",
  className = "",
  padding = "p-5",
  height,
  action,
  ...props
}) => {
  return (
    <div
      className={`${background} ${rounded} ${shadow} overflow-hidden ${className} ${
        height ? `h-${height}` : ""
      } transition-all duration-300 hover:shadow-md`}
      {...props}
    >
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={padding || "p-0"}>{children}</div>
    </div>
  );
};

export default Card;
