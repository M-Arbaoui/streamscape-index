import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { CinematicImage } from '@/components/catalog/CinematicImage';

afterEach(cleanup);

describe('Cinematic artwork loading', () => {
  it('shows a real loading state and reveals loaded artwork', () => {
    render(<CinematicImage src="/poster.jpg" alt="Dune poster" />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading Dune poster');
    const image = screen.getByRole('img');
    fireEvent.load(image);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(image.parentElement).toHaveAttribute('data-image-state', 'ready');
  });

  it('stops loading on failure and restarts for a different source', () => {
    const { rerender } = render(<CinematicImage src="/missing.jpg" alt="Dune poster" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Dune poster unavailable' })).toBeInTheDocument();
    rerender(<CinematicImage src="/new.jpg" alt="Arrival poster" />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading Arrival poster');
  });
});