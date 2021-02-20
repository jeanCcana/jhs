import { Modal, Spin } from 'antd'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { createTokenAxiosInstance } from '../../../services/api'

export const RelationModal = ({ id, title, visible, onCancel }) => {
  const getArticles = () => {
    const tokenAxios = createTokenAxiosInstance()
    tokenAxios.get(`products/articles/0/${id}`).then((resp) => {
      console.log(resp)
    })
  }

  useEffect(() => {
    if (visible) {
      getArticles()
    }
  }, [visible])

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} footer={null}>
      <div className="flex items-center justify-center h-56">
        <Spin />
      </div>
    </Modal>
  )
}

RelationModal.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}
