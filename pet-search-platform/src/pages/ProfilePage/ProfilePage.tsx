import {useState} from "react";
import {Icon} from "@components/Icon";
import styles from './styles/ProfilePage.module.scss'
import SideMenu, {type TabTypes} from "@layouts/SideMenu/SideMenu.tsx";
import {Header} from "@layouts/Header";
import {Wrapper} from "@layouts/Wrapper";
import {MyPetsTab} from "@pages/ProfilePage/tabs/MyPetsTab/MyPetsTab.tsx";
import {ProfileTab} from "@pages/ProfilePage/tabs/ProfileTab";

const userIcon = <Icon name="userCircle" size={20} color={"gray"}/>;
const pawIcon = <Icon name="petPaw" size={20} color={"gray"}/>;

const sideMenuItems = [
    {
        icon: userIcon,
        title: "Профиль",
        tabKey: "profile"
    } as const,
    {
        icon: pawIcon,
        title: "Мои питомцы",
        tabKey: "pets"
    } as const,
];


export const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState<TabTypes>("profile");

    return (
        <Wrapper>
            <Header/>
            <div className={styles['profile-module']}>
                <SideMenu
                    menuItems={sideMenuItems}
                    activeItem={activeTab}
                    onTabChange={setActiveTab}
                />

                {activeTab === "profile" && (<ProfileTab/>)}
                {activeTab === "pets" && (<MyPetsTab/>)}
            </div>
        </Wrapper>
    );
};
