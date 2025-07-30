import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #101624;
  color: #e0e6ed;
`;

const LeftPane = styled.div`
  flex: 0.6;
  overflow: auto;
  border-right: 1px solid #374151;
`;

const RightPane = styled.div`
  flex: 0.6;
  background: #0f1419;
  overflow: auto;
`;



const BackButton = styled(Link)`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: #374151;
  color: #e0e6ed;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: #4b5563;
    transform: translateY(-1px);
  }
`;

const NotesContainer = styled.div`
  padding: 20px;
  height: 100%;
`;

const NotesHeader = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #374151;
`;

const NotesTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 10px;
`;

const NotesSubtitle = styled.p`
  color: #7a869a;
  font-size: 0.9rem;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #e0e6ed;
  margin-bottom: 15px;
  padding: 8px 12px;
  background: #1a2332;
  border-radius: 6px;
  border-left: 3px solid #4f46e5;
`;

const CodeBlock = styled.pre`
  background: #1a1a1a;
  color: #e0e6ed;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'JetBrains Mono', 'Monaco', 'Consolas', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  border: 1px solid #374151;
  margin-bottom: 15px;
`;

const ConceptList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    background: #1a2332;
    padding: 10px 15px;
    border-radius: 6px;
    margin-bottom: 8px;
    border-left: 3px solid #22c55e;
    color: #e0e6ed;
    font-size: 0.9rem;
  }
`;

const TimeComplexity = styled.div`
  background: #1a2332;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #374151;
  
  .complexity-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .operation {
      color: #e0e6ed;
      font-weight: 500;
    }
    
    .complexity {
      background: #4f46e5;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.8rem;
    }
  }
`;

function NotebookLayout({ children, notesContent, problemTitle }) {
    return (
        <LayoutContainer>
            <BackButton to="/">← Dashboard</BackButton>

            <LeftPane>
                {children}
            </LeftPane>

            <RightPane>
                <NotesContainer>
                    <NotesHeader>
                        <NotesTitle>{problemTitle} - Interview Notes</NotesTitle>
                        <NotesSubtitle>Key concepts, algorithms, and implementation details</NotesSubtitle>
                    </NotesHeader>

                    {notesContent}
                </NotesContainer>
            </RightPane>
        </LayoutContainer>
    );
}

// Helper components for consistent note formatting
export const NoteSection = ({ title, children }) => (
    <Section>
        <SectionTitle>{title}</SectionTitle>
        {children}
    </Section>
);

export const Code = ({ children, language = 'javascript' }) => (
    <CodeBlock>{children}</CodeBlock>
);

export const Concepts = ({ items }) => (
    <ConceptList>
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ConceptList>
);

export const Complexity = ({ operations }) => (
    <TimeComplexity>
        {operations.map((op, index) => (
            <div key={index} className="complexity-item">
                <span className="operation">{op.operation}</span>
                <span className="complexity">{op.complexity}</span>
            </div>
        ))}
    </TimeComplexity>
);

export default NotebookLayout; 