import {Button} from "@components/Button";
import {Spinner} from "@components/Spinner";
import {Icon} from "@components/Icon";
import {Input} from "@components/Input";

export const HomePage = () => {

    const errorIcon = <Icon name={"errorTriangle"}/>
    const successIcon = <Icon name={"successCircle"}/>

    return (
        <div style={{display: "flex", gap: 10, flexDirection: "column"}}>
            <Button isPrimary={false} disabled>Выйти</Button>
            <Button isPrimary={false}>Выйти</Button>
            <Button isPrimary={true} disabled>Войти</Button>
            <Button isPrimary={true}>Войти</Button>
            <Spinner size={40}/>
            <Spinner size={20} color={'gray'} />
            <Icon name={"userCircle"} size={80} color={'black'} hoverColor={'black'}/>
            <Icon name={"successCircle"} size={80} color={'black'} hoverColor={'black'}/>
            <Icon name={"errorTriangle"} size={80} color={'black'} hoverColor={'black'}/>

            <Input type={"text"}/>
            <Input type={"text"} error={true} icon={errorIcon}/>
            <Input type={"text"} success={true} icon={successIcon}/>
            <Input type={"text"} disabled/>
        </div>
    );
};

export default HomePage;