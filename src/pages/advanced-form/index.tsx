import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, TimePicker } from 'antd';
import React, { FC, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import TableForm from './components/TableForm';
import styles from './style.less';

type InternalNamePath = (string | number)[];

const { Option } = Select;

const fieldLabels = {
  // name: '仓库名',
  // url: '仓库域名',
  courier: '司机',
  receiver: '收货人',
  // dateRange: '生效日期',
  logistics: '物流公司',
  // dateRange2: '生效日期',
};

const tableData = [
  {
    key: '1',
    amount: 1,
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    amount: 2,
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    amount: 3,
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

interface AdvancedFormProps {
  dispatch: Dispatch;
  submitting: boolean;
}

interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}

const AdvancedForm: FC<AdvancedFormProps> = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState<ErrorField[]>([]);
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values: { [key: string]: any }) => {
    setError([]);
    dispatch({
      type: 'formAndadvancedForm/submitAdvancedForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark
      initialValues={{ members: tableData }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="高级表单常见于一次性输入和提交大批量数据的场景。">
        <Card title="仓库管理" className={styles.card} bordered={false}>

          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.receiver}
                name="receiver"
                rules={[{ required: true, message: '请选择收货人' }]}
              >
                <Select placeholder="请选择收货人">
                  <Option value="shouhuorena">收货人A</Option>
                  <Option value="shouhuorenb">收货人A</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              <Form.Item
                label={fieldLabels.courier}
                name="courier"
                rules={[{ required: true, message: '请选择司机' }]}
              >
                <Select placeholder="请选择司机">
                  <Option value="sijia">司机A</Option>
                  <Option value="sijib">司机B</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
              <Form.Item
                label={fieldLabels.logistics}
                name="logistics"
                rules={[{ required: true, message: '请选择物流公司' }]}
              >
                <Select placeholder="请选择物流公司">
                  <Option value="wuliua">物流公司A</Option>
                  <Option value="wuliub">物流公司B</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="成员管理" bordered={false}>
          <Form.Item name="members">
            <TableForm />
          </Form.Item>
        </Card>
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAndadvancedForm/submitAdvancedForm'],
}))(AdvancedForm);
