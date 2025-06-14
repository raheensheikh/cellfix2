import React from "react";
import { Tab, Nav } from "react-bootstrap";

const DynamicTabs = ({ tabsData, onTabChange }) => {
  return (
    <Tab.Container 
      defaultActiveKey={tabsData[0]?.eventKey} 
      onSelect={(selectedKey) => {
        if (onTabChange) {
          onTabChange(selectedKey);
        }
      }}
    >
      <Nav variant="tabs" className="d-flex align-items-center border-bottom-none">
        {tabsData.map((tab) => (
          <Nav.Item key={tab.eventKey}>
            <Nav.Link eventKey={tab.eventKey}>
              <img src={tab.image} alt={tab.label} />
              <h4 className="tabText">{tab.text}</h4>
              <span>{tab.label}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content className="tabs_content">
        {tabsData.map((tab) => (
          <Tab.Pane eventKey={tab.eventKey} key={tab.eventKey}>
            {tab.content}
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  );
};

export default DynamicTabs;
