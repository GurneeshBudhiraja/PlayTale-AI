import { Loader2 } from "lucide-react";

function LoaderComponent({
  width,
  height,
  className,
}: {
  width: number;
  height: number;
  className: string;
}) {
  return (
    <div className={className || ""}>
      <Loader2
        className="animate-spin text-indigo-400"
        width={width}
        height={height}
      />
    </div>
  );
}

export default LoaderComponent;
