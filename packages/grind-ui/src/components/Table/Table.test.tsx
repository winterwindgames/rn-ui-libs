import React from 'react';
import { render } from '@testing-library/react-native';
import { Table } from './Table';
import { TestWrapper } from '../../test-utils';

describe('Table', () => {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age' },
  ];
  const data = [
    { name: 'Alice', age: '30' },
    { name: 'Bob', age: '25' },
  ];

  it('renders headers', () => {
    const { getByText } = render(
      <TestWrapper><Table columns={columns} data={data} /></TestWrapper>
    );
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Age')).toBeTruthy();
  });

  it('renders data rows', () => {
    const { getByText } = render(
      <TestWrapper><Table columns={columns} data={data} /></TestWrapper>
    );
    expect(getByText('Alice')).toBeTruthy();
    expect(getByText('Bob')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Table columns={columns} data={data} testID="table" /></TestWrapper>
    );
    expect(getByTestId('table')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Table columns={columns} data={data} testID="tl" /></TestWrapper>
    );
    expect(getByTestId('tl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Table columns={columns} data={data} testID="td" /></TestWrapper>
    );
    expect(getByTestId('td')).toBeTruthy();
  });
});
