import { YoutubeIcon } from "../../icons/youtubeIcon";
import { ShareIcon } from "../../icons/shareIcon";
import { FileIcon } from "../../icons/fileIcon";
import { Card } from "./Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { DATABASE_URL } from "../../config";
import NoData from "../../assets/NoData.svg";
import { useAppDispatch } from "../../app/hooks";
import { toggle } from "../../features/FormSlice";
import { FilmIcon, Trash2, TwitterIcon, Youtube } from "lucide-react";
import { toast } from "react-toastify";
interface ContentItem {
  _id: string;
  title: string;
  link: string;
  linkType: string;
  type: string;
  tags?: string[];
  description?: string;
}
interface DisplayCardsProps {
  linkType: string;
}
const DisplayCards = ({ linkType }: DisplayCardsProps) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ContentItem[]>([]);
  const token = localStorage.getItem("token");
  const notify = () => toast("Content Deleted Sucessfully ✔️");
  const getIcon = (type: string) => {
    switch (type) {
      case "video":
        return <YoutubeIcon />;
      case "image":
        return <FileIcon />;
      case "article":
        return <FileIcon />;
      case "audio":
        return <FileIcon />;
      default:
        return <FileIcon />;
    }
  };
  const getLinkIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "twitter":
        return <TwitterIcon />;
      case "youtube":
        return <Youtube />;
      default:
        return <FilmIcon />;
    }
  };

  async function handleDelete(id: string) {
    await axios.delete(`${DATABASE_URL}/user/content`, {
      headers: { "Content-Type": "application/json", Authorization: token },
      data: { contentId: id },
    });
    notify();
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (linkType !== "Other") {
          const res = await axios.get(`${DATABASE_URL}/user/content/linktype`, {
            params: { linkType: linkType },
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });

          const payload = res.data.msg || res.data;
          setData(Array.isArray(payload) ? payload : []);
        } else {
          const res = await axios.get(`${DATABASE_URL}/user/content`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: token || "",
            },
          });

          const payload = res.data.msg || res.data;
          setData(Array.isArray(payload) ? payload : []);
        }
      } catch (err) {
        console.error("Error fetching content", err);
      }
    };
    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <div className="mx-auto my-auto">
        {data.length === 0 && (
          <div className="ml-72">
            <img
              className="cursor-pointer"
              onClick={() => dispatch(toggle())}
              src={NoData}
              alt=""
            />
            <div className="text-foreground text-5xl font-thin">
              No Content Added yet{" "}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mt-15 ml-72 grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((val) => {
        let cardType = val.type as any;
        let imageUrl: string | undefined;
        let linkUrl = val.link;

        if (val.type === "image") {
          imageUrl = val.link;
          linkUrl = "";
        }
        if (val.linkType && val.linkType.toLowerCase() !== "other") {
          cardType = val.linkType.toLowerCase();
        }

        return (
          <Card
            key={val._id}
            IconLeft={
              val.linkType?.toLowerCase() === "other"
                ? getIcon(val.type)
                : getLinkIcon(val.linkType)
            }
            Title={val.title}
            IconRight1={<ShareIcon />}
            IconRight2={
              <Trash2
                onClick={() => handleDelete(val._id)}
                size={16}
                className="cursor-pointer"
              />
            }
            link={linkUrl}
            type={cardType}
            Image={imageUrl}
            Description={val.description}
            Tags={val.tags || []}
          />
        );
      })}
    </div>
  );
};

export default DisplayCards;
