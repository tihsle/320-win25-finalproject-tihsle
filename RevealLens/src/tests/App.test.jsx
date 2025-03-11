import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import '@testing-library/jest-dom/extend-expect'

test('renders RevealLens heading on the home page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
  const heading = screen.getByText(/RevealLens/i)
  expect(heading).toBeInTheDocument()
})