import React, { Component } from 'react';
import { Card, Avatar, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import './test-list.less';
import axios from 'axios';
import files from '../app/specs/quizzes/*.json';

const { Meta } = Card;

@inject("store")
export default class TestList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tests: []
        }
    }

    componentDidMount() {
        this.getTests()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.store.online !== this.props.store.online) {
            this.getTests()
        }
    }

    getTests() {
        const { store } = this.props
        if(store.online){
            axios.get('http://gabriels-macbook.local:3000/users/'+store.user.id+'/open').then(response => {
                this.setState({
                    ...this.state,
                    tests: response.data
                })
            //tmp=response.data;
            })
        } else {
            const tests = store.user.tests
                .filter(x => !store.user.taken.includes(x))
                .filter(test => Object.keys(files).includes(test))
                .map(test => files[test])

            this.setState({
                ...this.state,
                tests
            })
        }
    }

    renderTests() {
        return this.state.tests.map(test => 
            <Card
            key={test.name}
            style={{ width: '60%', margin: '30px auto'}}
            extra={
                <Button type="primary">
                    Take Test
                </Button>
            }
            title={test.name} 
        >
            <Meta
                avatar={
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{test.name[0]}</Avatar>
                }
                description={test.description}
            /> 
        </Card>
        );
    }
    render() {
        const tests = this.renderTests()

        return(  
            <div className="tests">
            {tests}
            </div> 
        )
    }
}