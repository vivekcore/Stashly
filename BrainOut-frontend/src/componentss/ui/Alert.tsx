import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggle } from "../../features/AlertSlice";
import { Button } from "./Button";

const Alert = () => {
  const isOpen = useAppSelector((state) => state.logoutAlert.isOpen);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleOk = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    dispatch(toggle());
  };
  const handleCancle = () => {
    dispatch(toggle());
  };
  return (
    <div>
      {isOpen && (
        <div className="absolute top-0 flex h-screen w-screen items-center justify-center">
          <div className="bg-foreground absolute min-h-screen w-screen opacity-50"></div>
          <div className="bg-background z-10 h-40 w-80 rounded-2xl">
            <div className="bg-background flex h-25 items-center justify-center rounded-2xl">
              <div className="text-foreground">Want to logout ?</div>
            </div>
            <div>
              <div className="flex justify-between p-2">
                <Button varient="primary" onclick={handleOk}>
                  Ok
                </Button>
                <Button varient="secondary" onclick={handleCancle}>
                  Cancle
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
