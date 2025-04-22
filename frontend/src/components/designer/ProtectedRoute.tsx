import {Navigate, Outlet, useNavigate} from "react-router";
import {AppUser} from "../../types/appuser/AppUser.ts";

type Props = {
    user: AppUser | undefined | null
}
export default function ProtectedRoute(props: Readonly<Props>) {
    const navigate = useNavigate();
    if (props.user === undefined) {

        return (
            <>
                <div>You're not authorized to view this page</div>
                <div>
                    <button onClick={() => navigate("/login")}>Login as Designer</button>
                </div>
            </>)

    }
    return props.user && props.user.role === "USER" ? <Outlet /> : <Navigate to = {"/designer/dashboard"} />

}