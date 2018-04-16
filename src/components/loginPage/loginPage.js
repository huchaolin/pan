import { Form, Icon, Input, Button, Checkbox,message} from 'antd';
import React from 'react';
import {
  Link
} from 'react-router-dom';
import axios from '../ducks/axios';
import styles from './loginPage.css';
import api from '../ducks/api';



const FormItem = Form.Item; 

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
        return;
      }
      axios.post(api.confirmUser, {account:values.userName,password:values.password}).then(({data}) => {
        console.log(data);
        if (!data.success) {
          return message.error(data.message);
        }
        message.success(data.message);
        this.props.history.push('/disk')
        // Router.push('/');
      });
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.outer}>
      <Form  onSubmit={this.handleSubmit} className={styles.login_form}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className={styles.login_form_forgot} href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className={styles.login_form_button}>
            Log in
          </Button>
          Or <Link to="/registerPage">register now!</Link>  
        </FormItem>
      </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default
    WrappedNormalLoginForm
 ;