/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Select, Tooltip } from 'antd'
import { ApartmentOutlined } from '@ant-design/icons'
import { createTokenAxiosInstance } from '../../services/api'
import { DashboardTable } from '../ui/DashboardTable'
import { RelationModal } from './RelationModal'

export const SubArticles = () => {
  const [suppliers, setSuppliers] = React.useState([])
  const [categories, setCategories] = React.useState([])

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
      title: 'Proveedor',
      dataIndex: 'supplierId',
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      render: (_, row) => row.supplierName,
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
      render: (_, row) => row.categoryName,
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
        await tokenAxios.get('categories?type=2').then((resp) => resp.data),
      )
    }
    fetchSuppliersAndCategories()
  }, [])

  return (
    <DashboardTable
      title="SubArticulos"
      rowKey="id"
      columns={columns}
      endpoint="subarticles"
    />
  )
}
