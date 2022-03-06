import React from "react";

import {RepoItemModel} from "@store/models/gitHub";
import { Link } from 'react-router-dom';

import './RepoTile.scss';

import Avatar from './components/Avatar';
import StarIcon from "./components/Avatar/components/StarIcon";


type RepoTileProps = {
    item: RepoItemModel;
    onClick: () => void;
};

const RepoTile: React.FC<RepoTileProps> = ({item, onClick}) => {
    return (
        <div className="card">
            <Avatar src={item.owner.avatarUrl} alt={item.owner.login} letter={item.owner.login[0]}/>
            <div className="card__content">
                <div className="card__user-name">
                    <Link className="card__user-name__link" to={`/repos/${item.id}`}>{item.name}</Link>
                </div>
                <div className="card__company-name"><a href={item.owner.url}>{item.owner.login}</a></div>
                <div className="card__bottom-line">
                    <div className="card__counter-like">
                        <StarIcon/>
                        {item.stargazersCount}
                    </div>
                    <div className="card__date-update">Updated {item.updatedAt.getDay()}-{item.updatedAt.getMonth()}-{item.updatedAt.getFullYear()}</div>
                </div>
            </div>
        </div>
    );
};


export default RepoTile;