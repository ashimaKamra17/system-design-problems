import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #101624;
  color: #e0e6ed;
  padding: 40px 20px;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #7a869a;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProblemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ProblemCard = styled(Link)`
  background: #1a2332;
  border: 1px solid #374151;
  border-radius: 16px;
  padding: 30px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  display: block;
  
  &:hover {
    border-color: #4f46e5;
    box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15);
    transform: translateY(-2px);
  }
`;

const ProblemIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const ProblemTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
`;

const ProblemDescription = styled.p`
  color: #7a869a;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const TechBadge = styled.span`
  background: #374151;
  color: #e0e6ed;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const StatusBadge = styled.span`
  background: ${props => {
    switch (props.status) {
      case 'completed': return '#22c55e';
      case 'in-progress': return '#f59e0b';
      case 'new': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  color: white;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

function Dashboard() {
  const problems = [
    {
      id: 'news-feed',
      title: 'News Feed',
      icon: '📰',
      description: 'A social media news feed with posts, likes, comments, and real-time interactions. Features cursor-based pagination and optimistic updates.',
      techStack: ['React', 'Redux Toolkit', 'Styled Components', 'Express', 'REST API'],
      status: 'completed',
      path: '/news-feed'
    },
    {
      id: 'autocomplete',
      title: 'AutoComplete',
      icon: '🔍',
      description: 'Google-like search autocomplete with real-time suggestions, debouncing, caching, and keyboard navigation.',
      techStack: ['React', 'Debouncing', 'Caching', 'Keyboard Navigation', 'Search API'],
      status: 'in-progress',
      path: '/autocomplete'
    }
  ];

  return (
    <DashboardContainer>
      <Header>
        <Title>System Design Problems</Title>
        <Subtitle>
          Interactive notebook for system design problems with split-pane view.
          See working implementations alongside interview notes, algorithms, and key concepts.
        </Subtitle>
      </Header>

      <ProblemsGrid>
        {problems.map((problem) => (
          <ProblemCard key={problem.id} to={problem.path}>
            <ProblemIcon>{problem.icon}</ProblemIcon>
            <ProblemTitle>{problem.title}</ProblemTitle>
            <ProblemDescription>{problem.description}</ProblemDescription>
            <TechStack>
              {problem.techStack.map((tech) => (
                <TechBadge key={tech}>{tech}</TechBadge>
              ))}
            </TechStack>
            <StatusBadge status={problem.status}>
              {problem.status.replace('-', ' ')}
            </StatusBadge>
          </ProblemCard>
        ))}
      </ProblemsGrid>
    </DashboardContainer>
  );
}

export default Dashboard; 