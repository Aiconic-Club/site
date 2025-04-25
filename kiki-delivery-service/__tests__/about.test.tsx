import { render, screen } from '@testing-library/react';
import AboutPage from '../src/app/(home)/about/page';

// Mock the components used in the About page
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => <img {...props} data-testid="next-image" />,
}));

jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the useEffect hook for animations and state changes
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useEffect: jest.fn((callback) => callback()),
  };
});

describe('AboutPage', () => {
  it('renders the main sections of the about page', () => {
    render(<AboutPage />);
    
    // Check main elements
    expect(screen.getByText('About AI-Conic Club')).toBeInTheDocument();
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Meet Our Team')).toBeInTheDocument();
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('Join Our Community')).toBeInTheDocument();
    
    // Check that the team members are rendered
    expect(screen.getByText('Rishi K. Marseni')).toBeInTheDocument();
    expect(screen.getByText('Kapil Singh Dhami')).toBeInTheDocument();
    expect(screen.getByText('Anurodh Kanth')).toBeInTheDocument();
    expect(screen.getByText('Rasul Ghatane')).toBeInTheDocument();
    
    // Check FAQ section
    expect(screen.getByText('What is AI-Conic Club?')).toBeInTheDocument();
    expect(screen.getByText('Do I need to have experience with AI to join?')).toBeInTheDocument();
    
    // Check CTA button
    const ctaButton = screen.getByText('Get Involved');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest('a')).toHaveAttribute('href', '/contact');
  });
});