/* eslint-disable no-unused-vars */
import { Modal, Select, Tag } from 'antd'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { DashboardTable } from '../ui/DashboardTable'
import { MyInputNumber } from '../ui/MyInputNumber'
import { SelectPag } from '../ui/SelectPag'
import { createTokenAxiosInstance } from '../../services/api'

export const ArticlesSubArticles = ({ id, title, visible, onCancel }) => {
  const [areas, setAreas] = React.useState([])
  const [units, setUnits] = React.useState([])

  const tokenAxios = createTokenAxiosInstance()

  const columns = [
    {
      title: 'Subarticulo',
      dataIndex: 'subarticleId',
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      render: (_, row) => row.subarticleName,
      editRender: (_, row) => (
        <SelectPag
          endpoint="subarticles/resume/page"
          defaultName={row.subarticleName || null}
        />
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      rules: [
        {
          required: true,
          whitespace: true,
        },
      ],
    },
    {
      title: 'Unidad de medida',
      dataIndex: 'muId',
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      render: (_, row) => row.mu,
      editRender: () => (
        <Select placeholder="Seleccione una unidad de medida">
          {units.map((unit) => (
            <Select.Option key={unit.id} value={unit.id}>
              {unit.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Area',
      dataIndex: 'areaId',
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      render: (_, row) => row.area,
      editRender: () => (
        <Select placeholder="Seleccione un área">
          {areas.map((area) => (
            <Select.Option key={area.id} value={area.id}>
              {area.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Diámetro',
      dataIndex: 'diameter',
      rules: [
        {
          required: true,
          whitespace: true,
        },
      ],
    },
    {
      title: 'Altura',
      dataIndex: 'height',
      rules: [
        {
          type: 'number',
          required: true,
        },
      ],
      render: (value, row) => `${value} ${row.heightName}`,
      editRender: () => <MyInputNumber />,
    },
    {
      title: 'Altura u/m',
      dataIndex: 'muHeight',
      hideRender: true,
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      editRender: () => (
        <Select placeholder="Seleccione una unidad de medida">
          {units.map((unit) => (
            <Select.Option key={unit.id} value={unit.id}>
              {unit.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Ancho',
      dataIndex: 'width',
      rules: [
        {
          type: 'number',
          required: true,
        },
      ],
      render: (value, row) => `${value} ${row.widthName}`,
      editRender: () => <MyInputNumber />,
    },
    {
      title: 'Ancho u/m',
      dataIndex: 'muWidth',
      hideRender: true,
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      editRender: () => (
        <Select placeholder="Seleccione una unidad de medida">
          {units.map((unit) => (
            <Select.Option key={unit.id} value={unit.id}>
              {unit.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Peso',
      dataIndex: 'weight',
      rules: [
        {
          type: 'number',
          required: true,
        },
      ],
      render: (value, row) => `${value} ${row.weightName}`,
      editRender: () => <MyInputNumber />,
    },
    {
      title: 'Peso u/m',
      dataIndex: 'muWeight',
      hideRender: true,
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      editRender: () => (
        <Select placeholder="Seleccione una unidad de medida">
          {units.map((unit) => (
            <Select.Option key={unit.id} value={unit.id}>
              {unit.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Largo',
      dataIndex: 'lenght',
      rules: [
        {
          type: 'number',
          required: true,
        },
      ],
      render: (value, row) => `${value} ${row.lenghtName}`,
      editRender: () => <MyInputNumber />,
    },
    {
      title: 'Largo u/m',
      dataIndex: 'muLenght',
      hideRender: true,
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      editRender: () => (
        <Select placeholder="Seleccione una unidad de medida">
          {units.map((unit) => (
            <Select.Option key={unit.id} value={unit.id}>
              {unit.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Grosor',
      dataIndex: 'thickness',
      rules: [
        {
          type: 'number',
          required: true,
        },
      ],
      render: (value, row) => `${value} ${row.thicknessName}`,
      editRender: () => <MyInputNumber />,
    },
    {
      title: 'Grosor u/m',
      dataIndex: 'muThickness',
      hideRender: true,
      rules: [
        {
          type: 'integer',
          required: true,
          whitespace: true,
        },
      ],
      editRender: () => (
        <Select placeholder="Seleccione una unidad de medida">
          {units.map((unit) => (
            <Select.Option key={unit.id} value={unit.id}>
              {unit.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Costo',
      dataIndex: 'cost',
      rules: [
        {
          type: 'number',
          required: true,
        },
      ],
      render: (value) =>
        `S/.${value ? (Math.round(value * 100) / 100).toFixed(2) : 0}`,
      editRender: () => <MyInputNumber />,
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      rules: [
        {
          type: 'number',
          required: true,
        },
      ],
      editRender: () => <MyInputNumber />,
    },
    // {
    //   title: 'Estado',
    //   dataIndex: 'optional',
    //   render: (value) => (
    //     <Tag color={value ? 'default' : 'geekblue'}>
    //       {value ? 'Opcional' : 'Necesario'}
    //     </Tag>
    //   ),
    // },
  ]

  useEffect(() => {
    async function fetchAreasAndUnities() {
      setAreas(
        await tokenAxios.get('area?isState=false').then((resp) => resp.data),
      )

      setUnits(
        await tokenAxios.get('mu?isState=false').then((resp) => resp.data),
      )
    }
    fetchAreasAndUnities()
  }, [])

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} width="85%">
      <DashboardTable
        title={title}
        rowKey="id"
        columns={columns}
        endpoint="articles/subarticles"
        fetchUrl={`articles/subarticles/${id}`}
        onAccept={async (values, addMode) => {
          try {
            const dynanmicAxiosInst = addMode
              ? tokenAxios.post('/articles/subarticles', {
                  ...values,
                  articleId: id,
                })
              : tokenAxios.put(`/articles/subarticles/${values.id}`, {
                  ...values,
                  articleId: id,
                })
            const resp = await dynanmicAxiosInst
            return resp
          } catch (e) {
            throw new Error(e)
          }
        }}
      />
    </Modal>
  )
}

ArticlesSubArticles.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
}
