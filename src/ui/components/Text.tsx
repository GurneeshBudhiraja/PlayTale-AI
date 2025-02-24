function Text({
  className,
  textContent,
  inputProps,
}: {
  className: string;
  textContent: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className={className} {...inputProps}>
      {textContent}
    </div>
  );
}

export default Text;
