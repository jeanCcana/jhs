/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Select, Tooltip } from 'antd'
import { ApartmentOutlined } from '@ant-design/icons'
import { createTokenAxiosInstance } from '../../services/api'
import { DashboardTable } from '../ui/DashboardTable'
import { RelationModal } from './RelationModal'

export const Products = () => {
  const [suppliers, setSuppliers] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [dialogState, setDialogState] = useState({
    id: 0,
    title: '. . .',
    visible: false,
  })

  const openRelationDialog = (row) => {
    const { id, name } = row
    setDialogState({
      id,
      title: name,
      visible: true,
    })
  }

  const closeRelationDialog = () => {
    setDialogState((state) => ({ ...state, visible: false }))
  }

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

  const actions = [
    {
      render: (row, isAdmin) => (
        <Tooltip key="Relation" title="Relacionar">
          <ApartmentOutlined
            className={`text-lg ${
              !isAdmin && 'cursor-not-allowed text-gray-300	'
            }`}
            onClick={
              isAdmin
                ? () => {
                    openRelationDialog(row)
                  }
                : undefined
            }
          />
        </Tooltip>
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
    <>
      <DashboardTable
        title="Productos"
        rowKey="id"
        columns={columns}
        actions={actions}
        endpoint="products"
      />
      <RelationModal
        id={dialogState.id}
        title={dialogState.title}
        visible={dialogState.visible}
        onCancel={closeRelationDialog}
      />
    </>
  )
}
