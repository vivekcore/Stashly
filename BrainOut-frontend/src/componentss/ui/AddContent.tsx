
import Form from "./Form";
import { useAppSelector } from "../../app/hooks";

const AddContent = () => {
    const open = useAppSelector((state) => state.ui.isOpen);

    console.log(open+ " hello")
  return (
    <div>
        { open === true &&
    <div className="absolute flex top-0 h-screen w-screen items-center justify-center">
      <div className="bg-foreground w-screen absolute opacity-50 min-h-screen"></div>
      <Form/>
    </div>
}
    </div>
  );
};

export default AddContent;
