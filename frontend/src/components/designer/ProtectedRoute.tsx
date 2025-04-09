import {Navigate, Outlet} from "react-router";
import {AppUser} from "../../types/appuser/AppUser.ts";

type Props = {
    user: AppUser | undefined | null
}
export default function ProtectedRoute(props: Readonly<Props>) {
    if (props.user === undefined) {

        return <div>You're not authorized to view this page</div>

    }
    return props.user && props.user.role === "USER" ? <Outlet /> : <Navigate to = {"/designer/dashboard"} />

}