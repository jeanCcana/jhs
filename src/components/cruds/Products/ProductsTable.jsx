import React, { useEffect } from 'react'
import { Select } from 'antd'
import { createTokenAxiosInstance } from '../../../services/api'
import { DashboardTable } from '../../ui/DashboardTable'

export const ProductsTable = () => {
  const [suppliers, setSuppliers] = React.useState([])
  const [categories, setCategories] = React.useState([])

  const columns = [
    {
      title: 'Código',
      dataIndex: 'code',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Proveedor',
      dataIndex: 'supplierId',
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      render: (value) => {
        const supplier = suppliers.find((suppl) => suppl.id === value)
        return supplier ? supplier.name : ''
      },
      editRender: () => (
        <Select placeholder="Seleccione un proveedor">
          {suppliers.map((supplier) => (
            <Select.Option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Categoría',
      dataIndex: 'categoryId',
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      render: (value) => {
        const category = categories.find((categ) => categ.id === value)
        return category ? category.name : ''
      },
      editRender: () => (
        <Select placeholder="Seleccione una categoría">
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ]

  useEffect(() => {
    async function fetchSuppliersAndCategories() {
      const tokenAxios = createTokenAxiosInstance()

      setSuppliers(
        await tokenAxios
          .get('suppliers?isState=false')
          .then((resp) => resp.data),
      )

      setCategories(
        await tokenAxios
          .get('categories?isState=false')
          .then((resp) => resp.data),
      )
    }
    fetchSuppliersAndCategories()
  }, [])

  return (
    <DashboardTable
      title="Productos"
      rowKey="id"
      columns={columns}
      endpoint="products"
    />
  )
}
