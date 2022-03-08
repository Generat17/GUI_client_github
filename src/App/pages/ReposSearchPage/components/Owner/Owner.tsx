import "./Owner.scss";
import React, {useState} from "react";

import {GitHubRepoOwnerModel} from "@store/models/gitHub";
import {Drawer, Divider, Col, Row} from 'antd';
import 'antd/dist/antd.css';
import {observer} from "mobx-react-lite";

import Avatar from "./components/Avatar";
import DescriptionItem from "./components/DescriptionItem";

type OwnerProps = {
    owner: GitHubRepoOwnerModel;
}

const Owner: React.FC<OwnerProps> = ({owner}) => {

    const [visible, setVisible] = useState<boolean>(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <div className="owner">
                <Avatar src={owner.avatarUrl} alt={owner.login} letter={owner.login[0]}/>
                <div className="content">
                    <div className="content__name">{(owner.name === null) ? owner.login : owner.name}</div>
                    <a className="content__a" onClick={showDrawer}>View Profile</a>
                </div>
            </div>

            <Drawer
                width={640}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <div className="owner">
                    <Avatar src={owner.avatarUrl} alt={owner.login} letter={owner.login[0]}/>
                    <div className="content">
                        <div className="content__name">{owner.login}</div>
                    </div>
                </div>
                <Divider/>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Name" content={owner.name} />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Public repositories" content={owner.publicRepos} />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Location" content={owner.location}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Id" content={owner.id}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Updated at" content={`${owner.updatedAt.getDay()}-${owner.updatedAt.getMonth()}-${owner.updatedAt.getFullYear()}`} />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Created at" content={`${owner.createdAt.getDay()}-${owner.createdAt.getMonth()}-${owner.createdAt.getFullYear()}`} />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Following" content={owner.following}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Followers" content={owner.followers}/>
                    </Col>
                </Row>
                <Divider/>
                <p className="site-description-item-profile-p">Contacts</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Email" content={owner.email}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Twitter" content={owner.twitter}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Blog"
                            content={
                                <a href={owner.blog}>
                                    {owner.blog}
                                </a>
                            }
                        />
                    </Col>
                    <Col span={24}>
                        <DescriptionItem
                            title="GitHub"
                            content={
                                <a href={owner.htmlUrl}>
                                    {owner.htmlUrl}
                                </a>
                            }
                        />
                    </Col>
                </Row>
            </Drawer>
        </>
    );
};

export default observer(Owner);