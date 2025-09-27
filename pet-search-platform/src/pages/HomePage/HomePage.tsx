import {Button, LinkButton} from "@components/Button";
import {Spinner} from "@components/Spinner";
import {Icon} from "@components/Icon";
import {Checkbox, FileUpload, Password, RadioGroup, Select, Text} from "@components/Input";
import {TextArea} from "@components/Input";
import {DatePicker} from "@components/Input";
import {Searcher} from "@layouts/Searcher";
import {TabList} from "@layouts/TabList";
import type {ListItem} from "@layouts/TabList/TabList.tsx";
import {Modal} from "@components/Modal";
import {useState} from "react";
import {Notification} from "@components/Notification";
import {Pagination} from "@components/Pagination";
import {PetCard} from "@components/PetCard";

export const HomePage = () => {

    const errorIcon = <Icon name={"errorTriangle"}/>
    const successIcon = <Icon name={"successCircle"}/>

    const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    // @ts-ignore
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

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

            <DatePicker label={"date"} placeholder={"date"} required/>
            <DatePicker label={"date"} placeholder={"date"} required disabled/>
            <DatePicker label={"date"} placeholder={"date"} required success icon={successIcon}/>
            <DatePicker label={"date"} placeholder={"date"} required error icon={errorIcon}/>

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

            <Modal isOpen={false} onClose={() => setIsModalOpen(false)}>
                <Password label={"password"} placeholder={"password"} required/>
                <Password label={"password"} placeholder={"password"} required/>
                <Button isPrimary={false}>Выйти</Button>
            </Modal>

            <Notification message={"Twenty on pilots Twenty on pilots Twenty on pilots Twenty on pilots"} status={"error"}/>
            <Notification message={"Twenty on pilots Twenty on pilots Twenty on pilots Twenty on pilots"} status={"success"}/>

            <Pagination currentPage={currentPage} totalPages={10} onPageChange={setCurrentPage}/>

            <FileUpload label={"Картинки котов"} />
            <FileUpload label={"Картинки котов"} required/>
            <FileUpload label={"Картинки котов"} disabled/>
            <FileUpload label={"Картинки котов"} success/>
            <FileUpload label={"Картинки котов"} error/>

            <LinkButton to={"/page"}>link link link</LinkButton>
            <LinkButton to={"/page"} isPrimary>link link link</LinkButton>

            <PetCard name={'Китти'} breed={"Британский кот"}
                     disappearanceDate={new Date(2025, 8, 27)} city={"Минск"}/>
            <PetCard name={'Китти'} breed={"Британский кот"}
                     disappearanceDate={new Date(2025, 8, 23)} city={"Мозырь"} imageUrl={"dsf"}/>
            <PetCard name={'Барсик'} breed={"Британский кот"}
                     disappearanceDate={new Date(2025, 8, 21)} city={"Пинск"} imageUrl={"" +
                "https://camo.githubusercontent.com/1ac4f2e377db1c1a209a4ee1a2c489917e751521a550165b431f64b36e8df6b1/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f37652f31622f66642f37653162666431313931313132353333666539383732656634373339383832332e6a7067"}/>
        </div>
    );
};

export default HomePage;