import React, { useEffect } from 'react'
import { Select } from 'antd'
import { createTokenAxiosInstance } from '../../services/api'
import { DashboardTable } from '../ui/DashboardTable'
import { SelectPag } from '../ui/SelectPag'

export const SubArticles = () => {
  const [suppliers, setSuppliers] = React.useState([])

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      hideEdit: true,
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
      editRender: (_, row) => (
        <SelectPag
          endpoint="categories/type/page"
          params={{
            type: 2,
            size: 5,
          }}
          defaultName={row.categoryName || null}
        />
      ),
    },
  ]

  useEffect(() => {
    async function fetchSuppliers() {
      const tokenAxios = createTokenAxiosInstance()

      setSuppliers(
        await tokenAxios
          .get('suppliers?isState=false')
          .then((resp) => resp.data),
      )
    }
    fetchSuppliers()
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
