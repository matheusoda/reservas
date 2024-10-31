import { useState } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { useAuth } from "../context/AuthContext";

export default function SidebarComponent({ children }: { children: React.ReactNode }) {
    const [expanded, setExpanded] = useState<boolean>(true);
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout(); // Chama a função de logout
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div className="app-container flex">
            <div
                className={`sidebar transition-all duration-300 border-right-1 surface-border ${expanded ? "w-64" : "w-16"}`}
            >
                <div className="flex flex-col h-full">
                    <div className={`flex justify-between ${expanded ? "px-4 pt-3" : "pt-3"}`}>
                        {expanded && (
                            <span className="inline-flex align-items-center gap-2">
                                <span className="font-semibold text-2xl text-primary mx-4">Menu</span>
                            </span>
                        )}
                        <Button
                            type="button"
                            icon={expanded ? "pi pi-angle-left" : "pi pi-angle-right"}
                            className={`p-button-text p-button-rounded ${expanded ? "" : "ml-4"}`}
                            onClick={() => setExpanded(!expanded)}
                        />
                    </div>

                    <div className="overflow-y-auto">
                        <ul className="list-none p-3 m-0">
                            <li>
                                <ul className="list-none p-0 m-0 overflow-hidden">
                                    <li>
                                        <Tooltip target=".custom-target-home" />
                                        <a
                                            data-pr-tooltip={expanded ? "" : "Home"}
                                            data-pr-position="right"
                                            data-pr-my="left center-2"
                                            onClick={() => navigate('/')}
                                            className="
                                                custom-target-home 
                                                p-ripple 
                                                flex 
                                                align-items-center 
                                                cursor-pointer 
                                                p-3 
                                                border-round 
                                                text-700 
                                                hover:surface-100 
                                                transition-duration-150 
                                                transition-colors 
                                                w-full
                                            "
                                        >
                                            <i className="pi pi-home mr-2 mt-[0.15rem]"></i>
                                            {expanded && <span className="font-medium">Home</span>}
                                        </a>
                                    </li>
                                    <li>
                                        <Tooltip target=".custom-target-menu" />
                                        <a
                                            data-pr-tooltip={expanded ? "" : "Cardápio"}
                                            data-pr-position="right"
                                            data-pr-my="left center-2"
                                            onClick={() => navigate('/menu')}
                                            className="
                                                custom-target-menu
                                                p-ripple 
                                                flex 
                                                align-items-center 
                                                cursor-pointer 
                                                p-3 
                                                border-round 
                                                text-700 
                                                hover:surface-100 
                                                transition-duration-150 
                                                transition-colors 
                                                w-full
                                            "
                                        >
                                            <i className="pi pi-list mr-2 mt-[0.15rem]"></i>
                                            {expanded && <span className="font-medium">Cardápio</span>}
                                        </a>
                                    </li>
                                    <li>
                                        <Tooltip target=".custom-target-reserva" />
                                        <a
                                            data-pr-tooltip={expanded ? "" : "Reservas"}
                                            data-pr-position="right"
                                            data-pr-my="left center-2"
                                            onClick={() => navigate('/reservas')}
                                            className="
                                                custom-target-reserva
                                                p-ripple 
                                                flex 
                                                align-items-center 
                                                cursor-pointer 
                                                p-3 
                                                border-round 
                                                text-700 
                                                hover:surface-100 
                                                transition-duration-150 
                                                transition-colors 
                                                w-full
                                            "
                                        >
                                            <i className="pi pi-calendar-clock mr-2 mt-[0.15rem]"></i>
                                            {expanded && <span className="font-medium">Reservas</span>}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto p-3">
                        <Tooltip target=".custom-target-logout" />
                        <a
                            onClick={handleLogout}
                            data-pr-tooltip={expanded ? "" : "Logout"}
                            data-pr-position="right"
                            data-pr-my="left center-2"
                            className="
                                custom-target-logout
                                p-ripple 
                                flex 
                                align-items-center 
                                cursor-pointer 
                                p-3 
                                border-round 
                                text-700 
                                hover:surface-100 
                                transition-duration-150 
                                transition-colors 
                                w-full
                            "
                        >
                            <i className="pi pi-sign-out custom-target-logout mt-[0.15rem]"></i>
                            {expanded && <span className="font-medium ml-16">Logout</span>}
                        </a>
                    </div>
                </div>
            </div>

            {/* Conteúdo principal ajustado */}
            <div
                className="main-content flex-grow p-4 transition-all duration-300 ml-12"
            >
                {children}
            </div>
        </div>
    );
}







// import { useState } from "react";

// // import { Avatar } from "primereact/avatar";
// import { Button } from "primereact/button";
// // import { Sidebar } from "primereact/sidebar";
// // import { useParams } from "react-router-dom";

// export default function SidebarComponent({ children: any }) {
//     const [expanded, setExpanded] = useState<boolean>(true);
//     return (


//         <div className="app-container flex">
//             <div
//                 className={`sidebar transition-all duration-300 border-right-1 surface-border ${expanded ? "w-64" : "w-16"
//                     }`}
//             >
//                 <div className="flex flex-col h-full">
//                     <div className={`flex justify-between  ${expanded ? "px-4 pt-3" : "pt-3"}`}>
//                         {expanded && (
//                             <span className="inline-flex align-items-center gap-2">
//                                 <span className="font-semibold text-2xl text-primary mx-4">Menu</span>
//                             </span>
//                         )}
//                         <Button
//                             type="button"
//                             icon={expanded ? "pi pi-angle-left" : "pi pi-angle-right"}
//                             className={`p-button-text p-button-rounded ${expanded ? "" : "ml-4"}`}
//                             onClick={() => setExpanded(!expanded)}
//                         />
//                     </div>

//                     <div className="overflow-y-auto">
//                         <ul className="list-none p-3 m-0">
//                             <li>
//                                 <ul className="list-none p-0 m-0 overflow-hidden">
//                                     <li>
//                                         <a className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full">
//                                             <i className="pi pi-home mr-2 mt-[0.15rem]"></i>
//                                             {expanded && <span className="font-medium">Dashboard</span>}
//                                         </a>
//                                     </li>
//                                     {/* Outros itens do menu */}
//                                 </ul>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* <div className="mt-auto">
//                         <hr className="mb-3 mx-3 border-top-1 border-none surface-border" />
//                         <a className="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
//                             <Avatar
//                                 image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
//                                 shape="circle"
//                             />
//                             {expanded && <span className="font-bold">Amy Elsner</span>}
//                         </a>
//                     </div> */}
//                 </div>
//             </div>

//             {/* Conteúdo principal ajustado */}
//             <div
//                 className={`main-content flex-grow p-4 transition-all duration-300 ml-16`}
//             >
//                 {/* Conteúdo principal aqui */}
//                 {children}
//             </div>
//         </div>
//     )
// }