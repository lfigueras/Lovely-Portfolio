import { act, cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App, { createEmailUrl } from './App'
import { projects, sections } from './data'

let intersectionCallback: IntersectionObserverCallback
const observe = vi.fn()
const disconnect = vi.fn()

beforeEach(() => {
  observe.mockClear()
  disconnect.mockClear()
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) {
      intersectionCallback = callback
    }
    observe = observe
    disconnect = disconnect
  })
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('portfolio', () => {
  it('renders all sections and original projects', () => {
    render(<App />)
    for (const { id } of sections) expect(document.getElementById(id)).toBeInTheDocument()
    for (const project of projects) {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
      expect(screen.getByAltText(`${project.title} screenshot`)).toHaveAttribute('src', project.image)
      expect(screen.getByRole('link', { name: `View GitHub for ${project.title}` })).toHaveAttribute('href', project.github)
    }
    expect(screen.getByRole('link', { name: 'My Resume' })).toHaveAttribute('href', expect.stringContaining('.pdf'))
    expect(observe).toHaveBeenCalledTimes(5)
  })

  it('opens the mobile menu and closes it after selecting a section', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    const menu = screen.getByRole('navigation', { name: 'Mobile navigation' })
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
    await user.click(within(menu).getByRole('link', { name: 'About' }))
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
  })

  it('closes the mobile menu with Escape and restores focus', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus()
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
  })

  it('highlights the section at the viewport center and disconnects on unmount', () => {
    const { unmount } = render(<App />)
    const target = document.getElementById('skills')!
    const bounds = target.getBoundingClientRect()
    act(() => intersectionCallback([
      { isIntersecting: true, target, boundingClientRect: bounds, intersectionRect: bounds, intersectionRatio: 1, rootBounds: null, time: 0 },
    ], {} as IntersectionObserver))
    const indicator = screen.getByRole('navigation', { name: 'Section navigation' })
    expect(within(indicator).getByRole('link', { name: 'Skills' })).toHaveAttribute('aria-current', 'location')
    expect(within(indicator).getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
    unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  })

  it('requires valid contact details before opening an email draft', async () => {
    const user = userEvent.setup()
    render(<App />)
    const name = screen.getByRole('textbox', { name: 'Name' })
    const email = screen.getByRole('textbox', { name: 'Email' })
    const message = screen.getByRole('textbox', { name: 'Message' })
    expect(name).toBeRequired()
    expect(email).toBeRequired()
    expect(message).toBeRequired()
    expect(email).toBeInvalid()
    await user.type(email, 'invalid-email')
    expect(email).toBeInvalid()
    await user.clear(email)
    await user.type(email, 'visitor@example.com')
    expect(email).toBeValid()
    expect(screen.getByRole('button', { name: 'Open email draft' })).toHaveAttribute('type', 'submit')
  })

  it('encodes the complete email draft without allowing extra mail headers', () => {
    const url = new URL(createEmailUrl(' Alex & Sam ', 'alex@example.com', 'Hello?\nA project & details #1\nBcc: other@example.com'))
    expect(url.protocol).toBe('mailto:')
    expect(url.pathname).toBe('lovelyfigueras@gmail.com')
    expect(url.searchParams.get('subject')).toBe('Portfolio enquiry from Alex & Sam')
    expect(url.searchParams.get('body')).toBe('Name: Alex & Sam\nEmail: alex@example.com\n\nHello?\nA project & details #1\nBcc: other@example.com')
    expect([...url.searchParams.keys()]).toEqual(['subject', 'body'])
  })
})