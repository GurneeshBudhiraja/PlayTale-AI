import { Loader2 } from "lucide-react";

function LoaderComponent({
  width,
  height,
  className,
  loaderClassname,
}: {
  width: number;
  height: number;
  className: string;
  loaderClassname?: string;
}) {
  return (
    <div className={className || ""}>
      <Loader2
        className={`animate-spin ${
          loaderClassname ? loaderClassname : "text-indigo-400"
        }`}
        width={width}
        height={height}
      />
    </div>
  );
}

export default LoaderComponent;
