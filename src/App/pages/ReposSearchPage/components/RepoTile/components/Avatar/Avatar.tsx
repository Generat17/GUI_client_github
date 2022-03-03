import React from "react";

import './Avatar.scss';

type AvatarProps = {
    src: string;
    alt: string;
    letter: string;
};

type RenderImgProps = {
    src: string;
    alt: string;
};

const RenderImg: React.FC<RenderImgProps> = ({src, alt}) => {
    if (src === '') {
        return (
            <div>
                {/* Я не стал выносить сюда render заглушки, потому что может быть ситуация,
                что ссылка пришла, но она битая. Поэтому я всегда рэндерю заглушку, а уже поверх нее картинку*/}
            </div>
        );
    } else {
        return (
            <div className="card__avatar__img-background">
                <img className="card__avatar__img" src={src} alt={alt}/>
            </div>
        );
    }
};

const Avatar: React.FC<AvatarProps> = ({src, alt, letter}) => {
    return (
        <div className="card__avatar">

            <div className="card__text-avatar">{letter.toUpperCase()}</div>

            <RenderImg src={src} alt={alt}/>

        </div>
    );
};

export default Avatar;