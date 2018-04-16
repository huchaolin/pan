
import React, { Component } from 'react';
import styles from'./user_bar.css';
import { Badge ,Avatar ,Button, Popover, message} from 'antd';
import axios from '../ducks/axios';
import api from '../ducks/api';

class Userbar extends Component {
  handler = () => {
    axios.post(api.logout).then(({data}) => {
        if (!data.success) {
          return message.error(data.message);
        }
        message.success(data.message);
        // this.props.history.push('/');
        location.href = '/';
    });
  }
  render() {
    const content = (
      <div>
        <Button onClick = {this.handler}>登出</Button>  
      </div>
    );

    return (
      <div className={styles.user_bar}>
          <Popover content={content}>
            <Badge count={1}><Avatar shape="circle" size="default" icon="user" /></Badge>
          </Popover>

          <span>&nbsp;&nbsp;&nbsp;&nbsp;用户名</span>
      </div>
    )
  }
}
export default Userbar;
