'use client'
import { Home, Store,Heart,User } from "lucide-react"
import { useState } from "react"



export function BottomTabs() {
    // const Tabs={
    //     "Home":"Accueil",
    //     "Exp":"Explorer",
    //     "Fav":"Favoris",
    //     "Prof":"Profil"
    // }
    const [isActiveTab,setIsActiveTab]=useState("Home");
    return (
      <nav className="fixed  bottom-0 left-0 h-22 items-center rounded-t-4xl right-0 bg-white border-t flex justify-around py-2 text-xs">
        <span className= {`active:text-amber-700 ${isActiveTab==="Home"?"text-amber-700":"text-gray-500"}`} onClick={()=>setIsActiveTab("Home")}>

            <Home className="w-6 h-6 mx-auto mb-1" />
            Accueil
        </span>
        <span className= {`active:text-amber-700 ${isActiveTab==="Exp"?"text-amber-700":"text-gray-500"}`} onClick={()=>setIsActiveTab("Exp")}>
            <Store className="w-6 h-6 mx-auto mb-1" />
            Explorer
        </span>
        <span className= {`active:text-amber-700 ${isActiveTab==="Fav"?"text-amber-700":"text-gray-500"}`} onClick={()=>setIsActiveTab("Fav")}>
            <Heart className="w-6 h-6 mx-auto mb-1" />
            Favoris
        </span>
        <span className= {`active:text-amber-700 ${isActiveTab==="Prof"?"text-amber-700":"text-gray-500"}`} onClick={()=>setIsActiveTab("Prof")}>
            <User className="w-6 h-6 mx-auto mb-1" />
            Profil
        </span>
      </nav>
    )
  }
  