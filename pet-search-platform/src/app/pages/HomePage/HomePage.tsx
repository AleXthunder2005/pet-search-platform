import {Button} from "@components/Button";
import {Spinner} from "@components/Spinner";
import {Icon} from "@components/Icon";
import {Text} from "@components/Input";
import {TextArea} from "@components/Input";

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
            <Icon name={"userCircle"} size={80} color={'black'} hoverColor={'black'} hoverable/>
            <Icon name={"successCircle"} size={80} color={'black'} hoverColor={'black'}/>
            <Icon name={"errorTriangle"} size={80} color={'black'} hoverColor={'black'}/>

            <Text placeholder={"текст..."} label={"подпись"} required title={"попа"}/>
            <Text placeholder={"текст..."}/>
            <Text error icon={errorIcon} placeholder={"текст..."} />
            <Text error icon={errorIcon} placeholder={"текст..."} label={"подпись"} required/>
            <Text success icon={successIcon} placeholder={"текст..."}/>
            <Text success icon={successIcon} placeholder={"текст..."} label={"подпись"}/>
            <Text disabled label={"подпись"} placeholder={"текст..."}/>

            <TextArea placeholder={"текстареа..."} required label={"label"}/>
            <TextArea placeholder={"текстареа..."} disabled/>

            {/*<Input type={"password"} icon={<Icon name={"petPaw"}/> } placeholder={"текст..."} label={"password"}/>*/}
            {/*<Input type={"radio"} error icon={errorIcon} placeholder={"текст..."} label={"radio"}/>*/}
            {/*<Input type={"date"} error icon={errorIcon} placeholder={"текст..."} label={"date"}/>*/}

        </div>
    );
};

export default HomePage;