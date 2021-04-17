/* eslint-disable no-unused-vars */
import { List, Modal, Pagination, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { createTokenAxiosInstance } from '../../services/api'

export const RelationModal = ({ id, title, visible, onCancel }) => {
  const [data, setData] = useState([])

  const getArticles = () => {
    const tokenAxios = createTokenAxiosInstance()
    tokenAxios.get(`products/articles/0/${id}`).then((resp) => {
      setData(resp.data.content)
      // console.log(resp)
    })
  }

  useEffect(() => {
    if (visible) {
      getArticles()
    }
  }, [visible])

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null}>
      <List
        size="small"
        header={
          <div>
            {title} <br />
            Total: 2 items
          </div>
        }
        footer={<Pagination simple current={1} total={2} />}
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item.articleName}</List.Item>}
      />
      {/* <div className="flex items-center justify-center h-56">
        <Spin />
      </div> */}
    </Modal>
  )
}

RelationModal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}
