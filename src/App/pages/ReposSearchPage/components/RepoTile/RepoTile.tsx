import React from "react";

import {RepoItem} from '@store/GitHubStore/types';
import { Link } from 'react-router-dom';

import './RepoTile.scss';

import Avatar from './components/Avatar';
import StarIcon from "./components/Avatar/components/StarIcon";

type RepoTileProps = {
    item: RepoItem;
    onClick: () => void;
};

const RepoTile: React.FC<RepoTileProps> = ({item, onClick}) => {
    return (
        <div className="card">
            <Avatar src={item.owner.avatar_url} alt={item.owner.login} letter={item.owner.login[0]}/>
            <div className="card__content">
                <div className="card__user-name">
                    <Link className="card__user-name__link" to={`/repos/${item.id}`}>{item.name}</Link>
                </div>
                <div className="card__company-name"><a href={item.owner.url}>{item.owner.login}</a></div>
                <div className="card__buttom-line">
                    <div className="card__counter-like">
                        <StarIcon/>
                        {item.stargazers_count}
                    </div>
                    <div className="card__date-update">Updated 21 Jul</div>
                </div>
            </div>
        </div>
    );
};


export default RepoTile;