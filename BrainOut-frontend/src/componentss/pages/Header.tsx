import { Plus, Share2 } from "lucide-react";
import { Button } from "../ui/Button";

import { useAppDispatch } from "../../app/hooks";
import { toggle } from "../../features/FormSlice";
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle";
//import { useTheme } from "../themeprovider";

const Header = () => {
  const dispatch = useAppDispatch();
// const {theme,setTheme} = useTheme()
  return (
    <div className="bg-background fixed top-0 right-0 left-72 flex h-15 items-center justify-between px-2">
      <div>
        <ThemeToggle/>
        {/* <Button
          varient="primary"
          size="md"
          onclick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </Button> */}
      </div>
      <div className="flex items-center gap-4">
        <Button varient="secondary" startIcon={<Share2 size={16} />}>
          Share
        </Button>

        <Button
          varient="primary"
          onclick={() => dispatch(toggle())}
          startIcon={<Plus size={16} />}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default Header;
