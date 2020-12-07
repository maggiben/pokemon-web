import React from 'react';
import { Modal, Form, Input } from 'antd';

interface ILoginProps {
  isModalVisible: boolean;
  onCancel: (event: React.MouseEvent<HTMLElement>) => void;
  handleLogin: (username: string, password: string) => void;
}

// tslint:disable-next-line: no-any defined by rc-field-form/lib/interface
interface ILoginFormFinish {
  [name: string]: any; // eslint-disable-line
}

const Login: React.FunctionComponent<ILoginProps> = (props) => {
  const { isModalVisible, onCancel, handleLogin } = props;
  const [form] = Form.useForm();
  const onFinish = (values: ILoginFormFinish): void => {
    const {username, password} = values;
    if (username && password) {
      handleLogin(values.username, values.password);
    }
  };
  const onOK: (event: React.MouseEvent<HTMLElement>) => void = () => {
    form.submit();
  };

  return (
    <Modal
      title="User Login"
      visible={isModalVisible}
      okText="Login"
      onOk={onOK}
      onCancel={onCancel}
    >
      <Form name="basic" layout="vertical" form={form} initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, max: 10, message: 'Please input your username!' }]}
        >
          <Input maxLength={10} placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, max: 10, message: 'Please input your password!' }]}
        >
          <Input maxLength={10} placeholder="Password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Login;
