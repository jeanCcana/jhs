/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react'
import { Select, Tooltip } from 'antd'
import { ApartmentOutlined } from '@ant-design/icons'
import ImgsViewer from 'react-images-viewer'
import { createTokenAxiosInstance } from '../../services/api'
import { DashboardTable } from '../ui/DashboardTable'
import { ProductsArticles } from './ProductsArticles'
import { SelectPag } from '../ui/SelectPag'
import { UploadComponent } from '../ui/UploadComponent'

export const Products = () => {
  const [suppliers, setSuppliers] = React.useState([])
  const [image, setimage] = useState([])
  const [openImageViewer, setOpenImageViewer] = useState(false)
  const [dialogState, setDialogState] = useState({
    id: 0,
    title: '. . .',
    visible: false,
  })

  const tokenAxios = createTokenAxiosInstance()

  const viewImage = (url, name) => {
    setimage([
      {
        src: `https://api-jhs.herokuapp.com/api/uploads/img/${url}`,
        caption: name,
      },
    ])
    setOpenImageViewer(true)
  }

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
      title: 'Imagen',
      dataIndex: 'url',
      rules: [
        {
          required: false,
        },
      ],
      render: (_, row) => {
        const validImg = row.url !== ''
        return (
          <img
            alt=""
            onClick={validImg ? () => viewImage(row.url, row.name) : undefined}
            src={
              validImg
                ? `https://api-jhs.herokuapp.com/api/uploads/img/${row.url}`
                : '/assets/no-image.png'
            }
            className={`w-14 ${validImg && 'cursor-pointer'}`}
          />
        )
      },
      editRender: () => <UploadComponent />,
    },
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
            type: 0,
            size: 5,
          }}
          defaultName={row.categoryName || null}
        />
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
    async function fetchSuppliers() {
      setSuppliers(
        await tokenAxios
          .get('suppliers?isState=false')
          .then((resp) => resp.data),
      )
    }
    fetchSuppliers()
  }, [])

  return (
    <>
      <DashboardTable
        title="Productos"
        rowKey="id"
        columns={columns}
        actions={actions}
        endpoint="products"
        onAccept={async (values, addMode) => {
          try {
            const dynanmicAxiosInst = addMode
              ? tokenAxios.post('/products', values)
              : tokenAxios.put(`/products/${values.id}`, values)
            const resp = await dynanmicAxiosInst
            const { id } = resp.data.product
            if (values.url && values.url.file) {
              const formData = new FormData()
              formData.append('archivo', values.url.file)
              formData.append('id', id)
              await tokenAxios.post('/products/images/upload', formData)
            }
            return resp
          } catch (e) {
            throw new Error(e)
          }
        }}
      />
      <ImgsViewer
        imgs={image}
        isOpen={openImageViewer}
        backdropCloseable
        showImgCount={false}
        spinnerSize={20}
        onClose={() => {
          setOpenImageViewer(false)
        }}
      />
      <ProductsArticles
        id={dialogState.id}
        title={dialogState.title}
        visible={dialogState.visible}
        onCancel={closeRelationDialog}
      />
    </>
  )
}
