import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import HomePage from '../components/HomePage'

test('renders the logo on the HomePage', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  )
  const logoImage = screen.getByAltText(/RevealLens Logo/i)
  expect(logoImage).toBeInTheDocument()
})