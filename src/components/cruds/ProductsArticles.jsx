/* eslint-disable no-unused-vars */
import { Modal, Switch, Tag } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { DashboardTable } from '../ui/DashboardTable'
import { MyInputNumber } from '../ui/MyInputNumber'
import { SelectPag } from '../ui/SelectPag'
import { createTokenAxiosInstance } from '../../services/api'

const tokenAxios = createTokenAxiosInstance()

const columns = [
  {
    title: 'Articulo',
    dataIndex: 'articleId',
    rules: [
      {
        type: 'integer',
        required: true,
        whitespace: true,
      },
    ],
    render: (_, row) => row.articleName,
    editRender: (_, row) => (
      <SelectPag
        endpoint="articles/resume/page"
        defaultName={row.articleName || null}
      />
    ),
  },
  {
    title: 'Cantidad',
    dataIndex: 'quantity',
    rules: [
      { type: 'regexp', min: 1, required: true, whitespace: true },
      {
        pattern: new RegExp(/\d+/g),
        message: 'Solo se permite numeros',
      },
    ],
    editRender: () => <MyInputNumber />,
  },
  // {
  //   title: 'Estado',
  //   dataIndex: 'optional',
  //   rules: [{ type: 'boolean' }],
  //   render: (value) => (
  //     <Tag color={value ? 'default' : 'geekblue'}>
  //       {value ? 'Opcional' : 'Necesario'}
  //     </Tag>
  //   ),
  //   editRender: () => <Switch />,
  // },
]

export const ProductsArticles = ({ id, title, visible, onCancel }) => (
  <Modal visible={visible} onCancel={onCancel} footer={null}>
    <DashboardTable
      title={title}
      rowKey="id"
      columns={columns}
      endpoint="products/articles"
      fetchUrl={`products/articles/${id}`}
      onAccept={async (values, addMode) => {
        try {
          const dynanmicAxiosInst = addMode
            ? tokenAxios.post('/products/articles', {
                ...values,
                productId: id,
              })
            : tokenAxios.put(`/products/articles/${values.id}`, {
                ...values,
                productId: id,
              })
          const resp = await dynanmicAxiosInst
          return resp
        } catch (e) {
          throw new Error(e)
        }
      }}
    />
  </Modal>
)

ProductsArticles.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}
