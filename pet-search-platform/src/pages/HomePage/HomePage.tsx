import {Button} from "@components/Button";
import {Spinner} from "@components/Spinner";
import {Icon} from "@components/Icon";
import {Password, Text} from "@components/Input";
import {TextArea} from "@components/Input";
import {Date} from "@components/Input";

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
            <Icon name={"eye"} size={80} color={'black'} hoverColor={'black'}/>

            <Text placeholder={"текст..."} label={"подпись"} required title={"попа"}/>
            <Text placeholder={"текст..."}/>
            <Text error icon={errorIcon} placeholder={"текст..."} />
            <Text error icon={errorIcon} placeholder={"текст..."} label={"подпись"} required/>
            <Text success icon={successIcon} placeholder={"текст..."}/>
            <Text success icon={successIcon} placeholder={"текст..."} label={"подпись"}/>
            <Text disabled label={"подпись"} placeholder={"текст..."}/>

            <TextArea placeholder={"текстареа..."} required label={"label"}/>
            <TextArea placeholder={"текстареа..."} disabled/>

            <Password label={"password"} placeholder={"password"} required/>
            <Password label={"password"} placeholder={"password"} required disabled/>
            <Password label={"password"} placeholder={"password"} required success icon={successIcon}/>
            <Password label={"password"} placeholder={"password"} required error icon={errorIcon}/>

            <Date label={"date"} placeholder={"date"} required/>
            <Date label={"date"} placeholder={"date"} required disabled/>
            <Date label={"date"} placeholder={"date"} required success icon={successIcon}/>
            <Date label={"date"} placeholder={"date"} required error icon={errorIcon}/>

        </div>
    );
};

export default HomePage;