export const Button = ({ onClick, label, className }) => {
  return (
    <button
      type="button"
      className={`border rounded p-1 shadow-md ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
