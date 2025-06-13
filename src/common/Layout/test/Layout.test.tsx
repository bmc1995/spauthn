import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Layout } from '../Layout';

describe('<Layout />', () => {
  beforeEach(() => {
    vi.mock('../Header');
    render(<Layout />);
  });
  it.skip('renders child components', async () => {
    const layoutChild = await screen.findByTestId('layoutChild');
    expect(layoutChild).toBeInTheDocument();
  });
});
