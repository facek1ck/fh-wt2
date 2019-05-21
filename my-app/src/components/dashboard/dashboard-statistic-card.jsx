import React from "react";
import { Card, Progress } from "antd";

const StatisticCard = props => {
  const all = props.results.correct + props.results.false;
  const correct = parseFloat(((props.results.correct / all) * 100).toFixed(2));
  const falseAnsw = parseFloat(((props.results.false / all) * 100).toFixed(2));
  return (
    <Card title={props.name} style={{ width: 500 }}>
      <Progress percent={correct} />
      <Progress percent={falseAnsw} status="exception" />
    </Card>
  );
};

export default StatisticCard;
