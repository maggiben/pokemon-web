import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import languages from '../utils/languages';
import { Languages } from '../types/user';
const { Option } = Select;

interface ISignUpProps {
  isModalVisible: boolean;
  onCancel: (event: React.MouseEvent<HTMLElement>) => void;
  handleSignUp: (username: string, email: string, language: Languages, password: string) => void;
}

// tslint:disable-next-line: no-any defined by rc-field-form/lib/interface
interface ISignUpFormFinish {
  [name: string]: any; // eslint-disable-line
}

const SignUp: React.FunctionComponent<ISignUpProps> = (props) => {
  const { isModalVisible, onCancel, handleSignUp } = props;
  const [form] = Form.useForm();
  const onFinish = (values: ISignUpFormFinish): void => {
    const {username, email, language, password} = values;
    if (username && email && password) {
      handleSignUp(username, email, language, password);
    }
  };
  const onOK: (event: React.MouseEvent<HTMLElement>) => void = () => {
    form.submit();
  };

  const initialValues = { 
    language: 'english'
  };

  return (
    <Modal
      title="User SignUp"
      visible={isModalVisible}
      okText="SignUp"
      onOk={onOK}
      onCancel={onCancel}
    >
      <Form name="basic" layout="vertical" form={form} initialValues={initialValues} onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Language"
          name="language"
          rules={[{ required: false }]}
        >
          <Select>
            {languages.map(language => (
              <Option key={language} value={language}>{language}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SignUp;
