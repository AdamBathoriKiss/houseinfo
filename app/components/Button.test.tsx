import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import Button from './Button'


describe('Button komponens', () => {
  it('rendereli a gombot a megadott szöveggel', () => {
    render(<Button>Kattints rám</Button>)
    expect(screen.getByText('Kattints rám')).toBeInTheDocument()
  })

  it('meghívja az onClick handlert kattintáskor', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={handleClick}>Kattints</Button>)
    await user.click(screen.getByText('Kattints'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})