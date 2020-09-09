import React from 'react'
import { useHistory } from 'react-router-dom'
import neighbors from '../AdminDashPics/fosterNeighbor.png'
import families from '../AdminDashPics/fosterFamily.png'
import { useTable, useSortBy } from 'react-table'
import { TableContain } from '../adminDashStyles'
import {
  TableHtml,
  TableRow,
  TableHeader,
  TableData,
  TableCtn,
} from './TableStyle'
import { Circle } from '../AdminDashPics/icons'

const pickColor = (status) =>
  status === 1
    ? 'yellow'
    : status === 2
    ? 'green'
    : status === 3
    ? 'red'
    : 'orange'

const columns = [
  { Header: 'FULL NAME', accessor: 'name' },
  {
    Header: 'MEMBER TYPE',
    accessor: 'type',
    Cell: (props) => (
      <img
        src={props.data[props.row.id].type}
        height={30}
        width={30}
        alt='either an f for family or n for neighbor'
      />
    ),
  },
  { Header: 'MATCH', accessor: 'match' },
  { Header: 'CITY', accessor: 'city' },
  { Header: 'STATE', accessor: 'state' },
  { Header: 'ZIP', accessor: 'zip' },
  {
    Header: 'APP',
    accessor: 'application',
    Cell: (props) => {
      const status = props.data[props.row.id].application
      return <Circle color={pickColor(status)} />
    },
  },
  {
    Header: 'BGC',
    accessor: 'background',
    Cell: (props) => {
      const status = props.data[props.row.id].background
      return <Circle color={pickColor(status)} />
    },
  },
  {
    Header: 'TRN',
    accessor: 'training',
    Cell: (props) => {
      const status = props.data[props.row.id].training
      return <Circle color={pickColor(status)} />
    },
  },
  {
    Header: 'EMAIL',
    accessor: 'email',
  },
  {
    Header: 'PHONE',
    accessor: 'phone',
  },
]

function mapping(members) {
  const rows = []
  members.map((data) =>
    rows.push({
      name: `${data.first_name} ${data.last_name}`,
      type: data.type === 'neighbors' ? neighbors : families,
      match: 'none',
      city: data.city,
      state: data.state,
      zip: data.zip,
      userType: data.type,
      application: data.application,
      background: data.background,
      training: data.training,
      email: data.email,
      phone: data.phone,
      id: data.id,
    })
  )
  return rows
}

function Table({ columns, data, props }) {
  const { push } = useHistory()
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  const firstPageRows = rows.slice(0, 15)

  return (
    <TableContain>
      <TableHtml {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeader
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </TableHeader>
              ))}
            </TableRow>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableData
                      onClick={() =>
                        push(
                          `/${cell.row.original.userType}/${cell.row.original.id}`
                        )
                      }
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableData>
                  )
                })}
              </TableRow>
            )
          })}
        </tbody>
      </TableHtml>
      <br />
    </TableContain>
  )
}

export default function MemberTable({ members }) {
  const data = mapping(members)

  return (
    <TableCtn>
      <Table columns={columns} data={data} />
    </TableCtn>
  )
}
