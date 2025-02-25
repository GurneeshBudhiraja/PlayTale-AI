function MessageComponent({
  message,
  role,
  characterName,
  ref,
}: {
  message: string;
  role: "protagonist" | "supporting";
  characterName: string;
  ref?: React.RefObject<HTMLDivElement | null> | null;
}) {
  return (
    <div
      ref={ref}
      className={`
        rounded-lg 
        p-4 
        mb-4
        break-words
        ${
          role === "protagonist"
            ? "bg-blue-100 text-blue-900 ml-auto"
            : "bg-gray-100 text-gray-900"
        }
        max-w-[70%]
        ${role === "protagonist" ? "mr-0" : "ml-0"}
      `}
    >
      <div className="font-bold mb-1">
        {role === "protagonist" ? "You" : characterName}
      </div>
      <div>{message}</div>
    </div>
  );
}

export default MessageComponent;
