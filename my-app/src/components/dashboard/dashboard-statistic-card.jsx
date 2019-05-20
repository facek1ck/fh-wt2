import React from 'react';
import { Card, Progress } from 'antd';

const StatisticCard = (props) => {
    return(
        <Card
        title="Question" 
        style={{ width: 500 }}
        >
            <Progress percent={100} />
            <Progress percent={50} status="active" />
            <Progress percent={70} status="exception" />
        </Card>
    )

}

export default StatisticCard;