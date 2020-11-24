import React from 'react';
import { Modal } from 'antd';
import {
  ProFormText,
  StepsForm,
} from '@ant-design/pro-form';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  name?: string;
  amount?: number;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <StepsForm
    stepsProps={{
      size: 'small',
    }}
    stepsFormRender={(dom, submitter) => {
      return (
        <Modal
          width={640}
          bodyStyle={{ padding: '32px 40px 48px' }}
          destroyOnClose
          title="产品配置"
          visible={props.updateModalVisible}
          footer={submitter}
          onCancel={() => props.onCancel()}
        >
          {dom}
        </Modal>
      );
    }}
    onFinish={props.onSubmit}
  >
    <StepsForm.StepForm
      initialValues={{
        name: props.values.name,
      }}
      title="修改产品名称"
    >
      <ProFormText
        name="name"
        label="产品名称"
        rules={[{ required: true, message: '请输入产品名称！' }]}
      />
    </StepsForm.StepForm>
    <StepsForm.StepForm
      initialValues={{
        amount: props.values.amount,
      }}
      title="修改库存数量"
    >
      <ProFormText
        name="amount"
        label="库存数量"
        rules={[{ required: true, message: '请输入要修改的库存数量' }]}
      />
    </StepsForm.StepForm>
  </StepsForm>
);

export default UpdateForm;
