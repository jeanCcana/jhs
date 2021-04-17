import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal } from 'antd'
import styled from 'styled-components'

const StyledModal = styled(Modal)`
  .ant-modal-body {
    max-height: calc(100vh - 210px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`

export const DashboardTableDialog = ({
  formInst,
  title,
  rowKey,
  columns,
  visible,
  onAccept,
  onCancel,
}) => {
  const submit = () => {
    formInst.validateFields().then((values) => {
      onAccept(values)
    })
  }

  const defaultRules = [
    {
      min: 4,
      required: true,
      whitespace: true,
    },
  ]

  return (
    <StyledModal
      centered
      visible={visible}
      title={title}
      onCancel={() => {
        onCancel()
        formInst.resetFields()
      }}
      onOk={submit}
    >
      <Form
        form={formInst}
        layout="vertical"
        name="form_in_modal"
        autoComplete="off"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            submit()
          }
        }}
      >
        <Form.Item name={rowKey} hidden>
          <Input />
        </Form.Item>
        {columns.map((column, index) => (
          <Form.Item
            key={column.dataIndex}
            label={column.title}
            name={column.dataIndex}
            rules={column.rules || defaultRules}
          >
            {column.editRender ? (
              column.editRender(formInst.getFieldValue(column.dataIndex))
            ) : (
              <Input autoFocus={index === 0} />
            )}
          </Form.Item>
        ))}
      </Form>
    </StyledModal>
  )
}

DashboardTableDialog.propTypes = {
  formInst: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  rowKey: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}
