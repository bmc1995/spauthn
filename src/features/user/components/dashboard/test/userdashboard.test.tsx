import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserDashboard from '../UserDashboard';
import { act } from 'react-dom/test-utils';

describe('<UserDashboard />', () => {
  beforeEach(() => {
    render(<UserDashboard />);
  });

  const tabTests = [
    { label: 'User settings tab', panel: 'User settings panel' },
    { label: 'User profile tab', panel: 'User profile panel' },
    { label: 'User uploads tab', panel: 'User uploads panel' },
  ];

  tabTests.forEach(({ label, panel }) => {
    it(`renders and displays ${label} when selected`, () => {
      const tab = screen.getByLabelText(label);
      const panelEl = screen.getByLabelText(panel);

      act(() => {
        tab.click();
      });

      expect(tab).toBeVisible();
      expect(panelEl).toBeVisible();
    });
  });

  describe('Profile Information', () => {
    beforeEach(() => {
      const profileTab = screen.getByLabelText('User profile tab');
      act(() => {
        profileTab.click();
      });
    });

    const profileInfoTests = [
      { label: 'profile picture' },
      { label: 'full name', expected: 'Testerson McTester' },
      { label: 'email address', expected: 'test@example.com' },
      { label: 'phone number', expected: '+1 (555) 555-5555' },
      { label: 'country', expected: 'United States' },
      { label: 'uploads list' },
    ];

    profileInfoTests.forEach(({ label, expected }) => {
      it(`displays ${label}`, () => {
        const element = screen.getByLabelText(label);

        expect(element).toBeVisible();

        if (expected) {
          expect(element.textContent).toBe(expected);
        }
      });
    });
  });
});
