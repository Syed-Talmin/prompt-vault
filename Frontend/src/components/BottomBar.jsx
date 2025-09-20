import React from 'react'
import { NavLink} from 'react-router-dom'
import { BookMarked, CirclePlus, House, User } from 'lucide-react'

const BottomBar = () => {

     const navItems = [
    { to: "/", icon: <House />, label: "Home" },
    { to: "/create-prompt", icon: <CirclePlus />, label: "Create" },
    { to: "/saved", icon: <BookMarked />, label: "Saved" },
    { to: "/profile", icon: <User />, label: "Profile" },
  ];


  return (
      <div className="md:w-[15%] w-full p-3 md:pt-20 flex md:py-10 md:flex-col md:gap-5 items-center md:items-start md:justify-start justify-around bg-[#121212] text-white md:rounded-t-none rounded-t-2xl shadow-lg border-t border-green-500/30">
      {navItems.map(({ to, icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col md:flex-row md:w-full  items-center gap-1 px-3 py-2 transition-all duration-300 rounded-xl 
             ${isActive ? "text-black bg-green-400" : "text-gray-400 hover:text-green-300"}`
          }
        >
          {icon}
          <span className="text-xs font-medium md:text-lg">{label}</span>
        </NavLink>
      ))}
    </div>

  )
}

export default BottomBar