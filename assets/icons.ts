type IconsInnerType = { [name: string]: string };
const prepareIconsType = <T extends IconsInnerType>(config: T): T => config;

const icons = prepareIconsType({
    ArrowUp: 'icon-park-solid:up-one',
    ArrowDown: 'icon-park-solid:down-one',
    LeftArrow: 'mingcute:left-line',
    RightArrow: 'mingcute:right-line',
    DoubleLeftArrow: 'icon-park-outline:double-left',
    DoubleRightArrow: 'icon-park-outline:double-right',
});

export type IconsType = keyof typeof icons;
export default icons;
