import HostHeader from "./HostHeader"
import { Outlet } from "react-router-dom"

export default function HostLayout() {
    return (
        <>
            <HostHeader />
            <Outlet />
        </>

    )
}
