import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const ResultsList = props => {
  const items = props.items;
  if(items.length === 0) {
    return (
      <p>No results found!</p>
    );
  }

  const tableStlyes = {
    fixedHeader: true,
    fixedFooter: false,
    stripedRows: false,
    showRowHover: false,
    selectable: false,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: false,
    showCheckboxes: false,
    height: '350px',
  };

  return (
    <Table height={tableStlyes.height}
          fixedHeader={tableStlyes.fixedHeader}
          fixedFooter={tableStlyes.fixedFooter}
          selectable={tableStlyes.selectable}
          multiSelectable={tableStlyes.multiSelectable}>
      <TableHeader displaySelectAll={tableStlyes.showCheckboxes}
          adjustForCheckbox={tableStlyes.showCheckboxes}
          enableSelectAll={tableStlyes.enableSelectAll}>
        <TableRow>
          <TableHeaderColumn>Crime type</TableHeaderColumn>
          <TableHeaderColumn>Falls within</TableHeaderColumn>
          <TableHeaderColumn>Month</TableHeaderColumn>
          <TableHeaderColumn>Reported By</TableHeaderColumn>
          <TableHeaderColumn>Last outcome category</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={tableStlyes.showCheckboxes}
        deselectOnClickaway={tableStlyes.deselectOnClickaway}
        showRowHover={tableStlyes.showRowHover}
        stripedRows={tableStlyes.stripedRows}>
        {
          items.map((item, index) => (
            <TableRow key={index}>
              <TableRowColumn>{item['Crime type']}</TableRowColumn>
              <TableRowColumn>{item['Falls within']}</TableRowColumn>
              <TableRowColumn>{item['Month']}</TableRowColumn>
              <TableRowColumn>{item['Reported by']}</TableRowColumn>
              <TableRowColumn>{item['Last outcome category']}</TableRowColumn>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default ResultsList;
