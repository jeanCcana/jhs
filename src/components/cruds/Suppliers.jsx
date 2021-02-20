import { Typography } from 'antd'
import React from 'react'
import { MyInputNumber } from '../ui/MyInputNumber'
import { DashboardTable } from '../ui/DashboardTable'

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
  },
  {
    title: 'Teléfono',
    dataIndex: 'phone',
    rules: [
      { type: 'regexp', min: 4, required: true, whitespace: true },
      {
        pattern: new RegExp(/\d+/g),
        message: 'Solo se permite numeros',
      },
      {
        pattern: new RegExp(/^.{4,}$/),
        message: 'Mínimo 4 caracteres',
      },
    ],
    editRender: () => <MyInputNumber />,
  },
  {
    title: 'Sitio Web',
    dataIndex: 'homePage',
    rules: [{ type: 'url', min: 4, required: true, whitespace: true }],
    render: (text) => (
      <Typography.Link href={text} target="_blank">
        {text}
      </Typography.Link>
    ),
  },
]

export const Suppliers = () => (
  <DashboardTable
    title="Proveedores"
    rowKey="id"
    columns={columns}
    endpoint="suppliers"
  />
)
