import {screen, render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Table from './table'

test("The test should be success", ()=> {
    render(<Table />)
    const grid = screen.getByRole("div", {name})
})