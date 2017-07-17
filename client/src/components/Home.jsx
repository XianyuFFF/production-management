import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>111
    </Menu.Item>
    <Menu.Item>222
    </Menu.Item>
    <Menu.Item>333
    </Menu.Item>
  </Menu>
);


class Home extends React.Component {
  render() {
    return (
      <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" href="#">
      Hover me <Icon type="down" />
    </a>
  </Dropdown>
    );
  }
}

export default Home