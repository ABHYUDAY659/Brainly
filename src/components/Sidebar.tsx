import { Twitter } from "../Icon/X";
import { Youtube } from "../Icon/Youtubeicon";
import { Sidebaricon } from "./Sidebaritem";
import {Logo} from "../Icon/Logo"


export function Sidebar(){
 
    return <div className="h-screen  bg-white border-r w-72 fixed left-0 top-0 pl-6">
        <div className="flex text-4xl pt-8  items-center">
            <div className="pr-2 text-purple-800">
            <Logo/>
            </div>
            
            Brainly
        </div>
         <div className="pt-4 pl-4">
                <Sidebaricon text="Twitter" icon={<Twitter/>}/>
                <Sidebaricon text="Youtube" icon={<Youtube/>}/>
            </div>
        </div>
        

}