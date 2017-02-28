import React from 'react';

const ResultsList = props => {
  const items = props.items;
  if(items.length === 0) {
    return (
      <p>No results found!</p>
    );
  }
  return (
    <ul>
      {
        items.map(item => (
          <li key={item.CrimeID}>{JSON.stringify(item, 2)}</li>
        ))
      }
    </ul>
  );
};

export default ResultsList;
