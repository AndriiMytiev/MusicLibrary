export interface IconProps {
    name: IconName | (string & {});
    color?: string;
    opacity?: number;
    size?: number | string;
}

export type IconName =
    | "header-logo";
