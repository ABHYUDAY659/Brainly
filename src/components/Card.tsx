import { Shareicon } from "../Icon/Shareicon"
import { Delete } from "../Icon/Delete"
import axios from "axios"

interface CardProps {
  title: string
  link: string
  type: "twitter" | "youtube"
  contentId: string
}

export function Card({ title, link, type, contentId }: CardProps) {
  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this content?");
    if (!confirm) return;

    try {
      const res = await axios.delete("http://localhost:3000/api/v1/content", {
        data: { contentId },
      });

      if (res.data.message === "Deleted!") {
        alert("Deleted successfully!");
        window.location.reload();
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error(err);
      alert("Your request will soon be processed.");
    }
  };

  // Extract YouTube video ID if link is valid
  let embedUrl = "";
  if (type === "youtube") {
    try {
      const url = new URL(link);
      const videoId = url.searchParams.get("v");
      if (videoId) {
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    } catch (e) {
      console.error("Invalid YouTube URL", e);
    }
  }

  return (
    <div className="p-8 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
      {/* Header Section */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-500 text-md">
          <span>{title}</span>
        </div>
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Shareicon />
            </a>
          </div>
          <div className="text-gray-500 cursor-pointer" onClick={handleDelete}>
            <Delete />
          </div>
        </div>
      </div>

      {/* Video / Tweet */}
      <div className="aspect-video w-full pt-4">
        {type === "youtube" && embedUrl && (
          <iframe
            className="w-full h-full rounded-md"
            src={embedUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
