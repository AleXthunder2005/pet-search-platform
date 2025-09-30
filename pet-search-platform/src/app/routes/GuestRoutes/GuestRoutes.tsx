import {Route, Routes} from "react-router-dom";
import {HomePage} from "@pages/HomePage";
import {Navigate} from "react-router";
import {AboutPage} from "@pages/AboutPage";

export const GuestRoutes = () => {
    return (<Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>)
}

