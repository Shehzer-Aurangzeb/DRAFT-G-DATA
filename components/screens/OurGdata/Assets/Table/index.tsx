'use client';

import React from 'react';
import { useTable } from 'react-table';
import NoData from '@/components/UI/NoDataMessage';
import Loader from '@/components/UI/Loader';
import { PRICE_DECIMAL_PLACES } from '@/constants';
import { ASSETSDATACOLUMNS } from '@/constants/consent';
import { convertToTitleCase } from '@/lib';

interface IProps {
  data: any;
  isLoadingData: boolean
}

function Table({ data, isLoadingData }: IProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: ASSETSDATACOLUMNS,
    data,
  });


  return (
    <>
      <table {...getTableProps()} className="w-full -mt-2">
        <thead>
          {headerGroups.map((headerGroup: any, index) => (
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps()}
                  className={`border-table dark:border-white border py-3 px-7 mobile:px-3 mobile:py-2 bg-table dark:bg-darkTable text-xl mobile:text-sm text-white font-medium font-sans whitespace-nowrap ${column.id === 'id' && 'hidden'
                    }`}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {data.length > 0 ?
          <tbody {...getTableBodyProps()}>
            {rows.map((row: any, index) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()} className="even:bg-[#d4d4d4]  dark:even:bg-[#6a6a6a] dark:odd:bg-darkChat">
                  {row.cells.map((cell: any) => (
                    <td
                      key={cell.id}
                      {...cell.getCellProps()}
                      className={`border border-[#ced4da] dark:border-white py-6 px-7 mobile:p-3 text-black  dark:text-main font-sans font-normal text-base mobile:text-sm text-center
                    `}
                    >
                      {cell.column.id === 'name' ?
                        convertToTitleCase(row.original.name) :
                        cell.render('Cell')
                      }
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody> :
          !isLoadingData && <NoData />
        }
      </table>
      {isLoadingData && <div className='flex justify-center mt-[200px]'>
        <Loader className='w-10 h-10' /></div>}
    </>
  );
}

export default Table;