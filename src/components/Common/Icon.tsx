import { useEffect, useRef, useState } from "react";
import { IconProps } from "../../types/icon";

// https://www.flaticon.com/search?author_id=1&style_id=1&type=standard&word=tools

const Icon = (props: IconProps) => {
    const { name, color = "#fff", size = "30px", opacity = 1 } = props;
    const svgIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const importIcon = async () => {
            try {
                setIsLoaded(false);
                svgIconRef.current = (
                    await import(`../../assets/icons/${name}.svg`)
                ).ReactComponent;
            } catch (e) {
                console.log("Error importing icon:", e);
            } finally {
                setIsLoaded(true);
            }
        };
        importIcon();
    }, [name]);

    if (isLoaded && svgIconRef.current) {
        const SvgIcon = svgIconRef.current;
        return (
            <SvgIcon fill={color} width={size} opacity={opacity} height={size} />
        );
    }
    return null;
};

export default Icon;
