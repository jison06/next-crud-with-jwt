type ButtonProps = {
  pending?: any;
  submitText: string;
  onClick?: any;
};
export default function Button({ pending, submitText, onClick }: ButtonProps) {
  return (
    <button
      type="submit"
      className="border border-blue bg-blue-300 w-1/2 m-5 p-2 rounded-2xl"
      onClick={onClick}
      disabled={pending}
    >
      {submitText}
    </button>
  );
}
