import React, { Component } from 'react';
import { Card, Avatar, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import './test-list.less';
import axios from 'axios';
import tmp from '../app/specs/quizzes/*.json';

const { Meta } = Card;

@inject("store")
export default class TestList extends Component {
    render() {
        const store = this.props.store;
        let tests;
        if(store.user.online){
            axios.get('http://gabriels-macbook.local:3000/users/'+store.user.id+'/open').then(response => {
            tests=response;
            })
        } else {
             tests = store.user.tests.filter(x => !store.user.taken.includes(x));
             console.log(tests);
             let tmp2=[];
             tests.forEach(element => {
                Object.keys(tmp).forEach(
                    key => {
                        if(element == key){
                            console.log(key);
                            tmp2.push(tmp[key]);
                        }
                    }
                )
             });
             console.log(tmp2);
        }
        

        var renderedOutput = tests.map(test => 
            <Card
            style={{ width: 450, marginTop: 16 }}
            extra={
                <Button type="primary">
                    Take Test
                </Button>
            }
            title={test} 
        >
            <Meta
                avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>A</Avatar>
                }
                description="seas"
            /> 
        </Card>
        );

        return(  
            <div>
            {renderedOutput}
            </div> 
        )
    }
}