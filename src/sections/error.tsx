import React from 'react';
import { Modal } from 'antd';

interface IErrorProps {
  isModalVisible: boolean;
  onCancel: () => void;
  error?: string;
}

const Error: React.FunctionComponent<IErrorProps> = (props) => {
  const { isModalVisible, onCancel, error } = props;

  return (
    <Modal
      title="User Error"
      onCancel={onCancel}
      footer={null}
      visible={isModalVisible}
    >
        { error ? (<p>{error}</p>) : (<p>Unknown Error</p>) }
    </Modal>
  );
}

export default Error;
