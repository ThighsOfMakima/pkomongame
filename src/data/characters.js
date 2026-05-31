import DashAbility from "../abilities/Dash.js";
import BreakWall from "../abilities/BreakWall.js";
import MagnetAbility from "../abilities/Magnet.js";
import Shield from "../abilities/Shield.js";
import SlowZone from '../abilities/SlowZone.js';
import LewdyvoirSP from "../abilities/LewdyvoirSP.js";
import Zhurba from "../abilities/Zhurba.js";
import Tupozaur from "../abilities/Tupozaur.js";
const CHARACTERS = [
    {
        id: 'ludomewt',
        name: 'Лудомяут',
        activeSkillName: 'Додеп',
        activeSkillDuration: 3,
        activeSkillDesc: 'Швидкогроші - не *** в рота. Бери, не бійся',
        activeSkillFunc: MagnetAbility,
        charSprite: 'ludomyaut',
        skillColor: '#ffd700',
        hidden: false
    },
    {
        id: 'squirtle',
        name: 'Сквіртл',
        activeSkillName: 'Щит',
        activeSkillDuration: 2,
        activeSkillDesc: 'Це явно не водичка :D',
        activeSkillFunc: Shield,
        charSprite: 'skvirtl',
        skillColor: 'lightblue',
        hidden: false,
    },
    {
        id: 'zradozard',
        name: 'Зрадозард',
        activeSkillName: 'Вибух зради',
        activeSkillDuration: 2,
        activeSkillDesc: 'ІПСО! ІПСО! БОТОФЕРМА! Пробиває перешкоду перед собою.',
        activeSkillFunc: BreakWall,
        charSprite: 'zradozard',
        skillColor: '#ef7375',
        hidden: false,
    },
    {
        id: 'panicduck',
        name: 'Панікдак',
        activeSkillName: 'Ривок!',
        activeSkillDuration: 2,
        activeSkillDesc: 'ШВИДКО ШВИДКО БІГОМ! Робить різкий ривок на 3 клітинки в напрямку руху.!',
        activeSkillFunc: DashAbility,
        charSprite: 'panikdak',
        skillColor: '#f4d7a2',
        hidden: false,
    },
    {
        id: 'PTSDchu',
        name: 'ПТСРчу',
        activeSkillName: 'Флешбек',
        activeSkillDuration: 2,
        activeSkillDesc: 'Коли видув 5 нонстопів підряд а штурм відмінили.',
        activeSkillFunc: SlowZone,
        charSprite: 'ptsrchu',
        skillColor: '#ffd700',
        hidden: false,
    },
    {
        id: 'zhurbandr',
        name: 'Журбндер',
        activeSkillName: 'Журба вбиває.',
        activeSkillDuration: 2,
        activeSkillDesc: 'Журба таки вбиває',
        activeSkillFunc: Zhurba,
        charSprite: 'zhurbnder',
        skillColor: '#ef7375',
        hidden: false
    },
    {
        id: 'tuposaur',
        name: 'Тупозавр',
        activeSkillName: 'Роздуплився',
        activeSkillDuration: 2,
        activeSkillDesc: 'Постійно тупить',
        activeSkillFunc: Tupozaur,
        charSprite: 'tupozavr',
        skillColor: '#d1f2bf',
        hidden: false
    },
    // {
    //     id: 'lewdyvoir',
    //     name: 'Хтивковуар',
    //     activeSkillName: 'Кульки!',
    //     activeSkillDuration: 5,
    //     activeSkillDesc: 'Кульки сподобались не лише Тренеру',
    //     activeSkillFunc: LewdyvoirSP,
    //     charSprite: 'lewdyvoir',
    //     skillColor: '#75BA72',
    //     hidden: true
    // }
]

export default CHARACTERS