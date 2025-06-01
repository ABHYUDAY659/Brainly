import { Crossicon } from "../Icon/Crossicon";
import { Button } from "./Button";
import { Input } from "../components/Input";
import { useRef, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { ContentTypeValues  } from "../ConstantsTypes";
import type { ContentType } from "../ConstantsTypes";

// Props type for the modal
interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}
       
     

// Controlled component
export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentTypeValues.Youtube);

  

  async function addContent() {
    const title = titleRef.current?.value || "";
    const link = linkRef.current?.value || "";

    await axios.post(`${BACKEND_URL}/api/v1/content`,{
      link,
      title,
      type
    },{ 
      headers :{
        "Authorization":localStorage.getItem("token")

      }
    })

    console.log("Content Added:", { title, link, type });
    // Pass data to parent or API here
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="w-screen h-screen bg-black fixed top-0 left-0 opacity-70 flex justify-center items-center"
    >
      <div className="bg-white opacity-100 p-6 rounded-2xl min-w-[300px]">
        <div className="flex justify-end">
          <button onClick={onClose} className="cursor-pointer" aria-label="Close modal">
            <Crossicon />
          </button>
        </div>

        <div className="space-y-3 mt-2">
          <Input ref={titleRef} placeholder="Title" />
          <Input ref={linkRef} placeholder="Link" />
        </div>

        <div className="flex items-center gap-2 pt-4">
          <h1>Type:</h1>
          <Button
            text="Youtube"
            variant={type === ContentTypeValues.Youtube ? "primary" : "secondary"}
            onClick={() => setType(ContentTypeValues.Youtube)}
          />
          <Button
            text="Twitter"
            variant={type === ContentTypeValues.Twitter ? "primary" : "secondary"}
            onClick={() => setType(ContentTypeValues.Twitter)}
          />
        </div>

        <div className="flex justify-center pt-6">
          <Button onClick={addContent} variant="primary" text="Submit" />
        </div>
      </div>
    </div>
  );
}