import {Route, Routes} from "react-router-dom";
import {HomePage} from "@pages/HomePage";
import {Navigate} from "react-router";
import {AboutPage} from "@pages/AboutPage";
import {ProfilePage} from "@pages/ProfilePage";

export const UserRoutes = () => {
    return (<Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>)
}
