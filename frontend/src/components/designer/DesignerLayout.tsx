import { Outlet} from "react-router";
import DesignerHeader from "./DesignerHeader.tsx";
import {DesignerProvider} from "../../context/DesignerProvider.tsx";

export default function DesignerLayout() {

    // navigate = useNavigate();
    console.log("In DesignerLayout")

    return (
        <DesignerProvider>
            <DesignerHeader />
            <main>
                <Outlet />
            </main>
        </DesignerProvider>
    );
}