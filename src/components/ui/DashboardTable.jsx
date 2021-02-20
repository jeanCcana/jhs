import {
  Button,
  Form,
  message,
  PageHeader,
  Popconfirm,
  Space,
  Table,
  Tooltip,
  Typography,
} from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { EditFilled, DeleteFilled, PlusOutlined } from '@ant-design/icons'
import Search from 'antd/lib/input/Search'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { createTokenAxiosInstance } from '../../services/api'
import { DashboardTableDialog } from './DashboardTableDialog'

const MyHeader = styled(PageHeader)`
  .ant-page-header-heading {
    display: initial;
    justify-content: initial;

    @media (min-width: 576px) {
      display: flex;
      justify-content: space-between;
    }
  }
`

export const DashboardTable = ({ title, rowKey, columns, endpoint }) => {
  const [dialogForm] = Form.useForm()
  const {
    user: { roles },
  } = useSelector((state) => state.auth)
  const isAdmin = roles.some((role) => role.nombre === 'ROLE_ADMIN')

  const [{ visible, addMode }, setDialogState] = useState({
    visible: false,
    addMode: true,
  })
  const [
    { data, total, page, pageSize, loading, searchValue },
    setTabledata,
  ] = useState({
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: true,
    searchValue: '',
  })

  const fetchData = () => {
    const tokenAxios = createTokenAxiosInstance()
    const dynanmicAxiosInst =
      searchValue === ''
        ? tokenAxios.get(`${endpoint}/page/${page - 1}`, {
            params: {
              size: pageSize,
            },
          })
        : tokenAxios.get(`${endpoint}/search/${page - 1}`, {
            params: {
              size: pageSize,
              name: searchValue,
            },
          })

    setTabledata((state) => ({ ...state, loading: true }))

    dynanmicAxiosInst
      .then(({ data: remoteData }) =>
        setTabledata((state) => ({
          ...state,
          data: remoteData.content,
          total: remoteData.totalElements,
          loading: false,
        })),
      )
      .catch((e) => {
        setTabledata((state) => ({ ...state, loading: false }))
        message.error(e)
      })
  }

  const onSearch = (value) => {
    setTabledata((state) => ({ ...state, page: 1, searchValue: value.trim() }))
  }

  const setFormValues = (id) =>
    new Promise((resolve, reject) => {
      const tokenAxios = createTokenAxiosInstance()

      tokenAxios
        .get(`/${endpoint}/${id}`)
        .then((resp) => {
          dialogForm.setFieldsValue(resp.data)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })

  const onDialogAccept = (values) => {
    const tokenAxios = createTokenAxiosInstance()

    const dynanmicAxiosInst = addMode
      ? tokenAxios.post(`/${endpoint}`, values)
      : tokenAxios.put(`/${endpoint}/${values.id}`, values)

    dynanmicAxiosInst
      .then((resp) => {
        setDialogState((state) => ({ ...state, visible: false }))

        fetchData()
        message.success(resp.data.mensaje)
        dialogForm.resetFields()
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data.mensaje)
        }
      })
  }

  const onEdit = (rowId) => {
    setFormValues(rowId)
      .then(() => {
        setDialogState({ visible: true, addMode: false })
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data.mensaje)
        }
      })
  }

  const onDelete = (row) => {
    const tokenAxios = createTokenAxiosInstance()

    tokenAxios
      .delete(`/${endpoint}/${row.id}`)
      .then((resp) => {
        fetchData()
        message.success(resp.data.mensaje)
      })
      .catch((error) => {
        if (error.response) {
          message.error(error.response.data.mensaje)
        }
      })
  }

  const tableColumns = [
    ...columns,
    {
      title: 'Acciones',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (_, row) => (
        <Space size="large">
          <Tooltip title="Editar">
            <EditFilled
              className={`text-lg ${
                !isAdmin && 'cursor-not-allowed text-gray-300	'
              }`}
              onClick={
                isAdmin
                  ? () => {
                      onEdit(row.id)
                    }
                  : undefined
              }
            />
          </Tooltip>
          <Popconfirm
            title={
              <Typography.Text>
                Esta seguro de eliminar a{' '}
                <Typography.Text strong>{row.name}</Typography.Text>?
              </Typography.Text>
            }
            className={`${!isAdmin && 'cursor-not-allowed'}`}
            disabled={!isAdmin}
            placement="left"
            onConfirm={() => {
              onDelete(row)
            }}
          >
            <Tooltip title="Eliminar">
              <DeleteFilled
                className={`text-lg ${!isAdmin && 'text-gray-300'}`}
              />
              <Button disabled={!isAdmin} hidden />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  useEffect(() => {
    fetchData()
  }, [page, pageSize, searchValue])

  return (
    <>
      <MyHeader
        title={title}
        className="justify-end"
        extra={[
          <div className="flex " key="search">
            <Search placeholder="Buscar" allowClear onSearch={onSearch} />
            <Tooltip title="Agregar">
              <Button
                className=" flex items-center mx-2 sm:mx-8"
                type="primary"
                shape="round"
                disabled={!isAdmin}
                icon={<PlusOutlined />}
                onClick={() =>
                  setDialogState({
                    visible: true,
                    addMode: true,
                  })
                }
              />
            </Tooltip>
          </div>,
        ]}
      >
        <Table
          rowKey={rowKey}
          columns={tableColumns}
          dataSource={data}
          pagination={{
            //   simple: true,
            showSizeChanger: true,
            total,
            current: page,
            pageSize,
            onChange: (tblPage, tblPageSize) => {
              setTabledata((state) => ({
                ...state,
                page: tblPage,
                pageSize: tblPageSize,
              }))
            },
          }}
          scroll={{ x: 'max-content' }}
          loading={loading}
        />
      </MyHeader>
      <DashboardTableDialog
        formInst={dialogForm}
        title={addMode ? 'Agregar' : 'Editar'}
        rowKey={rowKey}
        columns={columns}
        visible={visible}
        onAccept={onDialogAccept}
        onCancel={() =>
          setDialogState((state) => ({ ...state, visible: false }))
        }
      />
    </>
  )
}

DashboardTable.propTypes = {
  title: PropTypes.string.isRequired,
  rowKey: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  endpoint: PropTypes.string.isRequired,
}
