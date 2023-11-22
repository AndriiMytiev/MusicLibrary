import "./styles.scss";
import {observer} from "mobx-react-lite";
import home from "../../../assets/icons/home.svg";
import arrow from "../../../assets/icons/link-arrow.svg";
import {NavLink, useLocation} from "react-router-dom";
import {useMemo} from "react";
import {getPathName} from "../../../utils/navigation";

interface SectionHeaderProps {
    title: string,
}

export const SectionHeader = observer((props: SectionHeaderProps) => {
    const {title} = props;
    
    const location = useLocation();
    
    const path = useMemo(() => {
        return location.pathname
            .split("/")
            .filter(Boolean)
            .map(el => el.charAt(0).toUpperCase() + el.slice(1))
            .map(el => el.replace(/_/g, ' '));
    }, [location.pathname])
    
    const getPath = (pathArr: string[], index: number): string => {
        let newPath = "";
        for (let i = 0; i <= index; i++) {
            newPath += getPathName(pathArr[i]);
        }
        return newPath;
    }

    return (
        <div className="SectionHeader">
            <div className="title">
                <p>{title}</p>
                <div className="navLinks">
                    <img src={home} alt="home"/>
                    {path.map((el, index) => {
                        return (
                            <div>
                                <img src={arrow} alt="arrow" className="arrow"/>
                                <NavLink to={getPath(path, index)}>
                                    {el}
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="line"/>
        </div>
    )
})