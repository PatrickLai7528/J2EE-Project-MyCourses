import * as React from "react";
import {IReleasement} from "../../types/entities";
import {Button, Card} from "antd";
import MarkdownGenerator from "../../utils/MarkdownGenerator";

const ReactMarkdown = require('react-markdown');

export interface ICourseDisplayProps {
    releasementList: IReleasement[],
    isLoading: boolean
    sendSelectAction: (releasement: IReleasement) => void
}

const ReleasementDisplay: React.FunctionComponent<ICourseDisplayProps> = (props: ICourseDisplayProps) => {
    return (
        <div>
            {
                props.releasementList.map((releasement: IReleasement) => {
                    return (
                        <div key={releasement.rid}>
                            <Card
                                style={{width: 300, marginTop: 16}}
                                actions={[<Button htmlType="button" onClick={() => {
                                    props.sendSelectAction(releasement)
                                }}>選課</Button>]}
                            >
                                <Card.Meta
                                    description={<ReactMarkdown escapeHtml={false}
                                                                source={MarkdownGenerator.generateFromReleasement(releasement)}
                                    />}
                                />
                            </Card>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ReleasementDisplay;