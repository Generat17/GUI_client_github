import React from "react";

type DescriptionItemProps = {
    title: string;
    content: any;
};

const DescriptionItem: React.FC<DescriptionItemProps> = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);

export default DescriptionItem;