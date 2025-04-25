import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeamMemberCard } from '../../../src/app/(home)/about/page';

// Mock the Link component
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// Sample team member data for testing
const mockTeamMember = {
  name: "Test Member",
  role: "Test Role",
  bio: "This is a test bio for the team member.",
  image: "/test-image.jpg",
  quote: "This is a test quote.",
  socialLinks: {
    twitter: "https://twitter.com/test",
    linkedin: "https://linkedin.com/in/test"
  }
};

describe('TeamMemberCard', () => {
  it('renders the team member information correctly', () => {
    render(<TeamMemberCard member={mockTeamMember} />);
    
    // Check that basic information is rendered
    expect(screen.getByText(mockTeamMember.name)).toBeInTheDocument();
    expect(screen.getByText(mockTeamMember.role)).toBeInTheDocument();
    expect(screen.getByText(mockTeamMember.bio)).toBeInTheDocument();
    
    // Check that social links are rendered
    const twitterBadge = screen.getByText('Twitter');
    const linkedinBadge = screen.getByText('LinkedIn');
    expect(twitterBadge).toBeInTheDocument();
    expect(linkedinBadge).toBeInTheDocument();
    
    // Check the parent anchor elements have the correct href
    expect(twitterBadge.closest('a')).toHaveAttribute('href', mockTeamMember.socialLinks.twitter);
    expect(linkedinBadge.closest('a')).toHaveAttribute('href', mockTeamMember.socialLinks.linkedin);
  });
  
  it('shows the quote when hovering over the card', async () => {
    const user = userEvent.setup();
    const { container } = render(<TeamMemberCard member={mockTeamMember} />);
    
    expect(screen.queryByText(`"${mockTeamMember.quote}"`)).not.toBeInTheDocument();
    
    const card = container.firstChild;
    await user.hover(card);
    
    expect(screen.getByText(`"${mockTeamMember.quote}"`)).toBeInTheDocument();
    
    await user.unhover(card);
    
    expect(screen.queryByText(`"${mockTeamMember.quote}"`)).not.toBeInTheDocument();
  });
});