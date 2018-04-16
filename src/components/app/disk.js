import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Badge, Avatar } from 'antd';
import Userbar from '../userBar/userBar.js';
import Allfiles from '../fileArea/allFile';
import WrappedNormalLoginForm from '../loginPage/loginPage'; 
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Home =({match}) => (
<Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['allfiles']}
          style={{ height: '100%', borderRight: 0 }}
        >
            <Menu.Item key="allfiles"><Link to='/disk'><span><Icon type="file" />全部文件</span></Link></Menu.Item>
            <Menu.Item key="pic"><Link to="/disk/pic">图片</Link></Menu.Item>
            <Menu.Item key="doc"><Link to="/disk/doc">文档</Link></Menu.Item>
            <Menu.Item key="bt"><Link to="/disk/bit">种子</Link></Menu.Item>
            <Menu.Item key="music"><Link to="/disk/music">音乐</Link></Menu.Item>
            <Menu.Item key="others"><Link to="/disk/others">其它</Link></Menu.Item>
            <Menu.Item key="myshare"><Link to="/disk/myshare"><span><Icon type="share-alt" />我的分享</span></Link></Menu.Item>
            <Menu.Item key="delete"><Link to="/disk/delete"><span><Icon type="delete" />回收站</span></Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        {/* {<Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>} */}
        <Content style={{ background: '#fff', padding:"10px 24px", margin: 0, minHeight: 280 }}>
        <Switch>
          <Route path="/disk/pic" component={()=>(<div>pic</div>)}/>
          <Route path="/disk/doc" component={()=>(<div>doc</div>)}/>
          <Route path="/disk/bit" component={()=>(<div>bit</div>)}/>
          <Route path="/disk/music" component={()=>(<div>music</div>)}/>
          <Route path="/disk/others" component={()=>(<div>others</div>)}/>
          <Route path="/disk/myshare" component={()=>(<div>myshare</div>)}/>
          <Route path="/disk/delete" component={()=>(<div>delete</div>)}/>
          <Route path="/disk" component={Allfiles}/>
        </Switch>
        
        </Content>
      </Layout>
  </Layout>
)

export default props =>        <Layout>
          <Header className="header">
          <div className="logo" style={{float:'left', height:'100%', width:'15%'}} />
            <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px', float:'left' }}
            >
                <Menu.Item key="1"><Link to="/disk">网盘</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/disk/share">分享</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/disk/more">更多</Link></Menu.Item>
            </Menu>
            <Userbar {...props} />
          </Header>
          <Switch>
              <Route path="/disk/share" component={() => (<div>share</div>)}/>
              <Route path="/disk/more" component={() => (<div>more</div>)}/>
              <Route path="/disk" component={Home}/>
          </Switch>
        </Layout>