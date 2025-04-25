import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button component', () => {
  it('renders button text correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<Button className="custom-class">Button with custom class</Button>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});