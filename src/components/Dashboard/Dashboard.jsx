import React from 'react';
import { Layout, Menu, Card, Table, Tag, Avatar, Progress } from 'antd';
import { 
  HomeOutlined, 
  UserOutlined, 
  ShoppingCartOutlined, 
  DollarOutlined, 
  LogoutOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SearchOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import './Dashboard.css';

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const dataSource = [
    {
      key: '1',
      customer: 'Jenny Wilson',
      email: 'jenny@example.com',
      product: 'Nike Sport V2',
      price: '$214',
      status: 'completed',
      date: '24.05.2020',
    },
    // Add more rows as needed
  ];

  const columns = [
    {
      title: 'CUSTOMER',
      dataIndex: 'customer',
      key: 'customer',
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Avatar style={{ backgroundColor: '#f56a00' }}>{text.charAt(0)}</Avatar>
          {text}
        </div>
      ),
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'PRODUCT',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed} className="sidebar">
        <div className="logo">
          <h2>{collapsed ? 'A' : 'Admin'}</h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Dashboard',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Users',
            },
            {
              key: '3',
              icon: <ShoppingCartOutlined />,
              label: 'Products',
            },
            {
              key: '4',
              icon: <DollarOutlined />,
              label: 'Orders',
            },
          ]}
        />
        <div className="logout">
          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: '5',
                icon: <LogoutOutlined />,
                label: 'Logout',
              },
            ]}
          />
        </div>
      </Sider>

      <Layout className="site-layout">
        {/* Header */}
        <Header className="site-layout-header">
          <div className="header-left">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggleSidebar,
            })}
            <h2>Dashboard</h2>
          </div>
          <div className="header-right">
            <div className="search-bar">
              <SearchOutlined />
              <input type="text" placeholder="Search..." />
            </div>
            <div className="notifications">
              <BellOutlined />
              <span className="badge">3</span>
            </div>
            <div className="user-profile">
              <Avatar style={{ backgroundColor: '#1890ff' }}>U</Avatar>
              <span>Admin User</span>
            </div>
          </div>
        </Header>

        {/* Main Content */}
        <Content className="site-layout-content">
          {/* Stats Cards */}
          <div className="stats-container">
            <Card className="stat-card">
              <div className="stat-content">
                <div>
                  <p className="stat-label">Total Sales</p>
                  <h3>$24,780</h3>
                  <div className="stat-change positive">
                    <ArrowUpOutlined /> 12.5%
                  </div>
                </div>
                <div className="stat-icon">
                  <DollarOutlined />
                </div>
              </div>
            </Card>

            <Card className="stat-card">
              <div className="stat-content">
                <div>
                  <p className="stat-label">Total Orders</p>
                  <h3>1,245</h3>
                  <div className="stat-change positive">
                    <ArrowUpOutlined /> 5.2%
                  </div>
                </div>
                <div className="stat-icon">
                  <ShoppingCartOutlined />
                </div>
              </div>
            </Card>

            <Card className="stat-card">
              <div className="stat-content">
                <div>
                  <p className="stat-label">Total Customers</p>
                  <h3>845</h3>
                  <div className="stat-change negative">
                    <ArrowDownOutlined /> 2.1%
                  </div>
                </div>
                <div className="stat-icon">
                  <UserOutlined />
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Orders Table */}
          <Card title="Recent Orders" className="recent-orders">
            <Table 
              dataSource={dataSource} 
              columns={columns} 
              pagination={{ pageSize: 5 }}
            />
          </Card>

          {/* Stats Overview */}
          <div className="stats-overview">
            <Card title="Sales Overview" className="overview-card">
              <div className="progress-container">
                <div className="progress-item">
                  <p>This Week</p>
                  <Progress percent={75} strokeColor="#1890ff" />
                </div>
                <div className="progress-item">
                  <p>Last Week</p>
                  <Progress percent={60} strokeColor="#52c41a" />
                </div>
                <div className="progress-item">
                  <p>This Month</p>
                  <Progress percent={85} strokeColor="#faad14" />
                </div>
              </div>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
