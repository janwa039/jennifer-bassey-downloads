import { render, fireEvent, screen, getByTestId } from '@testing-library/react';
import App from './App';
import Table from './components/Table';
import { tableData } from './data'

const mainComponenet = <Table data={tableData}  />

describe ("<App/>",  () => {
  it('renders App component correctly', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('main-content')).toBeInTheDocument();
  });
})

describe("<Table /> ", () => {
  it("download button should be clickable", () => {
    const { getByTestId } = render(mainComponenet);
    const DownloadButton = getByTestId('download-btn')

    fireEvent.click(DownloadButton) 

    expect(screen.getByText('Files you want to download')).toBeInTheDocument()
  })

  it("seleted all when clicked should have the label None Selected or Selected All", () => {
    const { getByTestId } = render(mainComponenet)

    const SelectedAllBtn = getByTestId("selectAll")
    fireEvent.click(SelectedAllBtn)
    expect(screen.getByText('Selected All')).toBeInTheDocument()
    fireEvent.click(SelectedAllBtn)

    expect(screen.getByText('None Selected')).toBeInTheDocument()

  })
})