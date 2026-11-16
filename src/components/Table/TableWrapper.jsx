import Table from "./Table"


const TableWrapper = ({ header=[], keys=[], tableData=[] }) => {
  return (
    <>
      <div>
        <div>TableWrapper</div>
        <Table header={header} keys={keys} tableData={tableData} />
      </div>
    </>
  )
}

export default TableWrapper