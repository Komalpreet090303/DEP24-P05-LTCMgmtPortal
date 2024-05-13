// import React, { useRef } from 'react'
// import { Link } from "react-router-dom";
// import NotificationIcon from '../../public/notification-icon.png'
// import NotificationPage from '../pages/NotificationPage';
// export default function NotificationBar({open, setOpen}) {

//   // return (
//   //   <>
//   //     <Link to={"/notification"} className='flex mr-3 text-sm  rounded-full md:mr-8 focus:ring-4 focus:ring-gray-300'
//   //     ><img className='w-8 h-8 rounded-full'  alt="Notifications" src={NotificationIcon}/> </Link>
//   //   </>
//   // )\\\\
//   const ref = useRef(null);

//   var visnotif = false
//   if(open) ref.current && ref.current.show()
//   else ref.current && ref.current.close()

//   const clickHandler = (e) => {
//     setOpen(open => !open)
//   }
//   return (
//     <>
//     <div onMouseDown={e => e.stopPropagation()}>
//     <button onMouseDown={clickHandler}>
//     <img className='w-8 h-8 rounded-full'  alt="Notifications" src={NotificationIcon} />
//     </button>
//     <dialog ref={ref} className='h-96 absolute left-auto p-0 w-96 rounded-lg'>
//       <NotificationPage />
//     </dialog>
//     </div>
//     </>
//  )
// }

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NotificationIcon from "../../public/notification-icon.png";
import NotificationPage from "../pages/NotificationPage";

export default function NotificationBar({ open, setOpen }) {
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);

  useEffect(() => {
    fetch("/api/getNotificationsCount", { method: "POST" })
      .then((res) => res.json())
      .then((data) => setNewNotificationsCount(data.count))
      .catch((error) =>
        console.error("Error fetching notification count:", error)
      );
  }, []);

  const handleIconClick = () => {
    setOpen((open) => !open);
    fetch("/api/updateNotificationsTime", {
      method: "POST",
    }).then((res) => res.json())
    .catch((error) =>
        console.error("Error fetching notification count:", error)
      );
    setNewNotificationsCount(0); // Reset count when icon is clicked
  };

  const ref = useRef(null);

  var visnotif = false;
  if (open) ref.current && ref.current.show();
  else ref.current && ref.current.close();

  // const clickHandler = (e) => {
  //   setOpen((open) => !open);
  // };

  return (
    <div onMouseDown={(e) => e.stopPropagation()}>
      <button onMouseDown={handleIconClick}>
        <div className="flex flex-row">
        <img
          className="w-8 h-8 rounded-full mt-2"
          alt="Notifications"
          src={NotificationIcon}
        />
        <div className="flex flex-col cols-2">
        {newNotificationsCount > 0 && (
          <span className=" bg-red-500 text-white rounded-full px-1">
            {newNotificationsCount}
          </span>
        )}
        </div>
        </div>
      </button>
      <dialog ref={ref} className="h-96 absolute left-auto p-0 w-96 rounded-lg">
        <NotificationPage />
      </dialog>
    </div>
  );
}
