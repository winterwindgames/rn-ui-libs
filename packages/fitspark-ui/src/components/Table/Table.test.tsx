import React from 'react';
import { render } from '@testing-library/react-native';
import { Table } from './Table';
import { TestWrapper } from '../../test-utils';

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
];

const data = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];

describe('Table', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Table columns={columns} data={data} /></TestWrapper>
    );
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Alice')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Table columns={columns} data={data} testID="tbl" /></TestWrapper>
    );
    expect(getByTestId('tbl')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Table columns={columns} data={data} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Table columns={columns} data={data} /></TestWrapper>);
  });

  it('renders striped', () => {
    render(<TestWrapper><Table columns={columns} data={data} striped /></TestWrapper>);
  });
});
