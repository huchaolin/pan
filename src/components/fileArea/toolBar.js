import { Upload, message, Button, Icon, Progress } from 'antd';
import { Menu, Dropdown, Input } from 'antd';
import React, { Component } from 'react';
// import Dragupload from './dragUpload';
import api from '../ducks/api';
import axios from '../ducks/axios'

const Search = Input.Search;

class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            p: -1
        };
    }
    handleBeforeUpload = (file) => {
        var that = this;
        var storeAs = `/abc/${file.name}`;
        console.log(file.name + ' => ' + storeAs);
        axios.post(api.sts, {}).then(function (response) {
            var result = response.data;
            var client = new OSS.Wrapper({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-hangzhou.aliyuncs.com',
                bucket: 'bulibuli-pan'
            });
            client.multipartUpload(storeAs, file, {
                progress:function (p) {
                    return function (done) {
                    p = (p * 100).toFixed(2);
                    console.log('p', p);
                    that.setState({p: parseFloat(p)});
                    done();
                    };
                  }
            }).then(function (result) {
                console.log(result);
                that.setState({p: -1});
                message.success('上传成功');
                axios.post(api.createFile, {
                    name: file.name,
                    prefix: '/abc/',
                    size: file.size
                }).then(() => (that.props.getData()));
            }).catch(function (err) {
                console.log(err);
            });
        });

        return false;
    };

    deleteData = () => {
        let that = this;
        let deleteID = this.props.selectData.join(',');
        axios.post(api.delete,{id:deleteID}).then(({data}) => {
            that.props.getData();
        }).catch(error => console.log(error))
    }
    
    render() {
        return (
            <div style={{ overflow: 'hidden' }}>
                
                <div style={{ float: 'left'}}>
                    <Upload  beforeUpload={this.handleBeforeUpload}>
                        <Button icon="upload">
                            上传文件
                        </Button>
                    </Upload>
                </div>
                <div  style={{ float: 'left', paddingLeft:'10px'}}> 
                    <Button icon="delete" onClick={this.deleteData}>
                    删除
                    </Button>
                </div>
                <div style={{ float: 'left', width: "300px", padding:'4px 10px'}}>
                {
                    this.state.p > -1 ? <Progress percent={this.state.p} status="active" /> : null
                }
                </div>
                {/* <div style={{ float: 'right' }}>
                    <div style={{ display: 'inline-block' }}>
                        {
                           this.props.mode === 'table' ? (<Button icon='appstore-o' onClick={this.props.changeMode} ></Button>) :
                                (<Button icon="bars" onClick={this.props.changeMode}></Button>)
                        }
                    </div>
                </div> */}
            </div>
        )
    }
}
export default Toolbar;



