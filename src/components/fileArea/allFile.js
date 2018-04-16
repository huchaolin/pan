import React, { Component } from 'react';
import Filetable from './filetable';
import Toolbar from './toolBar';
import Filegrid from './fileGrid';
import axios from '../ducks/axios';
import api from '../ducks/api';


class Allfiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'table',
            data: [],
            selectData: [],
            pagination: {}
        }
        this.changeMode = this.changeMode.bind(this);
    }
    changeMode = () => {
        const mode = this.state.mode;

        if (mode == 'table') {
            this.setState({
                mode: 'grid'
            });
        }
        else {
            this.setState({
                mode: 'table'
            });
        }
    }
    getSelectData = (arr) => {
        this.setState({selectData:arr});
    }
    getData = (page = 1) => {
        const GB = 1024 * 1024 * 1024;
        const MB = 1024 * 1024;
        const KB = 1024;
        axios.post(api.file, {
            prefix:'/abc/',
            page: page
        }).then(({data}) => {
            let arr = data.result;
            console.log(arr)
            arr.forEach(o => {
                o.size = o.size > GB ? (o.size/GB).toFixed(2) + " GB" :
                         o.size > MB ? (o.size/MB).toFixed(2) + " MB" :
                         (o.size/KB).toFixed(2) + " KB";
                let date = new Date(o.createdAt);
                let year = date.getFullYear();
                let month  = date.getMonth() + 1;
                let day = date.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                o.createdAt = `${year}-${month}-${day}`;
            o.name.replace(/(.*)\.\S*/,($0, $1) => {
                o.name1  = $1;
              });
            });
            const pagination = {
                current: data.page,
                total: data.totalCount
            };

            this.setState({
                data: data.result,
                pagination
            })
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.getData(pagination.current);
    }

    render() {
        const mode = this.state.mode;
        return (
            <div>
                <div style= {{paddingBottom: "10px"}}>
                    <Toolbar  getData={this.getData} mode={mode} changeMode={this.changeMode}
                            selectData ={this.state.selectData}
                    />
                </div>
                <div>
                    {
                        mode == 'table' ? <Filetable
                                getData={this.getData}
                                dataSource={this.state.data} 
                                getSelectData={this.getSelectData}
                                pagination={this.state.pagination}
                                onTableChange={this.handleTableChange}
                            /> 
                            :
                            <Filegrid  
                                getData={this.getData}
                                dataSource={this.state.data}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default Allfiles;
