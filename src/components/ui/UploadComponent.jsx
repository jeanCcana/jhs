import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Space, Upload } from 'antd'
import PropTypes from 'prop-types'

export const UploadComponent = ({ value, ...rest }) => {
  const [url, setUrl] = useState()

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  useEffect(() => {
    setUrl(
      value !== ''
        ? `https://api-jhs.herokuapp.com/api/uploads/img/${value}`
        : '/assets/no-image.png',
    )
  }, [value])

  return (
    <div className="w-full flex justify-center">
      <Upload
        {...rest}
        showUploadList={false}
        beforeUpload={(file) => {
          getBase64(file, (imageUrl) => setUrl(imageUrl))
          return false
        }}
        listType="picture"
      >
        <Space size="middle" direction="vertical" className="items-center">
          <img
            alt="img"
            src={url}
            className="w-32 border-dashed border-2 p-2"
          />
          <Button className="flex items-center" icon={<UploadOutlined />}>
            Cargar imagen
          </Button>
        </Space>
      </Upload>
    </div>
  )
}

UploadComponent.propTypes = {
  value: PropTypes.any,
}
