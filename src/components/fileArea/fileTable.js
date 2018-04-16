import { Table, Icon, Divider } from 'antd';
import React, { Component } from 'react';
import axios from '../ducks/axios';
import api from '../ducks/api';

const Pagination = {
  showQuickJumper: true,
  defaultCurrent: 1,
  totoal: 100,
  onChange(pageNumber) {
    console.log('Page: ', pageNumber);
  }
}
const download = (name, prefix) => {
  axios.post(api.download, {path:prefix + name}).then(({data}) => {
    location.href = data.url;
  } )
}

const columns = [{
  title: '文件名',
  dataIndex: 'name',
  key: 'name',
  render(value, row) {
    return <a onClick={() => (download(value, row.prefix))} > {value} </a>
  }
}, {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
  }, {
    title: '日期',
    dataIndex: 'createdAt',
    key: 'date',
  }]

class Filetable extends Component {
  rowSelection() {
    return {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        this.props.getSelectData(selectedRowKeys); 
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
      })
    }
  };

  componentDidMount() {
    this.props.getData();
  }
  render() {
    return (
      <Table rowKey='id'
          rowSelection={this.rowSelection()}
          columns={columns}
          dataSource={this.props.dataSource}
          pagination={this.props.pagination}
          onChange={this.props.onTableChange}
      />
    )
  }
};

export default Filetable;