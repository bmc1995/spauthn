import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import NavigationBar from '../components/NavigationBar';
import { ModeToggle } from '../../../common/Buttons/ModeToggle';

describe('<NavigationBar />', async () => {
  await vi.importMock<typeof ModeToggle>('../../../common/Buttons/ModeToggle');
  vi.mock('@mui/joy', async () => {
    const actual = await vi.importActual<object>('@mui/joy');
    vi.mock('react-router-dom');
    vi.mock('react-redux');

    return {
      ...actual,
      CssVarsProvider: ({ children }: { children: React.ReactNode }) => {
        <div>{children}</div>;
      },
      useColorScheme: () => ({
        mode: 'system',
        setMode: vi.fn(),
      }),
    };
  });

  it('has a parent nav element', () => {
    render(<NavigationBar />);

    const nav = screen.getByLabelText('Vreact Template');
    expect(nav.tagName).toBe('NAV');
  });
  it("has a 'Home' navlink", () => {
    render(<NavigationBar />);

    const homeBtn = screen.getByLabelText('Home');
    expect(homeBtn).toBeVisible();
    expect(homeBtn).toHaveAttribute('role', 'menuitem');
  });
});
