import { List, Card, Col, Row } from 'antd';
import React, {Component} from 'react';
import axios from '../ducks/axios';
import api from '../ducks/api';



class Filegrid extends Component {
    componentDidMount() {
        this.props.getData();
        console.log(this.props.dataSource)
    }
    render() {
        return (
        <div style={{ background: '#fff', padding: '30px' }}>
            <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6 }}
            dataSource={this.props.dataSource}
            renderItem={item => (
            <List.Item>
                <Card title={item.name1}> {item.name} </Card>
            </List.Item>)}
            />
        </div>)
    }
}
 export default  Filegrid;
