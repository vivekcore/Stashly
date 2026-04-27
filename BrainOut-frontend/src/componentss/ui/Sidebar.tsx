import { BrainCircuit, LogOut, Twitter, User2, Linkedin, Youtube, LayoutDashboard, FileText } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggle } from "../../features/AlertSlice";
import {  useNavigate } from "react-router";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const navigate = useNavigate()
  console.log(username);
  const logoutfn = () => {
    dispatch(toggle());
  };
 
  return (
    <div className="bg-background text-foreground fixed top-0 flex min-h-screen w-72 flex-col justify-between border-r">
      <div>
        <div onClick={() => navigate("/")} className="mb-4 cursor-pointer flex items-center justify-center gap-2 border-b py-4">
          <span>{<BrainCircuit size={44} />}</span>
          <span className="text-3xl font-bold tracking-wider">Stashly</span>
        </div>
         <SidebarItem onClick={()=> navigate('dashboard')} icons={<LayoutDashboard size="24" />} title={"Dashboard"} />
        <SidebarItem onClick={()=> navigate('youtube')} icons={<Youtube size="24" />} title={"Youtube"} />
        <SidebarItem onClick={()=> navigate('twitter')} icons={<Twitter size={24} />} title={"Twitter"} />
        <SidebarItem onClick={()=> navigate('linkedin')} icons={<Linkedin size={24} />} title={"LinkedIn"} />
        <SidebarItem onClick={()=> navigate('text-editor')} icons={<FileText size={24} />} title={"Text Editor"} />
      </div>
      <div className="text-foreground mb-4 flex items-center justify-between rounded-md border border-r-0 px-4 py-2 text-xl font-medium">
        <p className="flex items-center gap-4">
          {<User2 />}
          {username}
        </p>
        <p>{<LogOut className="cursor-pointer" onClick={logoutfn} />}</p>
      </div>
    </div>
  );
};

export default Sidebar;
