import React, { Component } from 'react';
import { Card, Avatar, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import './test-list.less';

const { Meta } = Card;

@inject("store")
export default class TestList extends Component {
    render() {
        const store = this.props.store;
        var tests = new Set(store.user.tests);
        var testA, testB, testC, testD;
        
        if(tests.has('A') && tests != undefined){
            testA = 
            <Card
            style={{ width: 450, marginTop: 16 }}
            extra={
                <Button type="primary">
                    Take Test
                </Button>
            }
            title="Test A"
        >
            <Meta
                avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>A</Avatar>
                }
                description="This is the description"
            />
        </Card>
        };
        if(tests.has('B') && tests != undefined){
            testB = 
            <Card
            style={{ width: 450, marginTop: 16 }}
            extra={
                <Button type="primary">
                    Take Test
                </Button>
            }
            title="Test B"
        >
            <Meta
                avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>B</Avatar>
                }
                description="This is the description"
            />
        </Card>
        };
        if(tests.has('C') && tests != undefined){
            testC = 
            <Card
            style={{ width: 450, marginTop: 16 }}
            extra={
                <Button type="primary">
                    Take Test
                </Button>
            }
            title="Test C"
        >
            <Meta
                avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>C</Avatar>
                }
                description="This is the description"
            />
        </Card>
        };
        if(tests.has('D') && tests != undefined){
            testD = 
            <Card
            style={{ width: 450, marginTop: 16 }}
            extra={
                <Button type="primary">
                    Take Test
                </Button>
            }
            title="Test D"
        >
            <Meta
                avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>D</Avatar>
                }
                description="This is the description"
            />
        </Card>
        };
        return(  
            <div>
            <div>{testA}</div>
            <div>{testB}</div>
            <div>{testC}</div>
            <div>{testD}</div>
            </div> 
        )
    }
}