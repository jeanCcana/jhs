import { Select } from 'antd'
import React from 'react'
import { DashboardTable } from '../ui/DashboardTable'

const types = [
  {
    id: 0,
    name: 'Productos',
  },
  {
    id: 1,
    name: 'Articulos',
  },
  {
    id: 2,
    name: 'Subarticulos',
  },
]

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
  },
  {
    title: 'Descripción',
    dataIndex: 'description',
  },
  {
    title: 'Tipo',
    dataIndex: 'type',
    rules: [
      {
        type: 'enum',
        enum: [0, 1, 2],
        required: true,
        whitespace: true,
      },
    ],
    render: (text) => {
      const type = types.find((e) => e.id === text)
      return type ? type.name : ''
    },
    editRender: () => (
      <Select placeholder="Seleccione un tipo">
        {types.map((type) => (
          <Select.Option key={type.id} value={type.id}>
            {type.name}
          </Select.Option>
        ))}
      </Select>
    ),
  },
]

export const Categories = () => (
  <DashboardTable
    title="Categorias"
    rowKey="id"
    columns={columns}
    endpoint="categories"
  />
)
