import { Button } from "../components/Button";
import { Plusicon } from "../Icon/Plusicon";
import { Shareicon } from "../Icon/Shareicon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/Createcontentmodel";
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import { BACKEND_URL } from "../config";
import axios from "axios"

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const content = useContent();

  return (
    <>
      <div>
        <Sidebar />
        <div className="p-4 ml-72 min-h-screen bg-gray-100">
          <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />

          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<Plusicon />}
            />
            <Button onClick={async() =>{
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
                share :true
              },{
                headers:{
                  "Authorization":localStorage.getItem("token")
                }
              });
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}variant="secondary" text="Share Brain" startIcon={<Shareicon />} />
          </div>

          <div className="flex gap-4 mt-4 flex-wrap">
            {content.map(({ type, link, title }) => (
              <Card key={link} type={type} link={link} title={title} contentId="unique-content-id" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
