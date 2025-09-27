import {Button} from "@components/Button";
import {Spinner} from "@components/Spinner";
import {Icon} from "@components/Icon";
import {Checkbox, Password, RadioGroup, Select, Text} from "@components/Input";
import {TextArea} from "@components/Input";
import {Date} from "@components/Input";
import {Searcher} from "@layouts/Searcher";
import {TabList} from "@layouts/TabList";
import type {ListItem} from "@layouts/TabList/TabList.tsx";
import {Modal} from "@components/Modal";
import {useState} from "react";

export const HomePage = () => {

    const errorIcon = <Icon name={"errorTriangle"}/>
    const successIcon = <Icon name={"successCircle"}/>

    const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const [isModalOpen, setIsModalOpen] = useState(true);

    const items: ListItem[] = [
        { label: "Британский кот", count: 10 },
        { label: "Собака хаски", count: 20 },
        { label: "Сфинкс", count: 5 },
        { label: "Немецкая овчарка", count: 15 },
        { label: "Шотландская вислоухая", count: 8 },
        { label: "Мейн-кун", count: 12 },
        { label: "Лабрадор ретривер", count: 18 },
    ];

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

            <Text placeholder={"текст..."} label={"подпись"} required title={"fff"} list={"data"}/>
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

            <Select label={"select"} options={options} required/>
            <Select label={"select"} options={options} required disabled/>
            <Select label={"select"} options={options} required icon={successIcon}/>
            <Select label={"select"} options={options} required icon={errorIcon}/>

            <RadioGroup name={'dfd'} label={"Радио группа"} items={[
                {value: "kfnsj", label: "dsfsf"},
                {value: "sdd", label: "sdads"},
                {value: "dsdf", label: "sssss"},
                {value: "dsfsdf", label: "nnnnn"},
                {value: "sfddfdf", label: "aaaaa"},
            ]}/>

            <Checkbox label={"checkbox"} required/>

            <Searcher/>

            <TabList listTitle={"Вид животного"} items={items} activeItem={items[1]}/>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Password label={"password"} placeholder={"password"} required/>
                <Password label={"password"} placeholder={"password"} required/>
                <Button isPrimary={false}>Выйти</Button>
            </Modal>
        </div>
    );
};

export default HomePage;