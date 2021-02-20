/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react'
import ImgsViewer from 'react-images-viewer'
import { Button, Select, Space, Tooltip, Upload } from 'antd'
import { ApartmentOutlined, UploadOutlined } from '@ant-design/icons'
import { createTokenAxiosInstance } from '../../services/api'
import { MyInputNumber } from '../ui/MyInputNumber'
import { DashboardTable } from '../ui/DashboardTable'
import { RelationModal } from './Products/RelationModal'

export const Articles = () => {
  const [suppliers, setSuppliers] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [image, setimage] = useState([])
  const [openImageViewer, setOpenImageViewer] = useState(false)
  const [dialogState, setDialogState] = useState({
    id: 0,
    title: '. . .',
    visible: false,
  })

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
      editRender: (value) => {
        const validImg = value !== ''
        return (
          <Space size="middle">
            <img
              alt="img"
              src={
                validImg
                  ? `https://api-jhs.herokuapp.com/api/uploads/img/${value}`
                  : '/assets/no-image.png'
              }
              className="w-32 border-dashed border-2 p-2"
            />
            <Upload listType="picture" maxCount={1}>
              <Button className="flex items-center" icon={<UploadOutlined />}>
                Cargar imagen
              </Button>
            </Upload>
          </Space>
        )
      },
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      rules: [
        {
          type: 'number',
          required: true,
        },
      ],
      render: (value) =>
        `S/.${value ? (Math.round(value * 100) / 100).toFixed(2) : 0}`,
      editRender: () => (
        <MyInputNumber
          formatter={(value) => `S/. ${value}`}
          parser={(value) => value.replace('S/. ', '')}
        />
      ),
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      rules: [
        {
          type: 'number',
          required: true,
        },
      ],
      render: (value) =>
        `S/.${value ? (Math.round(value * 100) / 100).toFixed(2) : 0}`,
      editRender: () => (
        <MyInputNumber
          formatter={(value) => `S/. ${value}`}
          parser={(value) => value.replace('S/. ', '')}
        />
      ),
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
        title="Articulos"
        rowKey="id"
        actions={actions}
        columns={columns}
        endpoint="articles"
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
      <RelationModal
        id={dialogState.id}
        title={dialogState.title}
        visible={dialogState.visible}
        onCancel={closeRelationDialog}
      />
    </>
  )
}
