function Text({
  className,
  textContent,
}: {
  className: string;
  textContent: string;
}) {
  return <div className={className}>{textContent}</div>;
}

export default Text;
