import {  useState } from "react";
import { useNavigate } from "react-router";
import { SparklesCore } from "@/components/ui/sparkles";
const LandingPage = () => {
  const [istloken, setistoken] = useState<boolean>(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const theme = localStorage.getItem("vite-ui-theme")
  
    if (!token) {
      setistoken(!istloken);
    }
  

  function handleClick() {
    if (istloken) {
      navigate("/home");
    } else {
      navigate("/signin");
    }
  }
  return (
    <div className="flex h-screen bg- flex-col items-center justify-center gap-20">
     <div className="w-full absolute  inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor={theme === 'light' ? "#000000" : "#ffffff"}
          
        />
      </div>
      <div className="via-white-500/10 bg-linear-to-b from-black to-white bg-clip-text p-4 text-9xl font-bold tracking-tighter text-transparent">
        Stashly
      </div>
      <div className="overflow-hidden z-10 rounded-2xl border ring-1 shadow-foreground ring-gray-700 hover:shadow-md">
        <button
          className="cursor-pointer border-none bg-linear-to-b from-white via-50% to-black bg-clip-text px-6 py-2 text-3xl text-transparent hover:text-foreground"
          onClick={handleClick}
        >
          {istloken === true ? "Get Started" : "LogIn"}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
