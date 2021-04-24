import { Select, Divider, Pagination } from 'antd'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { createTokenAxiosInstance } from '../../services/api'

export const SelectPag = ({
  defaultName,
  value,
  endpoint,
  params,
  ...props
}) => {
  const [{ data, total, page }, setPaginationData] = React.useState({
    data: [],
    total: 0,
    page: 1,
  })

  const tokenAxios = createTokenAxiosInstance()

  useEffect(() => {
    tokenAxios
      .get(`${endpoint}/${page - 1}`, {
        params,
      })
      .then(({ data: remoteData }) => {
        setPaginationData((state) => ({
          ...state,
          data: remoteData.content,
          total: remoteData.totalElements,
        }))
      })
  }, [page])

  return (
    <Select
      value={value}
      {...props}
      placeholder="Seleccione una categoría"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ padding: '4px', textAlign: 'center' }}>
            <Pagination
              simple
              total={total}
              current={page}
              pageSize={params ? params.size : 10}
              onChange={(pageIndex) => {
                setPaginationData((state) => ({
                  ...state,
                  page: pageIndex,
                }))
              }}
            />
          </div>
        </>
      )}
    >
      {data.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
      {!data.some((item) => item.id === value) && defaultName && (
        <Select.Option key={value} value={value} style={{ display: 'none' }}>
          {defaultName}
        </Select.Option>
      )}
    </Select>
  )
}

SelectPag.propTypes = {
  defaultName: PropTypes.string,
  endpoint: PropTypes.string.isRequired,
  params: PropTypes.object,
  value: PropTypes.number,
}
