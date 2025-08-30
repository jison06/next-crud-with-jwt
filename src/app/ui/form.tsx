import Button from "./button";

type FormProps = {
  formTitle: string;
  submitText: string;
  action: any;
  pending: any;
  children: React.ReactNode;
};

export default function Form({
  formTitle,
  submitText,
  action,
  pending,
  children,
}: FormProps) {
  return (
    <div className="border border-black w-100 h-100 absolute m-auto top-0 bottom-0 left-0 right-0 rounded-2xl">
      <form action={action}>
        <h2 className="text-3xl font-bold text-center mt-10">{formTitle}</h2>
        <div className="flex gap-5 items-center flex-col mt-5 ml-25 mr-25 pt-5">
          {children}
          <Button pending={pending} submitText={submitText} />
        </div>
      </form>
    </div>
  );
}
